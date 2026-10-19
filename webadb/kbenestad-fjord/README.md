Last updated 2026-10-19 21:24 (Bangkok time).

Calm, clear, cold. Fjord is the default look for every kBenestad app: Nordic, minimal and quiet, close to GNOME Adwaita, with one icy blue doing the work. Build app UI first; web and paper documents follow the same tokens.

## How to use it

- Load `tokens.css`, then `components/bundle.css`, then `components/bundle.js` once. `bundle.css` loads the fonts from `fonts/`, so copy that folder alongside `components/` and keep its relative place.
- An app makes no requests to third-party services at runtime: no CDNs, no Google Fonts.
- All behaviour (collapsing panes, menus, search bar, dialogs, toasts) comes from `bundle.js` and is driven by attributes. Never copy its logic into an app; if something is missing, add it here.
- Put `class="k"` on the app root. Every component class (`.btn`, `.inp`, `.list`…) only applies inside `.k`.
- Use the component classes as written; don't restyle them per app. If an app needs something new, add it here first.
- Reference colours by token (`var(--acc)`), never by hex.

## Content fundamentals

- Sentence case everywhere: buttons, titles, tabs ("Send invoice", "Payment details").
- Buttons are verbs. Callout headings state the fact ("Paid", "Could not send"); the line under it says what happens next.
- Plain and brief. No exclamation marks, no emoji.
- Dates, times, numbers and money follow the format rules below; never hand-write them.
- Æ Ø Å Þ ð Ä Ö must render as comfortably as Latin; test copy with them.
- Missing facts are placeholders in brackets, like `[ACCOUNT DETAILS]`. Never invent figures.

## Formats

kBenestad apps are international. Every app uses the international format by default and also offers the Scandinavian format, chosen by the person in the app's settings.

| | International (default) | Scandinavian |
|---|---|---|
| Date | `2026-10-31` (ISO 8601) | `31.10.2026` |
| Long date | `4 February 2027` | `4 February 2027` |
| Compact date | `04FEB27` | `04FEB27` |
| Date and time | `2026-10-31 14:02` | `31.10.2026 14:02` |
| Time | `14:02`, 24-hour | `14:02`, 24-hour |
| Number | `1 234.5` | `1 234,5` |
| Money | `NOK 1 234.50`, currency code first | `1 234,50 kr` for NOK, SEK and DKK; `1 234,50 EUR` for other currencies |

- Format with `kBenestadFjord.format` (`date`, `dateLong`, `dateCompact`, `time`, `dateTime`, `number`, `money`, `weekNumber`, `weekStart`) from `components/bundle.js`, never by hand. Put `data-format="scandi"` on `<html>` to switch the whole app; leave it off for the international default.
- Store and exchange data in ISO forms (`2026-10-31`, `2026-10-31T14:02:00Z`, plain numbers); formats are only for display.
- Thousands are grouped with a narrow no-break space from four digits up, so numbers never wrap. Money always shows two decimals and a currency.
- Every app supports all three date forms. Use the short date in tables, lists and fields; the long date (`4 February 2027`) in running text, headings and documents; the compact date (`04FEB27`) where space is tight or for codes and references, such as tickets, logs and file names.
- The long date follows the app's language (see Language): `4 February 2027` in English, `4. februar 2027` in Norwegian. The compact date is a code and always uses English month abbreviations.
- Defaults: 24-hour clock, weeks starting on Monday, ISO week numbers shown wherever a calendar shows weeks.
- Before building, ask whether the app needs settings for a 12-hour clock, a Sunday week start, or hiding week numbers. If yes, set `data-clock="12"` (times read `2:02 PM`), `data-week-start="sunday"` (`format.weekStart()` returns 0), or `data-week-numbers="off"` on `<html>` from the app's settings, next to `data-format`.
- Date inputs take the short date and show its pattern as their placeholder, like `YYYY-MM-DD` or `DD.MM.YYYY`.
- Other locales are not supported by default. Before building, ask whether an app needs any; if so, format those with the browser's `Intl` API for that locale and keep these two as well.
- In Scandinavian format, `kr` is ambiguous when an app shows more than one Nordic currency; show the code instead there.

## Language

Apps may need their interface in local languages. Which languages is decided per app, but every app is built so that languages can be added later without rework, even when it ships in English only.

- Before building, ask which languages the app needs. English only is a valid answer; it still follows the rules below.
- Write interface text in English in the markup and give every piece a key: `<button data-i18n="invoice.send">Send invoice</button>`. Use `data-i18n-label`, `data-i18n-placeholder` and `data-i18n-title` for `aria-label`, `placeholder` and `title`.
- Text made in script goes through `kBenestadFjord.i18n.t(key, vars)`, never a literal string. Fill slots by name (`"Hello, {name}"`) and give counts as plural forms (`{one: "{count} file moved", other: "{count} files moved"}`); never build a sentence by joining fragments.
- Every app keeps `locales/en.js`, listing every interface string by key, from markup and script alike: it gives script-made text its English and gives a translator one complete list. Each file is one call, `kBenestadFjord.i18n.add({"invoice.send": "Send invoice", …})`, loaded with a `<script>` after `bundle.js`. Script files load from disk with no server, unlike JSON.
- Adding a language later means copying `locales/en.js` to, say, `locales/nb.js`, translating the values, setting `<html lang="nb">` and loading that file after the English one. A key left untranslated keeps its English, so a partial translation is safe.
- Name keys by meaning, with a prefix per area: `invoice.send`, `nav.archive`. The system's own messages use `fjord.*` keys, listed at the top of `components/bundle.js`; include them in a translation.
- Set `<html lang>` to the active language (`en`, `nb`, `sv`…). Dates, plurals and the long date follow it.
- Leave room for longer text: translations often run longer than English, German by as much as a third. Don't size buttons, tabs or columns to fit English exactly.
- Don't put text in images or icons. Names of people, places and organisations are data, not interface text, and are never translated.
- Right-to-left languages (Arabic, Persian, Urdu, Hebrew) are not supported yet: Fjord's layouts and components have not been built or tested for them. Flag it before agreeing to one.

## Colour

- One accent. `acc` (#2F6FED) is the only saturated colour on a screen: the primary button, the switch when on, the focused field, the active tab line. Everything else is neutral.
- Grounds, back to front: `bg` (window) → `side` / `head` (chrome) → `view` / `card` (content). Use `sunk` for fills that sit below the surface: default buttons, segmented-control track, table header.
- Text: `ink` for primary, `ink2` for secondary and body inside callouts, `muted` for captions and help. All pass 4.5:1 on every ground listed in their notes.
- Tints pair with their inks: `accsoft`+`accink`, `oksoft`+`ok`, `warnsoft`+`warn`, `badsoft`+`bad`. Never put body text in a state colour on white except `bad` for error help.
- Selection is `sel` with `accink` text.
- The `p50`–`p900` ramp exists for charts and the rare tint; don't use it to decorate.
- States never rely on colour alone: badges carry a word, callouts a distinct icon shape.

## Type

- One family, Schibsted Grotesk; JetBrains Mono only for identifiers (`mono`).
- Both ship as woff2 files in `fonts/`: Schibsted Grotesk 400, 500, 600, 700 and JetBrains Mono 400, 500, latin subset (covers Æ Ø Å Þ ð Ä Ö and €). Both are SIL Open Font License.
- Get font files from Bunny Fonts (`fonts.bunny.net`), never from Google Fonts, and add them to `fonts/`. Link Bunny Fonts directly only when an app truly cannot ship files.
- Scale: `display` 40, `title` 26, `heading` 18, `body` 15, `label` 13 semibold, `caption` 13, `cap` 12 uppercase. One `display` per screen at most.
- Numbers in tables use tabular figures (`.num` or `.tbl .r`).

## Shape and depth

- Radii: `r` 12px for windows, cards and lists; `rs` 8px for buttons, fields, callouts; `pill` for badges and the one headline button. Isbre uses 8 / 6px, Rim 4 / 3px with square-cornered pills; the theme sets them, so always use the tokens.
- One shadow, `shadow`, for windows and floating surfaces (none in Isbre and Rim). Cards and lists use a `cardline` border, not a shadow.
- Hairlines are `line`; control borders are `line2`.

## Layout

- Every app is one window (`.win.app`) built from panes, left to right: `.pane.sidebar`, `.pane.mid`, `.pane.main`, `.pane.details`. Use only the ones you need: main alone (LayoutSingle), sidebar + main (LayoutSidebar), sidebar + mid + main (LayoutTwoSidebars), sidebar + main + details (LayoutDetails).
- Each pane has its own header bar. Sidebars collapse with `.is-collapsed`, driven by toggle buttons; a button that only shows a pane gets `.reveal`.
- Prefer icon-only collapse for a sidebar whose items have icons (`data-collapse="rail"`): a collapsed sidebar should stay visible, never vanish without a trace. See SidebarNav.
- A sidebar can hold expandable groups (`.nav-group`, one level only) and a pinned footer (`.pane-foot`) for settings and setup.
- Terminals, logs and other output go in a BottomPanel inside the main pane; collapsed, it keeps its title strip.
- Layout breakpoints follow the window's width, not the screen's, so a narrow window on a wide screen behaves like a phone. Dialogs are the exception: they follow the screen.
- In a window 720px wide or narrower, side panes float over the content; start them collapsed there.
- In a window 600px wide or narrower, a BottomBar replaces the sidebar: three to five tabs, the last one More, opening a bottom drawer with the rest. LayoutSidebar, LayoutTwoSidebars and LayoutDetails switch on their own with `.has-tabbar`.

## Code

- Every multi-line command or code sample is a CodeBlock with a copy button; inline `code` copies itself when clicked. People should never have to select code by hand.
- Write commands without a leading prompt (`$`), one per line, so a copied block runs as it is.

## Dialogs

- Use the native `<dialog>` element opened with `showModal()`: it brings the `scrim` backdrop, focus trapping and Esc to close.
- `dialog.alert` for a yes/no question; `dialog.dlg` for a short task with its own header bar (Cancel left, action right). A `dialog.dlg` turns into a bottom sheet at 600px and narrower.
- Never stack dialogs on dialogs.

## Focus and states

- Everything focusable shows a 2px `accink` ring when reached by keyboard (never on mouse click). It passes 3:1 on every surface in every theme. Never remove it; if a component needs the ring inside its edge, change only `outline-offset`.
- Text fields show focus with an `acc` border and a `halo` glow instead of the ring.
- Hover and pressed states are shades of the element's own colour, so they need no extra tokens and work in all six themes. Primary buttons go to `acch`.
- Toggle buttons use `aria-pressed`; pressed shows the `line` fill.

## Spacing

- A 4px scale: `space-1` 4, `space-2` 8, `space-3` 12, `space-4` 16, `space-5` 20, `space-6` 24, `space-8` 32, `space-10` 40, `space-12` 48, `space-16` 64.
- Use it for layout between and around components: `space-4` between fields, `space-6` inside panes and dialogs, `space-8` between sections.
- Components keep their own exact paddings (a few, like 6, 10 and 14px, sit between steps); don't round them to the scale.

## Iconography

- Inline stroke SVG on a 24px viewBox, drawn at 16px (18px in callouts, 20px in the BottomBar): `stroke: currentColor`, width 1.75, round caps and joins, no fill.
- The icon set is Lucide (ISC licence), stored in the Icons asset group (`assets/Icons/`) with its licence notice in that folder's README. Only icons in use are kept there; add others from the same Lucide release, with `stroke-width="1.75"`.
- Borrow from another set only when Lucide has no match, and follow the rule below.
- Google Material icons or Material Symbols, when used, are downloaded into the repo (the SVG files or the font file) and served locally. Never link them from `fonts.googleapis.com` or any other CDN.
- No logo is included in this system. Set "kBenestad" in Schibsted Grotesk until a mark is added.

## Themes

Three families, each with light and dark, switched by `data-theme` on `<html>`:

| Theme | `data-theme` | Character |
|---|---|---|
| Fjord | `fjord` (default) | Brand blue #2F6FED, 12px radius, soft shadow. Closest to Adwaita. |
| Fjord dark | `fjord-dark` | Fjord on cool slate grounds. Same blue, so white text on it still passes. |
| Isbre | `isbre` | Glacier blue #2B6C8F, 8px radius, hairlines instead of shadows, basalt ink. |
| Isbre dark | `isbre-dark` | Basalt grounds; the glacier blue lightens to #61A1C6 and takes dark text. |
| Rim | `rim` | Frost navy #1D3A52 on white, 4px radius and square pills, hairlines only. Most restrained. |
| Rim dark | `rim-dark` | Inverted: ice #C8DAEB is the accent on near-navy grounds, with dark text on it. |

- All six use the same fonts and the same components; only colours, radii and the shadow change.
- Fjord is for kBenestad apps; Isbre and Rim are reserved for future expansions. Pick one family per product, not per screen.
- The families are interchangeable: they share every class and token name, so a product changes family by changing `data-theme` alone. Keep it that way: never add a class or token that exists in only one family, and check every new component in all six themes.
- Follow the system setting by switching between a family's light and dark theme on `prefers-color-scheme`.
- Never hard-code white on `acc`: use `onacc`, which turns dark in Isbre dark and Rim dark.
- In `fjord-dark`, keep primary buttons off `sunk` areas (the blue is 2.85:1 against it).
