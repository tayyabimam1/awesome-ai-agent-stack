
CSS = """
:root {
  --bg: #08080c;
  --bg-soft: #0e0e14;
  --card: rgba(255,255,255,0.03);
  --card-border: rgba(255,255,255,0.09);
  --text: #f4f4f5;
  --muted: #a1a1aa;
  --faint: #71717a;
  --accent: #8b5cf6;
  --accent2: #3b82f6;
  --star: #fbbf24;
  --radius: 14px;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
body::before {
  content: '';
  position: fixed; inset: 0; z-index: -1; pointer-events: none;
  background:
    radial-gradient(600px 400px at 15% 0%, rgba(139,92,246,0.14), transparent 60%),
    radial-gradient(700px 450px at 85% 10%, rgba(59,130,246,0.10), transparent 60%),
    radial-gradient(500px 500px at 50% 100%, rgba(139,92,246,0.07), transparent 60%);
}
a { color: inherit; }
.wrap { max-width: 1080px; margin: 0 auto; padding: 0 24px; }

/* nav */
.nav {
  position: sticky; top: 0; z-index: 50;
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  background: rgba(8,8,12,0.72);
  border-bottom: 1px solid var(--card-border);
}
.nav-inner { display: flex; align-items: center; gap: 20px; height: 64px; }
.logo { font-weight: 800; font-size: 1.02rem; text-decoration: none; letter-spacing: -0.01em; }
.logo b { background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text; background-clip: text; color: transparent; }
.nav-links { display: flex; gap: 4px; margin-left: 8px; }
.nav-links a { text-decoration: none; color: var(--muted); font-size: 0.9rem;
  padding: 8px 12px; border-radius: 8px; }
.nav-links a:hover { color: var(--text); background: rgba(255,255,255,0.06); }
.nav-search { margin-left: auto; position: relative; }
.nav-search input {
  background: rgba(255,255,255,0.06); border: 1px solid var(--card-border);
  border-radius: 10px; color: var(--text); padding: 8px 12px 8px 34px;
  font-size: 0.88rem; width: 230px; outline: none;
}
.nav-search input:focus { border-color: var(--accent); }
.nav-search::before { content: '\\1F50D'; position: absolute; left: 11px; top: 7px;
  font-size: 0.85rem; opacity: 0.6; }
.results {
  position: absolute; top: 44px; right: 0; width: 380px; max-height: 420px; overflow: auto;
  background: #121218; border: 1px solid var(--card-border); border-radius: 12px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.6); display: none; z-index: 60;
}
.results.open { display: block; }
.result { display: block; padding: 10px 14px; text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.05); }
.result:hover { background: rgba(139,92,246,0.12); }
.result .r-name { font-weight: 600; font-size: 0.9rem; }
.result .r-meta { font-size: 0.76rem; color: var(--faint); }
.result .r-desc { font-size: 0.8rem; color: var(--muted); white-space: nowrap;
  overflow: hidden; text-overflow: ellipsis; }

/* hero */
.hero { text-align: center; padding: 84px 0 40px; }
.pill { display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid var(--card-border); background: var(--card);
  border-radius: 999px; padding: 7px 16px; font-size: 0.82rem; color: var(--muted); }
.pill .dot { width: 8px; height: 8px; border-radius: 50%;
  background: #34d399; box-shadow: 0 0 10px #34d399; }
.hero h1 { font-size: clamp(2.4rem, 5.5vw, 4rem); font-weight: 800;
  letter-spacing: -0.03em; line-height: 1.08; margin: 26px 0 18px; }
.hero h1 .grad { background: linear-gradient(135deg, #a78bfa, #60a5fa);
  -webkit-background-clip: text; background-clip: text; color: transparent; }
.hero p.sub { color: var(--muted); font-size: 1.08rem; max-width: 640px; margin: 0 auto; }
.hero-search { max-width: 560px; margin: 34px auto 0; position: relative; }
.hero-search input { width: 100%; padding: 16px 20px 16px 50px; font-size: 1rem;
  border-radius: 14px; border: 1px solid var(--card-border);
  background: rgba(255,255,255,0.05); color: var(--text); outline: none; }
.hero-search input:focus { border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(139,92,246,0.25); }
.hero-search::before { content: '\\1F50D'; position: absolute; left: 18px; top: 14px;
  font-size: 1.1rem; opacity: 0.6; }
.hero-search .results { top: 62px; left: 0; right: 0; width: auto; text-align: left; }
.hero-cta { display: flex; gap: 12px; justify-content: center; margin-top: 26px; flex-wrap: wrap; }
.btn-star { display: inline-block; text-decoration: none; font-weight: 700; font-size: 0.92rem;
  color: #08080c; background: linear-gradient(135deg, #a78bfa, #60a5fa);
  padding: 12px 24px; border-radius: 12px; }
.btn-star:hover { filter: brightness(1.1); }
.btn-ghost { display: inline-block; text-decoration: none; font-weight: 600; font-size: 0.92rem;
  color: var(--text); border: 1px solid var(--card-border); background: var(--card);
  padding: 12px 24px; border-radius: 12px; }
.btn-ghost:hover { border-color: var(--accent); }

/* stats */
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 14px; margin: 48px 0 8px; }
.stat { background: var(--card); border: 1px solid var(--card-border);
  border-radius: var(--radius); padding: 20px 12px; text-align: center; }
.stat b { display: block; font-size: 1.7rem; font-weight: 800; letter-spacing: -0.02em;
  background: linear-gradient(135deg, #c4b5fd, #93c5fd);
  -webkit-background-clip: text; background-clip: text; color: transparent; }
.stat span { font-size: 0.8rem; color: var(--muted); }

/* section title */
.sec-title { margin: 56px 0 22px; }
.sec-title h2 { font-size: 1.5rem; font-weight: 750; letter-spacing: -0.02em; }
.sec-title p { color: var(--muted); font-size: 0.95rem; }

/* cards */
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 14px; padding-bottom: 30px; }
.card { display: block; text-decoration: none; background: var(--card);
  border: 1px solid var(--card-border); border-radius: var(--radius);
  padding: 20px; transition: transform .16s, border-color .16s, background .16s; }
.card:hover { transform: translateY(-3px); border-color: rgba(139,92,246,0.55);
  background: rgba(139,92,246,0.06); }
.card .icon { font-size: 1.5rem; }
.card h3 { font-size: 1.02rem; margin: 10px 0 6px; letter-spacing: -0.01em; }
.card p { font-size: 0.86rem; color: var(--muted); line-height: 1.5; min-height: 2.6em; }
.card .count { display: inline-block; margin-top: 12px; font-size: 0.78rem; font-weight: 700;
  color: #c4b5fd; }

/* page header (section pages) */
.page-head { padding: 56px 0 8px; }
.page-head .crumb { font-size: 0.82rem; color: var(--faint); margin-bottom: 14px; }
.page-head .crumb a { color: var(--muted); text-decoration: none; }
.page-head .crumb a:hover { color: var(--text); }
.page-head h1 { font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 800;
  letter-spacing: -0.02em; }
.page-head h1 .icon { margin-right: 10px; }
.page-head p.tag { color: var(--muted); margin-top: 10px; font-size: 1.02rem;
  max-width: 700px; }
.page-head .meta { margin-top: 14px; font-size: 0.85rem; color: var(--faint); }

/* tool rows */
.tools { margin: 26px 0 60px; border: 1px solid var(--card-border);
  border-radius: var(--radius); overflow: hidden; background: rgba(255,255,255,0.015); }
.tool { display: flex; gap: 14px; align-items: baseline; padding: 13px 18px;
  border-bottom: 1px solid rgba(255,255,255,0.05); text-decoration: none; }
.tool:last-child { border-bottom: none; }
.tool:hover { background: rgba(139,92,246,0.07); }
.tool .t-name { font-weight: 650; font-size: 0.94rem; white-space: nowrap;
  color: #dbeafe; }
.tool:hover .t-name { color: #fff; text-decoration: underline;
  text-decoration-color: var(--accent); }
.tool .t-stars { margin-left: auto; white-space: nowrap; font-size: 0.78rem;
  color: var(--star); font-weight: 600; flex-shrink: 0; }
.tool .t-desc { flex-basis: 100%; font-size: 0.85rem; color: var(--muted);
  line-height: 1.5; }
.tool-row { display: flex; flex-wrap: wrap; width: 100%; }

/* footer */
.footer { border-top: 1px solid var(--card-border); margin-top: 40px;
  padding: 34px 0 46px; color: var(--faint); font-size: 0.85rem; }
.footer .wrap { display: flex; gap: 18px; flex-wrap: wrap; align-items: center; }
.footer a { color: var(--muted); text-decoration: none; }
.footer a:hover { color: var(--text); }
.footer .right { margin-left: auto; }

@media (max-width: 640px) {
  .nav-links { display: none; }
  .nav-search input { width: 150px; }
  .tool .t-desc { font-size: 0.82rem; }
}
"""

JS = """
(function () {
  var index = null, loaded = false;
  function loadIndex(cb) {
    if (loaded) return cb(index);
    fetch('data.json').then(function (r) { return r.json(); }).then(function (d) {
      index = d; loaded = true; cb(index);
    }).catch(function () { cb([]); });
  }
  function fmtStars(n) {
    if (!n) return '';
    return n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + 'k' : '' + n;
  }
  function wire(input, box) {
    var current = -1;
    function render(q) {
      if (!q || q.length < 2) { box.classList.remove('open'); box.innerHTML = ''; return; }
      loadIndex(function (idx) {
        q = q.toLowerCase();
        var hits = [];
        for (var i = 0; i < idx.length && hits.length < 12; i++) {
          var e = idx[i];
          if ((e.n + ' ' + e.d).toLowerCase().indexOf(q) !== -1) hits.push(e);
        }
        if (!hits.length) {
          box.innerHTML = '<div class="result"><div class="r-meta">No matches — try another term</div></div>';
        } else {
          box.innerHTML = hits.map(function (e) {
            var stars = e.s ? ' \u2605 ' + fmtStars(e.s) : '';
            return '<a class="result" href="' + e.sec + '.html#e-' + e.i + '">' +
              '<div class="r-name">' + e.n + '<span class="r-meta">' + stars + ' \u00b7 ' + e.st + '</span></div>' +
              '<div class="r-desc">' + e.d + '</div></a>';
          }).join('');
        }
        box.classList.add('open');
      });
    }
    var t;
    input.addEventListener('input', function () {
      clearTimeout(t);
      t = setTimeout(function () { render(input.value.trim()); }, 120);
    });
    input.addEventListener('focus', function () { render(input.value.trim()); });
    document.addEventListener('click', function (ev) {
      if (!box.contains(ev.target) && ev.target !== input) box.classList.remove('open');
    });
    input.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') box.classList.remove('open');
    });
  }
  document.querySelectorAll('[data-search]').forEach(function (wrap) {
    wire(wrap.querySelector('input'), wrap.querySelector('.results'));
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === '/' && document.activeElement.tagName !== 'INPUT') {
      ev.preventDefault();
      var first = document.querySelector('[data-search] input');
      if (first) first.focus();
    }
  });
})();
"""
