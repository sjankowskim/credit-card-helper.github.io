import type { CategoryMetadata } from '../models/category.model';

/**
 * Spending categories. A card tier on a parent category also covers its children
 * (e.g. 3x Dining applies to Fast Food). Order here is the display order.
 */
export const CATEGORY_REGISTRY = {
  'dining': {
    id: 'dining',
    name: 'Dining',
    group: 'food-and-drink'
  },
  'fast-food': {
    id: 'fast-food',
    name: 'Fast Food',
    group: 'food-and-drink',
    parentId: 'dining'
  },
  'grocery-stores': {
    id: 'grocery-stores',
    name: 'Grocery Stores',
    group: 'food-and-drink',
    note: 'Usually excludes superstores and warehouse clubs'
  },
  'travel': {
    id: 'travel',
    name: 'Travel',
    group: 'travel-and-transit'
  },
  'airfare': {
    id: 'airfare',
    name: 'Airfare',
    group: 'travel-and-transit',
    parentId: 'travel'
  },
  'hotels': {
    id: 'hotels',
    name: 'Hotels',
    group: 'travel-and-transit',
    parentId: 'travel'
  },
  'car-rentals': {
    id: 'car-rentals',
    name: 'Car Rentals',
    group: 'travel-and-transit',
    parentId: 'travel'
  },
  'transit': {
    id: 'transit',
    name: 'Transit',
    group: 'travel-and-transit',
    note: 'Trains, buses, tolls, parking'
  },
  'rideshare': {
    id: 'rideshare',
    name: 'Rideshare',
    group: 'travel-and-transit',
    parentId: 'transit'
  },
  'gas-stations': {
    id: 'gas-stations',
    name: 'Gas Stations',
    group: 'travel-and-transit'
  },
  'ev-charging': {
    id: 'ev-charging',
    name: 'EV Charging',
    group: 'travel-and-transit'
  },
  'entertainment': {
    id: 'entertainment',
    name: 'Entertainment',
    group: 'entertainment-and-leisure'
  },
  'live-entertainment': {
    id: 'live-entertainment',
    name: 'Live Entertainment',
    group: 'entertainment-and-leisure',
    parentId: 'entertainment'
  },
  'streaming': {
    id: 'streaming',
    name: 'Streaming Services',
    group: 'entertainment-and-leisure'
  },
  'fitness': {
    id: 'fitness',
    name: 'Fitness Clubs',
    group: 'entertainment-and-leisure'
  },
  'movie-theaters': {
    id: 'movie-theaters',
    name: 'Movie Theaters',
    group: 'entertainment-and-leisure',
    parentId: 'entertainment'
  },
  'online-retail': {
    id: 'online-retail',
    name: 'Online Shopping',
    group: 'shopping-and-retail'
  },
  'drugstores': {
    id: 'drugstores',
    name: 'Drugstores',
    group: 'shopping-and-retail'
  },
  'home-improvement': {
    id: 'home-improvement',
    name: 'Home Improvement',
    group: 'shopping-and-retail'
  },
  'department-stores': {
    id: 'department-stores',
    name: 'Department Stores',
    group: 'shopping-and-retail'
  },
  'clothing-stores': {
    id: 'clothing-stores',
    name: 'Clothing Stores',
    group: 'shopping-and-retail'
  },
  'electronics-stores': {
    id: 'electronics-stores',
    name: 'Electronics Stores',
    group: 'shopping-and-retail'
  },
  'sporting-goods-stores': {
    id: 'sporting-goods-stores',
    name: 'Sporting Goods Stores',
    group: 'shopping-and-retail'
  },
  'furniture-stores': {
    id: 'furniture-stores',
    name: 'Furniture Stores',
    group: 'shopping-and-retail'
  },
  'utilities': {
    id: 'utilities',
    name: 'Utilities',
    group: 'bills-and-utilities'
  },
  'phone': {
    id: 'phone',
    name: 'Cell Phone',
    group: 'bills-and-utilities'
  },
  'internet-cable': {
    id: 'internet-cable',
    name: 'Internet & Cable',
    group: 'bills-and-utilities'
  },
  'rent': {
    id: 'rent',
    name: 'Rent',
    group: 'bills-and-utilities'
  },
  'mortgage': {
    id: 'mortgage',
    name: 'Mortgage',
    group: 'bills-and-utilities'
  },
  'office-supply-stores': {
    id: 'office-supply-stores',
    name: 'Office Supply Stores',
    group: 'business'
  },
  'shipping': {
    id: 'shipping',
    name: 'Shipping',
    group: 'business'
  },
  'advertising': {
    id: 'advertising',
    name: 'Online Advertising',
    group: 'business',
    note: 'Social media and search engine ads'
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
