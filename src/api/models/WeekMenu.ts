import { addDays, startOfWeek } from 'date-fns';
import { DayMenu } from './DayMenu';
import { CONFIG } from '../config';
import { v4 as uuidv4 } from 'uuid';

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
    for (let i = 0; i < CONFIG.DAYS_TO_BE_SCHEDULES; i++) {
      menus.push(
        new DayMenu(
          uuidv4(),
          addDays(today, i),
          {}, // empty dishes
        ),
      );
    }

    return new WeekMenu(crypto.randomUUID(), monday, menus);
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
