<script lang="ts">
	import Seo from '$lib/Seo.svelte';
	import { home, homeLd } from '$lib/seo';
	import Desktop from '$lib/desktop/Desktop.svelte';
</script>

<Seo title={home.title} description={home.description} path="/" type="profile" jsonLd={homeLd()} />

<Desktop />
