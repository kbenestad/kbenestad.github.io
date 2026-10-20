/* kBenestad Fjord — shared behaviour. Load once per app, after the stylesheets.
   Works by attributes, so markup added later needs no setup:
     data-toggle="<id>"       toggles .is-collapsed on that element (panes, search bar)
     popovertarget="<id>"     on a .menu[popover]: placed under its button
     data-dialog-open="<id>"  opens that <dialog> with showModal()
     data-dialog-close        closes the dialog it sits in
     data-expand-all="<id>"   opens all <details> inside that element, or closes them if all are open
                              (optional data-label-expand / data-label-collapse: button text for each action)
     data-copy                on a button inside .codeblock: copies that block's code
     <code> outside <pre>     copies itself on click, or Enter when focused
   On load, every plain <pre> inside .k (not .term, not data-no-copy) gets a copy button.
   Script API: window.kBenestadFjord.toast(text, {action, onAction, timeout})
               window.kBenestadFjord.enhance(root)  run after adding code to the page
               window.kBenestadFjord.format.date / dateLong / dateCompact / time / dateTime / number / money /
                                         weekNumber / weekStart  (see "formats" below)
               window.kBenestadFjord.i18n.add(messages) / t(key, vars) / translate(root)  (see "language" below) */
(function () {
  'use strict';

  // ---- language ----
  // Interface text is written in English in the markup and carries a key, so a translation can be added later
  // without touching markup:  <button data-i18n="invoice.send">Send invoice</button>
  //   data-i18n="key"              replaces the text      data-i18n-label="key"  replaces aria-label
  //   data-i18n-placeholder="key"  replaces placeholder   data-i18n-title="key"  replaces title
  // i18n.add({key: "text"}) loads strings for the language in <html lang> and applies them to the page.
  // A key with no string loaded keeps its English, so an English-only app needs no strings at all.
  // t(key, vars): "{name}" slots are filled from vars; a value {one: "…", other: "…"} picks a plural from vars.count.
  // The system's own text uses the same keys (fjord.*), so its messages translate too.
  var messages = {};
  var BUILTIN = {
    'fjord.copied': 'Copied to clipboard',
    'fjord.copyFailed': 'Could not copy. Select the text and copy it by hand.',
    'fjord.copy': 'Copy',
    'fjord.copyCode': 'Copy code',
    'fjord.dismiss': 'Dismiss',
    'fjord.am': 'AM',
    'fjord.pm': 'PM'
  };
  function lang() { return document.documentElement.getAttribute('lang') || 'en'; }
  function has(key) { return Object.prototype.hasOwnProperty.call(messages, key) || Object.prototype.hasOwnProperty.call(BUILTIN, key); }
  function t(key, vars) {
    var v = Object.prototype.hasOwnProperty.call(messages, key) ? messages[key] : BUILTIN[key];
    if (v == null) return key;
    if (typeof v === 'object') {
      var n = vars && typeof vars.count === 'number' ? vars.count : 0, cat = 'other';
      try { cat = new Intl.PluralRules(lang()).select(n); } catch (e) { cat = n === 1 ? 'one' : 'other'; }
      v = v[cat] != null ? v[cat] : v.other;
    }
    return String(v).replace(/\{(\w+)\}/g, function (m, k) { return vars && vars[k] != null ? vars[k] : m; });
  }
  var I18N_ATTRS = [['data-i18n-label', 'aria-label'], ['data-i18n-placeholder', 'placeholder'], ['data-i18n-title', 'title']];
  function translate(root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'); if (has(k)) el.textContent = t(k); });
    I18N_ATTRS.forEach(function (a) {
      root.querySelectorAll('[' + a[0] + ']').forEach(function (el) { var k = el.getAttribute(a[0]); if (has(k)) el.setAttribute(a[1], t(k)); });
    });
  }
  var i18n = {
    add: function (strings) { for (var k in strings) if (Object.prototype.hasOwnProperty.call(strings, k)) messages[k] = strings[k]; translate(document); },
    t: t,
    translate: translate
  };

  function syncButtons(target) {
    var open = !target.classList.contains('is-collapsed');
    document.querySelectorAll('[data-toggle="' + target.id + '"]').forEach(function (b) {
      b.setAttribute('aria-expanded', String(open));
      if (b.hasAttribute('aria-pressed')) b.setAttribute('aria-pressed', String(open));
    });
  }

  function setCollapsed(target, collapsed) {
    target.classList.toggle('is-collapsed', collapsed);
    syncButtons(target);
    if (!collapsed && target.classList.contains('searchbar')) {
      var input = target.querySelector('input');
      if (input) input.focus();
    }
  }

  function setExpandAll(btn) {
    var box = document.getElementById(btn.dataset.expandAll);
    if (!box) return;
    var all = box.querySelectorAll('details');
    var anyClosed = Array.prototype.some.call(all, function (d) { return !d.open; });
    all.forEach(function (d) { d.open = anyClosed; });
    syncExpandAll(btn);
  }
  function syncExpandAll(btn) {
    var box = document.getElementById(btn.dataset.expandAll);
    if (!box) return;
    var all = box.querySelectorAll('details');
    var allOpen = all.length > 0 && Array.prototype.every.call(all, function (d) { return d.open; });
    btn.setAttribute('aria-expanded', String(allOpen));
    if (btn.dataset.labelCollapse && btn.dataset.labelExpand) btn.textContent = allOpen ? btn.dataset.labelCollapse : btn.dataset.labelExpand;
  }
  // keep expand-all buttons honest when single items are opened or closed by hand
  document.addEventListener('toggle', function (e) {
    if (e.target.tagName !== 'DETAILS') return;
    document.querySelectorAll('[data-expand-all]').forEach(function (b) {
      var box = document.getElementById(b.dataset.expandAll);
      if (box && box.contains(e.target)) syncExpandAll(b);
    });
  }, true);

  document.addEventListener('click', function (e) {
    // a group clicked in an icon-only sidebar: expand the sidebar and open that group
    var g = e.target.closest('.pane.sidebar.is-collapsed[data-collapse="rail"] .nav-group > summary');
    if (g) {
      e.preventDefault();
      setCollapsed(g.closest('.pane.sidebar'), false);
      g.parentNode.open = true;
      return;
    }
    var x = e.target.closest('[data-expand-all]');
    if (x) { setExpandAll(x); return; }
    var t = e.target.closest('[data-toggle]');
    if (t) {
      var target = document.getElementById(t.dataset.toggle);
      if (target) setCollapsed(target, !target.classList.contains('is-collapsed'));
      return;
    }
    var o = e.target.closest('[data-dialog-open]');
    if (o) {
      var d = document.getElementById(o.dataset.dialogOpen);
      if (d && !d.open) d.showModal();
      return;
    }
    var c = e.target.closest('[data-dialog-close]');
    if (c) {
      var dlg = c.closest('dialog');
      if (dlg) dlg.close(c.value || '');
    }
  });

  // Esc inside an open search bar hides it again
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var bar = e.target.closest && e.target.closest('.searchbar');
    if (bar && bar.id && !bar.classList.contains('is-collapsed')) {
      setCollapsed(bar, true);
      var btn = document.querySelector('[data-toggle="' + bar.id + '"]');
      if (btn) btn.focus();
    }
  });

  // place popover menus under the button that opened them, kept on screen
  document.addEventListener('toggle', function (e) {
    var m = e.target;
    if (!m.classList || !m.classList.contains('menu') || e.newState !== 'open') return;
    var opener = document.querySelector('[popovertarget="' + m.id + '"]');
    if (!opener || m.dataset.placed === 'manual') return;
    var b = opener.getBoundingClientRect();
    m.style.top = Math.min(b.bottom + 6, innerHeight - m.offsetHeight - 8) + 'px';
    m.style.left = Math.max(8, Math.min(b.right - m.offsetWidth, innerWidth - m.offsetWidth - 8)) + 'px';
  }, true);

  // in a narrow window (720px or less), side panes start collapsed so they don't cover the content
  function collapseNarrow() {
    document.querySelectorAll('.win.app').forEach(function (w) {
      if (w.clientWidth > 720) return;
      w.querySelectorAll('.pane.sidebar[id], .pane.mid[id], .pane.details[id]').forEach(function (p) {
        setCollapsed(p, true);
      });
    });
  }

  function toast(text, opts) {
    opts = opts || {};
    var region = document.querySelector('.toasts');
    if (!region) {
      region = document.createElement('div');
      region.className = 'toasts';
      region.setAttribute('role', 'status');
      region.setAttribute('aria-live', 'polite');
      (document.querySelector('.k') || document.body).appendChild(region);
    }
    var el = document.createElement('div');
    el.className = 'toast';
    var span = document.createElement('span');
    span.textContent = text;
    el.appendChild(span);
    function remove() { if (el.parentNode) el.parentNode.removeChild(el); }
    if (opts.action) {
      var a = document.createElement('button');
      a.className = 'btn';
      a.textContent = opts.action;
      a.addEventListener('click', function () { remove(); if (opts.onAction) opts.onAction(); });
      el.appendChild(a);
    }
    var x = document.createElement('button');
    x.className = 'btn ico';
    x.setAttribute('aria-label', t('fjord.dismiss'));
    x.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
    x.addEventListener('click', remove);
    el.appendChild(x);
    region.appendChild(el);
    setTimeout(remove, opts.timeout || 5000);
    return remove;
  }

  // ---- copying code ----
  var ICON_COPY = '<svg class="i-copy" viewBox="0 0 24 24" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
  var ICON_DONE = '<svg class="i-done" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

  function copyText(text) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      return ok ? Promise.resolve() : Promise.reject(new Error('copy refused'));
    }
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).catch(fallback);
    return fallback();
  }
  function flash(el) {
    el.classList.add('is-copied');
    setTimeout(function () { el.classList.remove('is-copied'); }, 1500);
  }
  function copyFrom(el, text) {
    copyText(text).then(function () { flash(el); toast(t('fjord.copied'), { timeout: 2000 }); },
      function () { toast(t('fjord.copyFailed')); });
  }
  function copyButton() {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'btn ico flat copy'; b.setAttribute('data-copy', ''); b.setAttribute('aria-label', t('fjord.copyCode'));
    b.innerHTML = ICON_COPY + ICON_DONE;
    return b;
  }
  function isInline(c) { return c.tagName === 'CODE' && !c.closest('pre') && c.closest('.k'); }

  // makes code copyable: a copy button on every plain code block, keyboard access to inline code
  function enhance(root) {
    root = root || document;
    root.querySelectorAll('.k pre').forEach(function (pre) {
      if (pre.classList.contains('term') || pre.closest('.codeblock') || pre.hasAttribute('data-no-copy')) return;
      var wrap = document.createElement('div');
      wrap.className = 'codeblock';
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);
      wrap.appendChild(copyButton());
    });
    root.querySelectorAll('.k code').forEach(function (c) {
      if (!isInline(c) || c.hasAttribute('tabindex')) return;
      c.setAttribute('tabindex', '0');
      c.setAttribute('title', t('fjord.copy'));
    });
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-copy]');
    if (b) {
      var block = b.closest('.codeblock');
      var src = block && block.querySelector('pre');
      if (src) copyFrom(b, src.textContent.replace(/\n$/, ''));
      return;
    }
    var c = e.target.closest && e.target.closest('code');
    if (c && isInline(c) && !window.getSelection().toString()) copyFrom(c, c.textContent);
  });
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.tagName === 'CODE' && isInline(e.target)) {
      e.preventDefault();
      copyFrom(e.target, e.target.textContent);
    }
  });

  // ---- formats ----
  // International by default; <html data-format="scandi"> switches the whole app to Scandinavian.
  //   format.date(v)         2026-10-31          | 31.10.2026
  //   format.dateLong(v)     4 February 2027     (same in both formats)
  //   format.dateCompact(v)  04FEB27             (same in both formats)
  //   format.time(v)         14:02               | 14:02     (2:02 PM with <html data-clock="12">)
  //   format.dateTime(v)     2026-10-31 14:02    | 31.10.2026 14:02
  //   format.number(n, dec)  1 234.5             | 1 234,5   (dec: fixed decimals, optional)
  //   format.money(n, cur)   NOK 1 234.50        | 1 234,50 kr  (cur: ISO 4217 code, required;
  //                                                 kr for NOK, SEK, DKK; other codes after the amount)
  // v: a Date, a timestamp, or an ISO string ("2026-10-31" is read as that calendar day, not UTC midnight).
  //   format.weekNumber(v)   44                  ISO 8601 week number
  //   format.weekStart()     1 (Monday), or 0 (Sunday) with <html data-week-start="sunday">
  // Thousands are grouped with a narrow no-break space so numbers never wrap.
  // dateLong follows the page language (<html lang>): "4 February 2027" in English, "4. februar 2027" in Norwegian.
  // dateCompact always uses English month abbreviations: it is a code, not prose.
  var GROUP = '\u202f';
  function profile() { return document.documentElement.getAttribute('data-format') === 'scandi' ? 'scandi' : 'intl'; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function toDate(v) {
    if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)) { var p = v.split('-'); return new Date(+p[0], p[1] - 1, +p[2]); }
    return v instanceof Date ? v : new Date(v);
  }
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function attr(name) { return document.documentElement.getAttribute(name); }
  var format = {
    dateLong: function (v) {
      var d = toDate(v);
      if (!/^en\b/i.test(lang())) {
        try { return new Intl.DateTimeFormat(lang(), { day: 'numeric', month: 'long', year: 'numeric' }).format(d); } catch (e) {}
      }
      return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
    },
    dateCompact: function (v) {
      var d = toDate(v);
      return pad(d.getDate()) + MONTHS[d.getMonth()].slice(0, 3).toUpperCase() + pad(d.getFullYear() % 100);
    },
    weekNumber: function (v) {
      var d = toDate(v), t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      var day = t.getUTCDay() || 7;
      t.setUTCDate(t.getUTCDate() + 4 - day);
      var jan1 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
      return Math.ceil(((t - jan1) / 86400000 + 1) / 7);
    },
    weekStart: function () { return attr('data-week-start') === 'sunday' ? 0 : 1; },
    date: function (v) {
      var d = toDate(v), y = d.getFullYear(), m = pad(d.getMonth() + 1), day = pad(d.getDate());
      return profile() === 'scandi' ? day + '.' + m + '.' + y : y + '-' + m + '-' + day;
    },
    time: function (v) {
      var d = toDate(v), h = d.getHours(), m = pad(d.getMinutes());
      if (attr('data-clock') === '12') return ((h % 12) || 12) + ':' + m + ' ' + t(h < 12 ? 'fjord.am' : 'fjord.pm');
      return pad(h) + ':' + m;
    },
    dateTime: function (v) { return format.date(v) + ' ' + format.time(v); },
    number: function (n, dec) {
      var s = dec == null ? String(Math.abs(n)) : Math.abs(n).toFixed(dec);
      var parts = s.split('.');
      var out = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, GROUP);
      if (parts[1]) out += (profile() === 'scandi' ? ',' : '.') + parts[1];
      return (n < 0 ? '-' : '') + out;
    },
    money: function (n, cur) {
      if (!cur) throw new Error('format.money needs an ISO 4217 currency code, such as "NOK"');
      var amt = format.number(n, 2);
      if (profile() === 'scandi') return amt + ' ' + (/^(NOK|SEK|DKK)$/.test(cur) ? 'kr' : cur);
      return cur + ' ' + amt;
    }
  };

  function init() { collapseNarrow(); enhance(document); translate(document); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.kBenestadFjord = { toast: toast, collapse: setCollapsed, enhance: enhance, copy: copyText, format: format, i18n: i18n };
})();
