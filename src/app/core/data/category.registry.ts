import { CategoryMetadata, CategoryGroup } from '../models/category.model';

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
    group: CategoryGroup.FOOD_AND_DRINK
  },
  'entertainment': {
    id: 'entertainment',
    name: 'Entertainment',
    group: CategoryGroup.ENTERTAINMENT_AND_LEISURE
  },
  'travel': {
    id: 'travel',
    name: 'Travel',
    group: CategoryGroup.TRAVEL_AND_TRANSIT
  },
  'flights-and-hotels': {
    id: 'flights-and-hotels',
    name: 'Flights and Hotels',
    group: CategoryGroup.TRAVEL_AND_TRANSIT
  }
} as const satisfies Record<string, CategoryMetadata>;

export type CategoryId = keyof typeof CATEGORY_REGISTRY;

export function isCategoryId(id: string): id is CategoryId {
  return Object.hasOwn(CATEGORY_REGISTRY, id);
}

export function getCategory(id: string): CategoryMetadata | undefined {
  return isCategoryId(id) ? CATEGORY_REGISTRY[id] : undefined;
}
