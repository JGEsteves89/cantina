import { startOfDay, addDays, isSameDay, startOfYear, differenceInDays } from 'date-fns';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Menu, type MenuDTO, Dish, DishCategory, type DishDTO } from '#/index';
const getApiUrl = (endpoint: string) => {
  return `${window.location.origin}/v1/api/${endpoint}`;
};
const api = {
  menus: {
    all: async (dishes: Dish[]) => {
      const response = await fetch(getApiUrl('menus'));
      if (!response.ok) {
        throw new Error(`Failed to fetch menus: ${response.statusText}`);
      }
      const menuDTOs: MenuDTO[] = (await response.json()).data;
      const menus: Menu[] = [];
      for (const menuDTO of menuDTOs) {
        menus.push(Menu.fromDTO(menuDTO, dishes));
      }
      return menus;
    },
    update: async (menu: Menu, dishes: Dish[]) => {
      const response = await fetch(getApiUrl('menus'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menu.toDTO())
      });
      if (!response.ok) {
        throw new Error(`Failed to update menu: ${response.statusText}`);
      }
      const menuDTO: MenuDTO = (await response.json()).data;
      return Menu.fromDTO(menuDTO, dishes);
    },
    delete: async (menuId: string) => {
      const response = await fetch(getApiUrl(`menus/${menuId}`), { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Failed to delete menu: ${response.statusText}`);
      }
      return response;
    }
  },
  dishes: {
    all: async () => {
      const response = await fetch(getApiUrl('dishes'));
      if (!response.ok) {
        throw new Error(`Failed to fetch dishes: ${response.statusText}`);
      }
      const dishDTOs: DishDTO[] = (await response.json()).data;
      const dishes: Dish[] = [];
      for (const dishDTO of dishDTOs) {
        dishes.push(Dish.fromDTO(dishDTO));
      }
      return dishes;
    },
    update: async (dish: Dish) => {
      const response = await fetch(getApiUrl('dishes'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dish.toDTO())
      });
      if (!response.ok) {
        throw new Error(`Failed to update dish: ${response.statusText}`);
      }
      const dishDTO: DishDTO = (await response.json()).data;
      return Dish.fromDTO(dishDTO);
    },
    delete: async (dishId: string) => {
      const response = await fetch(getApiUrl(`dishes/${dishId}`), { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Failed to delete dish: ${response.statusText}`);
      }
      return response;
    }
  }
}

interface AppStore {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  numberOfDays: number,
  startDate: Date,
  menus: Menu[],
  dishes: Dish[];
  initialize: () => void;
  getCalendar: () => Promise<Menu[]>;
  addDayToCalendar: () => void;
  addDishToDay: (date: Date, dish: Dish) => void;
  removeDishFromDay: (date: Date, category: DishCategory) => void;
  getDishSelectionPool: () => Dish[];
  addOrUpdateDish: (name: string, category: DishCategory) => void;
  removeDish: (id: string) => void;
  clearError: () => void;
}

export const useAppStore = create(
  persist<AppStore>(
    (set, get) => ({
      isLoading: true,
      isError: false,
      errorMessage: null,
      numberOfDays: 3,
      startDate: startOfDay(new Date()),
      menus: [],
      dishes: [],
      calendar: [],

      initialize: async () => {
        set({ isLoading: true, errorMessage: null });
        try {
          const dishes = await api.dishes.all();
          const menus = await api.menus.all(dishes);

          set({
            menus,
            dishes,
            isLoading: false,
            isError: false,
            errorMessage: null,
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to initialize';
          console.error('Failed to initialize menu store:', err);
          set({ isLoading: false, isError: true, errorMessage: message });
        }
      },

      getCalendar: async () => {
        if (get().isLoading || get().isError) return [];
        try {
          const calendar: Menu[] = [];
          const startDate = new Date(get().startDate);
          for (let i = 0; i < get().numberOfDays; i++) {
            const date = addDays(startDate, i);
            const menu = get().menus.find((d) => isSameDay(new Date(d.date), date));
            if (menu) {
              calendar.push(menu);
            } else {
              const id = Menu.generateId(date);
              const newMenu = await api.menus.update(new Menu(id, date, {}), get().dishes);
              calendar.push(newMenu);
            }
          }
          return calendar;
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to load calendar';
          console.error('Failed to get calendar:', err);
          set({ isError: true, errorMessage: message });
          return [];
        }
      },

      addDayToCalendar: async () => {
        if (get().isLoading || get().isError) return;
        set({ numberOfDays: get().numberOfDays + 1 });
      },

      // --- WEEK MENU ACTIONS ---
      addDishToDay: (date: Date, dish: Dish) => {
        if (get().isLoading || get().isError) return;
        let menu = get().menus.find(m => isSameDay(m.date, date));
        if (menu) {
          menu = new Menu(menu.id, menu.date, { ...menu, [dish.category]: dish });
          api.menus.update(menu, get().dishes)
            .then((updatedMenu) => {
              set((state) => ({
                menus: state.menus.map(m =>
                  isSameDay(m.date, date) ? updatedMenu : m
                )
              }));
            })
            .catch((err) => {
              const message = err instanceof Error ? err.message : 'Failed to add dish';
              console.error('Failed to add dish to day:', err);
              set({ isError: true, errorMessage: message });
            });
        }
      },

      removeDishFromDay: async (date: Date, category: DishCategory) => {
        if (get().isLoading || get().isError) return;
        let menu = get().menus.find(m => isSameDay(m.date, date));
        if (menu) {
          menu = new Menu(menu.id, menu.date, { ...menu, [category]: undefined });
          api.menus.update(menu, get().dishes)
            .then((updatedMenu) => {
              set((state) => ({
                menus: state.menus.map(m =>
                  isSameDay(m.date, date) ? updatedMenu : m
                )
              }));
            })
            .catch((err) => {
              const message = err instanceof Error ? err.message : 'Failed to remove dish';
              console.error('Failed to remove dish from day:', err);
              set({ isError: true, errorMessage: message });
            });
        }
      },

      getDishSelectionPool: () => {
        if (get().isLoading || get().isError) return [];
        const getDayOfYear = (date: Date): number => {
          const yearStart = startOfYear(date);
          return differenceInDays(date, yearStart) + 1; // +1 to make it 1-indexed
        };

        const numberOfDishes = {
          [DishCategory.Soup]: get().numberOfDays,
          [DishCategory.Main]: get().numberOfDays + 2,
          [DishCategory.Side]: get().numberOfDays,
          [DishCategory.Salad]: get().numberOfDays,
        };
        const startingIndex = getDayOfYear(new Date());
        const dishPool = [];

        for (const category of Object.values(DishCategory)) {
          const dishOfCategory = get().dishes.filter(d => d.category === category);
          for (let i = 0; i < numberOfDishes[category]; i++) {
            const index = (startingIndex + i) % dishOfCategory.length;
            if (index < dishOfCategory.length) {
              dishPool.push(dishOfCategory[index]);
            }
          }
        }
        return dishPool;
      },

      // --- DISH ACTIONS ---
      addOrUpdateDish: (name: string, category: DishCategory) => {
        if (get().isLoading || get().isError) return;
        let dish = get().dishes.find(d => d.name === name && d.category === category);
        if (!dish) {
          let index = 0;
          const getId = (index: number) => Dish.generateId(name) + (index === 0 ? '' : index);
          while (get().dishes.find(d => d.id === getId(index))) { index++ }
          const id = getId(index);
          dish = new Dish(id, name, category);
        }
        api.dishes.update(dish)
          .then((updateDish) => {
            if (get().dishes.find(d => d.id === updateDish.id)) {
              set((state) => ({
                dishes: state.dishes.map(d =>
                  d.id === updateDish.id ? updateDish : d
                )
              }));
            } else {
              set((state) => ({
                dishes: [...state.dishes, updateDish]
              }));
            }
          })
          .catch((err) => {
            const message = err instanceof Error ? err.message : 'Failed to save dish';
            console.error('Failed to add or update dish:', err);
            set({ isError: true, errorMessage: message });
          });
      },

      removeDish: async (id: string) => {
        if (get().isLoading || get().isError) return;
        api.dishes.delete(id)
          .then(() => {
            set((state) => ({
              dishes: state.dishes.filter((d) => d.id !== id)
            }));
          })
          .catch((err) => {
            const message = err instanceof Error ? err.message : 'Failed to delete dish';
            console.error('Failed to remove dish:', err);
            set({ isError: true, errorMessage: message });
          });
      },

      clearError: () => {
        set({ isError: false, errorMessage: null });
      },
    }),
    {
      name: 'cantina-storage',
    },
  ),
);
