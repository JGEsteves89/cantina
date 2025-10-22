import { Dish, DishCategory } from '../Dish';
export class Soup extends Dish {
	constructor(data: Dish) {
		super(DishCategory.Soup, data);
	}
}