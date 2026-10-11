/**
 * Rewards program registry
 * Defines which rewards programs allow point transfers between cards
 * This enables cards like Savor One to transfer points to Venture X for travel redemption
 */
import { RewardsProgram } from '../models/card.model';

export interface RewardsProgramMetadata {
  id: RewardsProgram;
  name: string;
  /** Whether points in this program can be transferred to other cards in the same program */
  allowsTransfers: boolean;
  /** Whether this program has travel partner redemption options */
  hasTravelPartners: boolean;
}

export const REWARDS_PROGRAM_REGISTRY: Record<RewardsProgram, RewardsProgramMetadata> = {
  [RewardsProgram.CAPITAL_ONE_REWARDS]: {
    id: RewardsProgram.CAPITAL_ONE_REWARDS,
    name: 'Capital One Rewards',
    allowsTransfers: true,
    hasTravelPartners: true
  },
  [RewardsProgram.CHASE_ULTIMATE_REWARDS]: {
    id: RewardsProgram.CHASE_ULTIMATE_REWARDS,
    name: 'Chase Ultimate Rewards',
    allowsTransfers: true,
    hasTravelPartners: true
  },
  [RewardsProgram.AMEX_MEMBERSHIP_REWARDS]: {
    id: RewardsProgram.AMEX_MEMBERSHIP_REWARDS,
    name: 'Amex Membership Rewards',
    allowsTransfers: true,
    hasTravelPartners: true
  },
  [RewardsProgram.CITI_THANKYOU]: {
    id: RewardsProgram.CITI_THANKYOU,
    name: 'Citi ThankYou',
    allowsTransfers: true,
    hasTravelPartners: true
  },
  [RewardsProgram.WELLS_FARGO_REWARDS]: {
    id: RewardsProgram.WELLS_FARGO_REWARDS,
    name: 'Wells Fargo Rewards',
    allowsTransfers: true,
    hasTravelPartners: true
  },
  [RewardsProgram.BILT]: {
    id: RewardsProgram.BILT,
    name: 'BILT',
    allowsTransfers: true,
    hasTravelPartners: true
  }
};
