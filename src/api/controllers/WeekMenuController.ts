import { startOfWeek } from "date-fns";
import { Dish, DishCategory } from "../models/Dish";
import { Weekday, WeekMenu } from "../models/WeekMenu";
import { DishController } from './DishController';
import { DayMenu } from "../models/DayMenu";

const db = {
	current: null
}

export class WeekMenuController {

	static async fetchCurrent(): Promise<WeekMenu> {
		if (!db.current) {
			// TODO: please remove me
			const dishes = await DishController.fetchAll();
			const soupExample = dishes.find(d => d.category === DishCategory.Soup);
			const mainExample = dishes.find(d => d.category === DishCategory.Main);
			const sideExample = dishes.find(d => d.category === DishCategory.Side);
			const saladExample = dishes.find(d => d.category === DishCategory.Salad);
			db.current = new WeekMenu(
				"1",
				new Date(),
				{
					monday: new DayMenu('m1', Weekday.Monday, { soup: soupExample, main: mainExample, side: sideExample, salad: saladExample }),
					tuesday: new DayMenu('m2', Weekday.Tuesday, { soup: soupExample, main: mainExample, side: sideExample, salad: saladExample }),
					wednesday: new DayMenu('m3', Weekday.Wednesday, {}),
					thursday: new DayMenu('m4', Weekday.Thursday, { soup: soupExample, main: mainExample, }),
					friday: new DayMenu('m5', Weekday.Friday, { side: sideExample, salad: saladExample }),
					saturday: new DayMenu('m61', Weekday.Saturday, { soup: soupExample, main: mainExample, side: sideExample, salad: saladExample }),
					sunday: new DayMenu('m7', Weekday.Sunday, { soup: soupExample, salad: saladExample }),
				}
			);
		}

		return db.current;
	}

	static async updateDishToCategoryOfWeekday(weekday: Weekday, dish: Dish): Promise<WeekMenu> {
		db.current.menus[weekday][dish.category] = dish;
		return db.current;
	}

	static deleteDishToCategoryOfWeekday(weekday: Weekday, category: DishCategory): Promise<WeekMenu>  {
		db.current.menus[weekday][category] = undefined;
		return db.current;
	}
}