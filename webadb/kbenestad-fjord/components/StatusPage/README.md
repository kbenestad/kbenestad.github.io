# StatusPage

A centred message filling an empty view: `.status` with a large icon, a heading, one line of text and at most one action.

**Consumer provides:** an outline icon `svg.status-ic` (24px viewBox, drawn at 64px, `aria-hidden`), an `<h2>`, a `<p>` and optionally one button.

- Use it wherever a list or view can be empty: "No invoices yet", "No results for 'hekla'", "You're offline".
- Say what will appear here or why nothing is shown, then offer the one action that fixes it.
- First-run empty states may use the pill primary button; "No results" usually needs no button.
- Never use it for errors inside a filled view; that's a Callout.
