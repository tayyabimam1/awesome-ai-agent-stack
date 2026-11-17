// Keep a log of the last 200 runs for the dashboard, and return the run summary.
const item = $input.first().json;
const store = $getWorkflowStaticData('global');
store.runs = [{ at: new Date().toISOString(), kind: item.kind, title: item.title, mode: item.mode, writtenBy: item.source, results: item.results }, ...(store.runs || [])].slice(0, 200);
return [{ json: { kind: item.kind, title: item.title, mode: item.mode, writtenBy: item.source, results: item.results, short: item.short, long: item.long } }];
