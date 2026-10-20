# BottomPanel

A collapsible panel along the bottom of `.pane.main`: a terminal, a log, an output console. `.panel-bottom` holding a `.panel-head` and a `.panel-body`.

**Consumer provides:** an `id` on `.panel-bottom`; in `.panel-head`, an icon, the title in `.t` and a `.panel-toggle` button with `data-toggle="<that id>"`; the content in `.panel-body`. For a terminal, a `<pre class="term">` with prompts in `<span class="prompt">`.

- Place it after `.pane-body`, as the last child of `.pane.main`.
- Collapsed, only the 40px title strip remains, so the panel is never lost.
- `.term` is dark in every theme (`term-bg`, `term-fg`, `term-accent`).
- 240px tall when open.
