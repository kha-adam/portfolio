import type { CollectionEntry } from 'astro:content';

export type Painting = CollectionEntry<'paintings'>;

export function sortPaintings(paintings: Painting[]) {
	return [...paintings].sort(
		(a, b) => a.data.year - b.data.year || a.data.title.localeCompare(b.data.title),
	);
}

export function neighbors(paintings: Painting[], current: Painting) {
	const wing = sortPaintings(paintings.filter((painting) => painting.data.wing === current.data.wing));
	const index = wing.findIndex((painting) => painting.id === current.id);
	return {
		previous: index > 0 ? wing[index - 1] : undefined,
		next: index >= 0 && index < wing.length - 1 ? wing[index + 1] : undefined,
	};
}

export function paintingHref(painting: Painting) {
	return `/works/${painting.data.wing}/${painting.data.slug}`;
}

export function plaqueCaption(painting: Painting) {
	return `${painting.data.title}, ${painting.data.year}. ${painting.data.plaque}`;
}
