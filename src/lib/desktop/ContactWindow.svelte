<script lang="ts">
	import { profile } from '$lib/data';
	import Window from './Window.svelte';

	// About's default right edge (its left + width in AboutWindow.svelte).
	const aboutRight = '(clamp(24px, 6vw, 96px) + min(720px, 50vw))';
</script>

<!-- Opens beside About: starts 24px right of it and shrinks before it reaches the folders. -->
<Window
	id="contact"
	title="Contact"
	width="min(420px, calc(100vw - {aboutRight} - 24px - 150px))"
	left="calc({aboutRight} + 24px)"
	top="calc(var(--menubar-h) + 5vh)"
>
	<div class="contact">
		<p class="head">Want something built well?</p>
		<p class="muted">{profile.availability} — web, mobile, or both.</p>
		<a class="email" href="mailto:{profile.email}">{profile.email}</a>
		<div class="socials">
			{#each profile.socials as s (s.href)}
				<a href={s.href} target="_blank" rel="me noopener">{s.label}</a>
			{/each}
		</div>
	</div>
</Window>

<style>
	.contact { display: flex; flex-direction: column; gap: 16px; padding: 28px; }
	.head { font-size: var(--text-lg); font-weight: 600; letter-spacing: -0.02em; }
	.muted { font-size: var(--text-base); line-height: 1.5; color: var(--color-muted); }
	.email,
	.socials a {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
		border-radius: var(--radius-md);
		font-size: var(--text-base);
		text-decoration: none;
	}
	.email { background: var(--color-accent-fill); color: #fff; font-weight: 500; }
	.email:hover { background: #0a78f0; }
	.socials { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
	.socials a { background: rgb(255 255 255 / 0.08); }
	.socials a:hover { background: var(--color-fill-strong); }
</style>
