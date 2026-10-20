# PopoverMenu

A drop-down list of actions: `<div class="menu" popover id="…">` opened by any button with `popovertarget="<that id>"`.

**Consumer provides:** the menu `id` and a button pointing at it; items as `<button role="menuitem">` (or `<a>` for links); optional shortcut in `<span class="kbd">`; groups separated by `<hr>`.

- Uses the browser's native `popover`: clicking outside or pressing Esc closes it, with no script.
- `components/bundle.js` places it under its button, right-aligned, kept on screen. For a menu you position yourself (right-click), add `data-placed="manual"`.
- Every header bar's ≡ button opens the app's main menu: new, export, preferences, about.
- The same component serves right-click menus on rows; call `showPopover()` and set `top`/`left` at the pointer.
- Destructive items go last, in `.bad`, after a separator.
