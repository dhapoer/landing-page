<!-- Hallmark · macrostructure: Manifesto · tone: brutalist · anchor hue: 18 (burgundy)
 * theme: custom (dark / brutalist-bold-grotesque / warm) · nav: N7 brutal slab · footer: Ft4 dense colophon
 * enrichment: none (typography only) · audience: freelance clients · use: drive email
 -->
<script lang="ts">
	import { profile, experience, projects, skills, education, awards } from '$lib/data';

	let open = $state(false);
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && (open = false)} />

<svelte:head>
	<title>{profile.name} — {profile.role}</title>
	<meta name="description" content={profile.tagline} />
	<meta property="og:title" content={`${profile.name} — ${profile.role}`} />
	<meta property="og:description" content={profile.tagline} />
	<meta property="og:type" content="website" />
</svelte:head>

<!-- N7 · Brutal slab -->
<header class="slab" id="top">
	<a class="slab__mark" href="#top">DHAPOER</a>
	<button
		class="slab__burger"
		aria-expanded={open}
		aria-controls="slab-nav"
		aria-label="Menu"
		onclick={() => (open = !open)}
	>
		<span class:x={open}></span>
		<span class:x={open}></span>
	</button>
	<nav id="slab-nav" class="slab__nav" class:open aria-label="Primary">
		<a href="#about" onclick={() => (open = false)}>ABOUT</a>
		<a href="#experience" onclick={() => (open = false)}>WORK</a>
		<a href="#education" onclick={() => (open = false)}>CREDS</a>
		<a class="slab__cta" href="#contact" onclick={() => (open = false)}>HIRE →</a>
	</nav>
</header>

<main>
	<!-- Manifesto hero — declaration, all-caps, one burgundy block word -->
	<section class="declare">
		<p class="declare__kicker">{profile.role} · {profile.location}</p>
		<h1 class="declare__head">
			I BUILD SOFTWARE<br />PEOPLE TRADE<br /><span class="block">REAL MONEY</span> ON.
		</h1>
	</section>

	<!-- Claims — short assertions, one per block -->
	<section class="claims" id="about">
		<p class="claim">A decade across mobile and web. iOS at Ajaib and INDODAX. Full stack at Cyan. Now independent, through Dhapoer Digital.</p>
		<p class="claim">I like problems where the engineering is load-bearing — rewriting React Native to native Swift, shipping fintech features, keeping systems boring enough to sleep through.</p>
		<p class="claim muted">I also teach JavaScript and web development, part-time, at RevoU.</p>
	</section>

	<!-- Experience — brutalist ledger, heavy rules -->
	<section class="work-list" id="experience">
		<h2 class="section-head">THE RECORD</h2>
		{#each experience as job}
			<div class="row">
				<span class="row__when">{job.period}</span>
				<div class="row__body">
					<p class="row__role">{job.title} — {job.company}</p>
					<p class="row__note muted">{job.summary}</p>
				</div>
			</div>
		{/each}
	</section>

	<!-- Selected work -->
	<section class="projects">
		<h2 class="section-head">SELECTED WORK</h2>
		<div class="proj-grid">
			{#each projects as p}
				<article class="proj">
					<h3 class="proj__name">{p.name}</h3>
					<p class="proj__sum">{p.summary}</p>
					<p class="proj__stack">{p.stack.join(' / ')}</p>
					{#if p.demo}<a class="proj__link" href={p.demo}>LIVE →</a>{/if}
				</article>
			{/each}
		</div>
	</section>

	<!-- Skills + Education + Awards, dense -->
	<section class="creds" id="education">
		<div class="creds__col">
			<h2 class="section-head">STACK</h2>
			{#each skills as s}
				<p class="kit"><span class="kit__k">{s.group}</span> {s.items.join(' / ')}</p>
			{/each}
		</div>
		<div class="creds__col">
			<h2 class="section-head">SCHOOL</h2>
			{#each education as e}
				<p class="kit"><span class="kit__k">{e.period}</span> {e.degree}</p>
			{/each}
			<p class="kit awards-head"><span class="kit__k">AWARDS</span></p>
			{#each awards as a}
				<p class="kit muted">{a.name} — {a.detail}</p>
			{/each}
		</div>
	</section>

	<!-- CTA block — oversized solid block, far below the fold -->
	<section class="cta-block" id="contact">
		<p class="cta-block__pre">WANT<br />SOMETHING<br />BUILT <span class="block">WELL?</span></p>
		<div class="cta-block__right">
			<a class="cta-block__fill" href={`mailto:${profile.email}`}>{profile.email} →</a>
			<p class="cta-block__soc">
				{#each profile.socials as s, idx}<a href={s.href}>{s.label.toUpperCase()}</a>{idx < profile.socials.length - 1 ? ' · ' : ''}{/each}
			</p>
		</div>
	</section>
</main>

<!-- Ft4 · Dense colophon -->
<footer class="colophon">
	<p>
		{profile.name.toUpperCase()} · {profile.location.toUpperCase()} · FULL STACK & MOBILE ENGINEER ·
		SET IN BRICOLAGE GROTESQUE & IBM PLEX · BUILT WITH SVELTEKIT · DHAPOER.XYZ · 2026
	</p>
</footer>

<style>
	/* ── N7 brutal slab ──────────────────────────────────────── */
	.slab {
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		gap: var(--space-md);
		padding: var(--space-sm) var(--page-gutter);
		background: var(--color-paper);
		border-bottom: var(--rule-slab) solid var(--color-ink);
	}
	.slab__mark {
		font-family: var(--font-display);
		font-weight: 800;
		letter-spacing: 0.02em;
		font-size: var(--text-md);
		color: var(--color-ink);
		text-decoration: none;
	}
	.slab__nav {
		display: flex;
		align-items: center;
		gap: var(--space-lg);
		margin-left: auto;
	}
	.slab__nav a {
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-muted);
		text-decoration: none;
		transition: color var(--dur-fast) var(--ease-out);
	}
	.slab__nav a:hover { color: var(--color-ink); }
	.slab__nav a:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }
	.slab__cta {
		color: var(--color-accent-ink) !important;
		background: var(--color-accent);
		padding: 0.35rem 0.7rem;
	}
	.slab__burger { display: none; }

	/* ── Manifesto declaration ───────────────────────────────── */
	.declare { padding: var(--space-3xl) var(--page-gutter) var(--space-2xl); }
	.declare__kicker {
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.14em;
		font-size: var(--text-sm);
		color: var(--color-accent);
		margin: 0 0 var(--space-lg);
	}
	.declare__head {
		font-size: var(--text-display);
		line-height: 0.98;
		text-transform: uppercase;
		margin: 0;
		max-width: 15ch;
	}
	.block {
		background: var(--color-accent);
		color: var(--color-accent-ink);
		padding: 0 0.15em;
		box-decoration-break: clone;
		-webkit-box-decoration-break: clone;
	}

	/* ── Claims ──────────────────────────────────────────────── */
	.claims {
		padding: var(--space-2xl) var(--page-gutter);
		border-top: var(--rule-heavy) solid var(--color-ink);
		display: grid;
		gap: var(--space-lg);
	}
	.claim { font-size: var(--text-lg); line-height: 1.35; margin: 0; max-width: 62ch; }

	/* ── Section heads ───────────────────────────────────────── */
	.section-head {
		font-size: var(--text-xl);
		text-transform: uppercase;
		margin: 0 0 var(--space-lg);
		padding-bottom: var(--space-sm);
		border-bottom: var(--rule-slab) solid var(--color-accent);
		display: inline-block;
	}

	/* ── The record ──────────────────────────────────────────── */
	.work-list { padding: var(--space-2xl) var(--page-gutter); border-top: var(--rule-heavy) solid var(--color-ink); }
	.row {
		display: grid;
		grid-template-columns: 13rem minmax(0, 1fr);
		gap: var(--space-xl);
		align-items: baseline;
		padding: var(--space-md) 0;
		border-top: var(--rule-slab) solid var(--color-rule);
	}
	.row:last-child { border-bottom: var(--rule-slab) solid var(--color-rule); }
	.row:hover { background: var(--color-paper-2); }
	.row__when {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-accent);
		font-variant-numeric: tabular-nums;
		text-transform: uppercase;
	}
	.row__body { max-width: 58ch; }
	.row__role { font-family: var(--font-display); font-weight: 700; font-size: var(--text-md); margin: 0 0 var(--space-2xs); }
	.row__note { margin: 0; font-size: var(--text-base); color: var(--color-neutral); }

	/* ── Projects ────────────────────────────────────────────── */
	.projects { padding: var(--space-2xl) var(--page-gutter); border-top: var(--rule-heavy) solid var(--color-ink); }
	.proj-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr)); gap: 0; border-left: var(--rule-hair) solid var(--color-rule); }
	.proj {
		padding: var(--space-lg);
		border-top: var(--rule-hair) solid var(--color-rule);
		border-right: var(--rule-hair) solid var(--color-rule);
		border-bottom: var(--rule-hair) solid var(--color-rule);
	}
	.proj__name { font-size: var(--text-md); font-weight: 800; margin: 0 0 var(--space-xs); }
	.proj__sum { margin: 0 0 var(--space-sm); font-size: var(--text-base); }
	.proj__stack { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-muted); text-transform: uppercase; margin: 0 0 var(--space-sm); }
	.proj__link { font-family: var(--font-mono); font-weight: 600; font-size: var(--text-sm); text-decoration: none; border-bottom: var(--rule-slab) solid var(--color-accent); }

	/* ── Creds ───────────────────────────────────────────────── */
	.creds {
		padding: var(--space-2xl) var(--page-gutter);
		border-top: var(--rule-heavy) solid var(--color-ink);
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0;
	}
	.creds__col { padding-right: var(--space-2xl); }
	.creds__col + .creds__col {
		padding-left: var(--space-2xl);
		padding-right: 0;
		border-left: var(--rule-slab) solid var(--color-rule);
	}
	.kit { margin: 0 0 var(--space-sm); font-size: var(--text-base); line-height: 1.5; }
	.kit__k {
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-size: var(--text-sm);
		color: var(--color-accent);
		margin-right: var(--space-xs);
	}
	.awards-head { margin-top: var(--space-lg); }

	/* ── CTA block ───────────────────────────────────────────── */
	.cta-block {
		padding: var(--space-3xl) var(--page-gutter);
		border-top: var(--rule-heavy) solid var(--color-ink);
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: end;
		gap: var(--space-2xl);
	}
	.cta-block__pre {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: clamp(2.5rem, 8vw, 5.5rem);
		text-transform: uppercase;
		line-height: 0.95;
		letter-spacing: -0.02em;
		margin: 0;
	}
	.cta-block__right { display: grid; gap: var(--space-md); justify-items: start; }
	.cta-block__fill {
		display: inline-block;
		background: var(--color-accent);
		color: var(--color-accent-ink);
		font-family: var(--font-mono);
		font-weight: 600;
		font-size: var(--text-md);
		padding: var(--space-md) var(--space-lg);
		text-decoration: none;
		border: var(--rule-slab) solid var(--color-accent);
		transition: background var(--dur-fast) var(--ease-out);
		word-break: break-word;
	}
	.cta-block__fill:hover { background: transparent; color: var(--color-accent); }
	.cta-block__fill:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }
	.cta-block__soc { margin: 0; }
	.cta-block__soc a {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		letter-spacing: 0.08em;
		text-decoration: none;
		border-bottom: 1px solid transparent;
	}
	.cta-block__soc a:hover { border-bottom-color: var(--color-accent); }

	/* ── Ft4 colophon ────────────────────────────────────────── */
	.colophon {
		padding: var(--space-xl) var(--page-gutter) var(--space-2xl);
		border-top: var(--rule-slab) solid var(--color-ink);
	}
	.colophon p {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: 0.04em;
		line-height: 1.8;
		color: var(--color-muted);
		margin: 0;
		max-width: 90ch;
	}

	/* ── Mobile ──────────────────────────────────────────────── */
	@media (max-width: 640px) {
		.slab__burger {
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 5px;
			width: 44px;
			height: 44px;
			margin-left: auto;
			padding: 0;
			background: none;
			border: 0;
			cursor: pointer;
		}
		.slab__burger span {
			display: block;
			height: 2px;
			width: 24px;
			background: var(--color-ink);
			transition: transform var(--dur-fast) var(--ease-out);
		}
		.slab__burger span.x:first-child { transform: translateY(3.5px) rotate(45deg); }
		.slab__burger span.x:last-child { transform: translateY(-3.5px) rotate(-45deg); }

		.slab__nav {
			display: none;
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-md);
			margin-left: 0;
			padding: var(--space-md) var(--page-gutter);
			background: var(--color-paper);
			border-bottom: var(--rule-slab) solid var(--color-ink);
		}
		.slab__nav.open { display: flex; }
		.slab__cta { align-self: flex-start; }

		.row { grid-template-columns: 1fr; gap: var(--space-2xs); }
		.row__body { max-width: none; }
		.creds { grid-template-columns: 1fr; }
		.creds__col { padding-right: 0; }
		.creds__col + .creds__col {
			padding-left: 0;
			border-left: 0;
			border-top: var(--rule-slab) solid var(--color-rule);
			padding-top: var(--space-xl);
			margin-top: var(--space-xl);
		}
		.cta-block { grid-template-columns: 1fr; align-items: start; gap: var(--space-xl); }
		.cta-block__fill { max-width: 100%; overflow-wrap: anywhere; }
	}

	@media (prefers-reduced-motion: reduce) {
		.slab__burger span,
		.slab__nav a,
		.cta-block__fill { transition: none; }
	}
</style>
