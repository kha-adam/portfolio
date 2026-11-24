import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const paintings = defineCollection({
	loader: glob({
		pattern: '**/*.md',
		base: './src/content/paintings',
		generateId: ({ entry, data }) => {
			if (typeof data.slug === 'string' && data.slug.length > 0) return data.slug;
			return entry.replace(/\.md$/, '');
		},
	}),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		wing: z.enum(['systems', 'ml', 'web', 'aerospace', 'hackathons']),
		year: z.number().int(),
		status: z.enum(['shipped', 'in-progress', 'prototype']),
		plaque: z.string(),
		problem: z.string(),
		decision: z.string(),
		result: z.string(),
		stack: z.array(z.string()),
		links: z.object({
			repo: z.string().url(),
			demo: z.string().url().optional(),
		}),
		diagram: z.string().optional(),
		featured: z.boolean().default(false),
	}),
});

export const collections = { paintings };
