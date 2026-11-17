// Post the short text to Bluesky and Mastodon when their settings exist. PROMO_MODE=draft (default) posts nothing.
const item = $input.first().json;
const { short, url } = item;
const live = ($env.PROMO_MODE || 'draft') === 'now';
const out = { ...item, mode: live ? 'now' : 'draft', bluesky: 'not configured', mastodon: 'not configured' };

if ($env.BLUESKY_HANDLE && $env.BLUESKY_APP_PASSWORD) {
  if (!live) out.bluesky = 'draft only';
  else try {
    const pds = 'https://bsky.social/xrpc/';
    const s = await this.helpers.httpRequest({ method: 'POST', url: pds + 'com.atproto.server.createSession', json: true,
      body: { identifier: $env.BLUESKY_HANDLE, password: $env.BLUESKY_APP_PASSWORD } });
    // Bluesky needs the link marked by byte offsets to be clickable
    const start = Buffer.byteLength(short.slice(0, short.indexOf(url)), 'utf8');
    const facets = short.includes(url) ? [{ index: { byteStart: start, byteEnd: start + Buffer.byteLength(url, 'utf8') },
      features: [{ $type: 'app.bsky.richtext.facet#link', uri: url }] }] : [];
    const r = await this.helpers.httpRequest({ method: 'POST', url: pds + 'com.atproto.repo.createRecord', json: true,
      headers: { Authorization: 'Bearer ' + s.accessJwt },
      body: { repo: s.did, collection: 'app.bsky.feed.post',
        record: { $type: 'app.bsky.feed.post', text: short, facets, createdAt: new Date().toISOString() } } });
    out.bluesky = 'posted ' + r.uri;
  } catch (e) { out.bluesky = 'failed: ' + String(e.message).slice(0, 200); }
}

if ($env.MASTODON_URL && $env.MASTODON_TOKEN) {
  if (!live) out.mastodon = 'draft only';
  else try {
    const r = await this.helpers.httpRequest({ method: 'POST', url: $env.MASTODON_URL.replace(/\/$/, '') + '/api/v1/statuses', json: true,
      headers: { Authorization: 'Bearer ' + $env.MASTODON_TOKEN }, body: { status: short, visibility: 'public' } });
    out.mastodon = 'posted ' + r.url;
  } catch (e) { out.mastodon = 'failed: ' + String(e.message).slice(0, 200); }
}
return [{ json: out }];
