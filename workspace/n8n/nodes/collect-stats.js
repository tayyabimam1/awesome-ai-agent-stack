// One row a day: stars, forks, watchers and list size; views and clones too when GITHUB_TOKEN can read traffic.
const REPO = 'tayyabimam1/awesome-ai-agent-stack';
const headers = { 'User-Agent': 'n8n-promo', Accept: 'application/vnd.github+json', ...($env.GITHUB_TOKEN ? { Authorization: 'Bearer ' + $env.GITHUB_TOKEN } : {}) };
const gh = (path) => this.helpers.httpRequest({ url: 'https://api.github.com/repos/' + REPO + path, headers, json: true });
const repo = await gh('');
const row = { date: new Date().toISOString().slice(0, 10), stars: repo.stargazers_count, forks: repo.forks_count, watchers: repo.subscribers_count, openIssues: repo.open_issues_count };
try { row.tools = (await this.helpers.httpRequest({ url: 'https://tayyabimam1.github.io/awesome-ai-agent-stack/data.json', json: true })).total; } catch (e) {}
if ($env.GITHUB_TOKEN) try {
  const [views, clones] = [await gh('/traffic/views'), await gh('/traffic/clones')];
  row.views14d = views.count; row.visitors14d = views.uniques; row.clones14d = clones.count;
} catch (e) { row.traffic = 'token cannot read traffic'; }
const store = $getWorkflowStaticData('global');
store.stats = [row, ...(store.stats || []).filter((r) => r.date !== row.date)].slice(0, 400);
return [{ json: row }];
