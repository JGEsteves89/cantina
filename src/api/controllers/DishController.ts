import { Dish } from '../models/Dish';
import Main from "../models/dishes/Main";
import Salad from "../models/dishes/Salad";
import Side from "../models/dishes/Side";
import Soup from "../models/dishes/Soup";

export default class DishController {
	static getAll(): Dish[] {
		return [
			{ id: "8", name: "Lentil Soup" } as Soup,
			{ id: "9", name: "French Onion Soup" } as Soup,
			{ id: "10", name: "Salmon Fillet" } as Main,
			{ id: "11", name: "Vegetable Curry" } as Main,
			{ id: "12", name: "Mashed Potatoes" } as Side,
			{ id: "13", name: "Steamed Broccoli" } as Side,
			{ id: "14", name: "Greek Salad" } as Salad,
			{ id: "15", name: "Garden Salad" } as Salad
		];
	}

}