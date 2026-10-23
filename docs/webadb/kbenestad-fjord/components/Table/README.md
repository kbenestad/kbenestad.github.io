# Table

A data table: `table.tbl` inside a `.list` for the frame.

**Consumer provides:** a real `<thead>` and rows; numeric cells marked `.r`; identifiers in `.mono`.

- Header row: `sunk` fill, 12px uppercase `muted`.
- Cells `ink2`, 12px × 14px padding, `line` dividers.
- `.r` right-aligns with tabular figures; format amounts with `kBenestad.format.money` (`NOK 18 400.00` by default, `18 400,00 kr` in Scandinavian).
- Selected row: `tr.sel` with `sel` fill.
