import { DishCategory } from "../models/Dish";
import Soup from "../models/dishes/Soup";
import Main from "../models/dishes/Main";
import Side from "../models/dishes/Side";
import Salad from "../models/dishes/Salad";
import { WeekMenu } from "../models/WeekMenu";
import DishController from './DishController';

export default class WeekMenuController {
	
	static getCurrent(): WeekMenu {
		// please remove me
		const dishes = DishController.getAll();
		const getDish = (category: DishCategory) => dishes.find(d => d.category === category);
		return {
			id: "1",
			date: new Date(),
			menus: {
				monday: 	{ id: "m1", soup: getDish(DishCategory.Soup) as Soup, main: getDish(DishCategory.Main) as Main, side: getDish(DishCategory.Side) as Side, salad: getDish(DishCategory.Salad) as Salad },
				tuesday: 	{ id: "m2", soup: getDish(DishCategory.Soup) as Soup, main: getDish(DishCategory.Main) as Main, side: getDish(DishCategory.Side) as Side, salad: getDish(DishCategory.Salad) as Salad },
				wednesday: 	{ id: "m3", soup: getDish(DishCategory.Soup) as Soup, main: getDish(DishCategory.Main) as Main, side: getDish(DishCategory.Side) as Side, salad: getDish(DishCategory.Salad) as Salad },
				thursday: 	{ id: "m4", soup: getDish(DishCategory.Soup) as Soup, main: getDish(DishCategory.Main) as Main, side: getDish(DishCategory.Side) as Side, salad: getDish(DishCategory.Salad) as Salad },
				friday: 	{ id: "m5", soup: getDish(DishCategory.Soup) as Soup, main: getDish(DishCategory.Main) as Main, side: getDish(DishCategory.Side) as Side, salad: getDish(DishCategory.Salad) as Salad },
				saturday: 	{ id: "m6", soup: getDish(DishCategory.Soup) as Soup, main: getDish(DishCategory.Main) as Main, side: getDish(DishCategory.Side) as Side, salad: getDish(DishCategory.Salad) as Salad },
				sunday: 	{ id: "m7", soup: getDish(DishCategory.Soup) as Soup, main: getDish(DishCategory.Main) as Main, side: getDish(DishCategory.Side) as Side, salad: getDish(DishCategory.Salad) as Salad },
			},
		} as WeekMenu;
	}
}