import { Dish, DishIcon, DishCategory } from "./models/Dish";
import { DayMenu } from "./models/DayMenu";
import { Weekday, WeekMenu } from "./models/WeekMenu";
import { Main } from "./models/dishes/Main";
import { Salad } from "./models/dishes/Salad";
import { Side } from "./models/dishes/Side";
import { Soup } from "./models/dishes/Soup";

import { DishController } from "./controllers/DishController";
import { WeekMenuController } from "./controllers/WeekMenuController";

const log = (label: string, data?: unknown) => {
	console.log(`[API] ${label}`, data ? data : "");
};

const api = {
	fetchCurrentWeekMenu: async () => {
		log("fetchCurrentWeekMenu: start");
		const res = await WeekMenuController.fetchCurrent();
		log("fetchCurrentWeekMenu: result", res);
		return res;
	},

	updateDishToCategoryOfWeekday: async (weekday: Weekday, dish: Dish) => {
		log("updateDishToCategoryOfWeekday: input", { weekday, dish });
		const res = await WeekMenuController.updateDishToCategoryOfWeekday(weekday, dish);
		log("updateDishToCategoryOfWeekday: result", res);
		return res;
	},

	deleteDishToCategoryOfWeekday: async (weekday: Weekday, category: DishCategory) => {
		log("deleteDishToCategoryOfWeekday: input", { weekday, category });
		const res = await WeekMenuController.deleteDishToCategoryOfWeekday(weekday, category);
		log("deleteDishToCategoryOfWeekday: result", res);
		return res;
	},

	fetchAllDishes: async () => {
		log("fetchAllDishes: start");
		const res = await DishController.fetchAll();
		log("fetchAllDishes: result", res);
		return res;
	},

	createDish: async (name: string, category: DishCategory) => {
		log("createDish: input", { name, category });
		const res = await DishController.createDish(name, category);
		log("createDish: result", res);
		return res;
	},

	updateDish: async (dish: Dish) => {
		log("updateDish: input", dish);
		const res = await DishController.updateDish(dish);
		log("updateDish: result", res);
		return res;
	},

	deleteDish: async (dishId: string) => {
		log("deleteDish: input", dishId);
		const res = await DishController.deleteDish(dishId);
		log("deleteDish: result", res);
		return res;
	}
};

export {
	api,
	Dish,
	DishCategory,
	DishIcon,
	Main,
	Salad,
	Side,
	Soup,
	DayMenu,
	Weekday,
	WeekMenu
};
