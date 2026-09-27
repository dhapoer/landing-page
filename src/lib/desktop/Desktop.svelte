<!-- Desktop OS · dark mac minimalism — the portfolio as a desktop: draggable windows, Dock, project folders.
 * Under 900px wide it becomes one full-screen sheet at a time with the Dock as a tab bar.
 * URLs: / (About), /#record, /#contact, /work/<project-slug>. Old /#work/<slug> links still open the project.
 -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { replaceState } from '$app/navigation';
	import { setDesktop } from './desktop.svelte';
	import MenuBar from './MenuBar.svelte';
	import Dock from './Dock.svelte';
	import Folders from './Folders.svelte';
	import AboutWindow from './AboutWindow.svelte';
	import RecordWindow from './RecordWindow.svelte';
	import WorkWindow from './WorkWindow.svelte';
	import ContactWindow from './ContactWindow.svelte';

	/** Index into `projects` when this page is a project page (/work/<slug>). */
	let { project }: { project?: number } = $props();

	// svelte-ignore state_referenced_locally — the page picks the starting view once.
	const desk = setDesktop(project);
	// null until mounted; afterwards the last URL we mirrored.
	let mirrored = $state<string | null>(null);

	const here = () => location.pathname + location.hash;

	onMount(() => {
		desk.applyHash(location.hash);
		mirrored = here();
	});

	// Mirror the front window into the URL once the visitor changes it, so any view can be shared.
	// Shallow: the address changes without a page load.
	$effect(() => {
		const url = desk.url;
		if (mirrored === null || url === mirrored) return;
		mirrored = url;
		replaceState(url, {});
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
	<meta name="theme-color" content="#0e0e10" />
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
