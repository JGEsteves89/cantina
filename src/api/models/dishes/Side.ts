import { Dish, DishCategory } from '../Dish';
export class Side extends Dish {
	constructor(id: string, name: string) {
		super(id, name, DishCategory.Side);
	}
}