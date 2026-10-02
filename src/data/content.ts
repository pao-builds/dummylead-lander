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
    body: 'See it all in one timeline: whether a buyer called fast or let the lead go cold, how hard they worked it, and whether it got resold to someone who shouldn’t have it.',
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
    audience: 'Where your leads go',
    title: 'Know who’s really calling your leads',
    problem: 'Every contact your lead gets, in one timeline.',
    points: [
      'Calls, texts, emails, and voicemails, timestamped',
      'Caller ID and carrier on every call',
      'How fast they reached out, and how often',
      'Anyone you didn’t send the lead to',
      'A clear record to share, not a guess',
    ],
    tone: 'signal',
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
    slug: 'compliance',
    audience: 'How your calls show up',
    title: 'See what the person on the other end sees',
    problem: 'What showed up on their screen when you called.',
    points: [
      'Whether the call was labeled “Spam Likely”',
      'The carrier trust grade: A, B, or C',
      'The business name',
      'Voicemails'
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
  features: string[];
};

export const PRICING: { note: string; tiers: PriceTier[] } = {
  note: 'Billed per active seed, monthly. The per-seed rate drops as you scale, and only concurrent live seeds count.',
  tiers: [
    {
      name: 'Solo',
      forWho: 'Spot-checking a single source or partner',
      price: '$12.99',
      unit: 'per seed / mo',
      seeds: '1–4 active seeds',
      cta: 'start',
      features: [],
    },
    {
      name: 'Team',
      forWho: 'Watching a sales floor or several partners',
      price: '$9.99',
      unit: 'per seed / mo',
      seeds: '5–14 active seeds',
      cta: 'start',
      features: [],
    },
    {
      name: 'Publishers',
      forWho: 'Managing lead distribution at volume',
      price: '$7.99',
      unit: 'per seed / mo',
      seeds: '15+ active seeds',
      cta: 'start',
      features: [],
    },
  ],
};
