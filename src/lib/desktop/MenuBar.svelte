<script lang="ts">
	import { profile } from '$lib/data';
	import { getDesktop, WIN_IDS } from './desktop.svelte';

	const desk = getDesktop();
	const labels = { about: 'About', work: 'Work', record: 'Record', contact: 'Contact' } as const;
</script>

<header class="menubar">
	<nav aria-label="Primary">
		<span class="brand">Dhapoer</span>
		{#each WIN_IDS as id (id)}
			<button class="item" onclick={() => desk.show(id)}>{labels[id]}</button>
		{/each}
	</nav>
	<div class="status">
		<span class="live"><span class="dot" aria-hidden="true"></span>{profile.availability}</span>
		<span class="place">{profile.location.replace('Indonesia', 'ID')}</span>
	</div>
</header>

<style>
	.menubar {
		position: fixed;
		inset: 0 0 auto;
		z-index: 100;
		height: var(--menubar-h);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 12px;
		background: var(--color-chrome);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-bottom: 1px solid rgb(255 255 255 / 0.06);
		font-size: var(--text-sm);
	}
	nav { display: flex; align-items: center; gap: 2px; }
	.brand { padding: 0 10px; font-weight: 700; }
	.item {
		height: 24px;
		padding: 0 10px;
		border: 0;
		border-radius: 5px;
		background: transparent;
		color: #d1d1d6;
	}
	.item:hover { background: rgb(255 255 255 / 0.1); }
	.status { display: flex; align-items: center; gap: 18px; padding-right: 8px; color: #d1d1d6; }
	.live { display: flex; align-items: center; gap: 6px; }
	.dot { width: 7px; height: 7px; border-radius: 999px; background: var(--color-live); }

	@media (max-width: 899px) {
		.item, .place { display: none; }
	}
</style>
