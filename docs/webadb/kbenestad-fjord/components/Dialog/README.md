# Dialog

A small window over the app with its own header bar: `<dialog class="dlg">` opened with `showModal()`.

**Opening and closing:** a button with `data-dialog-open="<dialog id>"` opens it; any button inside with `data-dialog-close` closes it. Both come from `components/bundle.js`.

**Consumer provides:** a header bar (`.hb`) with Cancel (`.btn.flat`) on the left, the title (`.t`) in the middle and the confirming action (`.btn.pri`) on the right; the content in `.dlg-body`, usually fields or a boxed list; `aria-labelledby` pointing at the title.

- For short tasks that belong to the current view: edit one record, set one preference group. Anything longer gets its own view.
- The confirm button names the action ("Save", "Add contact").
- 480px wide, up to 80% of the window height; the body scrolls, the header bar stays.
- At 600px and narrower it becomes a bottom sheet automatically (see BottomSheet). Nothing extra is needed.
- Include an empty `<div class="grab"></div>` as the dialog's first child; it only shows as the sheet's drag handle.
