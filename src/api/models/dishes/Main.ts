import { Dish, DishCategory } from '../Dish';
export class Main extends Dish {
	constructor(id: string, name: string) {
		super(id, name, DishCategory.Main);
	}
}