import { format } from 'date-fns';
import { Main } from './dishes/Main';
import { Salad } from './dishes/Salad';
import { Side } from './dishes/Side';
import { Soup } from './dishes/Soup';
import { Weekday } from './WeekMenu';

export class DayMenu {
  id: string;
  date: Date;
  weekday: Weekday;
  soup?: Soup;
  main?: Main;
  side?: Side;
  salad?: Salad;
  constructor(
    id: string,
    date: Date,
    data: { soup?: Soup; main?: Main; side?: Side; salad?: Salad },
  ) {
    this.id = id;
    this.date = date;
    // gets the name of day of the week and convert it to the enum Weekday
    this.weekday = Weekday[format(date, 'EEEE') as keyof typeof Weekday].toLowerCase() as Weekday;
    this.soup = data.soup;
    this.main = data.main;
    this.side = data.side;
    this.salad = data.salad;
  }
}
