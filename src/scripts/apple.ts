const BITES = ['#bite-0', '#bite-1', '#bite-2', '#bite-3', '#bite-4', '#bite-5'];

export function bindApple(root: Element) {
	if (!(root instanceof HTMLDetailsElement)) return;

	const summary = root.querySelector('summary');
	const bite = root.querySelector('[data-apple-use]');
	const nav = root.querySelector('nav');
	const random = root.querySelector<HTMLAnchorElement>('[data-random]');
	if (!summary || !bite || !nav) return;

	const hrefs = parseHrefs(nav.dataset.paintings);
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const update = () => {
		const max = document.documentElement.scrollHeight - window.innerHeight;
		const progress = max <= 8 ? 0 : window.scrollY / max;
		const stage = progress >= 0.92 ? 5 : Math.min(4, Math.floor(progress * 5));
		const core = stage === BITES.length - 1;
		bite.setAttribute('href', BITES[stage] ?? BITES[0]);
		root.dataset.core = core ? 'true' : 'false';
		summary.setAttribute(
			'aria-label',
			root.open ? 'Close the museum menu' : core ? 'Back to the top' : 'Museum menu',
		);
	};

	let frame = 0;
	const onScroll = () => {
		if (frame) return;
		frame = requestAnimationFrame(() => {
			frame = 0;
			update();
		});
	};

	update();
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll);

	const scrollHome = () => {
		window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
	};

	summary.addEventListener('click', (event) => {
		if (root.dataset.core === 'true' && !root.open) {
			event.preventDefault();
			scrollHome();
		}
	});

	root.addEventListener('keydown', (event) => {
		const links = [...nav.querySelectorAll<HTMLAnchorElement>('a')];
		if (event.key === 'Escape' && root.open) {
			event.preventDefault();
			root.open = false;
			summary.focus();
			update();
			return;
		}

		if (event.target === summary && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
			event.preventDefault();
			root.open = true;
			const target = event.key === 'ArrowUp' ? links.at(-1) : links[0];
			target?.focus();
			update();
			return;
		}

		if (event.target === summary && root.dataset.core === 'true' && !root.open && (event.key === 'Enter' || event.key === ' ')) {
			event.preventDefault();
			scrollHome();
			return;
		}

		const index = links.findIndex((link) => link === document.activeElement);
		if (index < 0) return;
		if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
			event.preventDefault();
			links[(index + 1) % links.length]?.focus();
		} else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
			event.preventDefault();
			links[(index - 1 + links.length) % links.length]?.focus();
		}
	});

	root.addEventListener('toggle', update);

	root.addEventListener('focusout', (event) => {
		const next = event.relatedTarget;
		if (next instanceof Node && root.contains(next)) return;
		root.open = false;
	});

	random?.addEventListener('click', (event) => {
		const here = location.pathname.length > 1 && location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname;
		const choices = hrefs.filter((href) => href !== here);
		if (!choices.length) {
			event.preventDefault();
			return;
		}
		random.href = choices[Math.floor(Math.random() * choices.length)] ?? random.href;
	});
}

function parseHrefs(value: string | undefined) {
	if (!value) return [];
	try {
		const parsed = JSON.parse(value) as unknown;
		return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
	} catch {
		return [];
	}
}
