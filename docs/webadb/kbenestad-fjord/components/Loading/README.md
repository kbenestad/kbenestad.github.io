# Loading

Two indicators: `.spin` (spinner) for waits of unknown length, native `<progress class>` for measurable ones.

**Consumer provides:** for a spinner, `<span class="spin">` (add `.lg` for 32px) with `role="status"` and an `aria-label`; for progress, `<progress max value>` with a visible `<label>` saying what is happening.

- Under one second: show nothing. A spinner that flashes is worse than none.
- A spinner inside a button sits beside the label, never replaces it: change the label to the ongoing form ("Sending…") and disable the button.
- Use a progress bar whenever you know the size: uploads, PDF generation, imports. Put the numbers in the label.
- For a whole view loading, put `.spin.lg` in the centre of the pane.
- With reduced motion turned on, the spinner slows down rather than stopping, so it still reads as working.
