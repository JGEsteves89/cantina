import { Dish, DishCategory } from '../Dish';
export default class Main extends Dish {
	constructor(data: Dish) {
		super(DishCategory.Main, data);
	}
}