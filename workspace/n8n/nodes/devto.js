// dev.to: weekly article. Needs DEVTO_API_KEY (Settings, Extensions). Saved as a draft unless DEVTO_PUBLISH=true.
const item = $input.first().json;
const results = { ...(item.results || {}) };
const live = item.mode === 'now';
if (!item.article) results.devto = 'weekly only';
else if (!$env.DEVTO_API_KEY) results.devto = 'not configured';
else if (!live) results.devto = 'draft only';
else try {
  const r = await this.helpers.httpRequest({ method: 'POST', url: 'https://dev.to/api/articles', json: true,
    headers: { 'api-key': $env.DEVTO_API_KEY },
    body: { article: { title: item.article.title, body_markdown: item.article.markdown, tags: item.article.tags, published: $env.DEVTO_PUBLISH === 'true' } } });
  results.devto = (r.published ? 'published ' : 'saved as draft ') + r.url;
} catch (e) { results.devto = 'failed: ' + String(e.message).slice(0, 200); }
return [{ json: { ...item, results } }];
