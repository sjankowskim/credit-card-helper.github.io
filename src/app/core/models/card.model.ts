// ============================================================================
// 1. TIER BEHAVIOR DISCRIMINATED UNIONS
// ============================================================================

import { CategoryId } from "../data/category.registry";

/**
 * Tier strategy discriminator.
 * Controls how categories in a tier are activated or selected by the user.
 */
export type TierBehavior =
  | { 
      type: 'AUTOMATIC'; 
    }
  | { 
      type: 'USER_CHOICE'; 
      maxSelections: number; 
    }
  | { 
      type: 'AUTO_TOP_SPEND'; 
      maxCategories: number; 
    }
  | {
    type: 'ROTATING';
    year: number;
    quarter: 1 | 2 | 3 | 4;
    requiresActivation: boolean;
  };

// ============================================================================
// 2. CARD ISSUERS
// ============================================================================
export const CardIssuer = {
  CAPITAL_ONE: 'Capital One',
  CHASE: 'Chase',
  AMERICAN_EXPRESS: 'American Express',
  CITI: 'Citi',
  BANK_OF_AMERICA: 'Bank of America',
  WELLS_FARGO: 'Wells Fargo',
  US_BANK: 'US Bank',
  DISCOVER: 'Discover'
} as const;

export type CardIssuer = typeof CardIssuer[keyof typeof CardIssuer];

// ============================================================================
// 3. REWARDS PROGRAMS
// ============================================================================
export const RewardsProgram = {
  CAPITAL_ONE_REWARDS: 'Capital One Rewards',
  CHASE_ULTIMATE_REWARDS: 'Chase Ultimate Rewards',
  AMEX_MEMBERSHIP_REWARDS: 'Amex Membership Rewards',
  CITI_THANKYOU: 'Citi ThankYou',
  WELLS_FARGO_REWARDS: 'Wells Fargo Rewards',
  BILT: 'BILT'
} as const;

export type RewardsProgram = typeof RewardsProgram[keyof typeof RewardsProgram];

// ============================================================================
// 4. REWARD TIER DEFINITION
// ============================================================================
export interface RewardTier {
  /** Unique ID for the tier within the card (e.g., 'usb-cashplus-5pct-tier') */
  id: string;

  /** Display label for the tier (e.g., '5% Choice Categories') */
  name: string;

  /** Multiplier or percentage rate (e.g., 5.0 for 5% cashback or 5x points) */
  rewardRate: number;

  /** Dictates whether this tier is automatic, user-selected, or top-spend */
  behavior: TierBehavior;

  /** The list of Category IDs eligible for this tier's reward rate */
  eligibleCategories: CategoryId[];

  /** Optional spending cap before the rate drops back to base */
  spendingCap?: {
    amount: number;
    period: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
  };
}

// ============================================================================
// 5. SIGN-UP BONUSES & BENEFITS
// ============================================================================
export interface SignUpBonus {
  /** Bonus amount in the card's rewards currency (points, miles, or dollars) */
  amount: number;

  /** Currency the bonus is paid in (e.g., 'Ultimate Rewards', 'Cashback') */
  currency: string;

  /** Spend required to earn the bonus, in dollars */
  spendRequired: number;

  /** Months from account opening to hit the spend requirement */
  windowMonths: number;
}

/** A user's copy of a sign-up bonus, which can differ from the catalog default */
export interface UserSignUpBonus extends SignUpBonus {
  /** Dollars spent toward the requirement so far */
  spent?: number;

  /** Date the bonus was earned (ISO date string) */
  earnedDate?: string;
}

export interface Benefit {
  /** Unique ID for the benefit within the card (e.g., 'amex-gold-dining-credit') */
  id: string;

  /** Display label (e.g., 'Dining Credit') */
  name: string;

  /** Dollar value available each period */
  amount: number;

  /** How often the benefit resets */
  period: 'MONTHLY' | 'QUARTERLY' | 'SEMIANNUAL' | 'ANNUAL';

  /** Whether periods follow the calendar or the account anniversary */
  resetBasis: 'CALENDAR' | 'CARDMEMBER_YEAR';

  note?: string;
}

// ============================================================================
// 6. CARD STATUS
// ============================================================================
export const CardStatus = {
  ACTIVE: 'active',
  CLOSED: 'closed',
  PRODUCT_CHANGED: 'product-changed'
} as const;

export type CardStatus = typeof CardStatus[keyof typeof CardStatus];

// ============================================================================
// 7. STATIC CARD BLUEPRINT
// ============================================================================
export const CardNetwork = {
  VISA: 'VISA',
  MASTERCARD: 'MASTERCARD',
  AMEX: 'AMEX',
  DISCOVER: 'DISCOVER'
} as const;
export type CardNetwork = typeof CardNetwork[keyof typeof CardNetwork];

export interface Card {
  /** Permanent string slug for the card (e.g., 'us-bank-cash-plus') */
  id: string;

  /** Official card name */
  name: string;

  /** Issuing bank or financial institution */
  issuer: CardIssuer;

  /** Rewards program this card belongs to (e.g., 'Capital One Rewards', 'Chase Ultimate Rewards') */
  rewardsProgram: RewardsProgram;

  /** Ecosystem or rewards currency name (e.g., 'Cashback', 'Ultimate Rewards') */
  rewardsCurrency: string;

  /** Card payment network */
  network: CardNetwork;

  /** Whether the card assesses foreign transaction fees */
  hasForeignTransactionFee: boolean;

  /** Whether the card provides travel partner access for point redemptions */
  hasTravelPartnerAccess: boolean;

  /** Whether this card affects Chase 5/24 status */
  affectsChase524: boolean;

  /** Annual fee in dollars (0 for no-fee cards) */
  annualFee: number;

  /** Whether this is a business card (most business cards don't count toward 5/24) */
  isBusiness: boolean;

  /** Default fallback rate for unlisted categories (typically 1.0 for 1%) */
  baseRewardRate: number;

  /** Array of special reward tiers associated with this card */
  rewardTiers: RewardTier[];

  /** Current public sign-up bonus, copied onto a user's card when it is added */
  defaultSignUpBonus?: SignUpBonus;

  /** Recurring statement credits and other dollar-value perks */
  benefits?: Benefit[];

  /** Optional link or path to card artwork asset */
  imageUrl?: string;

  /**
   * Card-specific custom settings.
   * Allows for card-specific configuration options (e.g., BILT reward type selection).
   * Structure is defined per card as needed.
   */
  customSettings?: Record<string, unknown>;
}

// ============================================================================
// 8. USER CARD STATE (LOCALSTORAGE / DATABASE INSTANCE)
// ============================================================================
export interface UserCard {
  /** Unique ID generated for this user's saved card instance */
  id: string;

  /** References Card.id (e.g., 'us-bank-cash-plus') */
  cardId: string;

  /** Instance number for multiple cards of the same type (1, 2, 3, etc.) */
  instanceNumber: number;

  /** Whether the user has this card on their wishlist */
  isWishlist: boolean;

  /**
   * User-customizable data for this card instance.
   * If this object is empty or all fields are undefined, the card has no user data.
   */
  userData: {
    /**
     * Current status of the card (active, closed, or product-changed)
     * Only applicable for wallet cards (not wishlist cards)
     */
    status?: CardStatus;
    /** Custom nickname for this card instance (e.g., "Grocery Card", "P2 (Wife's)") */
    customLabel?: string;
    /** Date when the user opened this card account (ISO string format) */
    accountStartDate?: string;
    /** Sign-up bonus being worked on for this card instance */
    signUpBonus?: UserSignUpBonus;
    /** Whether the user is an authorized user rather than the primary cardholder */
    isAuthorizedUser?: boolean;
    /** Annual fee the user actually pays, when it differs from the catalog (e.g., a retention offer) */
    annualFeeOverride?: number;
    /**
     * Set when this instance was created by product-changing another instance (UserCard.id).
     * A product change keeps the original account, so it doesn't count as a new account for 5/24.
     */
    productChangedFromId?: string;
    /**
     * Selected category for AUTO_TOP_SPEND cards.
     * Only applicable for cards with AUTO_TOP_SPEND behavior.
     * The user can only earn bonus rewards in this one category.
     */
    autoTopSpendCategory?: string;
    /** Whether this card was opened for the signup bonus and planned to be closed */
    isChurnCard?: boolean;
    /** Planned date to close this churn card (ISO string format) */
    plannedCloseDate?: string;
    
    /** Status-specific data for active cards */
    activeData?: {
      /** Payment due date (day of month, 1-31) */
      paymentDueDate?: number;
      /** Credit limit for this card */
      creditLimit?: number;

      /**
       * Tracks active selections for USER_CHOICE tiers.
       * Key: RewardTier.id
       * Value: Array of chosen CategoryIds
       *
       * Example:
       * {
       *   'usb-cashplus-5pct-tier': ['home-utilities', 'cell-phone'],
       *   'usb-cashplus-2pct-tier': ['grocery-stores']
       * }
       */
      selectedCategories?: Record<string, CategoryId[]>;

      /** IDs of ROTATING tiers the user has activated for their quarter */
      activatedTierIds?: string[];
    };
    
    /** Status-specific data for closed cards */
    closedData?: {
      /** Date when the card was closed (ISO string format) */
      closedDate?: string;
    };
    
    /** Status-specific data for product-changed cards */
    productChangedData?: {
      /** Date when the card's product was changed (ISO string format) */
      productChangeDate?: string;
      /** ID of the card that this card was product-changed to */
      productChangedToCardId?: string;
    };
  };
}

export type UserCardData = UserCard['userData'];
