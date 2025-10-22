import { addDays } from "date-fns";
import Menu from "./Menu";
export type Weekday = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export type DayMenu = { weekday: Weekday; menu: Menu; day: Date };

export class WeekMenu {
	id: string;
	date: Date;
	menus: Record<Weekday, Menu>;

	getMenuPerDays(): DayMenu[] {
		return Object.entries(this.menus).map(
			([weekday, menu], index) => ({ weekday: weekday as Weekday, menu, day: addDays(this.date, index) })
		);
	}
}