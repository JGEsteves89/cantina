import { addDays } from "date-fns";
import { DayMenu } from "./DayMenu";
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

	getMenuPerDays(): { weekday: Weekday; menu: DayMenu; day: Date }[] {
		return Object.entries(this.menus).map(
			([weekday, menu], index) => ({ weekday: weekday as Weekday, menu, day: addDays(this.date, index) })
		);
	}
}