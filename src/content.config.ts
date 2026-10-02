import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

/**
 * The `blog` collection. Markdown files live in src/content/blog and are
 * loaded by the Astro content layer's glob loader. The Zod schema validates
 * frontmatter at build time, so a malformed date or missing title fails the
 * build instead of shipping a broken page.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // One-sentence summary; feeds <meta description>, OG, and BlogPosting JSON-LD.
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // Drafts are kept out of listings, sitemap, and the static path build.
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
