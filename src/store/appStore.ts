import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Dish, DishCategory, api, WeekMenu } from '@/api';

interface AppStore {
  isLoading: boolean;
  currentWeek: WeekMenu;
  dishes: Dish[];
  initialize: () => void;
  addDishToDay: (date: Date, dish: Dish) => void;
  removeDishFromDay: (date: Date, category: DishCategory) => void;
  addDish: (name: string, category: DishCategory) => void;
  editDish: (dish: Dish) => void;
  removeDish: (id: string) => void;
}

export const useAppStore = create(
  persist<AppStore>(
    (set, _get) => ({
      isLoading: true,
      currentWeek: WeekMenu.empty(),
      dishes: [],

      initialize: async () => {
        set({ isLoading: true });
        try {
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
