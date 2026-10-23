# Gauge

Shows where a value sits within a known range: disk used, budget spent, battery, a score. Two forms: a bar (native `<meter>`) and a dial (`.gauge`).

A gauge is not a progress bar. Progress moves towards done (use `<progress>`, see Loading); a gauge is a reading that can go up or down.

**Consumer provides:**
- Bar: `<meter min max value low high optimum>` with a visible `<label for>` that carries the numbers ("41 of 64 GB"). The browser picks the colour from `low`, `high` and `optimum`: green when the value is in the good part, amber in the middle part, red in the bad part.
- Dial: `<div class="gauge" role="meter" aria-valuemin aria-valuemax aria-valuenow aria-label>` holding `<span class="gv">72<small>%</small></span>` and, optionally, `<span class="gl">CPU</span>`. Add `.ok`, `.warn` or `.bad` for state colour; without one the dial uses the accent. Add `.sm` for 72px instead of 120px.

The dial fills itself from its aria values when the page loads, so the number is written once. After changing `aria-valuenow`, call `kBenestad.gauge(el)` (and update the `.gv` text).

- Always show the number. Colour alone does not say how full something is, and red/green is the pair most people with colour blindness cannot tell apart.
- Pick the state from what the value means, not its size: 90% disk used is bad, 90% battery is fine.
- Use the bar in lists and tables, where space is wide and short; use the dial for one to four headline readings on a dashboard.
- Do not animate a gauge on load. It is a reading, not an event.
