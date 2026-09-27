<script lang="ts">
	import { awards, education, experience, profile, skills } from '$lib/data';
	import Window from './Window.svelte';

	const tabs = ['Experience', 'Stack', 'Education'] as const;
	let tab = $state<(typeof tabs)[number]>('Experience');
	let job = $state(0);
</script>

<Window id="record" title="Record" width="min(620px, 46vw)" left="calc(100vw - min(620px, 46vw) - 150px)" top="calc(var(--menubar-h) + 24vh)">
	<div class="tabs" role="tablist" aria-label="Record sections">
		{#each tabs as t (t)}
			<button
				role="tab"
				id="tab-{t}"
				aria-selected={tab === t}
				aria-controls="panel-{t}"
				class="tab"
				onclick={() => (tab = t)}>{t}</button
			>
		{/each}
	</div>

	<div id="panel-Experience" role="tabpanel" aria-labelledby="tab-Experience" hidden={tab !== 'Experience'}>
		<div class="head" aria-hidden="true"><span>Company</span><span>Role</span><span class="r">Years</span></div>
		<ul class="rows">
			{#each experience as j, i (i)}
				<li>
					<button class="row" class:on={job === i} aria-pressed={job === i} onclick={() => (job = i)}>
						<span class="co">{j.company}</span>
						<span class="muted">{j.title}</span>
						<span class="muted mono r">{j.years}</span>
					</button>
				</li>
			{/each}
		</ul>
		<div class="note" aria-live="polite">
			<p class="mono muted">{experience[job].period}</p>
			<p>{experience[job].summary}</p>
		</div>
	</div>

	<div id="panel-Stack" role="tabpanel" aria-labelledby="tab-Stack" class="panel" hidden={tab !== 'Stack'}>
		{#each skills as s (s.group)}
			<div class="group">
				<h3>{s.group}</h3>
				<ul class="chips">
					{#each s.items as item (item)}<li>{item}</li>{/each}
				</ul>
			</div>
		{/each}
	</div>

	<div id="panel-Education" role="tabpanel" aria-labelledby="tab-Education" class="panel" hidden={tab !== 'Education'}>
		{#each education as e (e.degree)}
			<div class="entry">
				<h3>{e.degree}</h3>
				<p class="muted">{e.school} · {e.period}</p>
				<p class="muted">{e.major}</p>
			</div>
		{/each}
		{#each awards as a (a.name)}
			<div class="entry">
				<h3>{a.name}</h3>
				<p class="muted">{a.detail}</p>
			</div>
		{/each}
		<p class="muted">Languages: {profile.languages.join(' and ')}</p>
	</div>
</Window>

<style>
	.tabs {
		display: flex;
		gap: 2px;
		width: max-content;
		margin: 12px auto 4px;
		padding: 2px;
		border-radius: 8px;
		background: var(--color-fill);
	}
	.tab {
		min-height: 28px;
		padding: 0 14px;
		border: 0;
		border-radius: 6px;
		background: transparent;
		font-size: var(--text-sm);
		color: var(--color-muted);
	}
	.tab[aria-selected='true'] { background: #48484a; color: var(--color-text); }

	[hidden] { display: none !important; }

	.head,
	.row {
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) 72px;
		gap: 16px;
	}
	.head {
		padding: 10px 20px;
		border-bottom: 1px solid var(--color-fill);
		font-size: var(--text-xs);
		color: var(--color-faint);
	}
	.rows { margin: 0; padding: 6px 8px; list-style: none; }
	.rows li:nth-child(even) .row:not(.on) { background: rgb(255 255 255 / 0.03); }
	.row {
		width: 100%;
		padding: 9px 12px;
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		font-size: 0.875rem;
		text-align: left;
	}
	.row.on { background: var(--color-accent-fill); }
	.row.on .muted { color: rgb(255 255 255 / 0.85); }
	.co { font-weight: 500; }
	.r { text-align: right; }
	.note {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 14px 20px 18px;
		border-top: 1px solid var(--color-fill);
		font-size: 0.875rem;
		line-height: 1.55;
		color: var(--color-text-2);
	}

	.panel { display: flex; flex-direction: column; gap: 18px; padding: 16px 20px 22px; }
	h3 { font-size: var(--text-base); font-weight: 600; }
	.group { display: flex; flex-direction: column; gap: 8px; }
	.chips { display: flex; flex-wrap: wrap; gap: 6px; margin: 0; padding: 0; list-style: none; }
	.chips li {
		padding: 4px 11px;
		border-radius: 999px;
		background: rgb(255 255 255 / 0.08);
		font-size: var(--text-sm);
	}
	.entry { display: flex; flex-direction: column; gap: 2px; font-size: 0.875rem; }

	.muted { color: var(--color-muted); }
	.mono { font-family: var(--font-mono); font-size: var(--text-xs); }

	@container (max-width: 460px) {
		.head, .row { grid-template-columns: minmax(0, 1fr) 64px; }
		.head span:nth-child(2), .row span:nth-child(2) { display: none; }
	}
</style>
