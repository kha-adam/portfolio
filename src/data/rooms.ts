export const rooms = [
	{ href: '/', label: 'Entrance', title: 'Knowledge, compiled.', kicker: 'Entrance hall' },
	{ href: '/works/systems', label: 'Systems', title: 'Systems & Networks', kicker: 'Wing' },
	{ href: '/works/ml', label: 'Machine learning', title: 'Machine Learning', kicker: 'Wing' },
	{ href: '/works/web', label: 'Web', title: 'Web', kicker: 'Wing' },
	{ href: '/works/aerospace', label: 'Aerospace', title: 'Aerospace', kicker: 'Wing' },
	{ href: '/works/hackathons', label: 'Hackathons', title: 'Hackathons', kicker: 'Wing' },
	{ href: '/workshop', label: 'Workshop', title: 'The Workshop', kicker: 'Room' },
	{ href: '/journey', label: 'Journey', title: 'The Journey', kicker: 'Room' },
	{ href: '/contact', label: 'Contact', title: 'Contact', kicker: 'Room' },
] as const;

export type Room = (typeof rooms)[number];

export function isCurrent(pathname: string, href: string) {
	const path = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
	if (href === '/') return path === '/';
	return path === href || path.startsWith(`${href}/`);
}
