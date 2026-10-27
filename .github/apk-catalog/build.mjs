// Builds the APK catalog for webadb (webadb decision D028). Self-contained copy of
// scripts/build-apk-catalog.mjs plus trimIndex and SOURCES from app/apk.js in the private
// kbenestad/webadb repo, which a workflow here cannot check out. If the catalog format
// changes there, change it here too.
// Usage: node .github/apk-catalog/build.mjs <output-file>
import { writeFile } from 'node:fs/promises';

const KEEP_VERSIONS = 3; // newest versions kept per app

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
function trimIndex(index, src) {
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
      .slice(0, KEEP_VERSIONS);
    if (!v.length) continue;
    const meta = pkg.metadata || {};
    apps.push({ id, src, name: text(meta.name) || id, summary: text(meta.summary), v });
  }
  return apps;
}

const out = process.argv[2];
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
