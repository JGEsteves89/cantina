import { Dish, DishCategory } from '../Dish';
export class Salad extends Dish {
	constructor(data: Dish) {
		super(DishCategory.Salad, data);
	}
}