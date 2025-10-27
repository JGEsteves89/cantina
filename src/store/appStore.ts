import { getWeek } from 'date-fns';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Dish, DishCategory, api, WeekMenu } from '@/api';
import { Config } from '@/api/config';

interface AppStore {
  isLoading: boolean;
  currentWeek: WeekMenu;
  dishes: Dish[];
  initialize: () => void;
  addDishToDay: (date: Date, dish: Dish) => void;
  removeDishFromDay: (date: Date, category: DishCategory) => void;
  getPreselectedDishes: () => Dish[];
  addDish: (name: string, category: DishCategory) => void;
  editDish: (dish: Dish) => void;
  removeDish: (id: string) => void;
}

export const useAppStore = create(
  persist<AppStore>(
    (set, get) => ({
      isLoading: true,
      currentWeek: WeekMenu.empty(),
      dishes: [],
      config: null,

      initialize: async () => {
        set({ isLoading: true });
        try {
          const configRes = await fetch('/config.json');
          const config = (await configRes.json()) as Config;
          api.setConfig(config);

          const currentWeek = await api.getWeekMenu();
          const dishes = await api.getAllDishes();

          set({
            currentWeek,
            dishes,
            isLoading: false,
          });
        } catch (err) {
          console.error('Failed to initialize menu store:', err);
          set({ isLoading: false });
        }
      },

      // --- WEEK MENU ACTIONS ---
      addDishToDay: async (date: Date, dish: Dish) => {
        const weekMenu = await api.addDishToDay(date, dish);
        set(() => ({ currentWeek: weekMenu }));
      },

      removeDishFromDay: async (date: Date, category: DishCategory) => {
        const weekMenu = await api.removeDishFromDay(date, category);
        set(() => ({ currentWeek: weekMenu }));
      },

      getPreselectedDishes: () => {
        const numberOfDishes = {
          [DishCategory.Soup]: 3,
          [DishCategory.Main]: 5,
          [DishCategory.Side]: 3,
          [DishCategory.Salad]: 3,
        };
        const isoWeek = getWeek(new Date());
        const { dishes } = get();

        // Fast, deterministic hash
        const fastHash = (str: string) => {
          let hash = 2166136261 >>> 0;
          for (let i = 0; i < str.length; i++) {
            hash ^= str.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
          }
          return hash >>> 0; // return as unsigned int
        };

        // 1. Sort once, deterministically
        const sorted = [...dishes].sort((a, b) => fastHash(a.id) - fastHash(b.id));

        // 2. Group by category
        const groups = new Map<string, typeof dishes>();
        for (const dish of sorted) {
          if (!groups.has(dish.category)) groups.set(dish.category, []);
          groups.get(dish.category)!.push(dish);
        }

        // 3. Select dishes per category deterministically
        const dishPool: typeof dishes = [];
        for (const [category, group] of groups) {
          const len = group.length;
          if (len === 0) continue;

          const startIndex = (isoWeek * numberOfDishes[category]) % len;
          for (let i = 0; i < Math.min(numberOfDishes[category], len); i++) {
            dishPool.push(group[(startIndex + i) % len]);
          }
        }

        return dishPool;
      },

      // --- DISH ACTIONS ---
      addDish: async (name: string, category: DishCategory) => {
        const dishes = await api.addDish(name, category);
        set(() => ({ dishes }));
      },

      editDish: async (dish: Dish) => {
        const dishes = await api.editDish(dish);
        set(() => ({ dishes }));
      },

      removeDish: async (id: string) => {
        const dishes = await api.removeDish(id);
        set(() => ({ dishes }));
      },
    }),
    {
      name: 'cantina-storage',
    },
  ),
);
