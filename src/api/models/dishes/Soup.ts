import { Dish, DishCategory } from '../Dish';
export class Soup extends Dish {
	constructor(id: string, name: string) {
		super(id, name, DishCategory.Soup);
	}
}