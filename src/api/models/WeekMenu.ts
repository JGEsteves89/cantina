import { addDays, startOfWeek } from "date-fns";
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
  static empty(): WeekMenu {
    const today = new Date();
    const monday = startOfWeek(today, { weekStartsOn: 1 });

    const menus = Object.values(Weekday).reduce((acc, weekday, i) => {
      acc[weekday] = new DayMenu(
        crypto.randomUUID(),
        weekday,
        addDays(today, i),
        {} // empty dishes
      );
      return acc;
    }, {} as Record<Weekday, DayMenu>);

    return new WeekMenu(crypto.randomUUID(), monday, menus);
  }
  id: string;
  date: Date;
  menus: Record<Weekday, DayMenu>;

  constructor(id: string, date: Date, menus: Record<Weekday, DayMenu>) {
    this.id = id;
    this.date = date;
    this.menus = menus;
  }
}
