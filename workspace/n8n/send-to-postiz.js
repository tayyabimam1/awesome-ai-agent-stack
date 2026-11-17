// Send the posts to every channel connected in Postiz. PROMO_MODE: draft (default), schedule or now.
const { short, long, category, source } = $input.first().json;
const headers = { Authorization: $env.POSTIZ_API_KEY };
const api = $env.POSTIZ_URL + '/api/public/v1';
const channels = (await this.helpers.httpRequest({ url: api + '/integrations', headers, json: true }))
  .filter((c) => !c.disabled && c.identifier !== 'reddit');   // Reddit needs a subreddit and a human
if (!channels.length) {
  return [{ json: { sent: false, reason: 'No channels are connected in Postiz yet.', category, source, short, long } }];
}
const SHORT = new Set(['x', 'bluesky', 'mastodon', 'threads', 'nostr', 'warpcast', 'farcaster']);
const mode = $env.PROMO_MODE || 'draft';
const body = {
  type: mode, date: new Date(Date.now() + 15 * 60000).toISOString(), shortLink: false, tags: [],
  posts: channels.map((c) => ({
    integration: { id: c.id },
    value: [{ content: SHORT.has(c.identifier) ? short : long, image: [] }],
    settings: { __type: c.identifier, ...(c.identifier === 'x' ? { who_can_reply_post: 'everyone' } : {}) },
  })),
};
const result = await this.helpers.httpRequest({ method: 'POST', url: api + '/posts', headers, json: true, body });
return [{ json: { sent: true, mode, category, source, channels: channels.map((c) => c.identifier + ':' + c.name), result } }];
