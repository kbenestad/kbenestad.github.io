Last updated 2026-10-23 (Bangkok time).

Calm, clear, cold. kBenestad is one design system for everything kBenestad makes: Nordic, minimal and quiet, close to GNOME Adwaita, with one blue doing the work. Build app UI first; web and paper documents follow the same tokens.

It holds two families of looks plus three groups of stand-alone looks, each light and dark, switched by `data-theme` alone (see Themes). The **coast** family: **Skjærgård** for corporate work, **Fjord** for standalone software, **Brenning** for Gardmark, and **Tare**, **Strandrisp** and **Fjærekoll** for future products. The **mountain** family, more austere: **Rim**, **Einer**, **Blåbær**, **Torv** and **Skifer**. The **signature** looks each have their own shape, colour and typeface: **Spor**, **Vinge**, **Signal**, **Havn**, **Hale**. Three **public** looks follow the Norwegian, Danish and Swedish government identities: **Torg**, **Rådhus** and **Kansli**. Three **press** looks follow newspapers: **Trykk** (black and white), **Laks** (salmon paper) and **Spalte** (paper and ink, serif headings). Any look can switch on its **bold** variant, where its brand colour fills the header bars. Looks in a family share their base (radii, shadow, everything but colour); all looks share every class, token and script, so this is the only place to change anything.

This system replaces the separate kBenestad Fjord and kBenestad Skjærgård systems (merged 2026-10-21). Code written for either keeps working: `kBenestadFjord` and `kBenestadSkjaergard` are kept as names for `kBenestad`. The system's own text keys are now `k.*` (they were `fjord.*` and `skjaergard.*`); rename them in any translation.

## How to use it

- In an app repository, start from the kBenestad drop-in: everything shared (base styles, components, fonts, the minimum icon set, a `CLAUDE.md` with the rules) plus one theme file per look holding only colours, shadow and radii. The app links one theme file; changing look is changing that link.
- Load `tokens.css`, then `components/bundle.css`, then `components/bundle.js` once. `bundle.css` loads the fonts from `fonts/`, so copy that folder alongside `components/` and keep its relative place.
- An app makes no requests to third-party services at runtime: no CDNs, no Google Fonts.
- All behaviour (collapsing panes, menus, search bar, dialogs, toasts, tooltips) comes from `bundle.js` and is driven by attributes. Never copy its logic into an app; if something is missing, add it here.
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

- Format with `kBenestad.format` (`date`, `dateLong`, `dateCompact`, `time`, `dateTime`, `number`, `money`, `weekNumber`, `weekStart`) from `components/bundle.js`, never by hand. Put `data-format="scandi"` on `<html>` to switch the whole app; leave it off for the international default.
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
- Text made in script goes through `kBenestad.i18n.t(key, vars)`, never a literal string. Fill slots by name (`"Hello, {name}"`) and give counts as plural forms (`{one: "{count} file moved", other: "{count} files moved"}`); never build a sentence by joining fragments.
- Every app keeps `locales/en.js`, listing every interface string by key, from markup and script alike: it gives script-made text its English and gives a translator one complete list. Each file is one call, `kBenestad.i18n.add({"invoice.send": "Send invoice", …})`, loaded with a `<script>` after `bundle.js`. Script files load from disk with no server, unlike JSON.
- Adding a language later means copying `locales/en.js` to, say, `locales/nb.js`, translating the values, setting `<html lang="nb">` and loading that file after the English one. A key left untranslated keeps its English, so a partial translation is safe.
- Name keys by meaning, with a prefix per area: `invoice.send`, `nav.archive`. The system's own messages use `k.*` keys, listed at the top of `components/bundle.js`; include them in a translation.
- Set `<html lang>` to the active language (`en`, `nb`, `sv`…). Dates, plurals and the long date follow it.
- Leave room for longer text: translations often run longer than English, German by as much as a third. Don't size buttons, tabs or columns to fit English exactly.
- Don't put text in images or icons. Names of people, places and organisations are data, not interface text, and are never translated.
- Right-to-left languages (Arabic, Persian, Urdu, Hebrew) are not supported yet: kBenestad's layouts and components have not been built or tested for them. Flag it before agreeing to one.

## Colour

- One accent. `acc` is the only saturated colour on a screen: the primary button, the switch when on, the focused field, the active tab line. Everything else is neutral. Hover and pressed use `acch`.
- Each look sets its own accent (light theme): Skjærgård #002F6C, Fjord #2F6FED, Brenning #2B6C8F, Tare #048076, Strandrisp #865BBC, Fjærekoll #AF4D80, Rim #1D3A52, Einer #124830, Blåbær #37356B, Torv #523525, Skifer #383E43. Skjærgård's is the blue of the Finnish flag, its hover #00205B the blue of the Norwegian flag. Accents within a family sit well apart in hue, so products stay easy to tell apart.
- Skjærgård's `acc` is so deep that it sits close to `ink` in lightness (1.4:1). In every family, never use colour alone to mark something as interactive: underline text links, and keep the accent for fills, switches and lines.
- In every dark theme except Fjord dark the accent lightens and takes dark text (`onacc`), because a deep colour disappears on dark grounds. Fjord dark keeps Fjord's blue with white text; keep its primary buttons off `sunk` areas (2.85:1 against it).
- Grounds, back to front: `bg` (window) → `side` / `head` (chrome) → `view` / `card` (content). Use `sunk` for fills that sit below the surface: default buttons, segmented-control track, table header.
- Text: `ink` for primary, `ink2` for secondary and body inside callouts, `muted` for captions and help. All pass 4.5:1 on every ground listed in their notes.
- Tints pair with their inks: `accsoft`+`accink`, `oksoft`+`ok`, `warnsoft`+`warn`, `badsoft`+`bad`. Never put body text in a state colour on white except `bad` for error help.
- Selection is `sel` with `accink` text.
- The `p50`–`p900` ramp exists for charts and the rare tint; don't use it to decorate. Which ramp step `acc` matches differs by look (Skjærgård's brand blue is `p700`); always use `acc` for the accent, never a ramp step.
- States never rely on colour alone: badges carry a word, callouts a distinct icon shape.

## Type

- One family, Schibsted Grotesk; JetBrains Mono only for identifiers (`mono`). The stand-alone looks (signature, public, press) may bring their own typeface through `--font-sans`; see Themes.
- Both ship as woff2 files in `fonts/`: Schibsted Grotesk 400, 500, 600, 700 and JetBrains Mono 400, 500, latin subset (covers Æ Ø Å Þ ð Ä Ö and €). Both are SIL Open Font License. The stand-alone looks' typefaces ship in `fonts/` too, latin subset, all SIL Open Font License: Nunito, Jost, Barlow, Work Sans, Rubik, Source Serif 4, Playfair Display, Newsreader, Open Sans, IBM Plex Sans, Noto Sans. A browser loads one only when a look uses it.
- Get font files from Bunny Fonts (`fonts.bunny.net`), never from Google Fonts, and add them to `fonts/`. Link Bunny Fonts directly only when an app truly cannot ship files.
- Scale: `display` 40, `title` 26, `heading` 18, `body` 15, `label` 13 semibold, `caption` 13, `cap` 12 uppercase. One `display` per screen at most.
- Numbers in tables use tabular figures (`.num` or `.tbl .r`).

## Shape and depth

- Radii belong to the family. Coast: `r` 12px for windows, cards and lists; `rs` 8px for buttons, fields, callouts; `pill` for badges and the one headline button. Mountain: 4 / 3px with square-cornered pills. The theme sets them, so always use the tokens.
- One shadow, `shadow`, for windows and floating surfaces in the coast family; the mountain family uses none, only hairlines. Cards and lists use a `cardline` border, not a shadow.
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
- Hover and pressed states are shades of the element's own colour, so they need no extra tokens and work in all eight themes. Primary buttons go to `acch`.
- Toggle buttons use `aria-pressed`; pressed shows the `line` fill.

## Spacing

- A 4px scale: `space-1` 4, `space-2` 8, `space-3` 12, `space-4` 16, `space-5` 20, `space-6` 24, `space-8` 32, `space-10` 40, `space-12` 48, `space-16` 64.
- Use it for layout between and around components: `space-4` between fields, `space-6` inside panes and dialogs, `space-8` between sections.
- Components keep their own exact paddings (a few, like 6, 10 and 14px, sit between steps); don't round them to the scale.

## Iconography

- Inline stroke SVG on a 24px viewBox, drawn at 16px (18px in callouts, 20px in the BottomBar): `stroke: currentColor`, width 1.75, round caps and joins, no fill.
- The icon set is Lucide 1.52.0 (ISC licence), incorporated by reference: every icon in that release is part of kBenestad without being copied here. The pinned release is the reference, not lucide.dev's latest.
- The Icons asset group (`assets/Icons/`) holds the minimum set: the icons kBenestad's own components and layouts use, with the licence notice in that folder's README. Every app imports the whole minimum set into its own assets folder (`assets/icons/`).
- An app that needs more vendors them itself: copy the SVG from Lucide 1.52.0 into the app's `assets/icons/`, set `stroke-width="1.75"`, keep the licence notice. Add an icon to kBenestad's minimum set only when a kBenestad component starts using it.
- Borrow from another set only when Lucide has no match, and follow the rule below.
- Google Material icons or Material Symbols, when used, are downloaded into the repo (the SVG files or the font file) and served locally. Never link them from `fonts.googleapis.com` or any other CDN.
- No logo is included in this system. Set "kBenestad" in Schibsted Grotesk until a mark is added.

## Themes

Two families and three groups of stand-alone looks. A family is a base (radii, shadow, every shape and size); its looks differ only in colour. A stand-alone look (signature, public, press) sets its own colours, neutrals, hairlines, radii, shadow and typeface. Each look has a light and a dark theme, switched by `data-theme` on `<html>`, and a bold variant switched by `data-bold`:

| Look | `data-theme` | Family | Name and use |
|---|---|---|---|
| Skjærgård | `skjaergard` / `skjaergard-dark` | Coast | Archipelago. Corporate: company sites, documents, forms, internal tools. |
| Fjord | `fjord` / `fjord-dark` | Coast | Fjord. Software: standalone apps and tools. |
| Brenning | `brenning` / `brenning-dark` | Coast | Breaking surf. Gardmark. |
| Tare | `tare` / `tare-dark` | Coast | Kelp. Free for a new product; sea teal. |
| Strandrisp | `strandrisp` / `strandrisp-dark` | Coast | Sea lavender. Free for a new product; purple. |
| Fjærekoll | `fjaerekoll` / `fjaerekoll-dark` | Coast | Sea thrift. Free for a new product; pink. |
| Rim | `rim` / `rim-dark` | Mountain | Hoarfrost on the ground. Mountain base: frost navy. |
| Einer | `einer` / `einer-dark` | Mountain | Juniper. Deep juniper green. |
| Blåbær | `blabaer` / `blabaer-dark` | Mountain | Bilberry. Bilberry indigo. |
| Torv | `torv` / `torv-dark` | Mountain | Peat. Peat brown. |
| Skifer | `skifer` / `skifer-dark` | Mountain | Slate. Almost monochrome slate grey. |
| Spor | `spor` / `spor-dark` | Signature | Track. Railway green, the roundest look, pill buttons; Nunito. |
| Vinge | `vinge` / `vinge-dark` | Signature | Wing. Deep air-travel blue; Jost. |
| Signal | `signal` / `signal-dark` | Signature | Signal. Deep carriage red, square, firm hairlines; Barlow. |
| Havn | `havn` / `havn-dark` | Signature | Harbour. Shipping blue with white text, no corners; Work Sans. |
| Hale | `hale` / `hale-dark` | Signature | Tail fin. Airline red on navy text, round; Rubik. |
| Torg | `torg` / `torg-dark` | Public | Town square. After regjeringen.no: departement navy #002A58, light grey grounds; Open Sans. |
| Rådhus | `raadhus` / `raadhus-dark` | Public | Town hall. After regeringen.dk: state red #9D2235 on white and grey, square; IBM Plex Sans. |
| Kansli | `kansli` / `kansli-dark` | Public | Chancery. After the Sweden brand: Sweden Blue #005293, yellow on the bold bar, Dawn Blue grounds in dark mode; Sweden Sans if installed, else Noto Sans. |
| Trykk | `trykk` / `trykk-dark` | Press | Print. After Aftenposten: black and white only, no corners; Source Serif 4. |
| Laks | `laks` / `laks-dark` | Press | Salmon. Salmon newsprint, deep teal accent, 2px corners; Newsreader. |
| Spalte | `spalte` / `spalte-dark` | Press | Newspaper column. Paper grounds, black ink, no corners; Source Serif 4 with Playfair Display headings. |

- **Coast** base: 12 / 8px radii, round pills, a soft shadow. Closest to GNOME Adwaita.
- **Mountain** base: 4 / 3px radii, square pills, no shadow, hairlines only. The more austere family.
- **Stand-alone** looks may break the family rules: their own radii, shadow, neutrals, hairlines, a few extra rules and their own typeface (`--font-sans`). In the press looks and Spalte, running text is a serif while buttons, navigation, labels and table heads stay in Schibsted Grotesk.
- What no look changes: sizes, spacing and line widths. A look that needs those would be a change to kBenestad itself.
- **Bold** variant: `<html data-bold>` (with any `data-theme`, or none) fills every pane's header bar (`.hb`) with the look's `--bar` colour, text and icons in `--onbar` (4.5:1 or more). Dialogs keep a plain header. It is the same look, not another theme: every look carries `--bar`, `--onbar` and `--onbarmuted`. In dark mode the bar keeps the brand colour, a little deeper so it does not glare. Pages that brand a header outside `.hb` use `[data-bold]` rules with the same tokens.
- **Public** looks: **Torg** follows regjeringen.no (the departements' shared profile: Dep blue #002A58, light grey #F4F4F4, Open Sans), with an accent rule under the header; its bold bar is navy. **Rådhus** follows regeringen.dk (Statsministeriet's red, Pantone 201) with IBM Plex Sans, as in the Danish common design system; square corners, ruled table heads, a heavy focus ring; its bold bar is red. **Kansli** follows the Sweden brand's colours (Sweden Blue and Yellow, Dawn Blue backgrounds, winter greys); its bold bar is blue with yellow text.
- **Sweden Sans** is not included: the Sweden brand's typefaces are exclusive and need approval from one of its owners (the Swedish Institute, Visit Sweden, Business Sweden or the Ministry for Foreign Affairs). Kansli names it first, so it is used where it is installed or added under such approval; otherwise Noto Sans, which the Sweden brand names as its alternative.
- **Press** looks: **Spalte** has paper-toned grounds, black ink, no corners and a double rule under the header; Source Serif 4 with Playfair Display headings. **Trykk** is black and white only (white paper, black ink, a black accent; in dark mode the reverse), no corners, thin black rules; its bold bar is black, or white in dark mode. **Laks** is salmon newsprint with dark ink and a deep teal accent, 2px corners; its bold bar is a stronger salmon with dark text.
- Havn uses a shipping blue deep enough for white text (4.8:1). The original light brand blue cannot carry white text at a readable contrast.
- Red accents: Signal (deep carriage red), Rådhus (state red) and Hale (bright airline red) all read close to the `bad` state, and Signal and Rådhus are close to each other in colour (they differ in typeface and shape). In those looks keep destructive actions in a `dialog.alert` with the word spelled out ("Delete"), never a lone red button beside a primary one.
- Neutrals (grounds, text, lines) are shared within a family: the coast looks use Skjærgård's and Fjord's, the mountain looks Rim's. Brenning is the one exception and keeps its cooler neutrals.
- Skjærgård is for corporate work (documents, sites, internal tools that represent kBenestad); Fjord for standalone software; Brenning for Gardmark. Pick one look per product, not per screen.
- With no `data-theme`, an app gets Skjærgård.
- The looks are interchangeable: they share every class and token name, so a product changes look by changing `data-theme` alone (or, in an app built from the drop-in, by linking another theme file). Keep it that way: never add a class or token that exists in only one look, and check every new component in all of them, with and without bold.
- Einer's green accent sits near the `ok` green and Torv's brown near the `warn` amber in hue; both are far darker, and states never rely on colour alone (badges carry a word, callouts an icon), so this stays readable. Still, check state colours when building an Einer or Torv product.
- The design system page can show only 8 themes (Skjærgård, Fjord, Brenning and Rim, light and dark). The other looks live in `components/bundle.css` and can all be seen in the Layouts page.
- Follow the system setting by switching between a look's light and dark theme on `prefers-color-scheme`.
- Never hard-code white on `acc`: use `onacc`, which turns dark in most dark themes.
