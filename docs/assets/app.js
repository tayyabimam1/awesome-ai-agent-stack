(function () {
  var index = null;
  function loadIndex(cb) {
    if (index) return cb(index);
    fetch('data.json').then(function (r) { return r.json(); })
      .then(function (d) { index = d; cb(d); }).catch(function () { cb([]); });
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function fmtStars(n) {
    return n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + 'k' : '' + n;
  }

  // Site-wide search: name matches rank above description matches, then stars.
  function wire(input, box) {
    var active = -1;
    function items() { return box.querySelectorAll('a.result'); }
    function highlight(i) {
      var list = items();
      list.forEach(function (el) { el.classList.remove('active'); });
      if (!list.length) return;
      active = (i + list.length) % list.length;
      list[active].classList.add('active');
      list[active].scrollIntoView({ block: 'nearest' });
    }
    function render(q) {
      active = -1;
      if (q.length < 2) { box.classList.remove('open'); box.innerHTML = ''; return; }
      loadIndex(function (idx) {
        var lq = q.toLowerCase(), hits = [];
        idx.forEach(function (e) {
          var n = e.n.toLowerCase().indexOf(lq), d = e.d.toLowerCase().indexOf(lq);
          if (n !== -1 || d !== -1) hits.push({ e: e, r: n !== -1 ? 0 : 1 });
        });
        hits.sort(function (a, b) { return a.r - b.r || b.e.s - a.e.s; });
        hits = hits.slice(0, 15);
        box.innerHTML = hits.length ? hits.map(function (h) {
          var e = h.e;
          return '<a class="result" role="option" href="' + e.sec + '.html#e-' + e.i + '"><b>' +
            esc(e.n) + '</b><span class="where">' + (e.s ? '\u2605 ' + fmtStars(e.s) + ' in ' : 'in ') +
            esc(e.st) + '</span><span class="d">' + esc(e.d) + '</span></a>';
        }).join('') : '<div class="result none">No tool matches \u201c' + esc(q) +
          '\u201d. Try a shorter word, or what the tool does.</div>';
        box.classList.add('open');
      });
    }
    var t;
    input.addEventListener('input', function () {
      clearTimeout(t);
      t = setTimeout(function () { render(input.value.trim()); }, 100);
    });
    input.addEventListener('focus', function () { render(input.value.trim()); });
    input.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowDown') { ev.preventDefault(); highlight(active + 1); }
      else if (ev.key === 'ArrowUp') { ev.preventDefault(); highlight(active - 1); }
      else if (ev.key === 'Enter') {
        var list = items(), pick = list[active] || list[0];
        if (pick) { ev.preventDefault(); location.href = pick.href; }
      } else if (ev.key === 'Escape') { box.classList.remove('open'); input.blur(); }
    });
    document.addEventListener('click', function (ev) {
      if (!box.contains(ev.target) && ev.target !== input) box.classList.remove('open');
    });
  }
  document.querySelectorAll('[data-search]').forEach(function (w) {
    wire(w.querySelector('input'), w.querySelector('.results'));
  });
  document.addEventListener('keydown', function (ev) {
    var tag = document.activeElement.tagName;
    if (ev.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
      ev.preventDefault();
      var inputs = document.querySelectorAll('[data-search] input');
      (inputs[inputs.length - 1] || inputs[0]).focus();
    }
  });

  // Sidebar is open on wide screens, a collapsible list on narrow ones.
  var side = document.querySelector('[data-side]');
  if (side && matchMedia('(min-width: 901px)').matches) side.open = true;

  // Layer page: filter and sort within each group.
  var tools = document.querySelector('[data-tools]');
  if (!tools) return;
  var filter = tools.querySelector('[data-filter]');
  var empty = tools.querySelector('.empty');
  var groups = document.querySelectorAll('.group');
  function applyFilter() {
    var q = filter.value.trim().toLowerCase(), shown = 0;
    groups.forEach(function (g) {
      var n = 0;
      g.querySelectorAll('li').forEach(function (li) {
        var ok = !q || li.dataset.q.indexOf(q) !== -1;
        li.hidden = !ok; if (ok) n++;
      });
      g.hidden = n === 0; shown += n;
    });
    empty.hidden = shown !== 0;
  }
  filter.addEventListener('input', applyFilter);
  tools.querySelectorAll('[data-sort]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var key = btn.dataset.sort;
      tools.querySelectorAll('[data-sort]').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn);
      });
      groups.forEach(function (g) {
        var ol = g.querySelector('ol');
        Array.prototype.slice.call(ol.children).sort(function (a, b) {
          return key === 's' ? (b.dataset.s - a.dataset.s) || (a.dataset.i - b.dataset.i)
                             : a.dataset.i - b.dataset.i;
        }).forEach(function (li) { ol.appendChild(li); });
      });
    });
  });
})();
