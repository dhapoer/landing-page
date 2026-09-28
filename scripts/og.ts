// Share cards (Open Graph images) for / and every /work/<slug> page.
// Runs before `vite build`: writes 1200×630 PNGs to static/og/ (gitignored).
// Regenerate by hand with `pnpm og`.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { profile, projects, type Project } from '../src/lib/data.ts';

const W = 1200;
const H = 630;
const OUT = 'static/og';

const c = {
	desktop: '#0e0e10',
	glow: '#1d2230',
	window: '#1c1c1e',
	hair: 'rgba(255,255,255,0.09)',
	fill: 'rgba(255,255,255,0.06)',
	text: '#f5f5f7',
	text2: '#c7c7cc',
	muted: '#a1a1a6',
	accent: '#0a84ff',
	live: '#30d158'
};

const font = (pkg: string, file: string) =>
	readFileSync(`node_modules/@fontsource/${pkg}/files/${file}`);
const fonts = [
	{ name: 'Geist', data: font('geist-sans', 'geist-sans-latin-400-normal.woff'), weight: 400 as const },
	{ name: 'Geist', data: font('geist-sans', 'geist-sans-latin-600-normal.woff'), weight: 600 as const },
	{ name: 'Geist', data: font('geist-sans', 'geist-sans-latin-700-normal.woff'), weight: 700 as const },
	{ name: 'Geist Mono', data: font('geist-mono', 'geist-mono-latin-400-normal.woff'), weight: 400 as const }
];

// Minimal element helper for satori (no JSX in this repo).
type Node = { type: string; props: Record<string, unknown> } | string;
const h = (type: string, style: Record<string, unknown>, ...children: Node[]): Node => ({
	type,
	props: { style: { display: 'flex', ...style }, children }
});

// Wrap-friendly text where some words are highlighted.
const words = (text: string, highlight: string[], color: string) =>
	text.split(' ').map((w) =>
		h('span', { marginRight: '0.24em', color: highlight.includes(w) ? color : undefined }, w)
	);

function card(windowTitle: string, body: Node[], footer: string) {
	const light = (bg: string) => h('div', { width: 14, height: 14, borderRadius: 999, background: bg });
	return h(
		'div',
		{
			width: W,
			height: H,
			flexDirection: 'column',
			padding: '44px 56px 36px',
			background: `radial-gradient(900px 600px at 75% 15%, ${c.glow}, ${c.desktop})`,
			color: c.text,
			fontFamily: 'Geist'
		},
		h(
			'div',
			{
				flex: 1,
				flexDirection: 'column',
				background: c.window,
				border: `1px solid ${c.hair}`,
				borderRadius: 20,
				overflow: 'hidden',
				boxShadow: '0 30px 80px rgba(0,0,0,0.6)'
			},
			h(
				'div',
				{
					height: 52,
					alignItems: 'center',
					padding: '0 20px',
					borderBottom: `1px solid ${c.fill}`,
					position: 'relative'
				},
				h('div', { gap: 10 }, light('#ff5f57'), light('#febc2e'), light('#28c840')),
				h(
					'div',
					{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#e5e5ea' },
					windowTitle
				)
			),
			h('div', { flex: 1, flexDirection: 'column', padding: '40px 52px 36px' }, ...body)
		),
		h(
			'div',
			{ marginTop: 22, justifyContent: 'space-between', alignItems: 'center', fontSize: 22, color: c.muted },
			h('div', { alignItems: 'center', gap: 10 }, h('div', { width: 10, height: 10, borderRadius: 999, background: c.live }), `${profile.availability} · ${profile.location.replace('Indonesia', 'ID')}`),
			h('div', { fontFamily: 'Geist Mono' }, footer)
		)
	);
}

const kicker = (text: string, color = c.muted) =>
	h('div', { fontFamily: 'Geist Mono', fontSize: 22, color }, text);

function homeCard() {
	return card(
		'About',
		[
			kicker(`${profile.name} · ${profile.role}`),
			h(
				'div',
				{ flexWrap: 'wrap', marginTop: 26, fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.04em' },
				...words('I build software people trade real money on.', ['real', 'money'], c.accent)
			),
			h('div', { marginTop: 'auto', fontSize: 26, color: c.text2 }, profile.tagline)
		],
		'dhapoer.xyz'
	);
}

function projectCard(p: Project) {
	const stat = (s: { value: string; label: string }) =>
		h(
			'div',
			{ flexDirection: 'column', gap: 4, padding: '16px 22px', minWidth: 170, borderRadius: 14, background: c.fill },
			h('div', { fontSize: 44, fontWeight: 600, letterSpacing: '-0.02em', color: c.accent }, s.value),
			h('div', { fontSize: 20, color: c.muted }, s.label)
		);
	return card(
		`Work — ${p.name}`,
		[
			kicker(p.kind, c.accent),
			h('div', { marginTop: 14, fontSize: 72, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1 }, p.name),
			h('div', { marginTop: 18, fontSize: 28, lineHeight: 1.35, color: c.text2 }, p.summary),
			p.stats.length
				? h('div', { marginTop: 'auto', gap: 16 }, ...p.stats.map(stat))
				: h('div', { marginTop: 'auto', fontSize: 24, color: c.muted }, `${p.role} · ${p.period}`)
		],
		`dhapoer.xyz/work/${p.slug}`
	);
}

async function render(name: string, node: Node) {
	const svg = await satori(node as Parameters<typeof satori>[0], { width: W, height: H, fonts });
	const png = new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng();
	writeFileSync(`${OUT}/${name}.png`, png);
}

mkdirSync(OUT, { recursive: true });
await render('home', homeCard());
for (const p of projects) await render(`work-${p.slug}`, projectCard(p));
console.log(`og: wrote ${projects.length + 1} images to ${OUT}/`);
