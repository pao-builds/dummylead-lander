/**
 * Page content as data. Components iterate over these arrays so the markup
 * stays declarative and the copy is editable without touching layout.
 */

export type Step = {
  no: string;
  title: string;
  body: string;
  // Small "evidence" micro-line shown under each ledger cell.
  captured: string;
};

export const STEPS: Step[] = [
  {
    no: '01',
    title: 'Create a Dummy Lead',
    body: 'A real name, a working inbox, and a phone number that receives calls and texts. It looks like any other lead. Only you know it’s fake.',
    captured: 'identity · inbox · phone line',
  },
  {
    no: '02',
    title: 'You drop it in',
    body: 'Add it to a batch you bought, a partner hand-off, or your call rotation. It behaves like a real lead, so it gets treated like one.',
    captured: 'placement · channel · recipient',
  },
  {
    no: '03',
    title: 'We keep track of every conversation',
    body: 'Every call, text, and email is saved, so you can see who reached out, when, and how quickly they followed up. Calls are recorded, and messages are saved word for word.',
    captured: 'calls · texts · emails · timing',
  },
  {
    no: '04',
    title: 'You see what happened',
    body: 'See it all in one timeline: whether someone followed up, let the lead go cold, handled it poorly, or passed it to someone who shouldn’t have it.',
    captured: 'timeline · recordings · verdict',
  },
];

export type EvidenceLine = {
  k: string;
  v: string;
  state: 'ok' | 'bad';
};

export type UseCase = {
  slug: string;
  audience: string;
  title: string;
  problem: string;
  points: string[];
  tone: 'signal' | 'amber' | 'flag' | 'trust';
  // Flat console-style readout shown alongside each case.
  evidence: {
    verdict: string;
    lines: EvidenceLine[];
  };
};

export const USE_CASES: UseCase[] = [
  {
    slug: 'lead-buyers',
    audience: 'Lead sellers & aggregators',
    title: 'Prove your buyers aren’t reselling',
    problem:
      'You sell exclusive leads but suspect buyers quietly pass them down the chain. Without proof, you lose pricing power and the relationship.',
    points: [
      'Seed a buyer’s feed and watch who actually makes contact',
      'A second caller on an “exclusive” lead is resale, caught in the act',
      'Timestamped evidence you can put in front of the buyer',
    ],
    tone: 'flag',
    evidence: {
      verdict: 'Resale',
      lines: [
        { k: 'Exclusive to', v: '1 buyer', state: 'ok' },
        { k: 'Callers seen', v: '2', state: 'bad' },
        { k: 'Second caller', v: 'Unknown number', state: 'bad' },
      ],
    },
  },
  {
    slug: 'partners',
    audience: 'Channel & referral partners',
    title: 'Verify partners actually work referrals',
    problem:
      'Partners promise fast, professional follow-up. Some sit on leads, some never call, some go off-script the moment you look away.',
    points: [
      'Real response time and attempt counts on seeded referrals',
      'Professionalism and script adherence, observed first-hand',
      'Hold partners to the response time they promised you',
    ],
    tone: 'amber',
    evidence: {
      verdict: 'SLA missed',
      lines: [
        { k: 'Promised reply', v: '15m', state: 'ok' },
        { k: 'First contact', v: '2h 14m', state: 'bad' },
        { k: 'Attempts made', v: '1 of 6', state: 'bad' },
      ],
    },
  },
  {
    slug: 'employees',
    audience: 'In-house sales teams',
    title: 'Confirm reps are working leads right',
    problem:
      'You pay for leads and a floor to call them, but can’t see who cherry-picks the easy ones and who lets the rest rot.',
    points: [
      'Unbiased speed-to-lead and attempt counts across the floor',
      'Tone and script adherence scored on real recorded calls',
      'No one on the team knows which lead is the test',
    ],
    tone: 'signal',
    evidence: {
      verdict: 'Worked',
      lines: [
        { k: 'Speed to lead', v: '0:47', state: 'ok' },
        { k: 'Attempts', v: '6 of 6', state: 'ok' },
        { k: 'On script', v: 'Yes', state: 'ok' },
      ],
    },
  },
  {
    slug: 'compliance',
    audience: 'Compliance & brand teams',
    title: 'Catch spam dialing & weak attestation',
    problem:
      'Your outbound numbers get flagged as spam, tanking answer rates, and you have zero visibility into how they’re attested.',
    points: [
      'Every inbound call to a seed scored for spam risk',
      'SHAKEN/STIR attestation grade for each calling number',
      'Flag bad actors before they burn your deliverability',
    ],
    tone: 'trust',
    evidence: {
      verdict: 'Verified',
      lines: [
        { k: 'Attestation', v: 'Grade A', state: 'ok' },
        { k: 'Spam risk', v: 'Low', state: 'ok' },
        { k: 'Caller ID', v: 'Branded', state: 'ok' },
      ],
    },
  },
];

// FAQ: written to answer the questions people actually type into search, and to
// fold in the familiar terms they use (secret shopper, decoy/test lead, resale)
// alongside DummyLead's own vocabulary. Rendered by FAQ.astro and mirrored into
// FAQPage structured data on the homepage.
export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: 'Is DummyLead like a secret shopper for my leads?',
    a: 'Yes. A secret shopper (or mystery shopper) poses as a normal customer to see how staff really behave. DummyLead does the same for your leads: it plants a decoy "seed" lead that looks and acts like a real one, then records exactly how it gets handled, so you see the truth instead of the version people show you when they know they are being watched.',
  },
  {
    q: 'How do I know if my "exclusive" leads are being resold?',
    a: 'Because each seed lead is exclusive to one recipient, anyone else who contacts it had to have been passed the record. If a seed you placed with a single buyer starts getting calls or texts from a second, unrelated number, that is resale, caught with a timestamp you can put in front of the seller.',
  },
  {
    q: 'What is a seed lead, and how is it different from a decoy or test lead?',
    a: 'They are all names for the same idea: a believable but fake lead you plant on purpose to monitor how it is treated. We call ours a seed lead or Dummy Lead; elsewhere you will see "decoy lead," "test lead," "honeypot lead," or "planted lead." Each one has a real name, a working inbox, and a live phone number, so it behaves like a genuine lead to everyone except you.',
  },
  {
    q: 'Can I check whether my sales reps actually follow up?',
    a: 'Yes. Drop a seed lead into your call rotation and DummyLead measures real speed-to-lead, how many attempts each rep makes, and whether they stay on script, all from recorded calls and saved messages. No one on the floor knows which lead is the test, so you get unbiased behavior instead of best behavior.',
  },
  {
    q: 'What is speed to contact, and can DummyLead measure it?',
    a: 'Speed to contact (also called speed-to-lead or lead response time) is the time between a lead arriving and the first real attempt to reach that person. DummyLead measures it from the prospect’s side: each seed lead timestamps the gap between landing in your flow and the first call, text, or email it receives, so you get your true speed to contact instead of the time a rep logged in the CRM.',
  },
  {
    q: 'Does it work for lead buyers and channel partners too?',
    a: 'It works for any hand-off you cannot see into: a lead buyer feed, a channel or referral partner, or a rep round-robin. You seed the flow, then hold the buyer or partner to the response time and exclusivity they promised, with evidence rather than a hunch.',
  },
  {
    q: 'Will the rep, partner, or buyer know which lead is the test?',
    a: 'No. That is the point. A seed lead is indistinguishable from a real one, so the people handling it cannot single it out or treat it differently. They behave exactly as they normally would, which is what makes the result trustworthy.',
  },
];

// Pricing model: billed per concurrent active seed, with the per-seed rate
// dropping as you run more. NOTE: rates are illustrative placeholders;
// confirm final pricing before launch.
export type PriceTier = {
  name: string;
  forWho: string;
  price: string;
  unit: string;
  seeds: string;
  cta: 'start' | 'talk';
  featured: boolean;
  features: string[];
};

export const PRICING: { note: string; tiers: PriceTier[] } = {
  note: 'Billed per active seed, monthly. The per-seed rate drops as you scale, and only concurrent live seeds count.',
  tiers: [
    {
      name: 'Solo',
      forWho: 'Spot-checking a single source or partner',
      price: '$8.99',
      unit: 'per seed / mo',
      seeds: '1–4 active seeds',
      cta: 'start',
      featured: false,
      features: [],
    },
    {
      name: 'Team',
      forWho: 'Watching a sales floor or several partners',
      price: '$6.99',
      unit: 'per seed / mo',
      seeds: '5–14 active seeds',
      cta: 'start',
      featured: true,
      features: [],
    },
    {
      name: 'Publishers',
      forWho: 'Managing lead distribution at volume',
      price: '$5.49',
      unit: 'per seed / mo',
      seeds: '15+ active seeds',
      cta: 'start',
      featured: false,
      features: [],
    },
  ],
};
