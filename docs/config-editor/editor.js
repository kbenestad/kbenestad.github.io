// Config editor: loads a JSON file (from an address or from disk), shows it as a form,
// saves it back as a download. An optional JSON Schema (a small subset) adds labels,
// help text, allowed values and limits. Classic script, so it also works from file://.
(function () {
  var t = kBenestadFjord.i18n.t;
  var $ = function (id) { return document.getElementById(id); };

  var data = null, schema = null, saved = '', filename = 'config.json', uid = 0;
  var badInputs = new Map(); // number inputs that do not hold a number -> their label
  var ICON = {
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    warn: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    bad: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>'
  };

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text; // always textContent: config text is data
    return e;
  }
  function icon(name, cls) {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('aria-hidden', 'true');
    if (cls) s.setAttribute('class', cls);
    s.innerHTML = ICON[name]; // fixed strings above
    return s;
  }
  function iconButton(name, label, onClick) {
    var b = el('button', 'btn ico flat');
    b.type = 'button';
    b.setAttribute('aria-label', label);
    b.appendChild(icon(name));
    b.addEventListener('click', onClick);
    return b;
  }
  function textButton(name, label, onClick) {
    var b = el('button', 'btn');
    b.type = 'button';
    b.appendChild(icon(name, 'ic'));
    b.appendChild(document.createTextNode(' ' + label));
    b.addEventListener('click', onClick);
    return b;
  }
  function kind(v) { return v === null ? 'null' : Array.isArray(v) ? 'array' : typeof v; }
  function clone(v) { return JSON.parse(JSON.stringify(v)); }
  function isObj(v) { return kind(v) === 'object'; }

  // ---- schema (subset: type, title, description, enum, minimum, maximum, default,
  //      properties, required, additionalProperties, items) ----
  function stype(s) { return s && typeof s.type === 'string' ? (s.type === 'integer' ? 'number' : s.type) : null; }
  function propSchema(s, key) {
    if (!s) return null;
    if (s.properties && isObj(s.properties[key])) return s.properties[key];
    return isObj(s.additionalProperties) ? s.additionalProperties : null;
  }
  function itemSchema(s) { return s && isObj(s.items) ? s.items : null; }
  function isRequired(s, key) { return !!(s && Array.isArray(s.required) && s.required.indexOf(key) !== -1); }

  function blank(type, s) {
    if (s && s.default !== undefined) return clone(s.default);
    if (type === 'number') return s && typeof s.minimum === 'number' ? s.minimum : 0;
    if (type === 'boolean') return false;
    if (type === 'object') return {};
    if (type === 'array') return [];
    return '';
  }

  function validate(v, s, path, out) {
    if (!s) return;
    var k = kind(v), st = stype(s);
    if (st && st !== k) { out.push({ path: path, message: t('problem.type', { type: s.type }) }); return; }
    if (s.type === 'integer' && !Number.isInteger(v)) out.push({ path: path, message: t('problem.integer') });
    if (Array.isArray(s.enum) && !s.enum.some(function (x) { return x === v; })) {
      out.push({ path: path, message: t('problem.enum', { values: s.enum.join(', ') }) });
    }
    if (k === 'number') {
      if (typeof s.minimum === 'number' && v < s.minimum) out.push({ path: path, message: t('problem.min', { min: s.minimum }) });
      if (typeof s.maximum === 'number' && v > s.maximum) out.push({ path: path, message: t('problem.max', { max: s.maximum }) });
    }
    if (k === 'object') {
      (Array.isArray(s.required) ? s.required : []).forEach(function (key) {
        if (!(key in v)) out.push({ path: path.concat(key), message: t('problem.required') });
      });
      Object.keys(v).forEach(function (key) {
        var sub = propSchema(s, key);
        if (!sub && s.additionalProperties === false && !(s.properties && key in s.properties)) {
          out.push({ path: path.concat(key), message: t('problem.unknown') });
        }
        validate(v[key], sub, path.concat(key), out);
      });
    }
    if (k === 'array') v.forEach(function (item, i) { validate(item, itemSchema(s), path.concat(String(i + 1)), out); });
  }

  // ---- form ----
  function labelFor(key, s, parent) {
    if (s && s.title) return s.title;
    return Array.isArray(parent) ? t('item.label', { n: key + 1 }) : key;
  }

  function renderEntry(parent, key, s) {
    var v = parent[key], k = kind(v);
    var label = labelFor(key, s, parent);
    var removable = !(isObj(parent) && isRequired(currentSchemaOf(parent), key));
    var row = el('div', 'entry');
    row.appendChild(k === 'object' || k === 'array' ? renderGroup(parent, key, s, label) : renderLeaf(parent, key, s, label));
    if (removable) row.appendChild(iconButton('x', t('action.remove', { name: label }), function () { remove(parent, key, label); }));
    return row;
  }

  // required-ness is decided by the schema of the object that holds the key
  var schemaOf = new Map();
  function currentSchemaOf(obj) { return schemaOf.get(obj) || null; }

  function renderLeaf(parent, key, s, label) {
    var v = parent[key], k = kind(v), id = 'f' + (++uid);
    var fld = el('div', 'fld');
    var help = el('span', 'help', s && s.description ? s.description : '');
    var desc = help.textContent;
    help.hidden = !desc;

    if (k === 'boolean') {
      var chk = el('label', 'chk'), cb = el('input');
      cb.type = 'checkbox'; cb.checked = v; cb.id = id;
      cb.addEventListener('change', function () { parent[key] = cb.checked; changed(); });
      chk.appendChild(cb);
      chk.appendChild(document.createTextNode(label));
      fld.appendChild(chk);
      fld.appendChild(help);
      return fld;
    }

    var lab = el('label', null, label);
    lab.htmlFor = id;
    fld.appendChild(lab);
    if (k === 'null') {
      fld.appendChild(el('div', 'nullval', t('value.null')));
    } else if (s && Array.isArray(s.enum)) {
      var sel = el('select', 'inp'); sel.id = id;
      var at = s.enum.findIndex(function (x) { return x === v; });
      if (at === -1) { var cur = el('option', null, t('option.current', { value: String(v) })); cur.value = '-1'; sel.appendChild(cur); }
      s.enum.forEach(function (x, i) { var o = el('option', null, String(x)); o.value = String(i); sel.appendChild(o); });
      sel.value = String(at);
      sel.addEventListener('change', function () { if (sel.value !== '-1') { parent[key] = s.enum[Number(sel.value)]; changed(); } });
      fld.appendChild(sel);
    } else if (k === 'number') {
      var num = el('input', 'inp'); num.id = id; num.type = 'number';
      num.step = s && s.type === 'integer' ? '1' : 'any';
      if (s && typeof s.minimum === 'number') num.min = s.minimum;
      if (s && typeof s.maximum === 'number') num.max = s.maximum;
      num.value = String(v);
      num.addEventListener('input', function () {
        if (Number.isNaN(num.valueAsNumber)) {
          badInputs.set(num, label);
          num.classList.add('err'); help.className = 'help err'; help.textContent = t('problem.number'); help.hidden = false;
        } else {
          badInputs.delete(num);
          num.classList.remove('err'); help.className = 'help'; help.textContent = desc; help.hidden = !desc;
          parent[key] = num.valueAsNumber;
        }
        changed();
      });
      fld.appendChild(num);
    } else {
      var multi = typeof v === 'string' && v.indexOf('\n') !== -1;
      var txt = el(multi ? 'textarea' : 'input', 'inp'); txt.id = id;
      if (!multi) txt.type = 'text';
      txt.value = v;
      txt.addEventListener('input', function () { parent[key] = txt.value; changed(); });
      fld.appendChild(txt);
    }
    fld.appendChild(help);
    return fld;
  }

  function renderGroup(parent, key, s, label) {
    var v = parent[key], isArr = Array.isArray(v);
    var card = el('div', 'card group');
    var head = el('div', 'ghead');
    head.appendChild(el('h3', null, label));
    card.appendChild(head);
    if (s && s.description) card.appendChild(el('span', 'help', s.description));
    var body = el('div', 'group-body');
    if (isArr) {
      v.forEach(function (item, i) { body.appendChild(renderEntry(v, i, itemSchema(s))); });
    } else {
      schemaOf.set(v, s);
      Object.keys(v).forEach(function (k2) { body.appendChild(renderEntry(v, k2, propSchema(s, k2))); });
    }
    card.appendChild(body);
    card.appendChild(isArr ? addItemRow(v, s) : addFieldRow(v, s));
    return card;
  }

  function addFieldRow(obj, s) {
    var row = el('div', 'addrow');
    var id = 'dl' + (++uid);
    var name = el('input', 'inp'); name.type = 'text'; name.setAttribute('list', id);
    name.setAttribute('aria-label', t('field.name')); name.placeholder = t('field.name');
    var dl = el('datalist'); dl.id = id;
    Object.keys((s && s.properties) || {}).forEach(function (p) {
      if (!(p in obj)) { var o = el('option'); o.value = p; dl.appendChild(o); }
    });
    var type = el('select', 'inp');
    type.setAttribute('aria-label', t('field.name'));
    ['string', 'number', 'boolean', 'object', 'array'].forEach(function (ty) {
      var o = el('option', null, t('type.' + ty)); o.value = ty; type.appendChild(o);
    });
    name.addEventListener('input', function () { // a schema property brings its own type
      var sub = propSchema(s, name.value);
      if (sub && stype(sub)) type.value = stype(sub);
    });
    row.appendChild(name); row.appendChild(dl); row.appendChild(type);
    row.appendChild(textButton('plus', t('action.addField'), function () {
      var key = name.value.trim();
      if (!key || key === '__proto__') { kBenestadFjord.toast(t('toast.badName')); return; }
      if (Object.prototype.hasOwnProperty.call(obj, key)) { kBenestadFjord.toast(t('toast.exists', { name: key })); return; }
      obj[key] = blank(type.value, propSchema(s, key));
      rerender();
    }));
    return row;
  }

  function addItemRow(arr, s) {
    var row = el('div', 'addrow');
    row.appendChild(textButton('plus', t('action.addItem'), function () {
      var is = itemSchema(s), first = arr[0];
      var ty = stype(is) || (first === undefined ? 'string' : kind(first));
      arr.push(ty === 'object' || ty === 'array' ? (first !== undefined ? clone(first) : blank(ty, is)) : blank(ty, is));
      rerender();
    }));
    return row;
  }

  function remove(parent, key, label) {
    var before = JSON.stringify(data);
    if (Array.isArray(parent)) parent.splice(key, 1); else delete parent[key];
    rerender();
    kBenestadFjord.toast(t('toast.removed', { name: label }), {
      action: t('action.undo'),
      onAction: function () { data = JSON.parse(before); rerender(); }
    });
  }

  // ---- state ----
  function rerender() {
    var box = $('editor');
    box.textContent = '';
    badInputs.clear();
    schemaOf = new Map();
    if (data) {
      schemaOf.set(data, schema);
      Object.keys(data).forEach(function (k) { box.appendChild(renderEntry(data, k, propSchema(schema, k))); });
      box.appendChild(addFieldRow(data, schema));
    }
    $('empty').hidden = !!data;
    box.hidden = !data;
    $('savebar').hidden = !data;
    $('subtitle').textContent = data ? filename : '';
    changed();
  }

  function callout(cls, iconName, title, lines) {
    var c = el('div', 'co ' + cls);
    c.appendChild(icon(iconName, 'ic'));
    var d = el('div');
    d.appendChild(el('b', null, title));
    lines.forEach(function (l) { d.appendChild(el('p', null, l)); });
    c.appendChild(d);
    return c;
  }

  function changed() {
    var probs = [];
    if (data) validate(data, schema, [], probs);
    var lines = probs.map(function (p) {
      return t('problem.line', { path: [t('problem.root')].concat(p.path).join(' › '), message: p.message });
    });
    badInputs.forEach(function (label) { lines.push(t('problem.line', { path: label, message: t('problem.number') })); });
    var box = $('problems');
    box.textContent = '';
    if (lines.length) {
      var shown = lines.slice(0, 8);
      if (lines.length > 8) shown.push(t('problem.more', { count: lines.length - 8 }));
      box.appendChild(callout('warn', 'warn', t('problem.title'), shown));
    }
    var dirty = data !== null && JSON.stringify(data) !== saved;
    $('dirty').textContent = t(dirty ? 'status.dirty' : 'status.clean');
    $('dirty').className = dirty ? 'bdg warn' : 'bdg';
    $('save').disabled = !data || lines.length > 0;
  }

  function notice(title, detail) {
    var box = $('notice');
    box.textContent = '';
    if (title) box.appendChild(callout('bad', 'bad', title, detail ? [detail] : []));
  }

  // ---- loading and saving ----
  function readUrl(raw) {
    var u;
    try { u = new URL(raw, location.href); } catch (e) { return Promise.reject(new Error(t('error.address'))); }
    return fetch(u.href, { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error(t('error.http', { status: r.status }));
      return r.text().then(function (text) { return { text: text, name: u.pathname.split('/').pop() || 'config.json' }; });
    }).catch(function (e) {
      var detail = e instanceof TypeError ? t('error.fetchHint') : e.message;
      var err = new Error(detail); err.title = t('error.fetch', { address: raw }); throw err;
    });
  }
  function readFile(file) { return file.text().then(function (text) { return { text: text, name: file.name }; }); }

  function parse(text) {
    try { return { value: JSON.parse(text) }; } catch (e) { return { error: e.message }; }
  }

  function applyConfig(res) {
    var p = parse(res.text);
    if (p.error) { notice(t('error.parse'), p.error); return; }
    if (!isObj(p.value)) { notice(t('error.notObject')); return; }
    notice(null);
    data = p.value; saved = JSON.stringify(data); filename = res.name;
    rerender();
  }
  function applySchema(res) {
    var p = parse(res.text);
    if (p.error) { notice(t('error.parse'), p.error); return; }
    if (!isObj(p.value)) { notice(t('error.schemaNotObject')); return; }
    notice(null);
    schema = p.value;
    $('sch-state').textContent = t('schema.loaded', { name: res.name });
    $('sch-clear').hidden = false;
    rerender();
  }
  function failed(e) { notice(e.title || e.message, e.title ? e.message : ''); }

  function isDirty() { return data !== null && JSON.stringify(data) !== saved; }
  function whenSafeToReplace(go) {
    if (!isDirty()) { go(); return; }
    var d = $('discard');
    d.addEventListener('close', function once() {
      d.removeEventListener('close', once);
      if (d.returnValue === 'discard') go();
    });
    d.showModal();
  }

  function remember(key, v) { try { localStorage.setItem(key, v); } catch (e) {} }
  function recall(key) { try { return localStorage.getItem(key) || ''; } catch (e) { return ''; } }

  $('cfg-load').addEventListener('click', function () {
    var raw = $('cfg-url').value.trim();
    if (!raw) { $('cfg-url').focus(); return; }
    remember('config-editor-url', raw);
    whenSafeToReplace(function () { readUrl(raw).then(applyConfig).catch(failed); });
  });
  $('cfg-open').addEventListener('click', function () { $('cfg-file').click(); });
  $('cfg-file').addEventListener('change', function () {
    var f = $('cfg-file').files[0]; $('cfg-file').value = '';
    if (f) whenSafeToReplace(function () { readFile(f).then(applyConfig).catch(failed); });
  });
  $('sch-load').addEventListener('click', function () {
    var raw = $('sch-url').value.trim();
    if (!raw) { $('sch-url').focus(); return; }
    remember('config-editor-schema', raw);
    readUrl(raw).then(applySchema).catch(failed);
  });
  $('sch-open').addEventListener('click', function () { $('sch-file').click(); });
  $('sch-file').addEventListener('change', function () {
    var f = $('sch-file').files[0]; $('sch-file').value = '';
    if (f) readFile(f).then(applySchema).catch(failed);
  });
  $('sch-clear').addEventListener('click', function () {
    schema = null; $('sch-state').textContent = t('schema.none'); $('sch-clear').hidden = true; rerender();
  });

  $('save').addEventListener('click', function () {
    var blob = new Blob([JSON.stringify(data, null, 2) + '\n'], { type: 'application/json' });
    var a = el('a'); a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    saved = JSON.stringify(data);
    changed();
    kBenestadFjord.toast(t('toast.saved', { name: filename }));
  });

  window.addEventListener('beforeunload', function (e) { if (isDirty()) { e.preventDefault(); e.returnValue = ''; } });

  $('cfg-url').value = recall('config-editor-url');
  $('sch-url').value = recall('config-editor-schema');
  $('sch-state').textContent = t('schema.none');
  rerender();
})();
