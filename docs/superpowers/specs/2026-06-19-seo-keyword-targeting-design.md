# SEO keyword targeting: familiar synonyms for DummyLead

**Date:** 2026-06-19
**Status:** Approved (pending spec review)

## Goal

DummyLead is described almost entirely in its own coined vocabulary ("seed lead",
"dummy lead"). People who need this product search for it with familiar terms it
does not currently rank for: "secret shopper for leads", "mystery shopper sales
team", "decoy lead", "test lead", "is my lead company reselling my leads", and so
on. This work makes the existing site rank for those terms (on-page) and adds two
blog posts that own the biggest vocabulary gaps, without changing the brand or
diluting the existing voice.

## Constraints

- **Voice:** match the existing copy. Confident, plain, no fluff, no fabricated
  stats or testimonials.
- **No em dashes (U+2014)** anywhere. The repo bans them. Use commas, colons,
  semicolons, or parentheses.
- **American English.** `## Headings`, **bold** for emphasis, as in current posts.
- **Single source of truth:** page content lives in `src/data/content.ts` and is
  iterated by components, mirroring the current pattern. New FAQ data follows suit.
- **Structured data stays in lock-step with visible content** (the existing rule
  in `index.astro`).

## Approved keyword list (by searcher intent)

1. **Familiar-analogy:** secret shopper for leads, secret shopper for sales,
   mystery shopper sales team, mystery shop lead follow-up, secret shopper program.
2. **Mechanism:** decoy lead, test lead, planted lead, honeypot lead, seed lead,
   dummy lead (the last two stay as brand anchors).
3. **Problem-phrased:** are my exclusive leads being resold, is my lead company
   reselling leads, detect lead resale, lead recycling / lead duplication, monitor
   sales rep follow-up, check if reps are actually calling leads, audit a lead buyer.
4. **Compliance/caller:** why are my calls "spam likely", SHAKEN/STIR attestation
   check.

## Non-goals

- **Do not target the "lead generation fraud / fake leads / filter bad leads"
  cluster.** That intent is buyers wanting to screen junk inbound leads, the
  opposite of DummyLead's "audit how leads are handled" purpose. It would attract
  the wrong traffic.
- **No new top-level landing pages** this round (deferred by choice; on-page + blog
  only).
- **No `<meta name="keywords">`.** Google ignores it.

## On-page changes (edit existing files)

### 1. `src/data/site.ts`
- **`tagline`** -> a keyword-rich, human line used in both the homepage `<title>`
  and the footer. Target: `A secret shopper for your sales leads`.
  - Resulting homepage title: `DummyLead · A secret shopper for your sales leads`
    (~49 chars, good for CTR).
  - Footer renders `{SITE.tagline}.` so it must read as a sentence fragment.
- **`description`** -> rewrite to naturally carry "secret shopper", "decoy/seed
  lead", and "resold", while keeping the existing meaning. Draft:
  > DummyLead is a secret shopper for your sales leads. It plants decoy "seed"
  > leads, each with its own phone and email, into your lead flow, then logs every
  > call, text, and email, so you can prove whether buyers, partners, and reps are
  > working your leads or quietly ignoring, mishandling, or reselling them.
  - Feeds `<meta name="description">`, OG/Twitter, and the SoftwareApplication
    JSON-LD, so it must stay accurate and self-contained.

### 2. `src/components/Hero.astro`
- Add the analogy as the opening sentence of the existing hero sub paragraph:
  `Think of it as a secret shopper for your sales leads.` Keep the rest of the sub
  intact. No layout/design changes.

### 3. New homepage FAQ section
- **Data:** add a `FAQS` array to `src/data/content.ts`:
  `{ q: string; a: string }[]`, ~6 entries chosen to match real queries and fold in
  synonyms. Planned questions (final wording during impl):
  1. Is DummyLead like a secret shopper for my leads?
  2. How do I know if my "exclusive" leads are being resold?
  3. What is a seed lead (also called a decoy or test lead)?
  4. Can I check whether my sales reps actually follow up?
  5. Does it work for lead buyers and channel partners too?
  6. Will the rep, partner, or buyer know which lead is the test?
- **Component:** new `src/components/FAQ.astro` iterating `FAQS` (semantic markup,
  matches the styling vocabulary of existing sections; reuses `SectionHeader`).
- **Placement:** in `src/pages/index.astro`, after `<UseCases />` and before
  `<Pricing />`.
- **Structured data:** `index.astro` builds a `FAQPage` JSON-LD from the same
  `FAQS` array and appends it to the `jsonLd` array passed to `BaseLayout`.

### 4. Structured data: synonyms
- In `index.astro`, add to the `softwareApp` object:
  `alternateName: ['Secret shopper for sales leads', 'Seed lead monitoring',
  'Decoy lead monitoring', 'Lead resale detection']` and a `keywords` string with
  the top terms. Low effort, helps entity/topic association.

## Blog changes

### New post A: secret-shopper angle
- **File:** `src/content/blog/secret-shopper-for-sales-leads.md`
- **Title:** "A secret shopper for your sales leads: what it is and how it works"
- **Targets:** secret shopper for leads, mystery shopper sales team, mystery shop
  lead follow-up.
- **Outline:** what secret/mystery shopping is and where it is already used (retail,
  call centers, mortgage loan officers) -> why you cannot "shop" your own lead
  pipeline by hand -> the seed/decoy lead as a secret shopper that behaves like a
  real lead -> what it reveals (speed-to-lead, attempts, script adherence, resale,
  caller spam/attestation) -> how to run one. Cross-link the resale and audit posts.

### New post B: mechanism/terminology
- **File:** `src/content/blog/decoy-leads-seed-leads-test-leads.md`
- **Title:** "Decoy leads, seed leads, test leads: what they are and how they catch
  resale"
- **Targets:** decoy lead, test lead, seed lead, honeypot lead, planted lead, lead
  resale detection.
- **Outline:** these are all names for one idea -> how a decoy/test lead is built
  (real identity, dedicated phone + inbox) -> how it catches resale (exclusive seed
  contacted by a second party) -> how it catches poor follow-up -> build-your-own
  vs a monitored service. Cross-link the secret-shopper and resale posts.

### Keyword pass over the 4 existing posts
Light, natural edits only (no rewrites):
- `exclusive-leads-being-resold.md`: name the "decoy lead / test lead" method
  explicitly where the "one method" is introduced; add a tag; cross-link post B.
- `how-to-audit-a-lead-buyer-or-partner.md`: frame the audit as "mystery shopping /
  a secret shopper for your lead buyers"; cross-link posts A and B.
- `speed-to-lead-what-fast-follow-up-looks-like.md`: add a line on monitoring rep
  follow-up with a secret-shopper seed lead; cross-link post A.
- `shaken-stir-call-attestation-explained.md`: minimal; cross-link where natural.

## Verification

- `npm run build` passes (Zod frontmatter validation guards the new posts).
- New posts appear in `/blog/` and the sitemap.
- `dist/index.html` contains the FAQ markup and a valid `FAQPage` JSON-LD block;
  `softwareApp` carries the new `alternateName`/`keywords`.
- No em dashes anywhere in changed files.
- Spot-read the rendered homepage title, meta description, and FAQ for voice.

## Out of scope / future

- Dedicated landing pages per term (e.g. `/secret-shopper-leads`) if the blog posts
  show traction.
- Keyword-volume validation in a dedicated SEO tool (this list is reasoned from
  search-landscape research, not measured volumes).
