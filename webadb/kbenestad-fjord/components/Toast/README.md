# Toast

A brief message at the bottom of the window confirming that something happened: `.toast` inside one `.toasts` region per app.

**Consumer provides:** one `<div class="toasts" role="status" aria-live="polite">` at the end of the app, kept empty; for each message, a `.toast` with the text, an optional action button and a dismiss button (`.btn.ico` with `aria-label`); show one with `kBenestadFjord.toast("Invoice sent", {action: "Undo", onAction: fn})`; it dismisses itself after 5 seconds.

- Inverted colours (`ink` ground, `view` text), so it reads in every theme.
- Text states what happened, in past tense: "Invoice sent", "3 files moved".
- Offer Undo for anything reversible, and skip the "Are you sure?" dialog for it. Keep AlertDialog for what cannot be undone.
- One line only. Errors that need a decision belong in a Callout or AlertDialog, not a toast.
- While a BottomBar shows, toasts rise to sit just above it; nothing to set per app.
