// Telegram: needs TELEGRAM_BOT_TOKEN (from @BotFather) and TELEGRAM_CHAT_ID (the channel, e.g. @mychannel).
const item = $input.first().json;
const results = { ...(item.results || {}) };
const live = item.mode === 'now';
if (!$env.TELEGRAM_BOT_TOKEN || !$env.TELEGRAM_CHAT_ID) results.telegram = 'not configured';
else if (!live) results.telegram = 'draft only';
else try {
  await this.helpers.httpRequest({ method: 'POST', url: 'https://api.telegram.org/bot' + $env.TELEGRAM_BOT_TOKEN + '/sendMessage', json: true,
    body: { chat_id: $env.TELEGRAM_CHAT_ID, text: item.long.slice(0, 4000), disable_web_page_preview: false } });
  results.telegram = 'posted';
} catch (e) { results.telegram = 'failed: ' + String(e.message).slice(0, 200); }
return [{ json: { ...item, results } }];
