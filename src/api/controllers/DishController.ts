import { Dish, DishCategory } from "../models/Dish";
import { Main } from "../models/dishes/Main";
import { Salad } from "../models/dishes/Salad";
import { Side } from "../models/dishes/Side";
import { Soup } from "../models/dishes/Soup";
const db = {
  dishes: [
    new Soup("0", "Lentil Soup"),
    new Soup("1", "French Onion Soup"),
    new Main("2", "Salmon Fillet"),
    new Main("3", "Vegetable Curry"),
    new Side("4", "Mashed Potatoes"),
    new Side("5", "Steamed Broccoli"),
    new Salad("6", "Greek Salad"),
    new Salad("9", "Garden Salad"),
  ],
};

export class DishController {
  static async fetchAll(): Promise<Dish[]> {
    return db.dishes;
  }
  static newDish(
    name: string,
    category: DishCategory,
  ): Soup | Main | Side | Salad {
    const id: string = (db.dishes.length + 1).toString();
    switch (category) {
      case DishCategory.Soup:
        return new Soup(id, name);
      case DishCategory.Main:
        return new Main(id, name);
      case DishCategory.Side:
        return new Side(id, name);
      case DishCategory.Salad:
        return new Salad(id, name);
    }
    throw new Error("Unknown dish category " + category);
  }
  static async createDish(
    name: string,
    category: DishCategory,
  ): Promise<Dish[]> {
    const newDish = this.newDish(name, category);
    db.dishes.push(newDish as unknown as Dish);
    return db.dishes;
  }
  static async deleteDish(dishId: string): Promise<Dish[]> {
    db.dishes = db.dishes.filter((d) => d.id !== dishId);
    return db.dishes;
  }

  static async updateDish(newDish: Dish): Promise<Dish[]> {
    const dish = db.dishes.find((d) => d.id === newDish.id);
    if (!dish) {
      throw new Error("Could not find the dish with id " + dish.id);
    }
    dish.name = newDish.name;
    dish.category = newDish.category;
    return db.dishes;
  }
}
