import { error } from '@sveltejs/kit';
import { projects } from '$lib/data';
import type { EntryGenerator, PageLoad } from './$types';

// Prerender one page per project in data.ts.
export const entries: EntryGenerator = () => projects.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const index = projects.findIndex((p) => p.slug === params.slug);
	if (index < 0) error(404, 'Project not found');
	return { index };
};
