# BottomSheet

The phone form of Dialog: full width, anchored to the bottom, top corners rounded, with a drag handle.

**Consumer provides:** nothing extra. A `dialog.dlg` becomes a sheet on its own at 600px and narrower. Add `.sheet` only to force the sheet form at any width.

- Same structure as Dialog: `.grab`, then `.hb`, then `.dlg-body`.
- Up to 90% of the screen height; the body scrolls.
- Keep the confirm button in the header bar, where the thumb can reach the sheet's top edge.
