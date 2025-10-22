import { addDays } from "date-fns";
import { DayMenu } from "./DayMenu";
import { Dish, DishCategory } from "./Dish";

export enum Weekday {
	Monday = "monday",
	Tuesday = "tuesday",
	Wednesday = "wednesday",
	Thursday = "thursday",
	Friday = "friday",
	Saturday = "saturday",
	Sunday = "sunday",
}

export class WeekMenu {
	id: string;
	date: Date;
	menus: Record<Weekday, DayMenu>;

	constructor(id: string, date: Date, menus: Record<Weekday, DayMenu>) {
		this.id = id;
		this.date = date;
		this.menus = menus;
	}

	getMenuPerDays(): { weekday: Weekday; menu: DayMenu; day: Date }[] {
		return Object.entries(this.menus).map(
			([weekday, menu], index) => ({ weekday: weekday as Weekday, menu, day: addDays(this.date, index) })
		);
	}

	updateDishInDay(weekday: Weekday, dish: Dish): WeekMenu {
		this.menus[weekday][dish.category] = dish;
		return this.getClone();
	}

	removeDishInDay(weekday: Weekday, category: DishCategory): WeekMenu {
		this.menus[weekday][category] = null;
		return this.getClone();
	}

	getClone(): WeekMenu {
		// deep clone the menus
		const menus = {} as Record<Weekday, DayMenu>;
		(Object.keys(this.menus) as Weekday[]).forEach((weekday) => {
			const dayMenu = this.menus[weekday];

			// assuming DayMenu is a plain object with Dish objects inside
			menus[weekday] = {
				...dayMenu,
				// clone each Dish to avoid shared references
				soup: dayMenu.soup ? { ...dayMenu.soup } : undefined,
				main: dayMenu.main ? { ...dayMenu.main } : undefined,
				side: dayMenu.side ? { ...dayMenu.side } : undefined,
				salad: dayMenu.salad ? { ...dayMenu.salad } : undefined,
			};
		});
		return new WeekMenu(this.id, this.date, menus);
	}

}