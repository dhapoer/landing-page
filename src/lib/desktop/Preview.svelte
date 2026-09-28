<script lang="ts">
	import type { Project } from '$lib/data';

	let { project }: { project: Project } = $props();
</script>

<div class="stage" aria-hidden={project.image || project.logo ? undefined : 'true'}>
	{#if project.device === 'phone'}
		<div class="phone">
			<!-- White launch screen: the app's logo, or its name until a logo is added. -->
			<div class="screen">
				{#if project.image}
					<img src={project.image} alt="{project.name} app screenshot" loading="lazy" />
				{:else if project.logo}
					<img class="logo" src={project.logo} alt="{project.name} logo" loading="lazy" />
				{:else}
					<span class="name">{project.name}</span>
				{/if}
			</div>
		</div>
	{:else if project.device === 'browser'}
		<div class="browser">
			<div class="chrome"><span></span><span></span><span></span></div>
			<div class="page" class:shot={project.image} style="background:{project.tint}">
				{#if project.image}
					<img src={project.image} alt="{project.name} website screenshot" loading="lazy" />
				{:else}
					<span class="name">{project.name}</span><span>Screenshot coming soon</span>
				{/if}
			</div>
		</div>
	{:else}
		<div class="paper">
			<span class="journal">{project.period}</span>
			<span class="paper-title">Travel Agent Sentiment Analysis</span>
			<span class="line"></span><span class="line"></span><span class="line short"></span>
			<span class="line"></span><span class="line mid"></span>
		</div>
	{/if}
</div>

<style>
	.stage {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 300px;
		padding: 20px;
		border-radius: 12px;
		background: rgb(255 255 255 / 0.04);
	}
	.name { font-size: 1.25rem; font-weight: 700; }
	img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }

	.phone {
		width: 160px;
		height: 330px;
		padding: 8px;
		border-radius: 30px;
		background: #000;
		border: 1px solid rgb(255 255 255 / 0.18);
	}
	.screen,
	.page {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
		overflow: hidden;
		font-size: var(--text-xs);
		text-align: center;
		color: rgb(255 255 255 / 0.9);
	}
	.screen { border-radius: 23px; background: #fff; color: #1c1c1e; }
	.screen .logo {
		width: auto;
		height: auto;
		max-width: 72%;
		max-height: 56px;
		object-fit: contain;
	}

	.browser {
		width: 100%;
		max-width: 260px;
		border-radius: var(--radius-md);
		overflow: hidden;
		border: 1px solid rgb(255 255 255 / 0.18);
		background: var(--color-window-solid);
	}
	.chrome { display: flex; gap: 5px; padding: 8px 10px; border-bottom: 1px solid var(--color-hair); }
	.chrome span { width: 7px; height: 7px; border-radius: 999px; background: var(--color-inactive); }
	.page { height: 170px; }
	/* A real screenshot keeps its own proportions instead of being cropped. */
	.page.shot { height: auto; }
	.page.shot img { height: auto; }

	.paper {
		width: 170px;
		height: 230px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 18px 16px;
		border-radius: 4px;
		background: #f2f2f4;
		color: #1c1c1e;
	}
	.journal { font-size: 0.5625rem; letter-spacing: 0.08em; color: #6e6e73; }
	.paper-title { font-size: 0.75rem; font-weight: 700; line-height: 1.25; }
	.line { height: 4px; background: #d1d1d6; }
	.short { width: 70%; }
	.mid { width: 85%; }
</style>
