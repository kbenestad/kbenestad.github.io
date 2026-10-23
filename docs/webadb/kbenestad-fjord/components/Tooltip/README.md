# Tooltip

A short label that appears next to an element: the name of an icon-only button, or a one-line explanation of a term. Add `data-tip` to the element; `bundle.js` does the rest.

**Consumer provides:** `data-tip="text"` on the element, or `data-tip=""` on an icon-only button to show its `aria-label`. Give a plain element (a term, a figure) `tabindex="0"` so keyboard users can reach it. To translate the text, add `data-i18n-tip="key"`.

- Shows after half a second of mouse hover, at once on keyboard focus. Esc, moving away, scrolling or clicking hides it.
- On touch there is no hover. Tapping a plain element shows its tooltip; another tap, or a tap anywhere else, hides it. Tapping a button or link does its job and shows no tooltip.
- So a tooltip is never the only place something is said. Never put an action, a link or anything you need to read to continue in one.
- One line, a few words, sentence case, no full stop. Longer explanations belong in the page or a Callout.
- Every icon-only button in a header bar gets `data-tip=""`: its name, shown on hover.
- A plain element with a tooltip shows a dotted underline, so people know there is more to see.
- It is one shared native popover in the top layer, so a window or pane edge never cuts it off; it flips above the element when there is no room below. Screen readers hear the text as the element's description, unless it only repeats the `aria-label`.
