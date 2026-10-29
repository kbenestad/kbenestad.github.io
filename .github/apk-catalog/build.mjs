// Builds the APK catalog for webadb (webadb decision D028). Self-contained copy of
// scripts/build-apk-catalog.mjs plus trimIndex and SOURCES from app/apk.js in the private
// kbenestad/webadb repo, which a workflow here cannot check out. If the catalog format
// changes there, change it here too.
// Also builds the archive catalog: every version kept in the F-Droid and IzzyOnDroid archives,
// gzipped, for the Apps section's "Search archive repos" (their servers do not let a browser read
// the archive indexes). The archive file has no timestamp, so it is byte-for-byte the same when
// nothing changed and the workflow commits nothing.
// Usage: node .github/apk-catalog/build.mjs <catalog-file> <archive-catalog-file.gz>
import { writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

const KEEP_VERSIONS = 3; // newest versions kept per app

const ARCHIVES = {
  f: { name: 'F-Droid archive', base: 'https://f-droid.org/archive', min: 100 },
  i: { name: 'IzzyOnDroid archive', base: 'https://apt.izzysoft.de/fdroid/archive', min: 1 }, // a small archive (11 apps on 2026-10-29)
};

const SOURCES = {
  f: { name: 'F-Droid', base: 'https://f-droid.org/repo' },
  i: { name: 'IzzyOnDroid', base: 'https://apt.izzysoft.de/fdroid/repo' },
};

const text = (localized) => {
  if (!localized) return '';
  if (typeof localized === 'string') return localized;
  return localized['en-US'] || localized.en || Object.values(localized)[0] || '';
};

// index-v2.json (the F-Droid repository format) to catalog entries for one source.
function trimIndex(index, src, keep = KEEP_VERSIONS, withSummary = true) {
  const apps = [];
  for (const [id, pkg] of Object.entries(index.packages || {})) {
    const v = Object.values(pkg.versions || {}).map((ver) => {
      const m = ver.manifest || {};
      const sdk = m.usesSdk || {};
      return {
        name: m.versionName || '',
        code: m.versionCode || 0,
        min: sdk.minSdkVersion || 1,
        target: sdk.targetSdkVersion || 0,
        file: ver.file && ver.file.name ? ver.file.name.replace(/^\//, '') : '',
        sha256: ver.file && ver.file.sha256 || '',
        size: ver.file && ver.file.size || 0,
        abis: m.nativecode && m.nativecode.length ? m.nativecode : null,
      };
    }).filter((x) => x.file && x.sha256)
      .sort((a, b) => b.code - a.code)
      .slice(0, keep);
    if (!v.length) continue;
    const meta = pkg.metadata || {};
    apps.push({ id, src, name: text(meta.name) || id, ...(withSummary ? { summary: text(meta.summary) } : {}), v });
  }
  return apps;
}

const [out, archiveOut] = process.argv.slice(2);
const apps = [];
for (const [src, { base }] of Object.entries(SOURCES)) {
  const res = await fetch(`${base}/index-v2.json`);
  if (!res.ok) throw new Error(`${res.status} ${base}/index-v2.json`);
  const found = trimIndex(await res.json(), src);
  if (found.length < 500) throw new Error(`${SOURCES[src].name}: only ${found.length} apps, refusing to publish`);
  console.log(`${SOURCES[src].name}: ${found.length} apps`);
  apps.push(...found);
}
await writeFile(out, JSON.stringify({ generated: new Date().toISOString(), apps }));
console.log(`Wrote ${out}`);

if (archiveOut) {
  const archived = [];
  for (const [src, { name, base, min }] of Object.entries(ARCHIVES)) {
    const res = await fetch(`${base}/index-v2.json`);
    if (!res.ok) throw new Error(`${res.status} ${base}/index-v2.json`);
    const found = trimIndex(await res.json(), src, Infinity, false);
    if (found.length < min) throw new Error(`${name}: only ${found.length} apps, refusing to publish`);
    console.log(`${name}: ${found.length} apps`);
    archived.push(...found);
  }
  // gzip without a file name or time, so the same input gives the same bytes.
  await writeFile(archiveOut, gzipSync(JSON.stringify({ apps: archived }), { level: 9 }));
  console.log(`Wrote ${archiveOut}`);
}
