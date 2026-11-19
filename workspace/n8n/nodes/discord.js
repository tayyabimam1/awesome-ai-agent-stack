// Discord: needs DISCORD_WEBHOOK_URL (channel settings, Integrations, Webhooks).
const item = $input.first().json;
const results = { ...(item.results || {}) };
const live = item.mode === 'now';
if (!$env.DISCORD_WEBHOOK_URL) results.discord = 'not configured';
else if (!live) results.discord = 'draft only';
else try {
  await this.helpers.httpRequest({ method: 'POST', url: $env.DISCORD_WEBHOOK_URL, json: true, body: { content: item.long.slice(0, 1990) } });
  results.discord = 'posted';
} catch (e) { results.discord = 'failed: ' + String(e.message).slice(0, 200); }
return [{ json: { ...item, results } }];
