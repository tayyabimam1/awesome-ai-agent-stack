// Mastodon: needs MASTODON_URL and MASTODON_TOKEN (an access token with write:statuses).
const item = $input.first().json;
const results = { ...(item.results || {}) };
const live = item.mode === 'now';
if (!$env.MASTODON_URL || !$env.MASTODON_TOKEN) results.mastodon = 'not configured';
else if (!live) results.mastodon = 'draft only';
else try {
  const r = await this.helpers.httpRequest({ method: 'POST', url: $env.MASTODON_URL.replace(/\/$/, '') + '/api/v1/statuses', json: true,
    headers: { Authorization: 'Bearer ' + $env.MASTODON_TOKEN }, body: { status: item.short, visibility: 'public' } });
  results.mastodon = 'posted ' + r.url;
} catch (e) { results.mastodon = 'failed: ' + String(e.message).slice(0, 200); }
return [{ json: { ...item, results } }];
