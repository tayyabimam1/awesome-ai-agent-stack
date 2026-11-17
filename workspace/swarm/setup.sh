#!/bin/sh
# Start SearXNG (JSON API on 127.0.0.1:8888 only) for the swarm worker. Safe to rerun.
set -e
mkdir -p ~/swarm/searxng ~/swarm/data
cat > ~/swarm/searxng/settings.yml <<YML
use_default_settings: true
server:
  secret_key: "$(head -c 24 /dev/urandom | od -An -tx1 | tr -d ' \n')"
  limiter: false
search:
  formats:
    - html
    - json
YML
docker rm -f searxng >/dev/null 2>&1 || true
docker run -d --name searxng --restart unless-stopped -p 127.0.0.1:8888:8080 \
  -v ~/swarm/searxng/settings.yml:/etc/searxng/settings.yml:ro searxng/searxng:latest >/dev/null
for i in 1 2 3 4 5 6 7 8 9 10; do
  sleep 4
  if python3 -c "
import json,urllib.request
d=json.load(urllib.request.urlopen('http://127.0.0.1:8888/search?q=open+source+ai+agent+framework+github&format=json',timeout=30))
print('searxng ok:',len(d.get('results',[])),'results; unresponsive engines:',d.get('unresponsive_engines'))" 2>/dev/null; then exit 0; fi
done
echo "searxng did not answer"; docker logs --tail 20 searxng; exit 1
