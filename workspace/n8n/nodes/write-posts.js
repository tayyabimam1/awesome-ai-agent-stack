// Decide what this run is (daily spotlight or weekly roundup), pick the tools, and write the texts.
const SITE = 'https://tayyabimam1.github.io/awesome-ai-agent-stack/';
const REPO = 'https://github.com/tayyabimam1/awesome-ai-agent-stack';
const input = $input.first().json;
const now = new Date();
const kind = (input.body && input.body.kind) || (now.getUTCDay() === 1 && now.getUTCHours() >= 15 ? 'weekly' : 'spotlight');
const data = await this.helpers.httpRequest({ url: SITE + 'data.json', json: true });
const store = $getWorkflowStaticData('global');
const k = (n) => (n >= 1000 ? Math.round(n / 1000) + 'k' : String(n));
const all = data.sections.flatMap((s) => s.blocks.flatMap((b) => (b.entries || []).filter((e) => e.u && e.s).map((e) => ({ name: e.n, stars: e.s, about: e.d, url: e.u, category: s.title }))));

let title, url, picks, context;
if (kind === 'weekly') {
  // new since the last weekly run; the first run has no snapshot, so it shows the most-starred tools
  const seen = new Set(store.seenRepos || []);
  const fresh = seen.size ? all.filter((e) => !seen.has(e.name)) : [];
  const unique = [...new Map((fresh.length >= 5 ? fresh : all).map((e) => [e.name, e])).values()].sort((a, b) => b.stars - a.stars);
  picks = unique.slice(0, 10);
  title = fresh.length >= 5 ? `${fresh.length} tools added to the Awesome AI Agent Stack this week` : 'The 10 most-starred open-source AI agent tools right now';
  url = SITE;
  context = fresh.length >= 5 ? 'New additions this week, most-starred first.' : 'The most-starred projects on the whole list.';
  store.seenRepos = [...new Set(all.map((e) => e.name))];
} else {
  const day = Math.floor(Date.now() / 86400000);
  const sections = data.sections.filter((s) => s.count >= 10);
  const sec = sections[day % sections.length];
  const entries = all.filter((e) => e.category === sec.title).sort((a, b) => b.stars - a.stars);
  // each time a category comes round again, show the next five tools (within its top 30)
  const start = (Math.floor(day / sections.length) * 5) % Math.max(1, Math.min(entries.length - 4, 26));
  picks = entries.slice(start, start + 5);
  title = `${sec.title}: ${sec.count} open-source tools, ranked by GitHub stars`;
  url = SITE + sec.slug + '.html';
  context = sec.tagline;
}

const names = picks.slice(0, 3).map((p) => p.name.split('/')[1]).join(', ');
const bullets = picks.map((p) => `- ${p.name} (${k(p.stars)} stars): ${p.about}`).join('\n');
let short = `${title.length < 90 ? title : title.split(':')[0]}. Includes ${names}.\n${url}`;
let long = `${title}\n\n${bullets}\n\nFull list: ${url}\nAll ${data.total.toLocaleString('en-US')} tools: ${SITE}`;
let source = 'template';
for (let attempt = 0; attempt < 3 && source === 'template'; attempt++) try {   // free gateways fail now and then
  const res = await this.helpers.httpRequest({
    method: 'POST', url: $env.FREELLMAPI_URL + '/chat/completions', json: true, timeout: 120000,
    headers: { Authorization: 'Bearer ' + $env.FREELLMAPI_KEY },
    body: {
      model: 'auto', temperature: 0.7, max_tokens: 1100,
      messages: [
        { role: 'system', content: 'You write social posts for "Awesome AI Agent Stack", a free open-source list of AI agent tools ranked by GitHub stars. Plain, specific, no hype words, no emoji, no hashtags, no invented facts: use only the tools and numbers given. Reply with JSON only: {"short": "...", "long": "..."}. "short" is one post under 240 characters that names 2 or 3 of the tools and ends with the link. "long" is a LinkedIn-style post of 80 to 160 words that opens with what this is, lists the tools with one plain line each, and ends with the link.' },
        { role: 'user', content: JSON.stringify({ headline: title, context, tools: picks, link: url }) },
      ],
    },
  });
  const text = (res.choices[0].message.content || '').replace(/<think>[\s\S]*?<\/think>/g, '');
  const j = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
  const ok = (t, max) => typeof t === 'string' && t.includes(url) && t.length <= max && t.length > 40;
  if (ok(j.short, 280) && ok(j.long, 1900)) { short = j.short; long = j.long; source = 'llm'; }
} catch (e) { /* the template texts are used */ }

// weekly runs also get a full article (facts only, no model text) for dev.to
const article = kind !== 'weekly' ? null : {
  title,
  tags: ['ai', 'opensource', 'agents', 'llm'],
  markdown: `${context}\n\n` + picks.map((p, i) => `## ${i + 1}. [${p.name}](${p.url})\n\n${p.about}\n\n**${p.stars.toLocaleString('en-US')} stars** · ${p.category}`).join('\n\n') +
    `\n\n---\n\nThis is from [Awesome AI Agent Stack](${SITE}), a free map of ${data.total.toLocaleString('en-US')} open-source AI agent tools in ${data.sections.length} categories, ranked by GitHub stars. The source is on [GitHub](${REPO}).`,
};
return [{ json: { kind, title, url, picks, short, long, source, article, mode: ($env.PROMO_MODE || 'draft') === 'now' ? 'now' : 'draft', results: {} } }];
