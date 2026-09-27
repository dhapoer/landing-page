import { education, experience, profile, skills } from '$lib/data';

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

// Every indexable path. The sitemap is built from this list.
export const pages = ['/'];

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

// JSON inside <script> must not be able to close the tag.
export const serializeLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
