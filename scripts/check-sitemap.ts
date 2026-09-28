// Runs after `vite build`. Fails the build when the sitemap and the prerendered
// pages disagree: a page missing from the sitemap, a sitemap URL with no page,
// a canonical that doesn't match, or a page marked noindex.
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const OUT = '.svelte-kit/cloudflare';
const SITE = 'https://dhapoer.xyz';

function htmlFiles(dir: string): string[] {
	return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
		const p = join(dir, e.name);
		if (e.isDirectory()) return e.name === '_app' ? [] : htmlFiles(p);
		return e.name.endsWith('.html') && e.name !== '404.html' ? [p] : [];
	});
}

// index.html → /, work/ajaib.html → /work/ajaib
const toPath = (file: string) =>
	'/' + relative(OUT, file).replace(/\.html$/, '').replace(/(^|\/)index$/, '');

const pages = new Map(htmlFiles(OUT).map((f) => [SITE + toPath(f), f]));
const listed = [...readFileSync(join(OUT, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(
	(m) => m[1]
);

const problems: string[] = [];
for (const url of pages.keys()) if (!listed.includes(url)) problems.push(`page not in sitemap: ${url}`);
for (const url of listed) {
	const file = pages.get(url);
	if (!file) {
		problems.push(`sitemap lists a URL with no page: ${url}`);
		continue;
	}
	const html = readFileSync(file, 'utf8');
	const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
	if (canonical !== url) problems.push(`${url}: canonical is ${canonical ?? 'missing'}`);
	if (/<meta name="robots" content="[^"]*noindex/.test(html)) problems.push(`${url}: marked noindex`);
}

if (problems.length) {
	console.error(`check-sitemap: ${problems.length} problem(s)\n  ${problems.join('\n  ')}`);
	process.exit(1);
}
console.log(`check-sitemap: ${listed.length} URLs match the prerendered pages`);
