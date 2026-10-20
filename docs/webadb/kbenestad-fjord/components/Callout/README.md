# Callout

An inline message on a tinted ground: `.co` (info), `.co.ok`, `.co.warn`, `.co.bad`.

**Consumer provides:** an icon (`svg.ic`), a bold one-line `<b>` heading and a `<p>` with the detail.

- Heading takes the state colour (`accink`, `ok`, `warn`, `bad`); the detail stays `ink2`.
- Every state has its own icon shape (circle-i, check, triangle, cross), so it never relies on colour alone.
- Headings state the fact ("Paid", "Could not send"); the detail says what happens next.
