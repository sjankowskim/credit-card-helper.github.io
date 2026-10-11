import { CardIssuer, CardNetwork, RewardsProgram, type Card, type RewardTier, type UserCard } from '../models/card.model';
import { getQuarter, getRewardRate } from './reward-rate.utils';

function card(rewardTiers: RewardTier[]): Card {
  return {
    id: 'test-card',
    name: 'Test Card',
    issuer: CardIssuer.CHASE,
    rewardsProgram: RewardsProgram.CHASE_ULTIMATE_REWARDS,
    rewardsCurrency: 'Cashback',
    network: CardNetwork.VISA,
    hasForeignTransactionFee: false,
    hasTravelPartnerAccess: false,
    affectsChase524: true,
    annualFee: 0,
    isBusiness: false,
    baseRewardRate: 1,
    rewardTiers
  };
}

function userCard(activeData: NonNullable<UserCard['userData']['activeData']>): UserCard {
  return { id: 'uc-1', cardId: 'test-card', instanceNumber: 1, isWishlist: false, userData: { activeData } };
}

const Q2_2026 = new Date(2026, 4, 15);

describe('getRewardRate', () => {
  it('gives children the better of their own tier and their parent’s', () => {
    const testCard = card([
      { id: 'dining', name: 'Dining', rewardRate: 3, behavior: { type: 'AUTOMATIC' }, eligibleCategories: ['dining'] },
      { id: 'ff', name: 'Fast Food', rewardRate: 2, behavior: { type: 'AUTOMATIC' }, eligibleCategories: ['fast-food'] }
    ]);

    const result = getRewardRate(testCard, null, 'fast-food');
    expect(result.rate).toBe(3);
    expect(result.tier?.id).toBe('dining');
  });

  it('does not apply a child tier to its parent', () => {
    const testCard = card([
      { id: 'ff', name: 'Fast Food', rewardRate: 2, behavior: { type: 'AUTOMATIC' }, eligibleCategories: ['fast-food'] }
    ]);
    expect(getRewardRate(testCard, null, 'dining').rate).toBe(1);
  });

  describe('USER_CHOICE tiers', () => {
    const choiceTier: RewardTier = {
      id: 'choice',
      name: '3% Choice',
      rewardRate: 3,
      behavior: { type: 'USER_CHOICE', maxSelections: 1 },
      eligibleCategories: ['dining', 'gas-stations']
    };

    it('warns until a category is chosen', () => {
      const result = getRewardRate(card([choiceTier]), null, 'dining');
      expect(result.rate).toBe(1);
      expect(result.warning?.reason).toBe('NEEDS_SELECTION');
    });

    it('applies only to chosen categories', () => {
      const instance = userCard({ selectedCategories: { choice: ['gas-stations'] } });
      expect(getRewardRate(card([choiceTier]), instance, 'gas-stations').rate).toBe(3);

      const dining = getRewardRate(card([choiceTier]), instance, 'dining');
      expect(dining.rate).toBe(1);
      expect(dining.warning).toBeUndefined();
    });
  });

  describe('ROTATING tiers', () => {
    const rotating = (requiresActivation: boolean): RewardTier => ({
      id: 'q2',
      name: 'Q2 5%',
      rewardRate: 5,
      behavior: { type: 'ROTATING', year: 2026, quarter: 2, requiresActivation },
      eligibleCategories: ['grocery-stores']
    });

    it('applies only in its own year and quarter', () => {
      expect(getRewardRate(card([rotating(false)]), null, 'grocery-stores', Q2_2026).rate).toBe(5);
      expect(getRewardRate(card([rotating(false)]), null, 'grocery-stores', new Date(2026, 6, 1)).rate).toBe(1);
      expect(getRewardRate(card([rotating(false)]), null, 'grocery-stores', new Date(2025, 4, 15)).rate).toBe(1);
    });

    it('needs activation when the tier requires it', () => {
      const inactive = getRewardRate(card([rotating(true)]), userCard({}), 'grocery-stores', Q2_2026);
      expect(inactive.rate).toBe(1);
      expect(inactive.warning?.reason).toBe('NEEDS_ACTIVATION');

      const activated = userCard({ activatedTierIds: ['q2'] });
      expect(getRewardRate(card([rotating(true)]), activated, 'grocery-stores', Q2_2026).rate).toBe(5);
    });
  });

  it('maps months to quarters', () => {
    expect([0, 2, 3, 5, 6, 8, 9, 11].map(m => getQuarter(new Date(2026, m, 1)))).toEqual([1, 1, 2, 2, 3, 3, 4, 4]);
  });
});
