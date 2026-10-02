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
    'DummyLead is a secret shopper for your sales leads. It plants decoy "seed" leads, each with its own phone and email, into your lead flow, then logs every call, text, and email, so you can prove whether buyers, partners, and reps are working your leads or quietly ignoring, mishandling, or reselling them.',
  email: 'hello@dummylead.com',
} as const;

export const NAV = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Use cases', href: '/#use-cases' },
  { label: 'Pricing', href: '/#pricing' },
] as const;

export const CTA = {
  primary: {
    label: 'Start monitoring',
    href: `${SITE.appUrl}/register`,
  },
  secondary: {
    label: 'Sign in',
    href: `${SITE.appUrl}/`,
  },
  demo: { label: 'Book a walkthrough', href: '/contact/' },
} as const;

/**
 * Legal entity facts, in one place. These feed every legal page
 * (privacy, terms, refunds, acceptable use) so a single edit updates
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

/** Footer + cross-links for the legal pages. */
export const LEGAL_NAV = [
  { label: 'Privacy Policy', href: '/privacy/' },
  { label: 'Terms of Service', href: '/terms/' },
  { label: 'Refund & Cancellation', href: '/refunds/' },
  { label: 'Acceptable Use', href: '/acceptable-use/' },
] as const;
