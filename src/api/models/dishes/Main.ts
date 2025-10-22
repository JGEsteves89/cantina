import { Dish, DishCategory } from '../Dish';
export class Main extends Dish {
	constructor(data: Dish) {
		super(DishCategory.Main, data);
	}
}