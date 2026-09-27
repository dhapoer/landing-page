<script lang="ts">
	import { absolute, serializeLd, SITE_NAME } from '$lib/seo';

	let {
		title,
		description,
		path,
		type = 'website',
		jsonLd
	}: {
		title: string;
		description: string;
		/** Path on the production site, e.g. '/' or '/work/ajaib' */
		path: string;
		type?: 'website' | 'article' | 'profile';
		jsonLd?: unknown;
	} = $props();

	const url = $derived(absolute(path));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />

	{#if jsonLd}
		{@html `<script type="application/ld+json">${serializeLd(jsonLd)}</script>`}
	{/if}
</svelte:head>
