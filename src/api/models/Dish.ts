export enum DishCategory {
	Soup = "soup",
	Main = "main",
	Side = "side",
	Salad = "salad",
}

const DishIconMap: Record<DishCategory, string> = {
	[DishCategory.Soup]: "🍲",
	[DishCategory.Main]: "🍖",
	[DishCategory.Side]: "🥔",
	[DishCategory.Salad]: "🥗",
} as const;

export type DishIcon = {
	[K in DishCategory]: typeof DishIconMap[DishCategory];
};

export class Dish {
	id: string;
	name: string;
	category: DishCategory;
	icon: DishIcon[DishCategory];
	constructor(category: DishCategory, data: Dish) {
		this.id = data.id;
		this.name = data.name;
		this.category = category;
		this.icon = DishIconMap[category];
	}
}