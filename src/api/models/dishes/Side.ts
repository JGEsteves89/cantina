import { Dish, DishCategory } from '../Dish';
export class Side extends Dish {
	constructor(data: Dish) {
		super(DishCategory.Side, data);
	}
}