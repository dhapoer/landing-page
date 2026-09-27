// Project links are real <a href="/work/<slug>"> so crawlers can follow them.
// A plain click opens the project in place instead of loading a new page;
// cmd/ctrl/shift/middle-click keep the browser's usual behaviour.
export function inPlace(open: () => void) {
	return (e: MouseEvent) => {
		if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
		e.preventDefault();
		open();
	};
}
