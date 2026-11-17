// Pick today's category and five of its tools, then write one short and one long post.
const SITE = 'https://tayyabimam1.github.io/awesome-ai-agent-stack/';
const data = await this.helpers.httpRequest({ url: SITE + 'data.json', json: true });
const day = Math.floor(Date.now() / 86400000);
const sections = data.sections.filter((s) => s.count >= 10);
const sec = sections[day % sections.length];
const entries = sec.blocks.flatMap((b) => b.entries || []).filter((e) => e.u && e.s).sort((a, b) => b.s - a.s);
// each time a category comes round again, show the next five tools (within its top 30)
const round = Math.floor(day / sections.length);
const start = (round * 5) % Math.max(1, Math.min(entries.length - 4, 26));
const picks = entries.slice(start, start + 5).map((e) => ({ name: e.n, stars: e.s, about: e.d, url: e.u }));
const url = SITE + sec.slug + '.html';
const k = (n) => (n >= 1000 ? Math.round(n / 1000) + 'k' : String(n));

const fallbackShort = `${sec.title}: ${picks.slice(0, 3).map((p) => p.name.split('/')[1]).join(', ')} and ${sec.count - 3} more open-source tools, ranked by GitHub stars.\n${url}`;
const fallbackLong = `${sec.title}: ${sec.count} open-source tools, ranked by GitHub stars.\n\n` +
  picks.map((p) => `- ${p.name} (${k(p.stars)} stars): ${p.about}`).join('\n') +
  `\n\nFull list: ${url}\nAll ${data.total.toLocaleString('en-US')} tools: ${SITE}`;

let short = fallbackShort, long = fallbackLong, source = 'template';
for (let attempt = 0; attempt < 3 && source === 'template'; attempt++) try {   // free gateways fail now and then
  const res = await this.helpers.httpRequest({
    method: 'POST', url: $env.FREELLMAPI_URL + '/chat/completions', json: true, timeout: 120000,
    headers: { Authorization: 'Bearer ' + $env.FREELLMAPI_KEY },
    body: {
      model: 'auto', temperature: 0.7, max_tokens: 900,
      messages: [
        { role: 'system', content: 'You write social posts for "Awesome AI Agent Stack", a free open-source list of AI agent tools ranked by GitHub stars. Plain, specific, no hype words, no emoji, no hashtags, no invented facts: use only the tools and numbers given. Reply with JSON only: {"short": "...", "long": "..."}. "short" is one post under 240 characters that names 2 or 3 of the tools and ends with the link. "long" is a LinkedIn-style post of 80 to 140 words that says what the category is for, lists the five tools with one plain line each, and ends with the link.' },
        { role: 'user', content: JSON.stringify({ category: sec.title, what_it_is: sec.tagline, tools_in_category: sec.count, tools: picks, link: url }) },
      ],
    },
  });
  const text = (res.choices[0].message.content || '').replace(/<think>[\s\S]*?<\/think>/g, '');
  const j = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
  const ok = (t, max) => typeof t === 'string' && t.includes(url) && t.length <= max && t.length > 40;
  if (ok(j.short, 280) && ok(j.long, 1500)) { short = j.short; long = j.long; source = 'llm'; }
} catch (e) { /* gateway down or bad JSON: the template posts are used */ }

return [{ json: { category: sec.title, url, picks, short, long, source } }];
