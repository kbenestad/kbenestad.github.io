# Field

A labelled input: `.fld` wraps a `<label>`, an `.inp` control and optional `.help` text.

**Consumer provides:** a real `<label for>` matched to the control's `id`; `.inp` on `<input>`, `<select>` or `<textarea>`; help text in `.help`.

- 40px tall, 15px text, `line2` border, `rs` radius. Textarea is 84px.
- Focus: `acc` border plus a 3px `halo` glow, applied automatically on focus (`.focus` shows the same state statically in mockups).
- Error: `.inp.err` (`bad` border, `badsoft` halo) and a `.help.err` line that says how to fix it, not just that it failed.
- Checkbox and radio: native inputs inside `label.chk`, 18px, tinted with `acc`.
- Switch: `.sw` (`.sw.on` when on). It is a visual only: wrap a real checkbox or button with `role="switch"` when building.
- Dates and money in the app's active format (see Formats in the main README): `2026-10-31` and `NOK 1 234.50` by default, `31.10.2026` and `1 234,50 kr` in Scandinavian. A date field's placeholder shows the expected pattern.
- Known gap: the `line2` border is 2.99:1 on white, a hair under 3:1.
