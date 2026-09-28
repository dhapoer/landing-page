import { education, experience, profile, skills, type Project } from '$lib/data';

// Production origin. Canonical URLs, Open Graph and the sitemap all point here,
// so the pages.dev copies never compete with it.
export const SITE_URL = 'https://dhapoer.xyz';
export const SITE_NAME = 'Abimanyu Dharma Poernomo';

// Search copy — keep titles ≤ 60 chars and descriptions ≤ 155.
export const home = {
	title: 'Abimanyu Dharma Poernomo · Full Stack & iOS Engineer in Bali',
	description:
		'Freelance full stack and iOS engineer in Bali. Shipped fintech and crypto apps used by millions at Ajaib and INDODAX. Swift, TypeScript, React.'
};

export const absolute = (path: string) => new URL(path, SITE_URL).href;

const personId = absolute('/#person');

export function personLd() {
	const [current] = experience;
	return {
		'@type': 'Person',
		'@id': personId,
		name: profile.name,
		alternateName: 'Dhapoer',
		jobTitle: profile.role,
		description: profile.tagline,
		url: SITE_URL,
		email: `mailto:${profile.email}`,
		address: {
			'@type': 'PostalAddress',
			addressRegion: 'Bali',
			addressCountry: 'ID'
		},
		worksFor: { '@type': 'Organization', name: current.company },
		alumniOf: {
			'@type': 'CollegeOrUniversity',
			name: education[0].school
		},
		knowsAbout: skills.flatMap((s) => s.items),
		knowsLanguage: profile.languages,
		sameAs: profile.socials.map((s) => s.href)
	};
}

export function homeLd() {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': absolute('/#website'),
				url: SITE_URL,
				name: SITE_NAME,
				inLanguage: 'en'
			},
			{
				'@type': 'ProfilePage',
				'@id': absolute('/#profile'),
				url: SITE_URL,
				name: home.title,
				description: home.description,
				isPartOf: { '@id': absolute('/#website') },
				mainEntity: { '@id': personId }
			},
			personLd()
		]
	};
}

export function projectLd(p: Project) {
	const url = absolute(`/work/${p.slug}`);
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': p.device === 'paper' ? 'ScholarlyArticle' : 'CreativeWork',
				'@id': `${url}#work`,
				url,
				name: p.seo.title,
				headline: p.name,
				description: p.seo.description,
				genre: p.kind,
				keywords: p.stack.join(', '),
				author: { '@id': personId },
				...(p.link ? { sameAs: p.link } : {})
			},
			{
				'@type': 'BreadcrumbList',
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Home', item: absolute('/') },
					{ '@type': 'ListItem', position: 2, name: p.name, item: url }
				]
			},
			personLd()
		]
	};
}

// JSON inside <script> must not be able to close the tag.
export const serializeLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
