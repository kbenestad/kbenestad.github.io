# kBenestad Fjord: instructions for coding agents

This folder is the kBenestad Fjord design system, copied into this repo. Every kBenestad app UI is built from it. It works offline: no CDNs, no Google services.

## Read before building UI

1. `README.md` in this folder: the rules (content, colour, type, layout, focus, icons, themes). They are binding.
2. For each component you use: `components/<Name>/README.md` (the rules) and `components/<Name>/preview.html` (example markup).
3. `example.html`: a complete working page showing how the files are loaded.
4. Exact values: `tokens.json`. Reference them in CSS as `var(--name)`, never as hex.

## Loading it in a page

Paths are relative to this folder; keep its internal layout unchanged, because `components/bundle.css` loads the fonts from `../fonts/`.

```html
<link rel="stylesheet" href="kbenestad-fjord/tokens.css">
<link rel="stylesheet" href="kbenestad-fjord/components/bundle.css">
<!-- page markup inside <div class="k"> … </div> -->
<script src="kbenestad-fjord/components/bundle.js"></script>
```

Set the theme with `data-theme` on `<html>`: `fjord` (default), `fjord-dark`, `isbre`, `isbre-dark`, `rim`, `rim-dark`.

## Hard rules

- Put `class="k"` on the app root; component classes only work inside it.
- Use the component classes as written. Don't restyle them per app, and don't copy `bundle.js` logic into the app. If something is missing, say so; don't invent a local variant.
- No runtime requests to third parties: no CDNs, no Google Fonts, no icon fonts from a URL.
- Icons are Lucide SVGs from `assets/Icons/`, pasted inline into `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">…</svg>`. A missing icon is copied from Lucide 1.52.0 with `stroke-width="1.75"` and added to that folder; never hotlink.
- Copy: sentence case, buttons are verbs, no exclamation marks or emoji. Unknown facts go in brackets, like `[ACCOUNT DETAILS]`; never invent figures.
- Formats: international by default (`2026-10-31`, `14:02`, `1 234.5`, `NOK 1 234.50`), and every app also offers Scandinavian (`31.10.2026`, `1 234,5`, `1 234,50 kr`) as a setting. Every app also supports the long date `4 February 2027` and the compact date `04FEB27`. Format with `kBenestadFjord.format`, never by hand; `data-format="scandi"` on `<html>` switches. Store data in ISO forms. Full rules: Formats in `README.md`.
- Language: even an English-only app is built so languages can be added later. Write the English in the markup and give every piece of interface text a key (`data-i18n="invoice.send"`, plus `data-i18n-label`, `-placeholder`, `-title`); text made in script goes through `kBenestadFjord.i18n.t(key, vars)`. Keep every string, by key, in `locales/en.js` (one `kBenestadFjord.i18n.add({...})` call, loaded after `bundle.js`); a new language is a translated copy of it. Use `{name}` slots and plural forms, never sentences joined from fragments. Set `<html lang>`. Full rules: Language in `README.md`.
- Before building a new app, ask the person:
  1. Which languages does it need? (Default English only, still keyed for later.) Right-to-left languages are not supported yet; say so if one comes up.
  2. Does it need locales beyond international and Scandinavian formats? If yes, format those with the browser's `Intl` API.
  3. Should there be a setting for a 12-hour clock? (Default 24-hour; `data-clock="12"`.)
  4. Should there be a setting for the week to start on Sunday? (Default Monday; `data-week-start="sunday"`.)
  5. Should there be a setting to hide week numbers? (Default shown, ISO weeks; `data-week-numbers="off"`.)
- Layout: one `.win.app` window built from panes (see the Layout components). If the app has a sidebar and runs on phones, add `.has-tabbar` and a BottomBar; it replaces the sidebar when the window is 600px wide or narrower.
- Check new UI in all six themes. Text must keep 4.5:1 contrast.
- Don't edit the files in this folder from an app repo. It is a copy: change the design system at its source, then replace this folder.

## Files

| Path | What |
|---|---|
| `README.md` | The brand book and rules |
| `tokens.css` / `tokens.json` | Colours for six themes, type scale, spacing, radii, shadow |
| `components/bundle.css` | All component styles and the font faces |
| `components/bundle.js` | All behaviour, driven by `data-*` attributes |
| `components/<Name>/` | `README.md` rules and `preview.html` example per component |
| `fonts/` | Schibsted Grotesk and JetBrains Mono (woff2), with their OFL licences |
| `assets/Icons/` | Lucide SVG icons in use, with licence notices in its README |
| `example.html` | A complete page: sidebar layout, phone bottom bar, format setting, keyed text |
| `VERSION` | Which version of the design system this copy is |

The `preview.html` files are fragments: they don't link the stylesheets, because the design system page injects them. Copy their markup, not their `<head>`.

## Components

| Component | Use it for |
|---|---|
| Window | The window frame and header bar every app sits in |
| LayoutSingle | A one-pane tool: a form, a single list, a viewer |
| LayoutSidebar | Sections in a sidebar, content in the main pane |
| LayoutTwoSidebars | Sections, then a list of items, then the item (mail pattern) |
| LayoutDetails | Sidebar, content, and a metadata pane on the right (file-manager pattern) |
| SidebarNav | Sidebar contents: links, groups, footer, icon-only collapse |
| BottomBar | Phone navigation with three to five tabs and a More drawer |
| BottomPanel | A collapsible terminal or log panel at the bottom of the main pane |
| SearchBar | A search field that drops down under the header bar |
| Button | Actions |
| Field | Labelled text inputs, checkboxes, switches |
| BoxedList | Rows of settings or items in a rounded list |
| Table | Tabular data |
| Tabs | Switching views: underline tabs or a segmented control |
| Accordion | Optional detail that expands in place |
| Badge | Short status labels |
| Callout | Inline info, success, warning or error messages |
| Toast | A brief confirmation at the bottom of the window |
| Dialog | A short task in a window over the app |
| AlertDialog | A yes/no question that blocks until answered |
| BottomSheet | The phone form of Dialog |
| PopoverMenu | A drop-down list of actions |
| Loading | Spinner and progress bar |
| StatusPage | Empty, no-results and offline states |
| CodeBlock | Code and commands people copy |

## Pointing your agent here

A coding agent reads this file automatically only while working inside this folder. To apply it to the whole repo, add one line to the repo's root `AGENTS.md` or `CLAUDE.md`, adjusting the path:

```
@design/kbenestad-fjord/AGENTS.md
```
