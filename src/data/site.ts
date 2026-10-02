/**
 * Single source of truth for site-wide constants: brand, nav, URLs,
 * and the SEO defaults used by BaseLayout. Keeping these here means a
 * copy/URL change happens in one place instead of across every page.
 */

export const SITE = {
  name: 'DummyLead',
  // Human-facing brand label (shown in the footer + legal pages). Kept as the
  // bare apex for readability; the technical "www." prefix is not displayed.
  domain: 'dummylead.com',
  // Canonical machine origin: feeds canonical/OpenGraph URLs and JSON-LD.
  // Must be the www host, since the apex 308-redirects to www in production.
  // If it drifts back to the apex, canonical URLs redirect and Google cannot
  // fetch the sitemap.
  url: 'https://www.dummylead.com',
  // DummyLead runs its own dedicated portal (sign-in + register).
  appUrl: 'https://app.dummylead.com',
  tagline: 'A secret shopper for your sales leads',
  description:
    'Ever wonder if your leads actually get called? DummyLead slips decoy "seed" leads into your lead flow and logs every call, text, and email, so you\'ll know who\'s working them, who\'s ignoring them, and who\'s reselling them.',
  email: 'admin@nextcallclub.com',
} as const;

export const NAV = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Use cases', href: '/#use-cases' },
  { label: 'Pricing', href: '/#pricing' },
] as const;

export const CTA = {
  primary: {
    label: 'Start monitoring',
    // Sign-up isn't open yet; swap back to `${SITE.appUrl}/register` at launch.
    href: '/coming-soon/',
  },
  secondary: {
    label: 'Sign in',
    href: `${SITE.appUrl}/`,
  },
  demo: { label: 'Book a walkthrough', href: '/contact/' },
} as const;

/**
 * Legal entity facts, in one place. These feed every legal page
 * (privacy, terms, refunds) so a single edit updates
 * all of them.
 */
export const LEGAL = {
  // Contracting entity named in the Terms and Privacy Policy.
  operator: 'Next Call Club, LLC',
  // How the entity is described in the contracts.
  operatorDescriptor: 'a Georgia limited liability company',
  // Governing law and venue for disputes.
  jurisdiction: 'the State of Georgia, USA',
  // Single inbox for privacy + legal requests. Reuses the site email by
  // default; swap to a dedicated alias (e.g. privacy@) if you set one up.
  contactEmail: SITE.email,
  // Last time these documents were materially changed. Update on every edit.
  effectiveDate: 'October 1, 2026',
} as const;

export const LEGAL_URLS = {
  privacy: 'https://nextcallclub.com/privacy-policy',
  terms: 'https://nextcallclub.com/msa',
  refunds: 'https://nextcallclub.com/fulfillment-policy',
} as const;

/** Footer + cross-links for the legal pages. */
export const LEGAL_NAV = [
  { label: 'Privacy Policy', href: LEGAL_URLS.privacy },
  { label: 'Terms of Service', href: LEGAL_URLS.terms },
  { label: 'Refund & Cancellation', href: LEGAL_URLS.refunds },
] as const;
