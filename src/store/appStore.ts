import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Dish } from "@/api/models/Dish";
import { DishCategory, api, Weekday, WeekMenu, DayMenu } from "@/api";

// Store definition
interface AppStore {
	isLoading: boolean,
	initialize: () => void;

	// Week menu
	currentWeek: WeekMenu;
	setDishInDay: (weekday: Weekday, dish: Dish) => void;
	removeDishInDay: (weekday: Weekday, category: DishCategory) => void;

	// Dishes pool
	dishes: Dish[];
	addDish: (name: string, category: DishCategory) => Promise<void>;
	updateDish: (dish: Dish) => void;
	deleteDish: (id: string) => void;
}

// Zustand store with persistence
export const useAppStore = create<AppStore>()(
	persist(
		(set, get) => ({
			// Initial state
			isLoading: true,
			currentWeek: WeekMenu.empty(),
			dishes: [],

			initialize: async () => {
				set({ isLoading: true });
				try {
					const [currentWeekMenu, allDishes] = await Promise.all([
						api.fetchCurrentWeekMenu(),
						api.fetchAllDishes(),
					]);

					set({
						currentWeek: currentWeekMenu,
						dishes: allDishes,
						isLoading: false,
					});
				} catch (err) {
					console.error("Failed to initialize menu store:", err);
					set({ isLoading: false });
				}
			},

			// --- WEEK MENU ACTIONS ---
			setDishInDay: async (weekday, dish) => {
				const weekMenu = await api.updateDishToCategoryOfWeekday(weekday, dish);
				set((state) => ({ currentWeek: weekMenu }));
			},

			removeDishInDay: async (weekday, category) => {
				const weekMenu = await api.deleteDishToCategoryOfWeekday(weekday, category);
				set((state) => ({ currentWeek: weekMenu }));
			},

			// --- DISH ACTIONS ---
			addDish: async (name, category) => {
				const dishes = await api.createDish(name, category);
				set((state) => ({ dishes: dishes }));
			},

			updateDish: async (dish) => {
				const dishes = await api.updateDish(dish);
				set((state) => ({ dishes: dishes }));
			},

			deleteDish: async (id) => {
				const dishes = await api.deleteDish(id);
				set((state) => ({ dishes: dishes }));
			}
		}),
		{
			name: "cantina-storage", // localStorage key
		}
	)
);
