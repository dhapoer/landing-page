<script lang="ts">
	import { projects } from '$lib/data';
	import { getDesktop } from './desktop.svelte';

	const desk = getDesktop();
</script>

<ul class="folders" aria-label="Projects">
	{#each projects as p, i (p.slug)}
		<li>
			<button
				class="folder"
				class:selected={desk.open.work && desk.project === i}
				onclick={() => desk.showProject(i)}
			>
				<svg width="54" height="42" viewBox="0 0 54 42" aria-hidden="true">
					<path
						d="M1 6a4 4 0 0 1 4-4h13l5 5h26a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4Z"
						fill="var(--color-accent)"
						fill-opacity="0.85"
					/>
					<path d="M1 13h52v24a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4Z" fill="var(--color-accent)" />
				</svg>
				<span class="name">{p.name}</span>
			</button>
		</li>
	{/each}
</ul>

<style>
	.folders {
		position: absolute;
		right: 28px;
		top: calc(var(--menubar-h) + 28px);
		display: flex;
		flex-direction: column;
		gap: 14px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.folder {
		width: 92px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 6px 0;
		border: 0;
		border-radius: 8px;
		background: transparent;
		font-size: var(--text-xs);
		text-align: center;
	}
	.folder:hover { background: var(--color-fill); }
	.name { padding: 1px 6px; border-radius: 4px; }
	.selected .name { background: var(--color-accent-fill); }

	@media (max-height: 760px) and (min-width: 900px) {
		.folders { flex-flow: column wrap; max-height: calc(100dvh - 160px); align-content: flex-end; }
	}

	/* Behind the sheets on phones: a home-screen grid. */
	@media (max-width: 899px) {
		.folders {
			left: 16px;
			right: 16px;
			top: calc(var(--menubar-h) + 24px);
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 20px 8px;
		}
		.folder { width: 100%; }
	}
</style>
