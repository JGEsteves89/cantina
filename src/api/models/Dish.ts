export enum DishCategory {
  Soup = 'soup',
  Main = 'main',
  Side = 'side',
  Salad = 'salad',
}

export const DishIcon: Record<DishCategory, string> = {
  [DishCategory.Soup]: '🍲',
  [DishCategory.Main]: '🍖',
  [DishCategory.Side]: '🥔',
  [DishCategory.Salad]: '🥗',
} as const;

export class Dish {
  id: string;
  name: string;
  category: DishCategory;
  icon: (typeof DishIcon)[DishCategory];
  constructor(id: string, name: string, category: DishCategory) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.icon = DishIcon[category];
  }
}
