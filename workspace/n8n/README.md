# Daily promo workflow (n8n + Postiz)

`promo-workflow.json` is an n8n workflow that promotes the list once a day:

1. **Trigger** - every day at 14:00 UTC, or a `POST` to its webhook.
2. **Write posts** (`write-posts.js`) - reads the site's `data.json`, picks one category (rotating daily) and five of its tools, and asks an OpenAI-compatible gateway for one short post and one long post. If the gateway fails, it uses a plain template.
3. **Send to Postiz** (`send-to-postiz.js`) - sends the short post to short-form channels (X, Bluesky, Mastodon, Threads) and the long post to the rest, for every channel connected in Postiz. Reddit is skipped.

Postiz is where you sign in to the social accounts and read analytics. The workflow finds connected channels on each run, so adding a channel in Postiz needs no change here.

## Settings

The n8n container reads these environment variables (kept in `~/n8n/n8n.env` on the server, never in this repository):

| Variable | Meaning |
|---|---|
| `POSTIZ_URL`, `POSTIZ_API_KEY` | Postiz address and its public API key |
| `FREELLMAPI_URL`, `FREELLMAPI_KEY` | OpenAI-compatible gateway used to write the posts |
| `PROMO_MODE` | `draft` (default: posts wait in Postiz for review), `schedule` (publish 15 minutes later) or `now` |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | must be `false` so the code nodes can read the variables above |

To install elsewhere: replace `WEBHOOK_TOKEN` in the JSON with a random string, then `n8n import:workflow --input=promo-workflow.json` and activate it.

`.github/workflows/promo.yml` wakes the server and calls the webhook daily, for hosts that pause when idle. It does nothing until its three secrets are set.
