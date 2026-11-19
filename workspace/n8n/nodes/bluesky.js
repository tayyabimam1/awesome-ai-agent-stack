// Bluesky: needs BLUESKY_HANDLE and BLUESKY_APP_PASSWORD (Settings, App passwords).
const item = $input.first().json;
const results = { ...(item.results || {}) };
const live = item.mode === 'now';
if (!$env.BLUESKY_HANDLE || !$env.BLUESKY_APP_PASSWORD) results.bluesky = 'not configured';
else if (!live) results.bluesky = 'draft only';
else try {
  const pds = 'https://bsky.social/xrpc/';
  const s = await this.helpers.httpRequest({ method: 'POST', url: pds + 'com.atproto.server.createSession', json: true,
    body: { identifier: $env.BLUESKY_HANDLE, password: $env.BLUESKY_APP_PASSWORD } });
  // the link has to be marked by byte offsets to be clickable
  const at = item.short.indexOf(item.url);
  const start = Buffer.byteLength(item.short.slice(0, Math.max(at, 0)), 'utf8');
  const facets = at < 0 ? [] : [{ index: { byteStart: start, byteEnd: start + Buffer.byteLength(item.url, 'utf8') },
    features: [{ $type: 'app.bsky.richtext.facet#link', uri: item.url }] }];
  const r = await this.helpers.httpRequest({ method: 'POST', url: pds + 'com.atproto.repo.createRecord', json: true,
    headers: { Authorization: 'Bearer ' + s.accessJwt },
    body: { repo: s.did, collection: 'app.bsky.feed.post',
      record: { $type: 'app.bsky.feed.post', text: item.short, facets, createdAt: new Date().toISOString() } } });
  results.bluesky = 'posted ' + r.uri;
} catch (e) { results.bluesky = 'failed: ' + String(e.message).slice(0, 200); }
return [{ json: { ...item, results } }];
