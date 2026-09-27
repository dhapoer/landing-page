<script lang="ts">
	import { projects } from '$lib/data';
	import { getDesktop } from './desktop.svelte';
	import Preview from './Preview.svelte';
	import Window from './Window.svelte';
	import { inPlace } from './nav';

	const desk = getDesktop();
	const p = $derived(projects[desk.project]);
	const n = projects.length;
	const prev = $derived(projects[(desk.project - 1 + n) % n]);
	const next = $derived(projects[(desk.project + 1) % n]);
	// On /work/<slug> the project name is the page's main heading.
	const heading = $derived(desk.page === 'project' ? 'h1' : 'h3');
</script>

<Window id="work" title="Work" subtitle={p.name} width="min(900px, 68vw)" left="clamp(24px, 16vw, 260px)" top="calc(var(--menubar-h) + 9vh)">
	<div class="work">
		<nav class="side" aria-label="Projects">
			<p class="side-head">Projects</p>
			<ul>
				{#each projects as item, i (item.slug)}
					<li>
						<a
							class="side-item"
							href="/work/{item.slug}"
							aria-current={desk.project === i ? 'page' : undefined}
							onclick={inPlace(() => (desk.project = i))}
						>
							<svg width="16" height="13" viewBox="0 0 54 42" aria-hidden="true">
								<path d="M1 6a4 4 0 0 1 4-4h13l5 5h26a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4Z" fill="var(--color-accent)" />
							</svg>
							{item.name}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		{#key p.slug}
			<article class="detail" aria-live="polite">
				<Preview project={p} />
				<div class="info">
					<p class="kind">{p.kind}</p>
					<svelte:element this={heading} class="name">{p.name}</svelte:element>
					<p class="meta">{p.role} · {p.period}</p>
					<p class="summary">{p.summary}</p>
					{#if p.stats.length}
						<ul class="stats">
							{#each p.stats as s (s.label)}
								<li><span class="value">{s.value}</span><span class="label">{s.label}</span></li>
							{/each}
						</ul>
					{/if}
					<ul class="points">
						{#each p.points as pt (pt)}<li>{pt}</li>{/each}
					</ul>
					<div class="foot">
						<ul class="chips">
							{#each p.stack as s (s)}<li>{s}</li>{/each}
						</ul>
						{#if p.link}
							<a class="open" href={p.link} target="_blank" rel="noopener">{p.linkLabel} ↗</a>
						{/if}
					</div>
				</div>
			</article>
		{/key}
	</div>
	<div class="pager">
		<a href="/work/{prev.slug}" onclick={inPlace(() => desk.showProject(desk.project - 1, false))}>← {prev.name}</a>
		<span class="count">{desk.project + 1} of {n}</span>
		<a href="/work/{next.slug}" onclick={inPlace(() => desk.showProject(desk.project + 1, false))}>{next.name} →</a>
	</div>
</Window>

<style>
	.work { display: flex; min-height: 0; }

	.side {
		width: 180px;
		flex-shrink: 0;
		padding: 12px 8px;
		background: rgb(255 255 255 / 0.03);
		border-right: 1px solid var(--color-fill);
	}
	.side-head { padding: 4px 10px 8px; font-size: 0.6875rem; font-weight: 600; color: var(--color-faint); }
	.side ul { display: flex; flex-direction: column; gap: 2px; margin: 0; padding: 0; list-style: none; }
	.side-item {
		width: 100%;
		color: var(--color-text);
		text-decoration: none;
		cursor: default;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 7px 10px;
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		font-size: var(--text-sm);
		text-align: left;
	}
	.side-item:hover { background: var(--color-fill); }
	.side-item[aria-current='page'] { background: var(--color-fill-strong); }

	.detail {
		flex: 1;
		min-width: 0;
		display: grid;
		grid-template-columns: 230px minmax(0, 1fr);
		gap: 28px;
		padding: 26px 28px;
		animation: swap 0.3s var(--ease-out);
	}
	.info { display: flex; flex-direction: column; gap: 12px; }
	.kind { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-accent); }
	.name { font-size: var(--text-xl); font-weight: 600; line-height: 1.1; letter-spacing: -0.03em; }
	.meta { font-size: var(--text-sm); color: var(--color-muted); }
	.summary { font-size: var(--text-base); line-height: 1.55; color: var(--color-text-2); }

	.stats { display: flex; flex-wrap: wrap; gap: 10px; margin: 0; padding: 0; list-style: none; }
	.stats li {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 96px;
		padding: 10px 14px;
		border-radius: var(--radius-md);
		background: var(--color-fill);
	}
	.value { font-size: var(--text-lg); font-weight: 600; letter-spacing: -0.02em; color: var(--color-accent); }
	.label { font-size: var(--text-xs); color: var(--color-muted); }

	.points { display: flex; flex-direction: column; gap: 8px; margin: 0; padding: 0; list-style: none; }
	.points li { position: relative; padding-left: 15px; font-size: 0.875rem; line-height: 1.45; color: #e5e5ea; }
	.points li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.5em;
		width: 5px;
		height: 5px;
		border-radius: 999px;
		background: var(--color-accent);
	}

	.foot { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: auto; padding-top: 4px; }
	.chips { display: flex; flex-wrap: wrap; gap: 6px; margin: 0; padding: 0; list-style: none; }
	.chips li { padding: 4px 11px; border-radius: 999px; background: rgb(255 255 255 / 0.08); font-size: var(--text-sm); }
	.open {
		margin-left: auto;
		display: inline-flex;
		align-items: center;
		min-height: 36px;
		padding: 0 14px;
		border-radius: 8px;
		background: var(--color-accent-fill);
		color: #fff;
		font-size: var(--text-sm);
		font-weight: 500;
		text-decoration: none;
	}

	.pager {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 14px;
		border-top: 1px solid var(--color-fill);
	}
	.pager a {
		display: inline-flex;
		align-items: center;
		color: var(--color-text);
		text-decoration: none;
		cursor: default;
		min-height: 32px;
		padding: 0 12px;
		border: 0;
		border-radius: 7px;
		background: var(--color-fill);
		font-size: var(--text-sm);
	}
	.pager a:hover { background: var(--color-fill-strong); }
	.count { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-faint); }

	@keyframes swap {
		from { opacity: 0; transform: translateX(10px); }
		to { opacity: 1; transform: none; }
	}

	/* Narrow window or phone sheet: project chips on top, preview above the text. */
	@container (max-width: 700px) {
		.work { flex-direction: column; }
		.side { width: auto; border-right: 0; border-bottom: 1px solid var(--color-fill); }
		.side-head { display: none; }
		.side ul { flex-direction: row; overflow-x: auto; }
		.side-item { width: auto; white-space: nowrap; }
		.detail { grid-template-columns: minmax(0, 1fr); padding: 20px; }
	}
</style>
