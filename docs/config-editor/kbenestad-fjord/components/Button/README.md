# Button

A 36px action button; `.btn` plus one modifier.

**Consumer provides:** a `<button class="btn …">` with a short verb label; for icon-only, `.btn.ico` with an inline stroke SVG and an `aria-label`.

| Class | Use |
|---|---|
| `.btn` | Default: `sunk` fill, `ink` text. Cancel, secondary actions. |
| `.btn.pri` | The one primary action per view: `acc` fill, `onacc` text. |
| `.btn.pri.pill` | 44px pill for the single headline action of a flow (Send invoice). |
| `.btn.out` | Outline (`line2` ring): exports and other non-destructive alternates. |
| `.btn.flat` | Transparent: Skip, low-weight actions. |
| `.btn.bad` | Destructive: `badfill`, white text. Always confirm. |
| `.btn.ico` | 36×36 icon-only. |

- One `.pri` per view. Never two pills side by side.
- Labels are verbs in sentence case: "Save", "Export PDF", not "OK".
- `disabled` drops opacity to .45; say why nearby rather than leaving a dead button unexplained.
