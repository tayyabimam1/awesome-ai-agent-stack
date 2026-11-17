# Swarm expansion (2026-11-16)

Scripts behind the expansion from 3,476 to 6,110 repositories. They ran on five cloud machines; keys were passed as environment variables and are not stored here.

- `gh_search.py` - GitHub repository search for 151 AI keywords, split by star range.
- `worker.py` - `discover` (an LLM writes search queries, a search API runs them, GitHub links are extracted) and `categorize` (one verdict per repository, following `../reaudit-2026-11/CATEGORIZE.md`).
- `verify.py` - GitHub GraphQL check: 1,000+ stars, pushed in the last 12 months, not archived, not a fork.
- `pool.py` - builds the candidate pool from the search results and earlier Phase 2 data.
- `merge.py` - applies the results to `README.md` and `site-data/stars.json`.

A repository was added only when it passed the GitHub check, two separate judge runs both kept it in the same category, its sub-group already exists in the README, and its own name, description or topics show an AI signal. The last rule was added because the web-scraped pool was mostly general open source and the judges let plain developer tools through.
