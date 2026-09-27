<!-- Desktop OS · dark mac minimalism — the portfolio as a desktop: draggable windows, Dock, project folders.
 * Under 900px wide it becomes one full-screen sheet at a time with the Dock as a tab bar.
 * Deep links: #about, #record, #contact, #work, #work/<project-slug>
 -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { profile } from '$lib/data';
	import { setDesktop } from '$lib/desktop/desktop.svelte';
	import MenuBar from '$lib/desktop/MenuBar.svelte';
	import Dock from '$lib/desktop/Dock.svelte';
	import Folders from '$lib/desktop/Folders.svelte';
	import AboutWindow from '$lib/desktop/AboutWindow.svelte';
	import RecordWindow from '$lib/desktop/RecordWindow.svelte';
	import WorkWindow from '$lib/desktop/WorkWindow.svelte';
	import ContactWindow from '$lib/desktop/ContactWindow.svelte';

	const desk = setDesktop();
	// null until mounted; afterwards the last hash we mirrored.
	let mirrored = $state<string | null>(null);

	onMount(() => {
		desk.applyHash(location.hash);
		mirrored = desk.hash;
	});

	// Mirror the front window into the URL once the visitor changes it, so any view can be shared.
	$effect(() => {
		const hash = desk.hash;
		if (mirrored === null || hash === mirrored) return;
		mirrored = hash;
		history.replaceState(history.state, '', hash || location.pathname);
	});

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && desk.front) desk.close(desk.front);
	}
</script>

<svelte:window
	{onkeydown}
	onhashchange={() => desk.applyHash(location.hash)}
	onresize={() => desk.clamp(innerWidth, innerHeight)}
/>

<svelte:head>
	<title>{profile.name} — {profile.role}</title>
	<meta name="description" content={profile.tagline} />
	<meta name="theme-color" content="#0e0e10" />
	<meta property="og:title" content={`${profile.name} — ${profile.role}`} />
	<meta property="og:description" content={profile.tagline} />
	<meta property="og:type" content="website" />
</svelte:head>

<MenuBar />

<main class="desktop">
	<Folders />
	<AboutWindow />
	<WorkWindow />
	<RecordWindow />
	<ContactWindow />
</main>

<Dock />

<style>
	.desktop {
		position: fixed;
		inset: 0;
		overflow: hidden;
		background:
			radial-gradient(900px 600px at 70% 20%, var(--color-glow) 0%, transparent 70%),
			var(--color-desktop);
	}
</style>
