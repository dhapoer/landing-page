<script lang="ts">
	import { tick, type Snippet } from 'svelte';
	import { getDesktop, SHEET_QUERY, type WinId } from './desktop.svelte';

	let {
		id,
		title,
		subtitle = '',
		width,
		left,
		top,
		children
	}: {
		id: WinId;
		title: string;
		subtitle?: string;
		/** CSS width on desktop, e.g. 'min(760px, 58vw)' */
		width: string;
		/** CSS default position, used until the window is dragged */
		left: string;
		top: string;
		children: Snippet;
	} = $props();

	const desk = getDesktop();
	let el: HTMLElement;
	let drag: { sx: number; sy: number; ox: number; oy: number } | null = null;

	const pos = $derived(desk.pos[id]);
	const place = $derived(pos ? `left:${pos.x}px;top:${pos.y}px` : `left:${left};top:${top}`);
	// Tall windows stop above the Dock instead of running off the screen.
	const maxH = $derived(`max(260px, calc(100dvh - ${pos ? `${pos.y}px` : top} - var(--dock-space)))`);

	$effect(() => {
		if (desk.focusRequest !== id) return;
		desk.focusRequest = null;
		tick().then(() => el?.focus({ preventScroll: true }));
	});

	function down(e: PointerEvent) {
		if (e.button !== 0) return;
		if ((e.target as Element).closest('button, a')) return;
		if (matchMedia(SHEET_QUERY).matches) return;
		desk.focus(id);
		drag = { sx: e.clientX, sy: e.clientY, ox: el.offsetLeft, oy: el.offsetTop };
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		e.preventDefault();
	}

	function move(e: PointerEvent) {
		if (!drag) return;
		const w = el.offsetWidth;
		const x = Math.min(Math.max(drag.ox + e.clientX - drag.sx, 120 - w), innerWidth - 120);
		const y = Math.min(Math.max(drag.oy + e.clientY - drag.sy, 32), innerHeight - 80);
		desk.pos[id] = { x: Math.round(x), y: Math.round(y) };
	}

	function up() {
		drag = null;
	}
</script>

<!-- Pointer-down anywhere raises the window, like the Mac; keyboard users get the same via focusin. -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<section
	bind:this={el}
	class="window"
	class:is-front={desk.front === id}
	hidden={!desk.open[id]}
	aria-labelledby="{id}-title"
	tabindex="-1"
	style="--w:{width};--max-h:{maxH};z-index:{desk.z(id)};{place}"
	onpointerdown={() => desk.focus(id)}
	onfocusin={() => desk.focus(id)}
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="bar"
		onpointerdown={down}
		onpointermove={move}
		onpointerup={up}
		onpointercancel={up}
	>
		<div class="lights">
			<button class="light close" aria-label="Close {title}" onclick={() => desk.close(id)}></button>
			<button class="light min" aria-label="Minimize {title}" onclick={() => desk.close(id)}></button>
			<span class="light zoom" aria-hidden="true"></span>
		</div>
		<h2 id="{id}-title" class="title">
			{title}{#if subtitle}<span class="sub">{` — ${subtitle}`}</span>{/if}
		</h2>
	</div>
	<div class="body">
		{@render children()}
	</div>
</section>

<style>
	.window {
		position: absolute;
		width: var(--w);
		max-height: var(--max-h);
		display: flex;
		flex-direction: column;
		background: var(--color-window);
		backdrop-filter: var(--blur);
		-webkit-backdrop-filter: var(--blur);
		border: 1px solid rgb(255 255 255 / 0.09);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-back);
		overflow: hidden;
		animation: pop var(--dur) var(--ease-out);
		transition: box-shadow 0.2s;
	}
	.window[hidden] { display: none; }
	.window.is-front { box-shadow: var(--shadow-front); }
	.window:focus { outline: none; }
	.window:focus-visible { outline: 2px solid var(--color-accent); }

	.bar {
		position: relative;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		height: var(--titlebar-h);
		padding: 0 14px;
		border-bottom: 1px solid var(--color-fill);
		cursor: grab;
		touch-action: none;
		user-select: none;
	}
	.bar:active { cursor: grabbing; }

	.lights {
		position: relative;
		z-index: 1;
		display: flex;
		gap: 8px;
	}
	.light {
		width: 12px;
		height: 12px;
		padding: 0;
		border: 0;
		border-radius: 999px;
		background: var(--color-inactive);
	}
	.is-front .close { background: var(--color-close); }
	.is-front .min { background: var(--color-min); }
	.is-front .zoom { background: var(--color-zoom); }
	/* Bigger hit area without changing the look. */
	button.light { position: relative; }
	button.light::after {
		content: '';
		position: absolute;
		inset: -8px -4px;
	}

	.title {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--text-sm);
		font-weight: 500;
		color: #6e6e73;
		pointer-events: none;
	}
	.is-front .title { color: #e5e5ea; }
	.sub { font-weight: 400; white-space: pre; }

	.body {
		flex: 1;
		min-height: 0;
		overflow: auto;
		container-type: inline-size;
	}

	@keyframes pop {
		from { opacity: 0; transform: scale(0.96) translateY(10px); }
		to { opacity: 1; transform: none; }
	}

	/* Phones and small tablets: one full-screen sheet at a time. */
	@media (max-width: 899px) {
		.window {
			position: fixed;
			left: 8px !important;
			right: 8px;
			top: calc(var(--menubar-h) + 8px) !important;
			bottom: 84px;
			width: auto;
			max-height: none;
		}
		.window:not(.is-front) { display: none; }
		.bar { cursor: default; }
	}
</style>
