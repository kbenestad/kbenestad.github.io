# Window

The window frame and its header bar: `.win` and `.hb`. Every app layout is built inside this frame; for sidebars, item lists and details panes use the Layout components, which use `.win.app` and panes.

**Consumer provides:** the title in `.hb .t` (optional `<small>` subtitle under it); header buttons as `.btn.ico.flat`, with an `aria-label` each.

- `.win`: `view` body, `line` border, `r` radius, the one `shadow`.
- `.hb`: 52px tall, `head` fill, title centred and bold. A title that belongs at the start of a pane uses `.t.start`.
- Navigation items (`.nav`, current one `.nav.on`, counts in `.ct`) live in `.pane.sidebar`; see LayoutSidebar.
