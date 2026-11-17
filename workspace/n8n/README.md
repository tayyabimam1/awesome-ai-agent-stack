# Promo workflow (n8n)

`promo-workflow.json` is an 18-node n8n workflow that promotes the list and tracks its growth. The code of each code node is also in `nodes/`.

## What it does

| Part | When | What |
|---|---|---|
| Daily spotlight | every day, 14:00 UTC | One category (rotating) and five of its tools |
| Weekly roundup | Mondays, 15:00 UTC | Tools added since the previous roundup, or the ten most-starred when there are fewer than five new ones. Also builds a full article for dev.to |
| Run now | `POST /webhook/<token>` with `{"kind": "spotlight"}` or `{"kind": "weekly"}` | Same as above, on demand |
| Stats | every day, 06:00 UTC | Stars, forks, watchers and list size; views and clones when `GITHUB_TOKEN` is set |
| Dashboard | `GET /webhook/<token>-dashboard` | One page with the growth numbers, a stars chart and the log of the last runs |

Each run writes a short post and a long post with an OpenAI-compatible gateway (three attempts, then a plain template built from the list's own data), sends them to the channels below, and logs the result.

## Channels

| Channel | Text | How to turn it on |
|---|---|---|
| X | short | Open the **Post to X** node, pick your X credential, enable the node |
| LinkedIn | long | Open **Post to LinkedIn**, pick your credential and person, enable the node |
| Reddit | long | Open **Post to Reddit**, pick your credential and a subreddit, enable the node |
| Bluesky | short | `BLUESKY_HANDLE`, `BLUESKY_APP_PASSWORD` |
| Mastodon | short | `MASTODON_URL`, `MASTODON_TOKEN` (scope `write:statuses`) |
| Discord | long | `DISCORD_WEBHOOK_URL` |
| Telegram | long | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` |
| dev.to | weekly article | `DEVTO_API_KEY`; saved as a draft unless `DEVTO_PUBLISH=true` |

The X, LinkedIn and Reddit nodes post whenever they are enabled. The other five post only when `PROMO_MODE=now`; with the default `draft` they report "draft only".

## Settings

Environment variables of the n8n container (kept in `~/n8n/n8n.env` on the server, never in this repository): the channel variables above, plus `FREELLMAPI_URL` and `FREELLMAPI_KEY` (the gateway), `PROMO_MODE`, `GITHUB_TOKEN` (optional), `WEBHOOK_URL` (the public address) and `N8N_BLOCK_ENV_ACCESS_IN_NODE=false` (so code nodes can read these). After editing the file, recreate the container; `docker restart` does not re-read it.

To install elsewhere: replace `WEBHOOK_TOKEN` in the JSON with a random string, then `n8n import:workflow --input=promo-workflow.json` and activate it.

`.github/workflows/promo.yml` wakes the server and calls the webhook daily, for hosts that pause when idle. It does nothing until its three secrets are set.
