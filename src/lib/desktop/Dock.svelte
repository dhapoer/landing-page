<script lang="ts">
	import { profile } from '$lib/data';
	import { getDesktop, WIN_IDS } from './desktop.svelte';
	import Icon from './Icon.svelte';
	import { icons } from './icons';

	const desk = getDesktop();
	const labels = { about: 'About', work: 'Work', record: 'Record', contact: 'Contact' } as const;
	const socialIcon = (label: string) => (label === 'GitHub' ? icons.github : icons.linkedin);
</script>

<nav class="dock" aria-label="Dock">
	{#each WIN_IDS as id (id)}
		<div class="slot">
			<button class="tile" class:accent={id === 'contact'} aria-label={labels[id]} onclick={() => desk.show(id)}>
				<Icon path={icons[id]} />
			</button>
			<span class="label" aria-hidden="true">{labels[id]}</span>
			<span class="running" class:on={desk.open[id]} aria-hidden="true"></span>
		</div>
	{/each}
	<span class="divider" aria-hidden="true"></span>
	{#each profile.socials as s (s.href)}
		<div class="slot">
			<a class="tile" href={s.href} aria-label={s.label} rel="me noopener" target="_blank">
				<Icon path={socialIcon(s.label)} />
			</a>
			<span class="label" aria-hidden="true">{s.label}</span>
			<span class="running" aria-hidden="true"></span>
		</div>
	{/each}
</nav>

<style>
	.dock {
		position: fixed;
		left: 50%;
		bottom: 14px;
		z-index: 100;
		transform: translateX(-50%);
		display: flex;
		align-items: flex-end;
		gap: 10px;
		padding: 8px 10px 4px;
		background: var(--color-dock);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		border: 1px solid var(--color-hair);
		border-radius: var(--radius-xl);
	}
	.slot {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3px;
	}
	.tile {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		border-radius: 12px;
		background: var(--color-tile);
		color: var(--color-text);
		transition: transform 0.18s var(--ease-out);
	}
	.tile.accent { background: var(--color-accent-fill); color: #fff; }
	.tile:hover { transform: translateY(-6px) scale(1.08); }
	.label {
		position: absolute;
		bottom: calc(100% + 10px);
		padding: 3px 9px;
		border-radius: var(--radius-sm);
		background: var(--color-window-solid);
		border: 1px solid var(--color-hair);
		font-size: var(--text-xs);
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		transition: opacity var(--dur-fast);
	}
	.slot:hover .label { opacity: 1; }
	.running { width: 4px; height: 4px; border-radius: 999px; }
	.running.on { background: #e5e5ea; }
	.divider {
		align-self: center;
		width: 1px;
		height: 40px;
		margin-bottom: 7px;
		background: var(--color-fill-strong);
	}

	@media (max-width: 899px) {
		.dock { left: 8px; right: 8px; bottom: 8px; transform: none; justify-content: space-around; }
		.tile:hover { transform: none; }
		.label { display: none; }
	}
</style>
