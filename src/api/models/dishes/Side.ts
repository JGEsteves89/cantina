import { Dish, DishCategory } from '../Dish';
export default class Side extends Dish {
	constructor(data: Dish) {
		super(DishCategory.Side, data);
	}
}