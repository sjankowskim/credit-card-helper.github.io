export type CategoryGroup =
  | 'food-and-drink'
  | 'travel-and-transit'
  | 'shopping-and-retail'
  | 'bills-and-utilities'
  | 'entertainment-and-leisure'
  | 'business'
  | 'everyday';

export interface CategoryMetadata {
  id: string;
  name: string;
  group: CategoryGroup;
  parentId?: string;
  note?: string;
  iconName?: string;
}