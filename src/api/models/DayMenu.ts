import { Main } from "./dishes/Main";
import { Salad } from "./dishes/Salad";
import { Side } from "./dishes/Side";
import { Soup } from "./dishes/Soup";
import { Weekday } from "./WeekMenu";

export interface DayMenu {
	id: string,
	weekDay: Weekday,
	soup?: Soup,
	main?: Main,
	side?: Side,
	salad?: Salad
}