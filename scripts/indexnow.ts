// Tells IndexNow (Bing, Yandex, …) which pages changed in this production deploy.
// Run by the deploy workflow after a push to main. BEFORE = the previous main
// commit (github.event.before); pages whose sitemap <lastmod> is newer are sent.
// The key is public by design — it only proves we own dhapoer.xyz.
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';

const HOST = 'dhapoer.xyz';
const KEY = readdirSync('static')
	.find((f) => /^[0-9a-f]{32}\.txt$/.test(f))
	?.replace('.txt', '');
if (!KEY) throw new Error('indexnow: no key file in static/');

const sitemap = readFileSync('.svelte-kit/cloudflare/sitemap.xml', 'utf8');
const entries = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?/g)].map(
	([, loc, lastmod]) => ({ loc, lastmod: lastmod ? Date.parse(lastmod) : null })
);

// Previous deploy's commit time; new branch or unknown → send everything.
const before = process.env.BEFORE ?? '';
let since = 0;
if (before && !/^0+$/.test(before)) {
	try {
		since = 1000 * Number(execFileSync('git', ['show', '-s', '--format=%ct', before], { encoding: 'utf8' }).trim());
	} catch {
		since = 0;
	}
}

const urlList = entries.filter((e) => e.lastmod === null || e.lastmod > since).map((e) => e.loc);
if (!urlList.length) {
	console.log('indexnow: no pages changed since the last deploy');
	process.exit(0);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json; charset=utf-8' },
	body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList })
});
console.log(`indexnow: ${res.status} ${res.statusText} for ${urlList.length} URL(s)\n  ${urlList.join('\n  ')}`);
// 200 = accepted, 202 = accepted, key check pending.
if (!res.ok) process.exit(1);
