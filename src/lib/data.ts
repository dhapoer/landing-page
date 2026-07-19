// ponytail: all site content lives here — edit these, no markup changes needed.

export const profile = {
	name: 'Abimanyu Dharma Poernomo',
	role: 'Full Stack Engineer',
	tagline: 'Full stack and mobile engineer. Fintech, crypto, and the occasional lecture hall.',
	location: 'Jakarta, Indonesia',
	email: 'abimanyudharmapoernomo@gmail.com',
	bio: [
		'Full stack engineer with a decade across mobile and web — iOS at Ajaib and INDODAX, full stack at Cyan, and now independent work through Dhapoer Digital.',
		'I like problems where the engineering is load-bearing: rewriting a React Native app to native Swift, shipping features people trade real money on, keeping systems boring enough to sleep through. I also teach web development part-time at RevoU.'
	],
	interests: ['Learning', 'Coffee', 'Motorcycle', 'Watches'],
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
		summary: 'Self-employed. Building web products end to end with TypeScript and React.'
	},
	{
		company: 'RevoU',
		title: 'Lecturer',
		period: 'Jan 2023 — Present',
		summary: 'Part-time. Teaching JavaScript and web development to career-switchers.'
	},
	{
		company: 'Cyan',
		title: 'Full Stack Engineer',
		period: 'Jun 2022 — Jun 2023',
		summary:
			"Maintained and shipped new features on Cyan's main site and built its Chrome extension. Buy now, pay later for NFTs."
	},
	{
		company: 'INDODAX',
		title: 'Senior iOS Developer',
		period: 'Nov 2021 — Jun 2022',
		summary:
			"Rewrote Bitcoin.co.id's iOS app in Swift with MVVM-C, and maintained the wider iOS codebase."
	},
	{
		company: 'Ajaib',
		title: 'Senior iOS Developer',
		period: 'Jan 2020 — Oct 2021',
		summary:
			'Led the rewrite from React Native to native Swift/MVVM, then shipped Mutual Fund, Stock, and Community features. Code review and close work with product and UI/UX.'
	},
	{
		company: 'HipCar',
		title: 'Software Engineer',
		period: 'Jan 2017 — Dec 2019',
		summary:
			'Built Artemis (React.js mobile backend), the main and partner landing pages (Node.js, Vue.js), and the iOS app in Swift. Managed database and servers, and set up CI/CD with CircleCI.'
	},
	{
		company: 'Bina Nusantara University',
		title: 'System Analyst',
		period: 'Jul 2014 — Jan 2017',
		summary:
			'Progressed from Junior Programmer to System Analyst. Shipped Binus Online Learning 1.0 and 2.0, BinusMaya 2.0 and 5.0, binusian.org, and the Job Expo and paper repository sites.'
	},
	{
		company: 'Bina Nusantara University',
		title: 'Oracle Team',
		period: 'Sep 2013 — Jun 2014',
		summary:
			'ETL and data conversion from legacy systems, reporting, and custom pages on Oracle Campus Solution.'
	}
];

export const education = [
	{
		school: 'Universitas Bina Nusantara (Binus)',
		degree: 'Binus Graduate Program, Computer Science',
		period: '2016 — 2018'
	},
	{
		school: 'Universitas Bina Nusantara (Binus)',
		degree: 'BSc Computer Science',
		period: '2012 — 2016'
	}
];

export const awards = [
	{ name: 'Best Graduate Award', detail: 'Summa Cum Laude · Bina Nusantara University, 2016' },
	{ name: 'Binusian Award of Excellence', detail: 'Bina Nusantara University, 2016' }
];

export const projects = [
	{
		name: 'Ajaib iOS App',
		summary:
			'Native Swift rewrite of an Indonesian investment platform, plus mutual fund and stock trading features.',
		stack: ['Swift', 'MVVM', 'iOS'],
		demo: '',
		repo: ''
	},
	{
		name: 'Bitcoin.co.id (INDODAX)',
		summary: "iOS app for Indonesia's largest digital asset exchange, rewritten with Swift and MVVM-C.",
		stack: ['Swift', 'MVVM-C', 'iOS'],
		demo: '',
		repo: ''
	},
	{
		name: 'Cyan',
		summary: 'Buy now, pay later for NFTs — main web app and companion Chrome extension.',
		stack: ['TypeScript', 'React', 'Chrome Extension'],
		demo: '',
		repo: ''
	},
	{
		name: 'Travel Agent Sentiment Analysis',
		summary:
			'Published research measuring customer satisfaction across Traveloka, Tiket.com, and Agoda using KNN, Naïve Bayes, and SVM on Facebook data.',
		stack: ['Machine Learning', 'Research'],
		demo: 'https://ijeecs.iaescore.com/index.php/IJEECS',
		repo: ''
	}
];

export const skills = [
	{ group: 'Languages', items: ['TypeScript', 'JavaScript', 'Swift'] },
	{ group: 'Frameworks', items: ['React', 'SvelteKit', 'Node'] },
	{ group: 'Mobile', items: ['iOS', 'MVVM', 'Xcode'] },
	{ group: 'Tools', items: ['Git', 'Docker', 'Cloudflare'] }
];
