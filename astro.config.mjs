// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Tailwind v4 is wired via the @tailwindcss/vite plugin. On Astro 7 / Vite 8,
// the PostCSS path breaks: Vite's internal postcss-import cannot resolve the
// bare `@import "tailwindcss"` specifier under the rolldown resolver, while
// the Vite plugin resolves it itself.
// The canonical production origin. The apex (dummylead.com) 308-redirects to
// www in production, so this MUST be the www host: the sitemap <loc> entries
// and the URL Google fetches both need to be the final, non-redirecting URL.
// Defined once and reused below so the origin can never drift out of sync.
const SITE_ORIGIN = 'https://www.dummylead.com';

// Keep the legal/compliance pages out of the sitemap. They are noindex, so we
// don't advertise them to search engines; they remain reachable by direct link (footer + Stripe).
const LEGAL_PATHS = ['/privacy/', '/terms/', '/refunds/', '/acceptable-use/'];

export default defineConfig({
  site: SITE_ORIGIN,
  // The site's total CSS is ~13KB across a couple of small bundles. Inlining it
  // into <head> removes those render-blocking stylesheet requests from the
  // critical path (faster FCP/LCP). The tradeoff, losing cross-page CSS caching,
  // is negligible at this size for a mostly single-landing-page site.
  build: { inlineStylesheets: 'always' },
  // Astro 7 changed the default to 'jsx', which strips whitespace between
  // inline elements and can silently glue words together in running copy.
  // Keep the HTML-aware compression the site was written against.
  compressHTML: true,
  // Self-hosted fonts. Astro downloads these from Google at build time, serves
  // the woff2 from our own origin (no third-party round-trip on the critical
  // path), generates @font-face + optimized fallback metrics to limit layout
  // shift, and the <Font> component in BaseLayout emits preload links. The
  // cssVariable names are referenced from global.css.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Poppins',
      cssVariable: '--font-poppins',
      weights: [400, 500, 600, 700, 800],
      styles: ['normal'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
    },
  ],
  integrations: [
    sitemap({
      filter: (page) =>
        !LEGAL_PATHS.some((p) => page === `${SITE_ORIGIN}${p}`),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
