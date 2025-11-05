import { format } from 'date-fns';
import { Main } from './dishes/Main';
import { Salad } from './dishes/Salad';
import { Side } from './dishes/Side';
import { Soup } from './dishes/Soup';
import { Dish, DishCategory } from './Dish';

export interface MenuDTO {
  id: string;
  date: string;
  [DishCategory.Soup]: string;
  [DishCategory.Main]: string;
  [DishCategory.Side]: string;
  [DishCategory.Salad]: string;
}

export class Menu {
  id: string;
  date: Date;
  [DishCategory.Soup]?: Soup;
  [DishCategory.Main]?: Main;
  [DishCategory.Side]?: Side;
  [DishCategory.Salad]?: Salad;
  constructor(
    id: string,
    date: Date,
    data: { soup?: Soup; main?: Main; side?: Side; salad?: Salad },
  ) {
    this.id = id;
    this.date = date;
    this.soup = data.soup;
    this.main = data.main;
    this.side = data.side;
    this.salad = data.salad;
  }

  toDTO(): MenuDTO {
    return {
      id: this.id,
      date: this.date.toISOString(),
      soup: this.soup?.id || '',
      main: this.main?.id || '',
      side: this.side?.id || '',
      salad: this.salad?.id || '',
    };
  }

  static fromDTO(menuDTO: MenuDTO, dishes: Dish[]): Menu {
    const newMenu = new Menu(menuDTO.id, new Date(menuDTO.date), {});

    newMenu.soup = dishes.find((d) => d.id === menuDTO.soup);
    newMenu.main = dishes.find((d) => d.id === menuDTO.main);
    newMenu.side = dishes.find((d) => d.id === menuDTO.side);
    newMenu.salad = dishes.find((d) => d.id === menuDTO.salad);
    return newMenu;
  }

  static generateId(date: Date): string {
    return format(date, 'yyyyMMdd');
  }
}
