import { Dish } from '../models/Dish';
import { Main } from "../models/dishes/Main";
import { Salad } from "../models/dishes/Salad";
import { Side } from "../models/dishes/Side";
import { Soup } from "../models/dishes/Soup";

export class DishController {
	static getAll(): Dish[] {
		return [
			new Soup({ id: "8", name: "Lentil Soup" } as Dish),
			new Soup({ id: "9", name: "French Onion Soup" } as Dish),
			new Main({ id: "10", name: "Salmon Fillet" } as Dish),
			new Main({ id: "11", name: "Vegetable Curry" } as Dish),
			new Side({ id: "12", name: "Mashed Potatoes" } as Dish),
			new Side({ id: "13", name: "Steamed Broccoli" } as Dish),
			new Salad({ id: "14", name: "Greek Salad" } as Dish),
			new Salad({ id: "15", name: "Garden Salad" } as Dish),
		];
	}

}