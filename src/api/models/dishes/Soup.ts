import { Dish, DishCategory } from '../Dish';
export default class Soup extends Dish {
	constructor(data: Dish) {
		super(DishCategory.Soup, data);
	}
}