<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	// Self-hosted Geist (latin only, the weights the design uses). Macs use the system face first.
	import '@fontsource/geist-sans/latin-400.css';
	import '@fontsource/geist-sans/latin-500.css';
	import '@fontsource/geist-sans/latin-600.css';
	import '@fontsource/geist-sans/latin-700.css';
	import '@fontsource/geist-mono/latin-400.css';
	import '@fontsource/geist-mono/latin-500.css';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/manifest.webmanifest" />
</svelte:head>

{@render children()}
