<script lang="ts">
	import Seo from '$lib/Seo.svelte';
	import { projects } from '$lib/data';
	import { projectLd } from '$lib/seo';
	import Desktop from '$lib/desktop/Desktop.svelte';

	let { data } = $props();
	const p = $derived(projects[data.index]);
</script>

<Seo
	title={p.seo.title}
	description={p.seo.description}
	path="/work/{p.slug}"
	type="article"
	jsonLd={projectLd(p)}
/>

<!-- Remount per project so client-side navigation between projects starts clean. -->
{#key data.index}
	<Desktop project={data.index} />
{/key}
