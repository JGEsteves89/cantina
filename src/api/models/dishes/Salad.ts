import { Dish, DishCategory } from "../Dish";
export class Salad extends Dish {
  constructor(id: string, name: string) {
    super(id, name, DishCategory.Salad);
  }
}
