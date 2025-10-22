import { DishCategory } from "../models/Dish";
import { Weekday, WeekMenu } from "../models/WeekMenu";
import { DishController } from './DishController';
import { DayMenu } from "../models/DayMenu";

export class WeekMenuController {

	static getCurrent(): WeekMenu {
		// TODO: please remove me
		const dishes = DishController.getAll();
		const soupExample = dishes.find(d => d.category === DishCategory.Soup);
		const mainExample = dishes.find(d => d.category === DishCategory.Main);
		const sideExample = dishes.find(d => d.category === DishCategory.Side);
		const saladExample = dishes.find(d => d.category === DishCategory.Salad);
		return new WeekMenu(
			"1",
			new Date(),
			{
				monday: new DayMenu('m1', Weekday.Monday, { soup: soupExample, main: mainExample, side: sideExample, salad: saladExample }),
				tuesday: new DayMenu('m1', Weekday.Tuesday, { soup: soupExample, main: mainExample, side: sideExample, salad: saladExample }),
				wednesday: new DayMenu('m1', Weekday.Wednesday, {}),
				thursday: new DayMenu('m1', Weekday.Thursday, { soup: soupExample, main: mainExample, }),
				friday: new DayMenu('m1', Weekday.Friday, { side: sideExample, salad: saladExample }),
				saturday: new DayMenu('m1', Weekday.Saturday, { soup: soupExample, main: mainExample, side: sideExample, salad: saladExample }),
				sunday: new DayMenu('m1', Weekday.Sunday, { soup: soupExample, salad: saladExample }),
			}
		);
	}
}