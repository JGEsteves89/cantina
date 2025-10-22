export enum DishCategory {
	Soup = "soup",
	Main = "main",
	Side = "side",
	Salad = "salad",
}

export const DishIcon: Record<DishCategory, string> = {
	[DishCategory.Soup]: "🍲",
	[DishCategory.Main]: "🍖",
	[DishCategory.Side]: "🥔",
	[DishCategory.Salad]: "🥗",
} as const;


export class Dish {
	id: string;
	name: string;
	category: DishCategory;
	icon: typeof DishIcon[DishCategory];
	constructor(category: DishCategory, data: Dish) {
		this.id = data.id;
		this.name = data.name;
		this.category = category;
		this.icon = DishIcon[category];
	}
}