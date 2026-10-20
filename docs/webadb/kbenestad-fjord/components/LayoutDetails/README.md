# LayoutDetails

Sidebar, main content and a details pane on the right: `.pane.sidebar`, `.pane.main`, `.pane.details`. The file-manager pattern: root folders in the sidebar, contents in the main pane, metadata of the selected item in the details pane.

**Consumer provides:** sidebar links (`.nav`), the main content, and the selected item's metadata as a `<dl class="meta">` of `<dt>` label / `<dd>` value pairs; `id`s and toggle buttons as in LayoutSidebar.

- The details toggle sits at the right end of the main header bar; the sidebar toggle at the left.
- The details pane shows only the selected item. With nothing selected, say so in `muted` rather than leaving it empty.
- Paths and identifiers in `.mono`.
- In a window 720px wide or narrower the details pane floats over the content from the right. Start it collapsed there.
- In a window 600px wide or narrower a BottomBar replaces the sidebar, carrying the same destinations in the same order. Add `.has-tabbar` to the `.win.app`, `.sidebar-toggle` to each sidebar toggle button, and the `nav.tabbar` as the last child of `.pane.main`; the stylesheet does the switch.
