# LayoutSidebar

Main window plus one collapsible sidebar on the left: `.pane.sidebar` then `.pane.main`.

**Consumer provides:** sidebar links as `.nav` (current one `.nav.on`, counts in `.ct`); an `id` on the sidebar; a toggle button with `data-toggle="<that id>"`, `aria-controls` and `aria-expanded`.

- Put a toggle in the sidebar's header bar (to hide) and in the main header bar (to show again). Both point at the same `id`. Give the showing button the extra class `.reveal`: it then hides itself while the pane is open.
- Collapsing adds `.is-collapsed` to the pane. The behaviour comes from `components/bundle.js`; nothing to write per app.
- Sidebar title sits left (`.t.start`); the main title stays centred.
- In a window 720px wide or narrower the sidebar floats over the content and starts collapsed (bundle.js does this on load).
- In a window 600px wide or narrower a BottomBar replaces the sidebar, carrying the same destinations in the same order. Add `.has-tabbar` to the `.win.app`, `.sidebar-toggle` to each sidebar toggle button, and the `nav.tabbar` as the last child of `.pane.main`; the stylesheet does the switch.
