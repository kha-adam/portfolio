export const wings = [
	{ id: 'systems', title: 'Systems & Networks' },
	{ id: 'ml', title: 'Machine Learning' },
	{ id: 'web', title: 'Web' },
	{ id: 'aerospace', title: 'Aerospace' },
	{ id: 'hackathons', title: 'Hackathons' },
] as const;

export type WingId = (typeof wings)[number]['id'];

export function wingTitle(id: string) {
	return wings.find((wing) => wing.id === id)?.title ?? id;
}
