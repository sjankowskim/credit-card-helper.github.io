export const CategoryGroup = {
  FOOD_AND_DRINK: 'food-and-drink',
  TRAVEL_AND_TRANSIT: 'travel-and-transit',
  SHOPPING_AND_RETAIL: 'shopping-and-retail',
  BILLS_AND_UTILITIES: 'bills-and-utilities',
  ENTERTAINMENT_AND_LEISURE: 'entertainment-and-leisure',
  EVERYDAY: 'everyday'
} as const;

export type CategoryGroup = typeof CategoryGroup[keyof typeof CategoryGroup];

export interface CategoryMetadata {
  id: string;
  name: string;
  group: CategoryGroup;
  parentId?: string;
  note?: string;
  iconName?: string;
}