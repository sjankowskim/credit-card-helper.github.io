import { CategoryMetadata, CategoryGroup } from '../models/category.model';

export const CATEGORY_REGISTRY: Record<string, CategoryMetadata> = {
  'dining': {
    id: 'dining',
    name: 'Dining',
    group: CategoryGroup.FOOD_AND_DRINK,
    parentId: undefined,
    note: undefined,
    iconName: undefined
  },
  'fast-food': {
    id: 'fast-food',
    name: 'Fast Food',
    group: CategoryGroup.FOOD_AND_DRINK,
    parentId: 'dining',
    note: undefined,
    iconName: undefined
  },
  'grocery-stores': {
    id: 'grocery-stores',
    name: 'Grocery Stores',
    group: CategoryGroup.FOOD_AND_DRINK,
    parentId: undefined,
    note: undefined,
    iconName: undefined
  },
  'entertainment': {
    id: 'entertainment',
    name: 'Entertainment',
    group: CategoryGroup.ENTERTAINMENT_AND_LEISURE,
    parentId: undefined,
    note: undefined,
    iconName: undefined
  },
  'travel': {
    id: 'travel',
    name: 'Travel',
    group: CategoryGroup.TRAVEL_AND_TRANSIT,
    parentId: undefined,
    note: undefined,
    iconName: undefined
  },
  'flights-and-hotels': {
    id: 'flights-and-hotels',
    name: 'Flights and Hotels',
    group: CategoryGroup.TRAVEL_AND_TRANSIT,
    parentId: undefined,
    note: undefined,
    iconName: undefined
  }
};

export type CategoryId = keyof typeof CATEGORY_REGISTRY;