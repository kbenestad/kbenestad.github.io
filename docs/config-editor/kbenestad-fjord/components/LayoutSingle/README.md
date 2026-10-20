# LayoutSingle

One main window, no sidebar: a `.win.app` holding a single `.pane.main`.

**Consumer provides:** the header bar content (`.hb` with a centred `.t` title, optional `<small>` subtitle, flat icon buttons either side) and the content inside `.pane-body`.

- For tools that do one thing: a form, a single list, a viewer.
- Search on the left of the header bar, the main menu on the right.
- This is the base every other layout adds panes to; the class names never change.
