// A plain HTML page: growth numbers and the run log.
const store = $getWorkflowStaticData('global');
const stats = store.stats || [], runs = store.runs || [];
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const latest = stats[0] || {}, weekAgo = stats.find((r) => r.date <= new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10)) || stats[stats.length - 1] || {};
const delta = (key) => (latest[key] != null && weekAgo[key] != null ? (latest[key] - weekAgo[key] >= 0 ? '+' : '') + (latest[key] - weekAgo[key]) + ' in 7 days' : '');
const tile = (label, key) => `<div class="tile"><div class="n">${esc(latest[key] ?? '-')}</div><div>${label}</div><small>${delta(key)}</small></div>`;
const series = stats.slice(0, 60).reverse();
let chart = '<p>The chart appears after two days of data.</p>';
if (series.length > 1) {
  const min = Math.min(...series.map((r) => r.stars)), max = Math.max(...series.map((r) => r.stars)), span = Math.max(1, max - min);
  const pts = series.map((r, i) => `${(i / (series.length - 1) * 580 + 10).toFixed(1)},${(110 - (r.stars - min) / span * 100).toFixed(1)}`).join(' ');
  chart = `<svg viewBox="0 0 600 120" role="img" aria-label="Stars over the last ${series.length} days"><polyline fill="none" stroke="#0969da" stroke-width="2" points="${pts}"/></svg><small>Stars, ${esc(series[0].date)} to ${esc(series[series.length - 1].date)}: ${min} to ${max}</small>`;
}
const runRows = runs.slice(0, 40).map((r) => `<tr><td>${esc(r.at.slice(0, 16).replace('T', ' '))}</td><td>${esc(r.kind)}</td><td>${esc(r.mode)}</td><td>${esc(r.title)}</td><td>${Object.entries(r.results || {}).map(([c, v]) => `<b>${esc(c)}</b>: ${esc(v)}`).join('<br>')}</td></tr>`).join('');
const statRows = stats.slice(0, 30).map((r) => `<tr><td>${esc(r.date)}</td><td>${esc(r.stars)}</td><td>${esc(r.forks)}</td><td>${esc(r.watchers)}</td><td>${esc(r.tools ?? '')}</td><td>${esc(r.views14d ?? '')}</td><td>${esc(r.visitors14d ?? '')}</td><td>${esc(r.clones14d ?? '')}</td></tr>`).join('');
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Promo dashboard</title>
<style>body{font:15px/1.5 system-ui,sans-serif;margin:0 auto;max-width:980px;padding:16px;color:#1f2328;background:#fff}h1{font-size:22px}h2{font-size:17px;margin-top:28px}
.tiles{display:flex;flex-wrap:wrap;gap:12px}.tile{border:1px solid #d1d9e0;border-radius:8px;padding:12px 16px;min-width:130px}.n{font-size:26px;font-weight:600}
small{color:#59636e}table{border-collapse:collapse;width:100%;font-size:13px}td,th{border-bottom:1px solid #d1d9e0;padding:6px 8px;text-align:left;vertical-align:top}.scroll{overflow-x:auto}svg{width:100%;height:auto;border:1px solid #d1d9e0;border-radius:8px}
@media(prefers-color-scheme:dark){body{background:#0d1117;color:#f0f6fc}.tile,td,th,svg{border-color:#3d444d}small{color:#9198a1}}</style></head><body>
<h1>Awesome AI Agent Stack: promo dashboard</h1>
<div class="tiles">${tile('GitHub stars', 'stars')}${tile('Forks', 'forks')}${tile('Watchers', 'watchers')}${tile('Tools listed', 'tools')}${tile('Views, 14 days', 'views14d')}${tile('Visitors, 14 days', 'visitors14d')}</div>
<h2>Stars</h2>${chart}
<h2>Runs (latest ${Math.min(40, runs.length)} of ${runs.length})</h2><div class="scroll"><table><tr><th>When (UTC)</th><th>Kind</th><th>Mode</th><th>Post</th><th>Channels</th></tr>${runRows || '<tr><td colspan="5">No runs yet.</td></tr>'}</table></div>
<h2>Daily numbers</h2><div class="scroll"><table><tr><th>Date</th><th>Stars</th><th>Forks</th><th>Watchers</th><th>Tools</th><th>Views 14d</th><th>Visitors 14d</th><th>Clones 14d</th></tr>${statRows || '<tr><td colspan="8">No data yet.</td></tr>'}</table></div>
</body></html>`;
return [{ json: { html } }];
