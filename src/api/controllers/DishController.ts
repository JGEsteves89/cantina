import { Dish, DishCategory } from '../models/Dish';
import { Main } from '../models/dishes/Main';
import { Salad } from '../models/dishes/Salad';
import { Side } from '../models/dishes/Side';
import { Soup } from '../models/dishes/Soup';

const db = {
  dishes: [
    { category: 'soup', id: 'lentil_soup', name: 'Lentil soup' },
    { category: 'soup', id: 'french_onion_soup', name: 'French onion soup' },
    { category: 'main', id: 'salmon_fillet', name: 'Salmon fillet' },
    { category: 'main', id: 'vegetable_curry', name: 'Vegetable curry' },
    { category: 'side', id: 'mashed_potatoes', name: 'Mashed potatoes' },
    { category: 'side', id: 'steamed_broccoli', name: 'Steamed broccoli' },
    { category: 'salad', id: 'greek_salad', name: 'Greek salad' },
    { category: 'salad', id: 'garden_salad', name: 'Garden salad' },
  ],
};

type RawDish = {
  id: string;
  name: string;
  category: string;
};

export class DishController {
  private static cache: Dish[] | null = null;

  static async getAllDishes(): Promise<Dish[]> {
    if (this.cache) return this.cache;
    const rawDishes = db.dishes;
    const dishes: Dish[] = [];
    for (const rawDish of rawDishes) {
      dishes.push(this.mapFromJSON(rawDish));
    }
    this.cache = dishes;
    return dishes;
  }

  static async generateDishId(name: string) {
    let id = name
      .trim()
      .toLowerCase()
      .replace(/[^\w\-]/g, '_')
      .replace(/^(\d)/, '_$1');

    const dishes = await this.getAllDishes();
    const alreadyWithId = dishes.filter((d) => d.id === id);
    let index = alreadyWithId.length;
    const toId = (id: string, index: number) => id + (index === 0 ? '' : index);
    while (dishes.find((d) => d.id === toId(id, index))) {
      index++;
    }

    id = toId(id, index);
    return id;
  }

  static createInstance(
    id: string,
    name: string,
    category: DishCategory,
  ): Soup | Main | Side | Salad {
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
  }

  static mapFromJSON(rawDish: RawDish): Dish {
    const category = (Object.keys(DishCategory) as Array<keyof typeof DishCategory>).find(
      (key) => DishCategory[key] === rawDish.category,
    );

    return this.createInstance(rawDish.id, rawDish.name, DishCategory[category]);
  }

  static mapToJSON(dish: Dish): RawDish {
    return { id: dish.id, name: dish.name, category: dish.category };
  }

  static async addDish(name: string, category: DishCategory): Promise<Dish[]> {
    const dishes = await this.getAllDishes();
    const id = await this.generateDishId(name);
    const newDish = this.createInstance(id, name, category);
    dishes.push(newDish);
    return this.persistDishes(dishes);
  }

  static async editDish(newDish: Dish): Promise<Dish[]> {
    const dishes = await this.getAllDishes();
    const dish = dishes.find((d) => d.id === newDish.id);
    if (!dish) {
      throw new Error('Could not find the dish with id ' + newDish.id);
    }
    dish.name = newDish.name;
    dish.category = newDish.category;
    return this.persistDishes(dishes);
  }

  static async removeDish(dishId: string): Promise<Dish[]> {
    let dishes = await this.getAllDishes();
    dishes = dishes.filter((d) => d.id !== dishId);
    return this.persistDishes(dishes);
  }

  static async persistDishes(dishes: Dish[]): Promise<Dish[]> {
    const rawDishes: RawDish[] = [];
    for (const dish of dishes) {
      rawDishes.push(this.mapToJSON(dish));
    }
    db.dishes = rawDishes;
    this.cache = dishes;
    return dishes;
  }
}
