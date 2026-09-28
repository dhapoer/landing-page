<script lang="ts">
	import Seo from '$lib/Seo.svelte';
	import { home, homeLd } from '$lib/seo';
	import Desktop from '$lib/desktop/Desktop.svelte';
</script>

<Seo
	title={home.title}
	description={home.description}
	path="/"
	type="profile"
	image={{ path: '/og/home.png', alt: 'About window: “I build software people trade real money on.”' }}
	jsonLd={homeLd()}
/>

<Desktop />
