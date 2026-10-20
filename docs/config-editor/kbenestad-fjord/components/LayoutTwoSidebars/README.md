# LayoutTwoSidebars

Main window plus two collapsible panes on the left: `.pane.sidebar` (sections), `.pane.mid` (item list), `.pane.main` (the item). The mail-app pattern.

**Consumer provides:** an `id` on each collapsible pane and its toggle buttons, as in LayoutSidebar; list rows in `.mid` as `.row` (selected row on `sel`).

- The sidebar holds a few fixed sections; the middle pane holds the many items in the selected section.
- Each pane's toggle sits in the next pane's header bar, so a collapsed pane can always be brought back.
- Collapse the sidebar first when space runs short, then the middle pane.
- In a window 720px wide or narrower, show one pane at a time: both left panes float over the content.
- In a window 600px wide or narrower a BottomBar replaces the sidebar, carrying the same sections in the same order. Add `.has-tabbar` to the `.win.app`, `.sidebar-toggle` to each sidebar toggle button, and the `nav.tabbar` as the last child of `.pane.main`; the stylesheet does the switch.
- The middle pane stays: on phones it floats over the item as before, opened from the main header bar.
