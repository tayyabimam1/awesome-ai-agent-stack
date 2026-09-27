"""Static CSS and JS for the docs site. build_site.py writes these to docs/assets/."""
CSS = """
:root {
  color-scheme: light dark;
  --bg: #f2f4f7;
  --surface: #ffffff;
  --ink: #16202e;
  --muted: #536072;
  --rule: #d8dee6;
  --link: #1f6179;
  --star: #9a5b12;
  --focus: #2f6f85;
  /* strata: one hue family, darkest at the top of the stack */
  --t0: #1f4f63; --t1: #2a6a7c; --t2: #34808a; --t3: #4a958f;
  --t4: #69a894; --t5: #8cb99c; --t6: #b3cdb0;
  --t-ink-dark: #ffffff; --t-ink-light: #13262c;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #10151c; --surface: #171e27; --ink: #e5eaf0; --muted: #9aa7b6;
    --rule: #2a3440; --link: #8fd0d2; --star: #e7b060; --focus: #8fd0d2;
    --t0: #173847; --t1: #1c4655; --t2: #215462; --t3: #27616a;
    --t4: #2f6e6c; --t5: #3b7a6e; --t6: #4b8573;
    --t-ink-light: #ffffff;
  }
}
* { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0; background: var(--bg); color: var(--ink);
  font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif;
  font-optical-sizing: auto; font-size: 17px; line-height: 1.5;
}
a { color: var(--link); text-underline-offset: 0.18em; text-decoration-thickness: 1px; }
a:hover { text-decoration-thickness: 2px; }
:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; border-radius: 4px; }
.wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
.skip { position: absolute; left: -999px; top: 8px; background: var(--surface); padding: 8px 12px; z-index: 100; }
.skip:focus { left: 8px; }
h1, h2, h3 { line-height: 1.12; margin: 0; }
code { font-size: 0.9em; background: var(--rule); padding: 0.05em 0.3em; border-radius: 4px; }

/* top bar */
.top { position: sticky; top: 0; z-index: 50; background: var(--bg);
  border-bottom: 1px solid var(--rule); }
.top-inner { display: flex; align-items: center; gap: 20px; height: 60px; }
.logo { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 1.02rem;
  color: var(--ink); text-decoration: none; white-space: nowrap; }
.logo svg { width: 20px; height: 20px; fill: var(--t1); }
.logo svg rect:nth-child(2) { fill: var(--t3); }
.logo svg rect:nth-child(3) { fill: var(--t5); }
.top-links { display: flex; gap: 18px; margin-left: auto; font-size: 0.93rem; white-space: nowrap; }
.top-links a { color: var(--muted); text-decoration: none; }
.top-links a:hover { color: var(--ink); }
.top-links .gh { color: var(--ink); font-weight: 600; }

/* search */
.search { position: relative; flex: 1; max-width: 420px; }
.search input, .tools input {
  width: 100%; font: inherit; font-size: 0.95rem; color: var(--ink);
  background: var(--surface); border: 1px solid var(--rule); border-radius: 8px;
  padding: 8px 36px 8px 12px; }
.search input:focus, .tools input:focus { outline: none; border-color: var(--focus);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--focus) 25%, transparent); }
.search kbd { position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  font: inherit; font-size: 0.78rem; color: var(--muted); border: 1px solid var(--rule);
  border-radius: 4px; padding: 0 5px; pointer-events: none; }
.search-lg { max-width: 640px; margin-top: 28px; }
.search-lg input { font-size: 1.1rem; padding: 14px 16px; border-radius: 10px; }
.results { position: absolute; top: calc(100% + 6px); left: 0; right: 0; min-width: 320px;
  max-height: 70vh; overflow: auto; background: var(--surface); border: 1px solid var(--rule);
  border-radius: 10px; box-shadow: 0 18px 40px rgba(16, 24, 32, 0.18); display: none; z-index: 60; }
.results.open { display: block; }
.result { display: block; padding: 10px 14px; text-decoration: none; color: var(--ink);
  border-bottom: 1px solid var(--rule); }
.result:last-child { border-bottom: 0; }
.result:hover, .result.active { background: color-mix(in srgb, var(--t2) 12%, transparent); }
.result b { font-weight: 650; }
.result .where { color: var(--muted); font-size: 0.82rem; margin-left: 8px; }
.result .d { display: block; font-size: 0.85rem; color: var(--muted); white-space: nowrap;
  overflow: hidden; text-overflow: ellipsis; }
.result.none { color: var(--muted); }

/* home */
.intro { padding: 64px 24px 40px; }
.intro h1 { font-size: clamp(2.3rem, 6vw, 4.4rem); font-weight: 780; letter-spacing: -0.025em;
  max-width: 14em; }
.lede { font-size: 1.2rem; color: var(--muted); max-width: 38em; margin: 18px 0 0; }
.facts { max-width: 42em; margin: 12px 0 0; color: var(--muted); }
.start { margin: 18px 0 0; }

/* the stack map: one band per tier, darkest on top */
.stack { padding-bottom: 72px; }
.band { display: grid; grid-template-columns: 15rem 1fr; gap: 12px 32px;
  padding: 26px 28px; color: var(--t-ink-dark); }
.band:first-child { border-radius: 14px 14px 0 0; }
.band:last-child { border-radius: 0 0 14px 14px; }
.band + .band { margin-top: 3px; }
.band h2 { font-size: 1.45rem; font-weight: 720; letter-spacing: -0.01em; }
.band h2 small { display: block; font-size: 0.9rem; font-weight: 450; opacity: 0.78; margin-top: 6px; }
.band ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px 10px; align-content: start; }
.band a { display: inline-flex; align-items: baseline; gap: 8px; color: inherit; text-decoration: none;
  font-size: 1.02rem; font-weight: 520; padding: 6px 12px; border-radius: 7px;
  border: 1px solid color-mix(in srgb, currentColor 32%, transparent); }
.band a:hover { background: color-mix(in srgb, currentColor 14%, transparent); }
.band a span { font-size: 0.8rem; opacity: 0.75; font-variant-numeric: tabular-nums; }
.t0 { --tier: var(--t0); } .t1 { --tier: var(--t1); } .t2 { --tier: var(--t2); }
.t3 { --tier: var(--t3); } .t4 { --tier: var(--t4); } .t5 { --tier: var(--t5); } .t6 { --tier: var(--t6); }
.band { background: var(--tier); }
.band.t4, .band.t5, .band.t6 { color: var(--t-ink-light); }

/* layer pages */
.page { display: grid; grid-template-columns: 250px minmax(0, 1fr); gap: 48px; padding-top: 36px; }
.side summary { display: none; }
.side nav { position: sticky; top: 84px; max-height: calc(100vh - 100px); overflow: auto;
  padding-bottom: 24px; font-size: 0.92rem; }
.side-tier { border-left: 4px solid var(--tier); padding: 2px 0 2px 12px; margin-bottom: 18px; }
.side-tier h3 { font-size: 0.86rem; font-weight: 650; color: var(--muted); margin-bottom: 6px; }
.side-tier a { display: block; color: var(--ink); text-decoration: none; padding: 3px 0; line-height: 1.3; }
.side-tier a:hover { color: var(--link); }
.side-tier a[aria-current] { font-weight: 700; color: var(--link); }
.content { min-width: 0; padding-bottom: 64px; }
.crumb { margin: 0 0 10px; font-size: 0.95rem; }
.crumb a { color: var(--muted); text-decoration: none; border-left: 4px solid var(--tier); padding-left: 8px; }
.crumb a:hover { color: var(--ink); }
.content h1 { font-size: clamp(2rem, 4.2vw, 3rem); font-weight: 760; letter-spacing: -0.02em; }
.content .lede { font-size: 1.12rem; }
.groups { display: flex; flex-wrap: wrap; gap: 6px 18px; margin: 20px 0 0; font-size: 0.93rem; }
.groups a { text-decoration: none; }
.groups span { color: var(--muted); font-variant-numeric: tabular-nums; }
.tools { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin: 26px 0 8px;
  position: sticky; top: 60px; background: var(--bg); padding: 10px 0; z-index: 10; }
.tools input { flex: 1; min-width: 200px; max-width: 420px; }
.sort { display: flex; border: 1px solid var(--rule); border-radius: 8px; overflow: hidden; }
.sort button { font: inherit; font-size: 0.9rem; background: var(--surface); color: var(--muted);
  border: 0; padding: 8px 12px; cursor: pointer; }
.sort button + button { border-left: 1px solid var(--rule); }
.sort button[aria-pressed=true] { background: var(--ink); color: var(--bg); }
.empty { flex-basis: 100%; margin: 8px 0 0; color: var(--muted); }
.group { margin-top: 36px; scroll-margin-top: 130px; }
.group h2 { font-size: 1.35rem; font-weight: 700; display: flex; align-items: baseline; gap: 10px; }
.group h2 .n { font-size: 0.95rem; font-weight: 450; color: var(--muted); }
.note { color: var(--muted); font-size: 0.93rem; margin: 6px 0 0; }
.entries { list-style: none; margin: 12px 0 0; padding: 0; background: var(--surface);
  border: 1px solid var(--rule); border-radius: 10px; }
.entries li { display: grid; grid-template-columns: 24px minmax(0, 1fr) auto; gap: 12px;
  align-items: start; padding: 12px 16px; border-top: 1px solid var(--rule); scroll-margin-top: 130px; }
.entries li:first-child { border-top: 0; }
.entries li:target { background: color-mix(in srgb, var(--t2) 14%, transparent); }
.entries img, .noavatar { width: 24px; height: 24px; border-radius: 6px; margin-top: 2px; background: var(--rule); }
.noavatar { display: grid; place-items: center; font-size: 0.8rem; font-weight: 700; color: var(--muted); }
.entries a { font-weight: 650; color: var(--ink); text-decoration: none; overflow-wrap: anywhere; }
.entries a:hover { color: var(--link); text-decoration: underline; }
.entries p { margin: 2px 0 0; color: var(--muted); font-size: 0.95rem; max-width: 70ch; }
.entries p a { font-weight: inherit; color: var(--link); }
.stars { color: var(--star); font-size: 0.9rem; font-weight: 600; white-space: nowrap;
  font-variant-numeric: tabular-nums; margin-top: 2px; }
.prose { max-width: 70ch; }
.table { overflow-x: auto; margin-top: 24px; border: 1px solid var(--rule); border-radius: 10px; background: var(--surface); }
table { border-collapse: collapse; width: 100%; font-size: 0.95rem; }
th, td { text-align: left; vertical-align: top; padding: 10px 14px; border-top: 1px solid var(--rule); }
thead th { border-top: 0; font-weight: 700; background: var(--bg); }
tbody th { font-weight: 650; white-space: nowrap; }

.foot { border-top: 1px solid var(--rule); color: var(--muted); font-size: 0.93rem; padding: 28px 0 44px; }
.foot p { margin: 0; max-width: 70ch; }

@media (max-width: 900px) {
  .page { grid-template-columns: 1fr; gap: 0; padding-top: 20px; }
  .side { border: 1px solid var(--rule); border-radius: 10px; background: var(--surface); }
  .side summary { display: block; padding: 10px 14px; cursor: pointer; font-weight: 600; }
  .side nav { position: static; max-height: none; padding: 4px 14px 8px; }
  .band { grid-template-columns: 1fr; padding: 22px 18px; }
}
@media (max-width: 640px) {
  .wrap { padding: 0 16px; }
  .intro { padding: 40px 16px 28px; }
  .top-inner { gap: 12px; }
  .top-links { display: none; }
  .search kbd { display: none; }
  .tools { top: 60px; }
  .entries li { grid-template-columns: 24px minmax(0, 1fr); }
  .entries .stars { grid-column: 2; margin-top: 0; }
}
"""

JS = """
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
            esc(e.n) + '</b><span class="where">' + (e.s ? '\\u2605 ' + fmtStars(e.s) + ' in ' : 'in ') +
            esc(e.st) + '</span><span class="d">' + esc(e.d) + '</span></a>';
        }).join('') : '<div class="result none">No tool matches \\u201c' + esc(q) +
          '\\u201d. Try a shorter word, or what the tool does.</div>';
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
"""
