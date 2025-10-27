import { Dish, DishIcon, DishCategory } from './models/Dish';
import { DayMenu } from './models/DayMenu';
import { Weekday, WeekMenu } from './models/WeekMenu';
import { Main } from './models/dishes/Main';
import { Salad } from './models/dishes/Salad';
import { Side } from './models/dishes/Side';
import { Soup } from './models/dishes/Soup';

import { DishController } from './controllers/DishController';
import { WeekMenuController } from './controllers/WeekMenuController';

const log = (label: string, data?: unknown) => {
  console.log(`[API] ${label}`, data ? data : '');
};

const api = {
  getWeekMenu: async () => {
    log('getWeekMenu: start');
    const res = await WeekMenuController.getWeekMenu();
    log('getWeekMenu: result', res);
    return res;
  },

  addDishToDay: async (date: Date, dish: Dish) => {
    log('fetchCurrentWeekMenu: input', { date, dish });
    const res = await WeekMenuController.addDishToDay(date, dish);
    log('fetchCurrentWeekMenu: result', res);
    return res;
  },

  removeDishFromDay: async (date: Date, category: DishCategory) => {
    log('fetchCurrentWeekMenu: input', { date, category });
    const res = await WeekMenuController.removeDishFromDay(date, category);
    log('fetchCurrentWeekMenu: result', res);
    return res;
  },

  getAllDishes: async () => {
    log('getAllDishes: start');
    const res = await DishController.getAllDishes();
    log('getAllDishes: result', res);
    return res;
  },

  addDish: async (name: string, category: DishCategory) => {
    log('fetchAllDishes: input', { name, category });
    const res = await DishController.addDish(name, category);
    log('fetchAllDishes: result', res);
    return res;
  },

  editDish: async (dish: Dish) => {
    log('fetchAllDishes: input', dish);
    const res = await DishController.editDish(dish);
    log('fetchAllDishes: result', res);
    return res;
  },

  removeDish: async (dishId: string) => {
    log('removeDish: input', dishId);
    const res = await DishController.removeDish(dishId);
    log('removeDish: result', res);
    return res;
  },
};

export { api, Dish, DishCategory, DishIcon, Main, Salad, Side, Soup, DayMenu, Weekday, WeekMenu };
