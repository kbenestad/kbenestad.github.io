# Accordion

Native `<details>`/`<summary>` rows inside a `.list`.

**Consumer provides:** a short `<summary>` title and the body in a `<p>`.

- Uses the browser's own disclosure, so it works by keyboard with no script.
- A chevron in `muted` turns when opened.
- For optional detail only; never hide a required field in one.
- Content richer than one paragraph goes in `<div class="acc-body">` (for example a `dl.meta` of details).
- Long lists get an Expand all / Collapse all button above them: `data-expand-all="<list id>"` with `data-label-expand` and `data-label-collapse` for its two texts (from `components/bundle.js`).
