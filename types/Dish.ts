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

export interface DishDTO {
	id: string;
	name: string;
	category: string;
}

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

	toDTO(): DishDTO {
		return {
			id: this.id,
			name: this.name,
			category: this.category,
		};
	}

	static fromDTO(dishDTO: DishDTO): Dish {
		const category = (Object.keys(DishCategory) as (keyof typeof DishCategory)[]).find((key) => DishCategory[key] === dishDTO.category);
		return new Dish(dishDTO.id, dishDTO.name, category? DishCategory[category] : DishCategory.Main);
	}

	static generateId(name: string): string {
		return name
			.trim()
			.toLowerCase()
			.normalize('NFD') // decompose accented chars
			.replace(/[\u0300-\u036f]/g, '') // remove diacritics
			.replace(/[^\p{L}\d-]+/gu, '_') // keep letters and digits, replace others
			.replace(/^(\d)/, '_$1'); // prefix leading digits
	}
}
