# SearchBar

A search field that drops down under the header bar: `.searchbar` holding a `.search` field.

**Consumer provides:** a toggle button in the header bar (left side, `aria-pressed`, `aria-controls`); the `.searchbar` element with an `id`, plus `.is-collapsed` when closed; the toggle button carries `data-toggle="<that id>"`; inside it a `<input class="inp" type="search">` with an `aria-label` or placeholder and the search icon.

- Hidden by default; the toggle (or Ctrl+F, or simply starting to type) shows it and focuses the field. Esc hides it and returns focus to the button (both handled by `components/bundle.js`).
- Filter as the person types; no Search button.
- When nothing matches, show a StatusPage ("No results for …") in the content area.
- The field is at most 400px wide, centred.
