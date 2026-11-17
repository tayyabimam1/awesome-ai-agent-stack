# Daily promo workflow (n8n)

`promo-workflow.json` is an n8n workflow that promotes the list once a day:

1. **Trigger** - every day at 14:00 UTC, or a `POST` to its webhook.
2. **Write posts** (`write-posts.js`) - reads the site's `data.json`, picks one category (rotating daily) and five of its tools, and asks an OpenAI-compatible gateway for one short post and one long post. If the gateway fails three times, it uses a plain template.
3. **Publish**, in parallel:
   - **Post to X** and **Post to LinkedIn** - n8n's own nodes. They are disabled until you pick a credential in each node and enable it.
   - **Bluesky and Mastodon** (`post-bluesky-mastodon.js`) - posts the short text when the settings below exist.

## Settings

The n8n container reads these environment variables (kept in `~/n8n/n8n.env` on the server, never in this repository):

| Variable | Meaning |
|---|---|
| `FREELLMAPI_URL`, `FREELLMAPI_KEY` | OpenAI-compatible gateway used to write the posts |
| `PROMO_MODE` | `draft` (default: Bluesky and Mastodon post nothing) or `now` |
| `BLUESKY_HANDLE`, `BLUESKY_APP_PASSWORD` | Bluesky handle and an app password (Settings, App passwords) |
| `MASTODON_URL`, `MASTODON_TOKEN` | your Mastodon server and an access token with `write:statuses` |
| `N8N_BLOCK_ENV_ACCESS_IN_NODE` | must be `false` so the code nodes can read the variables above |

`PROMO_MODE` does not affect the X and LinkedIn nodes: those post whenever they are enabled.

To install elsewhere: replace `WEBHOOK_TOKEN` in the JSON with a random string, then `n8n import:workflow --input=promo-workflow.json` and activate it.

`.github/workflows/promo.yml` wakes the server and calls the webhook daily, for hosts that pause when idle. It does nothing until its three secrets are set.
