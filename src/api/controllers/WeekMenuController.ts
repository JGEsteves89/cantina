import { addDays } from "date-fns";
import { Dish, DishCategory } from "../models/Dish";
import { Weekday, WeekMenu } from "../models/WeekMenu";
import { DishController } from "./DishController";
import { DayMenu } from "../models/DayMenu";

const db = {
  current: null,
};

export class WeekMenuController {
  static async fetchCurrent(): Promise<WeekMenu> {
    if (!db.current) {
      const dishes = await DishController.fetchAll();
      const soupExample = dishes.find((d) => d.category === DishCategory.Soup);
      const mainExample = dishes.find((d) => d.category === DishCategory.Main);
      const sideExample = dishes.find((d) => d.category === DishCategory.Side);
      const saladExample = dishes.find(
        (d) => d.category === DishCategory.Salad,
      );
      const today = new Date();
      db.current = new WeekMenu("1", today, [
        new DayMenu("m1", addDays(today, 0), {
          soup: soupExample,
          main: mainExample,
          side: sideExample,
          salad: saladExample,
        }),
        new DayMenu("m2", addDays(today, 1), {
          soup: soupExample,
          main: mainExample,
          side: sideExample,
          salad: saladExample,
        }),
        new DayMenu("m3", addDays(today, 2), {}),
        new DayMenu("m4", addDays(today, 3), {
          soup: soupExample,
          main: mainExample,
        }),
        new DayMenu("m5", addDays(today, 4), {
          side: sideExample,
          salad: saladExample,
        }),
        new DayMenu("m61", addDays(today, 5), {
          soup: soupExample,
          main: mainExample,
          side: sideExample,
          salad: saladExample,
        }),
        new DayMenu("m7", addDays(today, 6), {
          soup: soupExample,
          salad: saladExample,
        }),
      ]);
    }

    return db.current;
  }

  static async updateDishToCategoryOfWeekday(
    weekday: Weekday,
    dish: Dish,
  ): Promise<WeekMenu> {
    db.current.menus[weekday][dish.category] = dish;
    return db.current;
  }

  static deleteDishToCategoryOfWeekday(
    weekday: Weekday,
    category: DishCategory,
  ): Promise<WeekMenu> {
    db.current.menus[weekday][category] = undefined;
    return db.current;
  }
}
