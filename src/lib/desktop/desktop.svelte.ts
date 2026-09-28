import { getContext, setContext } from 'svelte';
import { projects } from '$lib/data';

export const WIN_IDS = ['about', 'work', 'record', 'contact'] as const;
export type WinId = (typeof WIN_IDS)[number];
type Pos = { x: number; y: number };

// Below this width windows become full-screen sheets and dragging is off.
export const SHEET_QUERY = '(max-width: 899px)';

export class Desktop {
	/** 'project' on /work/<slug>: the project's name is the page heading. */
	page: 'home' | 'project' = 'home';
	// Home opens on the pitch (About) with the way to reach out (Contact) beside it.
	open = $state<Record<WinId, boolean>>({ about: true, work: false, record: false, contact: true });
	// null = still at its CSS default spot; set once the window is dragged.
	pos = $state<Record<WinId, Pos | null>>({ about: null, work: null, record: null, contact: null });
	// Open windows, back to front.
	order = $state<WinId[]>(['contact', 'about']);
	project = $state(0);
	// A window asks for keyboard focus after the user opens it.
	focusRequest = $state<WinId | null>(null);

	front = $derived(this.order.at(-1) ?? null);

	constructor(project?: number) {
		if (project === undefined) return;
		this.page = 'project';
		this.project = project;
		// Project pages: the project in front, About and Record behind it.
		this.open = { about: true, work: true, record: true, contact: false };
		this.order = ['record', 'about', 'work'];
	}

	z(id: WinId) {
		return 10 + Math.max(0, this.order.indexOf(id));
	}

	focus(id: WinId) {
		if (!this.open[id] || this.front === id) return;
		this.order = [...this.order.filter((k) => k !== id), id];
	}

	show(id: WinId, moveFocus = true) {
		this.open[id] = true;
		this.order = [...this.order.filter((k) => k !== id), id];
		if (moveFocus) this.focusRequest = id;
	}

	close(id: WinId) {
		this.open[id] = false;
		this.order = this.order.filter((k) => k !== id);
	}

	showProject(index: number, moveFocus = true) {
		this.project = (index + projects.length) % projects.length;
		this.show('work', moveFocus);
	}

	// Keep dragged windows reachable after the viewport shrinks.
	clamp(width: number, height: number) {
		for (const id of WIN_IDS) {
			const p = this.pos[id];
			if (!p) continue;
			const x = Math.min(Math.max(p.x, 0), Math.max(0, width - 160));
			const y = Math.min(Math.max(p.y, 32), Math.max(32, height - 120));
			if (x !== p.x || y !== p.y) this.pos[id] = { x, y };
		}
	}

	// Address for the current view: /work/<slug> for a project, / otherwise
	// (with #record or #contact when one of those is in front).
	get url() {
		const id = this.front;
		if (id === 'work') return `/work/${projects[this.project].slug}`;
		if (id === 'record' || id === 'contact') return `/#${id}`;
		return '/';
	}

	// #about, #record, #contact, #work, #work/<slug>
	applyHash(hash: string) {
		const [id, slug] = hash.replace(/^#/, '').split('/');
		if (!(WIN_IDS as readonly string[]).includes(id)) return;
		if (id === 'work' && slug) {
			const i = projects.findIndex((p) => p.slug === slug);
			if (i >= 0) this.project = i;
		}
		this.show(id as WinId, false);
	}
}

const KEY = Symbol('desktop');

export function setDesktop(project?: number) {
	return setContext(KEY, new Desktop(project));
}

export function getDesktop() {
	return getContext<Desktop>(KEY);
}
