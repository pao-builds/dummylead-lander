# Organic + LLM Exposure: Design

**Date:** 2026-06-17
**Goal:** Maximize DummyLead's organic search and LLM (ChatGPT, Claude, Perplexity, Gemini) discoverability and citation, building on an already-strong technical SEO foundation.

## Context

The site is a static Astro 6 marketing site. It already ships: canonical/OpenGraph/Twitter meta, Organization + SoftwareApplication JSON-LD, a sitemap integration, an AI-friendly `robots.txt`, and an `llms.txt`. This work fills the remaining gaps.

## Workstreams

### 1. Remove the FAQ
The FAQ exists only as dead/unused references: there is no rendered FAQ UI and no nav/footer link to `#faq`.
- Delete the `Faq` type and `FAQS` array from `src/data/content.ts`.
- Remove the `/#faq` line from `public/llms.txt`.
- Remove the `FAQPage` mention in the `BaseLayout.astro` head comment.

### 2. Blog system
- `src/content.config.ts`: a `blog` collection using the `glob` loader over `src/content/blog/*.md`, with a Zod schema (`title`, `description`, `pubDate`, `updatedDate?`, `tags`, `draft`).
- `src/pages/blog/index.astro`: listing page, reusing `PageHeader`; lists non-draft posts newest-first; `BreadcrumbList` JSON-LD.
- `src/pages/blog/[...slug].astro`: renders a post; `BlogPosting` + `BreadcrumbList` JSON-LD; passes `title`/`description`/`path` to `BaseLayout`.
- A scoped `prose` style block for article readability (matches existing CSS-variable palette).
- Footer: add a **Blog** link to the "Company" column (footer-only, per user).
- Sitemap auto-includes `/blog/*` because the integration crawls build output.

### 3. Deepen structured data
- **HowTo** on the home page, built from the 4 `STEPS` in `content.ts`.
- **Product** + tiered **Offer**s built from `PRICING` (`Solo` $15, `Team` $9, `Scale` $7, per active seed/mo).
- **BreadcrumbList** on `/blog`, blog posts, and `/contact`.
- **BlogPosting** on each post.
- (FAQPage intentionally dropped with the FAQ removal.)

### 4. Enrich llms
- New `public/llms-full.txt`: expanded product detail, definitions (seed lead, SHAKEN/STIR, speed-to-lead), use-case depth, and the blog index.
- Update `public/llms.txt`: remove `#faq`; fix stale pricing (currently lists `Starter/Small Agency/Agency` at `$12/$10/$8`; real tiers are `Solo`/`Team`/`Scale` at `$15/$9/$7` per `content.ts`); add a resources section linking blog posts.

## Starter blog posts (in-depth, ~1200-1800 words)
1. How to tell if your "exclusive" leads are being resold
2. SHAKEN/STIR explained: what A, B, and C attestation mean for answer rates
3. Speed-to-lead: what fast follow-up actually looks like and how to measure it
4. How to audit a lead buyer or channel partner without tipping them off

## Success criteria
- `astro build` passes; `sitemap-index.xml` includes `/blog/` and each post.
- Every blog post emits valid `BlogPosting` JSON-LD; home emits `HowTo` + `Product`.
- `llms.txt` pricing matches `content.ts`; no `#faq` reference anywhere.

## Out of scope (noted, not done here)
- OG image PNG conversion (separate quick win; flagged to user).
- Ongoing content cadence beyond the 4 starter posts.
