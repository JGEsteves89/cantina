import { Main } from "./dishes/Main";
import { Salad } from "./dishes/Salad";
import { Side } from "./dishes/Side";
import { Soup } from "./dishes/Soup";
import { Weekday } from "./WeekMenu";

export class DayMenu {
  id: string;
  weekday: Weekday;
  date: Date;
  soup?: Soup;
  main?: Main;
  side?: Side;
  salad?: Salad;
  constructor(id: string, weekday: Weekday, date: Date, data: { soup?: Soup, main?: Main, side?: Side, salad?: Salad }) {
    this.id = id;
    this.weekday = weekday;
    this.date = date;
    this.soup = data.soup;
    this.main = data.main;
    this.side = data.side;
    this.salad = data.salad;
  }
}
