# CodeBlock

Code people may want to copy: a `.codeblock` with a copy button for multi-line code, and inline `<code>` that copies itself when clicked.

**Consumer provides:**
- Code blocks as `<div class="codeblock">` holding `<pre><code>…</code></pre>` and the copy button: `<button class="btn ico flat copy" data-copy aria-label="Copy code">` with two icons inside, `svg.i-copy` and `svg.i-done` (see the preview).
- Inline code as plain `<code>` in running text. Nothing else is needed.

**From `components/bundle.js`:**
- The copy button copies the block's code; its icon turns into a check mark for 1.5 seconds and a toast says "Copied to clipboard".
- Inline code copies on click, and on Enter or Space when focused with Tab.
- A plain `<pre>` that arrives without the wrapper (for example from a Markdown renderer) gets the wrapper and button added on load. After adding code to the page later, call `kBenestad.enhance(container)`.
- If the browser refuses clipboard access, a toast asks the person to copy by hand.

- Leave terminal sessions (`pre.term`) without a copy button: they show output, not something to paste. Opt any other `<pre>` out with `data-no-copy`.
- Keep commands one per line, without prompts like `$`, so a copied block runs as it is.
