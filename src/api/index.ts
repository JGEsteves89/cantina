import { Dish, DishCategory, DishIcon } from "./models/Dish";
export { Dish, DishCategory, DishIcon };

export type { default as Main } from "./models/dishes/Main";
export type { default as Salad } from "./models/dishes/Salad";
export type { default as Side } from "./models/dishes/Side";
export type { default as Soup } from "./models/dishes/Soup";


export { default as DishController } from "./controllers/DishController";
export { default as WeekMenuController } from "./controllers/WeekMenuController";