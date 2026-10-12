import type { OfferPeriod } from '../../../models/offer-history.model';

const AWARDWALLET = {
  url: 'https://awardwallet.com/credit-cards/capital-one-credit-card-offer-history/',
  title: 'AwardWallet: Capital One credit card offer history'
};

/** Public sign-up bonus history for the Capital One Venture X Rewards card */
export const VENTURE_X_REWARDS_OFFERS: readonly OfferPeriod[] = [
  {
    start: '2021-11-09',
    startPrecision: 'day',
    end: '2022-03-14',
    amount: 100000,
    currency: 'Capital One Miles',
    spendRequired: 10000,
    windowMonths: 6,
    extras: 'up to $200 in vacation rental statement credits in the first year',
    elevated: true,
    confidence: 'high',
    sources: [
      {
        url: 'https://www.capitalone.com/about/newsroom/introducing-venture-x/',
        title: 'Capital One newsroom: Introducing Venture X',
        supports: 'Launch offer of 100,000 miles after $10,000 in 6 months plus up to $200 in vacation rental credits, billed as limited-time'
      },
      {
        url: 'https://www.doctorofcredit.com/capital-one-launching-premium-venture-x-card-with-100000-points-200-signup-bonus-395-fee-300-travel-credit-10k-annual-bonus/',
        title: 'Doctor of Credit: Venture X launch',
        supports: 'Launch offer details and the update noting it ended in March 2022'
      },
      {
        url: 'https://milestalk.com/venture-x-100k-bonus-offer-end-date-revealed/',
        title: 'MilesTalk: Venture X 100k end date revealed',
        supports: 'End date of the launch offer'
      }
    ],
    notes: 'Launch offer. Reported as ending on the afternoon of 3/14/22; AwardWallet lists 3/15.'
  },
  {
    start: '2022-03-15',
    startPrecision: 'day',
    end: '2025-11-11',
    amount: 75000,
    currency: 'Capital One Miles',
    spendRequired: 4000,
    windowMonths: 3,
    elevated: false,
    confidence: 'high',
    sources: [
      {
        url: 'https://www.doctorofcredit.com/capital-one-launching-premium-venture-x-card-with-100000-points-200-signup-bonus-395-fee-300-travel-credit-10k-annual-bonus/',
        title: 'Doctor of Credit: Venture X launch',
        supports: 'Offer dropped to 75,000 after $4,000 in 3 months when the launch offer ended'
      },
      {
        url: 'https://milestomemories.com/?p=109449',
        title: 'Miles to Memories',
        supports: 'New 75,000-mile standard offer in March 2022'
      },
      {
        url: 'https://web.archive.org/web/20230917232924/https://www.capitalone.com/credit-cards/venture-x/',
        title: 'Wayback Machine: Capital One Venture X page, Sep 2023',
        supports: "Capital One's own page showing 75,000 miles after $4,000 in 3 months"
      },
      { ...AWARDWALLET, supports: 'Lists 75,000 / $4,000 / 3 months from March 2022 to Nov 11, 2025' },
      {
        url: 'https://thepointsguy.com/credit-cards/capital-one-best-welcome-offers/',
        title: 'The Points Guy: best Capital One welcome offers',
        supports: '75,000 miles as the standard public offer'
      }
    ],
    notes: 'A 90,000-mile offer in fall 2023 was through referral and targeted links only, so it isn’t shown.'
  },
  {
    start: '2025-11-12',
    startPrecision: 'day',
    end: '2026-01-05',
    amount: 100000,
    currency: 'Capital One Miles',
    spendRequired: 10000,
    windowMonths: 6,
    elevated: true,
    confidence: 'high',
    sources: [
      { ...AWARDWALLET, supports: 'Lists 100,000 / $10,000 / 6 months from Nov 12, 2025 to Jan 5, 2026' },
      {
        url: 'https://thepointsguy.com/news/venture-x-100k-offer-best-in-years/',
        title: 'The Points Guy: Venture X 100k offer',
        supports: 'Return of the 100,000-mile offer in November 2025'
      },
      {
        url: 'https://thepointsguy.com/newsletters/nl-weekly/archive/2025-11-15',
        title: 'The Points Guy weekly newsletter, Nov 15, 2025',
        supports: 'Offer live by mid-November 2025'
      },
      {
        url: 'https://www.doctorofcredit.com/capital-one-venture-x-card-100000-points-signup-bonus/',
        title: 'Doctor of Credit: Venture X 100,000 bonus',
        supports: 'Offer terms and the update that it would end on 1/5/26'
      },
      {
        url: 'https://thepointsguy.com/newsletters/nl-weekly/archive/2026-01-03',
        title: 'The Points Guy weekly newsletter, Jan 3, 2026',
        supports: 'Offer ending in early January 2026'
      },
      {
        url: 'https://frequentmiler.com/capital-one-venture-x-card-welcome-offer-100000-miles-after-10k-in-spend/',
        title: 'Frequent Miler: Venture X 100,000 miles after $10k',
        supports: 'Offer terms'
      }
    ],
    notes: 'Sources disagree on the start by a few days (Nov 12 to Nov 18); the end date is well documented.'
  },
  {
    start: '2026-01-06',
    startPrecision: 'day',
    amount: 75000,
    currency: 'Capital One Miles',
    spendRequired: 4000,
    windowMonths: 3,
    elevated: false,
    confidence: 'high',
    sources: [
      { ...AWARDWALLET, supports: 'Lists 75,000 / $4,000 / 3 months from Jan 6, 2026, ongoing' },
      {
        url: 'https://thepointsguy.com/credit-cards/capital-one-best-welcome-offers/',
        title: 'The Points Guy: best Capital One welcome offers',
        supports: 'Current 75,000-mile offer'
      },
      {
        url: 'https://upgradedpoints.com/credit-cards/reviews/capital-one-venture-x/welcome-offer-eligibility-changes/',
        title: 'Upgraded Points: Venture X welcome offer',
        supports: 'Current offer of 75,000 miles after $4,000 in 3 months'
      }
    ]
  }
];
