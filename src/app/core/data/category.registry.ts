import { CategoryMetadata, CategoryGroup } from '../models/category.model';

/**
 * Spending categories. A card tier on a parent category also covers its children
 * (e.g. 3x Dining applies to Fast Food). Order here is the display order.
 */
export const CATEGORY_REGISTRY = {
  'dining': {
    id: 'dining',
    name: 'Dining',
    group: CategoryGroup.FOOD_AND_DRINK
  },
  'fast-food': {
    id: 'fast-food',
    name: 'Fast Food',
    group: CategoryGroup.FOOD_AND_DRINK,
    parentId: 'dining'
  },
  'grocery-stores': {
    id: 'grocery-stores',
    name: 'Grocery Stores',
    group: CategoryGroup.FOOD_AND_DRINK,
    note: 'Usually excludes superstores and warehouse clubs'
  },
  'travel': {
    id: 'travel',
    name: 'Travel',
    group: CategoryGroup.TRAVEL_AND_TRANSIT
  },
  'airfare': {
    id: 'airfare',
    name: 'Airfare',
    group: CategoryGroup.TRAVEL_AND_TRANSIT,
    parentId: 'travel'
  },
  'hotels': {
    id: 'hotels',
    name: 'Hotels',
    group: CategoryGroup.TRAVEL_AND_TRANSIT,
    parentId: 'travel'
  },
  'car-rentals': {
    id: 'car-rentals',
    name: 'Car Rentals',
    group: CategoryGroup.TRAVEL_AND_TRANSIT,
    parentId: 'travel'
  },
  'transit': {
    id: 'transit',
    name: 'Transit',
    group: CategoryGroup.TRAVEL_AND_TRANSIT,
    note: 'Trains, buses, tolls, parking'
  },
  'rideshare': {
    id: 'rideshare',
    name: 'Rideshare',
    group: CategoryGroup.TRAVEL_AND_TRANSIT,
    parentId: 'transit'
  },
  'gas-stations': {
    id: 'gas-stations',
    name: 'Gas Stations',
    group: CategoryGroup.TRAVEL_AND_TRANSIT
  },
  'ev-charging': {
    id: 'ev-charging',
    name: 'EV Charging',
    group: CategoryGroup.TRAVEL_AND_TRANSIT
  },
  'entertainment': {
    id: 'entertainment',
    name: 'Entertainment',
    group: CategoryGroup.ENTERTAINMENT_AND_LEISURE
  },
  'live-entertainment': {
    id: 'live-entertainment',
    name: 'Live Entertainment',
    group: CategoryGroup.ENTERTAINMENT_AND_LEISURE,
    parentId: 'entertainment'
  },
  'streaming': {
    id: 'streaming',
    name: 'Streaming Services',
    group: CategoryGroup.ENTERTAINMENT_AND_LEISURE
  },
  'fitness': {
    id: 'fitness',
    name: 'Fitness Clubs',
    group: CategoryGroup.ENTERTAINMENT_AND_LEISURE
  },
  'online-retail': {
    id: 'online-retail',
    name: 'Online Shopping',
    group: CategoryGroup.SHOPPING_AND_RETAIL
  },
  'drugstores': {
    id: 'drugstores',
    name: 'Drugstores',
    group: CategoryGroup.SHOPPING_AND_RETAIL
  },
  'home-improvement': {
    id: 'home-improvement',
    name: 'Home Improvement',
    group: CategoryGroup.SHOPPING_AND_RETAIL
  },
  'utilities': {
    id: 'utilities',
    name: 'Utilities',
    group: CategoryGroup.BILLS_AND_UTILITIES
  },
  'phone': {
    id: 'phone',
    name: 'Cell Phone',
    group: CategoryGroup.BILLS_AND_UTILITIES
  },
  'internet-cable': {
    id: 'internet-cable',
    name: 'Internet & Cable',
    group: CategoryGroup.BILLS_AND_UTILITIES
  },
  'rent': {
    id: 'rent',
    name: 'Rent',
    group: CategoryGroup.BILLS_AND_UTILITIES
  }
} as const satisfies Record<string, CategoryMetadata>;

export type CategoryId = keyof typeof CATEGORY_REGISTRY;

export const ALL_CATEGORIES: readonly CategoryMetadata[] = Object.values(CATEGORY_REGISTRY);

export function isCategoryId(id: string): id is CategoryId {
  return Object.hasOwn(CATEGORY_REGISTRY, id);
}

export function getCategory(id: string): CategoryMetadata | undefined {
  return isCategoryId(id) ? CATEGORY_REGISTRY[id] : undefined;
}

export function getCategoryName(id: string): string {
  return getCategory(id)?.name ?? id;
}

/** The category followed by its parent, grandparent, etc. */
export function getCategoryLineage(id: string): string[] {
  const lineage: string[] = [];
  let category = getCategory(id);
  while (category) {
    lineage.push(category.id);
    category = category.parentId ? getCategory(category.parentId) : undefined;
  }
  return lineage;
}
