<script lang="ts">
	import { profile } from '$lib/data';
	import { getDesktop } from './desktop.svelte';
	import Window from './Window.svelte';

	const desk = getDesktop();
	// The headline is the home page's h1; on project pages the project name is.
	const heading = desk.page === 'home' ? 'h1' : 'p';
</script>

<Window id="about" title="About" width="min(760px, 56vw)" left="clamp(24px, 6vw, 96px)" top="calc(var(--menubar-h) + 5vh)">
	<div class="about">
		<p class="kicker">{profile.name} · {profile.role}</p>
		<svelte:element this={heading} class="headline">
			I build software people trade <span class="accent">real money</span> on.
		</svelte:element>
		<p class="tagline">{profile.tagline}</p>
		<div class="actions">
			<button class="btn primary" onclick={() => desk.show('contact')}>Start a project</button>
			<button class="btn" onclick={() => desk.showProject(desk.project)}>See the work</button>
		</div>
		<div class="bio">
			{#each profile.bio as para, i (i)}<p>{para}</p>{/each}
			<p class="off">Off the clock: {profile.interests.join(', ').toLowerCase()}.</p>
		</div>
	</div>
</Window>

<style>
	.about {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		padding: clamp(28px, 4vw, 48px) clamp(24px, 4vw, 52px);
	}
	.kicker { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-muted); }
	.headline {
		font-size: var(--text-display);
		font-weight: 600;
		line-height: 1;
		letter-spacing: -0.045em;
	}
	.accent { color: var(--color-accent); }
	.tagline { max-width: 36em; font-size: 1.125rem; line-height: 1.55; color: var(--color-muted); }
	.actions { display: flex; flex-wrap: wrap; gap: 12px; }
	.btn {
		min-height: 44px;
		padding: 0 22px;
		border: 0;
		border-radius: var(--radius-md);
		background: rgb(255 255 255 / 0.08);
		font-size: var(--text-base);
		font-weight: 500;
	}
	.btn:hover { background: var(--color-fill-strong); }
	.btn.primary { background: var(--color-accent-fill); color: #fff; }
	.btn.primary:hover { background: #0a78f0; }
	.bio {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding-top: var(--space-lg);
		border-top: 1px solid var(--color-fill);
		font-size: var(--text-base);
		line-height: 1.6;
		color: var(--color-text-2);
	}
	.off { color: var(--color-faint); }

	@container (max-width: 520px) {
		.headline { font-size: 2.5rem; }
	}
</style>
