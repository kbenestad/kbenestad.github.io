# kbenestad.github.io

My GitHub Pages site. Pages serves the `docs/` folder of `main` at https://kbenestad.github.io/.
Only what is inside `docs/` is public.

| Folder | What | Where it comes from |
|---|---|---|
| `docs/webadb/` | The webadb app | Built in the `webadb` repo (`npm run build` makes its `docs/`), then copied here |
| `docs/config-editor/` | Editor for the JSON config files of my apps | Written here, no build step |

## Debloat list (updates itself)

webadb shows advice from the [Universal Android Debloater Next Generation](https://github.com/Universal-Debloater-Alliance/universal-android-debloater-next-generation)
(UAD-ng) list. The app reads it from this site, at `docs/webadb/data/uad_lists.json`.

The workflow `.github/workflows/update-debloat-list.yml` keeps that one file current:

- **When:** every Monday at 04:17 UTC, and whenever you start it by hand.
- **What:** it downloads the newest `uad_lists.json` from UAD-ng, checks that it is valid JSON
  with more than 1 000 entries, and replaces the file. If nothing changed it does nothing.
  If something changed it commits `Update debloat list (UAD-ng <commit>)` to `main`.
- **Needs:** nothing to set up. It uses the token GitHub gives every workflow run.

Start it by hand: GitHub → this repo → Actions → "Update debloat list" → Run workflow.

Check that it works (after the first run):

1. Actions tab: the latest run is green. "The list has not changed." in its log is fine.
2. Commits: when the list did change, there is a commit from `github-actions[bot]`.
3. Open https://kbenestad.github.io/webadb/data/uad_lists.json. It matches the repo file.

Things to know:

- **Pages must rebuild after the commit.** I expect Pages to publish the new commit by itself,
  but I could not confirm that for commits made by a workflow. If the live file stays old after
  a change, tell me: the fix is to give the workflow a personal access token instead.
- **Scheduled workflows pause** after 60 days without any activity in the repo. Run it by hand
  (or make any commit) to wake it up.
- **Visitors can also ask for the very latest list.** On the connect screen of webadb there is
  a tick box "Download the latest debloat list". When ticked, the browser fetches it straight
  from GitHub instead of from this site. GitHub then sees the request. It is off by default.
- **Licence.** The list is GPL-3.0 (see `docs/webadb/data/LICENSE-GPL-3.0.txt`).

## Putting a new webadb build on the site

The list file on this site may be newer than the one in the `webadb` repo, so do not overwrite it.
`version.md` is mine and stays too.

In a terminal, with both repos next to each other:

```
cd webadb
npm run build
npm run check-site
rsync -a --delete --exclude version.md --exclude data/uad_lists.json docs/ ../kbenestad.github.io/docs/webadb/
```

Without `rsync` (for example on Windows): delete everything inside `docs/webadb/` except
`version.md` and `data/uad_lists.json`, then copy everything from the `webadb` repo's `docs/`
into `docs/webadb/`, skipping those two files.

Then commit and push, and add a line to `docs/webadb/version.md`.
