# BoxedList

Adwaita boxed list: `.list` holding `.row`s, plus the plain `.card`.

**Consumer provides:** each row's title and subtitle as two `<div>`s inside `.tt`, and one trailing control (switch, chevron, badge or value).

- Rows are at least 54px with 16px side padding and a `line` divider.
- `.list` and `.card` share `card` fill, `cardline` border and `r` radius; no shadow.
- Use lists for settings and records; use `.card` for one free-form block.
