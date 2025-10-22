import { Dish, DishCategory } from '../Dish';
export default class Salad extends Dish {
	constructor(data: Dish) {
		super(DishCategory.Salad, data);
	}
}