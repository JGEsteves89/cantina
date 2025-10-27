import { isSameDay, addDays, format, startOfDay } from 'date-fns';
import { DB } from '../db/db';
import { Dish, DishCategory } from '../models/Dish';
import { WeekMenu } from '../models/WeekMenu';
import { DishController } from './DishController';
import { DayMenu } from '../models/DayMenu';
import { Soup } from '../models/dishes/Soup';
import { Main } from '../models/dishes/Main';
import { Side } from '../models/dishes/Side';
import { Salad } from '../models/dishes/Salad';
import { CONFIG } from '../config';

type RawDayMenu = {
  id: string;
  date: string;
  soup: string;
  main: string;
  side: string;
  salad: string;
};

export class WeekMenuController {
  private static db = new DB<RawDayMenu[]>('menus', []);
  private static cache: WeekMenu | null = null;

  static async getWeekMenu(): Promise<WeekMenu> {
    if (this.cache) {
      return this.cache;
    }
    const rawDayMenus = await this.db.read();

    const today = startOfDay(new Date());
    const dishes = await DishController.getAllDishes();
    const menus: DayMenu[] = [];

    for (let i = 0; i < CONFIG.DAYS_TO_BE_SCHEDULES; i++) {
      const date = addDays(today, i);
      const rawMenu = rawDayMenus.find((d) => isSameDay(new Date(d.date), date));
      if (rawMenu) {
        menus.push(this.mapFromJSON(rawMenu, dishes));
      } else {
        menus.push(new DayMenu(this.generateIdFromDate(date), date, {}));
      }
    }

    const id = this.generateIdFromDate(today);
    const weekMenu = this.createInstance(id, today, menus);
    this.cache = weekMenu;
    return weekMenu;
  }

  static generateIdFromDate(date: Date): string {
    return format(date, 'yyyyMMdd');
  }

  static createInstance(id: string, date: Date, menus: DayMenu[]): WeekMenu {
    return new WeekMenu(id, date, menus);
  }

  static mapFromJSON(rawDayMenu: RawDayMenu, dishes: Dish[]): DayMenu {
    const menu: { soup?: Soup; main?: Main; side?: Side; salad?: Salad } = {};

    menu.soup = dishes.find((d) => d.id === rawDayMenu.soup);
    menu.main = dishes.find((d) => d.id === rawDayMenu.main);
    menu.side = dishes.find((d) => d.id === rawDayMenu.side);
    menu.salad = dishes.find((d) => d.id === rawDayMenu.salad);

    return new DayMenu(rawDayMenu.id, new Date(rawDayMenu.date), menu);
  }

  static mapToJSON(dayMenu: DayMenu): RawDayMenu {
    return {
      id: dayMenu.id,
      date: dayMenu.date.toISOString(),
      soup: dayMenu.soup ? dayMenu.soup.id : undefined,
      main: dayMenu.main ? dayMenu.main.id : undefined,
      side: dayMenu.side ? dayMenu.side.id : undefined,
      salad: dayMenu.salad ? dayMenu.salad.id : undefined,
    };
  }

  static async persistWeekMenu(weekMenu: WeekMenu): Promise<WeekMenu> {
    let rawDayMenus = await this.db.read();

    for (const dayMenu of weekMenu.menus) {
      const rawDayMenu = rawDayMenus.find((d) => d.id === dayMenu.id);
      if (rawDayMenu) {
        rawDayMenus = rawDayMenus.filter((d) => d.id !== rawDayMenu.id);
      }
      rawDayMenus.push(this.mapToJSON(dayMenu));
    }
    this.db.write(rawDayMenus);
    this.cache = weekMenu;
    return weekMenu;
  }

  static async addDishToDay(date: Date, dish: Dish): Promise<WeekMenu> {
    const weekMenu = await WeekMenuController.getWeekMenu();
    const dayMenu = weekMenu.menus.find((m) => isSameDay(m.date, date));
    dayMenu[dish.category] = dish;
    return this.persistWeekMenu(weekMenu);
  }

  static async editDishOfDay(date: Date, newDish: Dish): Promise<WeekMenu> {
    return this.addDishToDay(date, newDish);
  }

  static async removeDishFromDay(date: Date, category: DishCategory): Promise<WeekMenu> {
    const weekMenu = await WeekMenuController.getWeekMenu();
    const dayMenu = weekMenu.menus.find((m) => isSameDay(m.date, date));
    dayMenu[category] = undefined;
    return this.persistWeekMenu(weekMenu);
  }
}
