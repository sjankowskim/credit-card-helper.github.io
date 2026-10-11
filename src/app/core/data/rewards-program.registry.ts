/**
 * Rewards program registry
 * Defines which rewards programs allow point transfers between cards
 * This enables cards like Savor One to transfer points to Venture X for travel redemption
 */
import type { RewardsProgram } from '../models/card.model';

export interface RewardsProgramMetadata {
  id: RewardsProgram;
  name: string;
  /** Whether points in this program can be transferred to other cards in the same program */
  allowsTransfers: boolean;
  /** Whether this program has travel partner redemption options */
  hasTravelPartners: boolean;
}

export const REWARDS_PROGRAM_REGISTRY: Record<RewardsProgram, RewardsProgramMetadata> = {
  'Capital One Rewards': {
    id: 'Capital One Rewards',
    name: 'Capital One Rewards',
    allowsTransfers: true,
    hasTravelPartners: true
  },
  'Chase Ultimate Rewards': {
    id: 'Chase Ultimate Rewards',
    name: 'Chase Ultimate Rewards',
    allowsTransfers: true,
    hasTravelPartners: true
  },
  'Amex Membership Rewards': {
    id: 'Amex Membership Rewards',
    name: 'Amex Membership Rewards',
    allowsTransfers: true,
    hasTravelPartners: true
  },
  'Citi ThankYou': {
    id: 'Citi ThankYou',
    name: 'Citi ThankYou',
    allowsTransfers: true,
    hasTravelPartners: true
  },
  'Wells Fargo Rewards': {
    id: 'Wells Fargo Rewards',
    name: 'Wells Fargo Rewards',
    allowsTransfers: true,
    hasTravelPartners: true
  },
  'BILT': {
    id: 'BILT',
    name: 'BILT',
    allowsTransfers: true,
    hasTravelPartners: true
  },
  'American Airlines AAdvantage': {
    id: 'American Airlines AAdvantage',
    name: 'American Airlines AAdvantage',
    allowsTransfers: false,
    hasTravelPartners: true
  },
  'U.S. Bank Rewards': {
    id: 'U.S. Bank Rewards',
    name: 'U.S. Bank Rewards',
    allowsTransfers: false,
    hasTravelPartners: false
  },
  'Amex Cash Back': {
    id: 'Amex Cash Back',
    name: 'Amex Cash Back',
    allowsTransfers: false,
    hasTravelPartners: false
  },
  'Bank of America Rewards': {
    id: 'Bank of America Rewards',
    name: 'Bank of America Rewards',
    allowsTransfers: false,
    hasTravelPartners: false
  },
  'Discover Cashback Bonus': {
    id: 'Discover Cashback Bonus',
    name: 'Discover Cashback Bonus',
    allowsTransfers: false,
    hasTravelPartners: false
  },
  'Delta SkyMiles': {
    id: 'Delta SkyMiles',
    name: 'Delta SkyMiles',
    allowsTransfers: false,
    hasTravelPartners: true
  },
  'Hilton Honors': {
    id: 'Hilton Honors',
    name: 'Hilton Honors',
    allowsTransfers: false,
    hasTravelPartners: true
  },
  'Marriott Bonvoy': {
    id: 'Marriott Bonvoy',
    name: 'Marriott Bonvoy',
    allowsTransfers: false,
    hasTravelPartners: true
  },
  'Store Rewards': {
    id: 'Store Rewards',
    name: 'Store Rewards',
    allowsTransfers: false,
    hasTravelPartners: false
  },
  'Atmos Rewards': {
    id: 'Atmos Rewards',
    name: 'Atmos Rewards',
    allowsTransfers: false,
    hasTravelPartners: true
  },
  'Flying Blue': {
    id: 'Flying Blue',
    name: 'Flying Blue',
    allowsTransfers: false,
    hasTravelPartners: true
  }
};
