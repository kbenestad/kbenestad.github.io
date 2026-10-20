# AlertDialog

A short question that blocks the app until answered: `<dialog class="alert">` opened with `showModal()`.

**Opening and closing:** `data-dialog-open="<dialog id>"` on the trigger, `data-dialog-close` on each button (its `value` becomes the dialog's `returnValue`).

**Consumer provides:** a heading `<h2>` (the question) and a `<p>` (the consequence) inside `.msg`; two or three buttons inside `.acts`; `aria-labelledby` pointing at the heading.

- The heading is a question; the body says what happens. Keep both to one or two lines.
- Buttons name the action ("Delete", not "OK"). The safe choice comes first; a destructive one uses `.btn.bad`, a positive one `.btn.pri`.
- Labels too long to sit side by side: add `.stack` to `.acts` to stack them.
- Use the native element: `showModal()` gives the backdrop (`scrim`), traps focus and closes on Esc.
