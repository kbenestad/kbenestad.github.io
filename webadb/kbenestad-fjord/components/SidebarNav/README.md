# SidebarNav

The contents of a `.pane.sidebar`: plain items, expandable groups, a pinned footer, and an icon-only collapsed state.

**Consumer provides:**
- Items as `<a class="nav">` with an icon (`svg.ic`), the label in `<span class="lbl">`, a `title` with the label (the tooltip in icon-only mode), and an optional count in `.ct`.
- Groups as `<details class="nav-group">` holding a `<summary class="nav">` (icon + `.lbl`) and a `<div class="nav-sub">` of items. Add `open` to start expanded.
- Items that belong at the bottom (Settings, help) in a `<div class="pane-foot">` after `.pane-body`.
- For icon-only collapse: `data-collapse="rail"` on the sidebar and its `id` on a toggle in the sidebar's own header bar.

- Icon-only mode keeps the sidebar visible as a 56px strip, so a collapsed sidebar is never mistaken for a missing one. Prefer it over hiding the sidebar fully whenever the items have icons.
- Clicking a group in icon-only mode expands the sidebar and opens the group (from `components/bundle.js`).
- In a window 720px wide or narrower the sidebar hides fully instead; give the main header bar a show button with `.reveal.narrow-only`, which only appears there.
- Keep groups to one level. Footer items are for things you visit rarely: settings, help, setup.
