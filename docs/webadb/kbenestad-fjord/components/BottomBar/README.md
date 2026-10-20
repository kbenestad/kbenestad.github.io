# BottomBar

Phone navigation: a bar of three to five icon tabs at the bottom of `.pane.main`, with a More tab that opens a bottom drawer.

**Consumer provides:** a `<nav class="tabbar" aria-label="Main">` as the last child of `.pane.main`; each destination as `<a class="tab">` holding `<span class="tab-ic">` with an `.ic` icon, then a one-word label; `.on` and `aria-current="page"` on the current one.

- Three to five tabs, never more. With more than five destinations, the fifth tab is More (`ellipsis` icon), a `<button class="tab" data-dialog-open="<id>" aria-haspopup="dialog">` that opens a `dialog.dlg` listing the rest as `.nav` links. At 600px and narrower that dialog is a bottom drawer on its own (see BottomSheet).
- Every tab has a label: icons never stand alone. Keep labels to one short word in sentence case.
- The current tab shows a `sel` pill behind its icon and `accink` text; the others are `muted`. Opening the drawer does not move `.on` off the current tab.
- Keep the same tabs in the same order on every screen of the app; the bar is navigation, not a toolbar. Actions go in the header bar.
- A phone-only app puts it in a plain `.win.app`. An app that also runs on wider screens keeps its sidebar and adds `.has-tabbar` to the `.win.app` (see LayoutSidebar): the bar then shows only when the window is 600px wide or narrower, in place of the sidebar. Sidebar and bar are never on screen together.
- Every tab icon must differ from the others; give the sidebar the same icons, so a destination looks the same at every width.
- The bar pads itself for the phone's home indicator (`safe-area-inset-bottom`); add `viewport-fit=cover` to the page's viewport meta for that to take effect.
