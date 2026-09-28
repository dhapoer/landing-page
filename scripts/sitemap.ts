// Writes static/sitemap.xml (gitignored) before `vite build`.
// <lastmod> is the last commit that changed what a page shows — its own entry in
// data.ts for a project, plus the shared templates — so it only moves when the
// page really changed. Needs full git history (the deploy workflow fetches it).
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { projects } from '../src/lib/data.ts';

const SITE = 'https://dhapoer.xyz';
const OUT = 'static/sitemap.xml';

// Files every page is rendered from.
const SHARED = [
	'src/lib/desktop',
	'src/lib/seo.ts',
	'src/lib/Seo.svelte',
	'src/routes/+layout.svelte',
	'tokens.css',
	'src/app.css',
	'scripts/og.ts'
];

type Page = { path: string; files: string[]; entry?: string; images: string[] };

const pages: Page[] = [
	{
		path: '/',
		files: [...SHARED, 'src/lib/data.ts', 'src/routes/+page.svelte'],
		images: ['/og/home.png']
	},
	...projects.map((p) => ({
		path: `/work/${p.slug}`,
		files: [...SHARED, 'src/routes/work'],
		entry: p.slug,
		images: [`/og/work-${p.slug}.png`, ...(p.image ? [p.image] : [])]
	}))
];

function git(args: string[]) {
	try {
		return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
	} catch {
		return '';
	}
}

const shallow = git(['rev-parse', '--is-shallow-repository']) !== 'false';
if (shallow) console.warn('sitemap: no full git history — writing without <lastmod>');

// Unix seconds of the newest commit touching `files`, or the lines of one project entry.
function lastChanged(page: Page) {
	const times = [git(['log', '-1', '--format=%ct', '--', ...page.files])];
	if (page.entry) {
		// The project's object in data.ts: from its slug line to the closing "\t},".
		const range = `/slug: '${page.entry}'/,/^\t},/:src/lib/data.ts`;
		times.push(git(['log', '-1', '--format=%ct', '-s', '-L', range]).split('\n')[0]);
	}
	const newest = Math.max(...times.map(Number).filter(Boolean));
	return Number.isFinite(newest) ? new Date(newest * 1000).toISOString() : null;
}

const abs = (path: string) => new URL(path, SITE).href;

const urls = pages.map((page) => {
	const lastmod = shallow ? null : lastChanged(page);
	return [
		'\t<url>',
		`\t\t<loc>${abs(page.path)}</loc>`,
		...(lastmod ? [`\t\t<lastmod>${lastmod}</lastmod>`] : []),
		...page.images.map((src) => `\t\t<image:image><image:loc>${abs(src)}</image:loc></image:image>`),
		'\t</url>'
	].join('\n');
});

writeFileSync(
	OUT,
	`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`
);
console.log(`sitemap: wrote ${pages.length} URLs to ${OUT}`);
