// ponytail: all site content lives here — edit these, no markup changes needed.

export const profile = {
	name: 'Abimanyu Dharma Poernomo',
	role: 'Full Stack Engineer',
	tagline: 'Full stack and mobile engineer. Fintech, crypto, and the occasional lecture hall.',
	location: 'Bali, Indonesia',
	email: 'hello@dhapoer.xyz',
	availability: 'Available for freelance',
	bio: [
		'Full stack engineer with a decade across mobile and web — iOS at Ajaib and INDODAX, full stack at Cyan and HipCar, and now independent work through Dhapoer Digital.',
		'I like problems where the engineering is load-bearing: rewriting a React Native app to native Swift, shipping features people trade real money on, keeping systems boring enough to sleep through. I also teach web development part-time at RevoU.'
	],
	interests: ['Learning', 'Coffee', 'Motorcycle', 'Watches'],
	languages: ['English', 'Bahasa Indonesia'],
	socials: [
		{ label: 'GitHub', href: 'https://github.com/dhapoer' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhapoer/' }
	]
};

export const experience = [
	{
		company: 'Dhapoer Digital',
		title: 'Full Stack Engineer',
		period: 'Jul 2023 — Present',
		years: '2023 —',
		summary: 'Self-employed. Building web products end to end with TypeScript and React.'
	},
	{
		company: 'RevoU',
		title: 'Lecturer',
		period: 'Jan 2023 — Present',
		years: '2023 —',
		summary: 'Part-time. Teaching JavaScript and web development to career-switchers.'
	},
	{
		company: 'Cyan',
		title: 'Fullstack Software Engineer',
		period: 'Jun 2022 — Jun 2023',
		years: '2022–23',
		summary:
			"Web3 buy now, pay later and collateralized loans for NFTs and Metaverse assets. Maintained and built new features on Cyan's main website and developed its Chrome extension apps."
	},
	{
		company: 'INDODAX',
		title: 'Senior iOS Developer',
		period: 'Nov 2021 — Jun 2022',
		years: '2021–22',
		summary:
			"Rewrote the iOS app for Indonesia's largest crypto exchange on an MVVM-C architecture in 4 months — used by 3 million users."
	},
	{
		company: 'Ajaib',
		title: 'Senior iOS Engineer',
		period: 'Jan 2020 — Oct 2021',
		years: '2020–21',
		summary:
			'Y Combinator S18 brokerage. Rewrote the app from React Native to native Swift and MVVM in 3 months, then shipped Mutual Fund, Stock, and Community features — 1 million users by Sep 2021.'
	},
	{
		company: 'HipCar',
		title: 'Full-Stack Software Engineer',
		period: 'Jan 2017 — Dec 2019',
		years: '2017–19',
		summary:
			'Designed and built the iOS app, landing site, and back office for 300 vehicles, 30 employees, and 50k users. Planned product and timelines with the CEO and led 3 engineers.'
	},
	{
		company: 'Bina Nusantara University',
		title: 'System Analyst',
		period: 'Jun 2014 — Dec 2016',
		years: '2014–16',
		summary:
			'Built a new Learning Management System for Binus Online Learning — 750+ students and 100+ lecturers — and extended legacy systems across business units.'
	},
	{
		company: 'Bina Nusantara University',
		title: 'Oracle Team',
		period: 'Sep 2013 — Jun 2014',
		years: '2013–14',
		summary:
			'ETL and data conversion from legacy systems, reporting, and custom pages on Oracle Campus Solution.'
	}
];

// `device` picks the preview frame. To show a screenshot, drop it in static/work/
// and set `image` to its path, e.g. '/work/ajaib.webp'. Without a screenshot, a
// phone shows `logo` (e.g. '/work/logos/ajaib.png') on a white launch screen.
export type Project = {
	slug: string;
	name: string;
	kind: string;
	device: 'phone' | 'browser' | 'paper';
	tint: string;
	role: string;
	period: string;
	summary: string;
	stats: { value: string; label: string }[];
	points: string[];
	stack: string[];
	link: string;
	linkLabel: string;
	image: string;
	/** Company logo for the phone launch screen (white background). */
	logo: string;
	/** Search result copy for /work/<slug>: title ≤ 60 chars, description ≤ 155. */
	seo: { title: string; description: string };
};

export const projects: Project[] = [
	{
		slug: 'ajaib',
		name: 'Ajaib',
		kind: 'iOS · Fintech · YC S18',
		device: 'phone',
		tint: '#1F4E8C',
		role: 'Senior iOS Engineer',
		period: 'Jan 2020 — Oct 2021',
		summary: 'Online brokerage for Indonesians to buy and sell stocks, ETFs, and mutual funds.',
		stats: [
			{ value: '1M', label: 'users (Sep 2021)' },
			{ value: '3 mo', label: 'native rewrite' }
		],
		points: [
			'Rewrote the app from React Native to native Swift and MVVM in 3 months',
			'Shipped the Mutual Fund, Stock, and Community features'
		],
		stack: ['Swift', 'MVVM', 'iOS'],
		link: '',
		linkLabel: '',
		image: '',
		logo: '/work/logos/ajaib.svg',
		seo: {
			title: 'Ajaib iOS App: React Native to Native Swift Rewrite',
			description:
				"Rewrote Ajaib's stock and mutual fund trading app from React Native to native Swift in 3 months, reaching 1 million users. Senior iOS, 2020–2021."
		}
	},
	{
		slug: 'indodax',
		name: 'INDODAX',
		kind: 'iOS · Crypto',
		device: 'phone',
		tint: '#0F5E57',
		role: 'Senior iOS Developer',
		period: 'Nov 2021 — Jun 2022',
		summary:
			"Indonesia's largest crypto exchange — buy and sell bitcoin and other major cryptocurrencies.",
		stats: [
			{ value: '3M', label: 'users' },
			{ value: '4 mo', label: 'full rewrite' }
		],
		points: ['Rewrote the iOS app on an MVVM-C architecture', 'Delivered the new app in 4 months'],
		stack: ['Swift', 'MVVM-C', 'iOS'],
		link: '',
		linkLabel: '',
		image: '',
		logo: '/work/logos/indodax.png',
		seo: {
			title: 'INDODAX iOS App Rewrite for 3M Crypto Traders',
			description:
				"Rewrote the iOS app for Indonesia's largest crypto exchange on MVVM-C in 4 months, used by 3 million people. Senior iOS Developer, 2021–2022."
		}
	},
	{
		slug: 'cyan',
		name: 'Cyan',
		kind: 'Web3 · NFT',
		device: 'browser',
		tint: '#1E6F86',
		role: 'Fullstack Software Engineer',
		period: 'Jun 2022 — Jun 2023',
		summary: 'Buy now, pay later — or a collateralized loan — for NFTs and Metaverse assets.',
		stats: [],
		points: [
			"Maintained and built new features on Cyan's main website",
			'Developed the Chrome extension apps'
		],
		stack: ['TypeScript', 'React', 'Chrome Extension'],
		link: '',
		linkLabel: '',
		image: '',
		logo: '',
		seo: {
			title: 'Cyan: Web3 Buy Now, Pay Later for NFTs',
			description:
				'Full stack work on Cyan, a Web3 platform for buy now, pay later and collateralized loans on NFTs: main web app and Chrome extension, 2022–2023.'
		}
	},
	{
		slug: 'hipcar',
		name: 'HipCar',
		kind: 'Mobility · Full stack',
		device: 'phone',
		tint: '#6B3FA0',
		role: 'Full-Stack Software Engineer',
		period: 'Jan 2017 — Dec 2019',
		summary: 'On-demand car booking platform in Indonesia.',
		stats: [
			{ value: '50k', label: 'users' },
			{ value: '300', label: 'vehicles' },
			{ value: '3', label: 'engineers led' }
		],
		points: [
			'Designed and built the iOS app, landing site, and back office',
			'Planned product and timelines directly with the CEO'
		],
		stack: ['Swift', 'React', 'Node.js', 'CircleCI'],
		link: '',
		linkLabel: '',
		image: '',
		logo: '/work/logos/hipcar.png',
		seo: {
			title: 'HipCar: Car Booking App, Website and Back Office',
			description:
				"Built HipCar's iOS app, landing site and back office for 300 vehicles and 50k users, and led 3 engineers. Full-stack engineer, 2017–2019."
		}
	},
	{
		slug: 'binus',
		name: 'Binus',
		kind: 'EdTech · LMS',
		device: 'browser',
		tint: '#8A4B14',
		role: 'System Analyst',
		period: 'Jun 2014 — Dec 2016',
		summary:
			'A new Learning Management System for Binus Online Learning, undergraduate and master’s.',
		stats: [
			{ value: '750+', label: 'students' },
			{ value: '100+', label: 'lecturers' }
		],
		points: [
			'Designed the LMS with the academic, operations, and design teams',
			'Supported and extended legacy systems across business units'
		],
		stack: ['SQL Server', 'Web'],
		link: '',
		linkLabel: '',
		image: '/work/binus.webp',
		logo: '',
		seo: {
			title: 'Binus Online Learning LMS for 750+ Students',
			description:
				'Designed and built a Learning Management System for Binus Online Learning, serving 750+ students and 100+ lecturers. System Analyst, 2014–2016.'
		}
	},
	{
		slug: 'research',
		name: 'Research',
		kind: 'Published paper',
		device: 'paper',
		tint: '#3A3A3C',
		role: 'Author',
		period: 'IJEECS',
		summary:
			'Travel agent sentiment analysis — customer satisfaction across Traveloka, Tiket.com, and Agoda, measured from Facebook data.',
		stats: [{ value: '3', label: 'models compared' }],
		points: ['Compared KNN, Naïve Bayes, and SVM', 'Sentiment analysis on social media data'],
		stack: ['Machine Learning', 'Research'],
		link: 'https://ijeecs.iaescore.com/index.php/IJEECS',
		linkLabel: 'Journal',
		image: '',
		logo: '',
		seo: {
			title: 'Travel Agent Sentiment Analysis (IJEECS Paper)',
			description:
				'Published research comparing KNN, Naïve Bayes and SVM to measure customer satisfaction with Traveloka, Tiket.com and Agoda from Facebook data.'
		}
	}
];

export const skills = [
	{ group: 'Languages', items: ['Swift', 'TypeScript', 'JavaScript', 'Go', 'HTML'] },
	{ group: 'Frameworks', items: ['React', 'Node.js', 'SvelteKit', 'MVVM / MVVM-C'] },
	{ group: 'Data', items: ['MySQL', 'SQL Server', 'Redis'] },
	{ group: 'Tools', items: ['Git', 'CircleCI', 'Docker', 'Dokku', 'DigitalOcean', 'Cloudflare'] }
];

export const education = [
	{
		school: 'Bina Nusantara University',
		degree: 'Master of Computer Science',
		major: 'Information Engineering · GPA 3.72 / 4.0',
		period: 'Mar 2016 — Mar 2018'
	},
	{
		school: 'Bina Nusantara University',
		degree: 'Bachelor of Computer Science',
		major: 'Database Technology · GPA 4.0 / 4.0',
		period: 'Sep 2012 — Feb 2016'
	}
];

export const awards = [
	{ name: 'Best Graduate Award', detail: 'Summa Cum Laude · Bina Nusantara University, 2016' },
	{ name: 'Binusian Award of Excellence', detail: 'Bina Nusantara University, 2016' }
];
