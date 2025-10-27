import { startOfWeek } from 'date-fns';
import { DayMenu } from './DayMenu';

export enum Weekday {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

export class WeekMenu {
  static empty(): WeekMenu {
    const today = new Date();
    const monday = startOfWeek(today, { weekStartsOn: 1 });

    const menus: DayMenu[] = [];

    return new WeekMenu(today.toISOString(), monday, menus);
  }
  id: string;
  date: Date;
  menus: DayMenu[];

  constructor(id: string, date: Date, menus: DayMenu[]) {
    this.id = id;
    this.date = date;
    this.menus = menus;
  }
}
