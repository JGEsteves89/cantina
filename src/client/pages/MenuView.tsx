import React from 'react';
import { format } from 'date-fns';
import { useState } from 'react';
import { Button } from '@mui/material';

import Navigation from '@/components/Navigation';

import { Dish, DishCategory, DishIcon } from '#/index';
import { useAppStore } from '@/store/appStore';
import MenuDayCard from '@/components/MenuDayCard';
import DishSelectionDialog from '@/components/DishSelectionDialog';

const MenuView = () => {
  const { getDishSelectionPool, calendar, addDishToDay, removeDishFromDay, addDayToCalendar } =
    useAppStore();

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categoryColors = {
    soup: 'bg-orange-100 text-orange-800 border-orange-200',
    main: 'bg-red-100 text-red-800 border-red-200',
    side: 'bg-amber-100 text-amber-800 border-amber-200',
    salad: 'bg-green-100 text-green-800 border-green-200',
  };

  const categoryLabels = Object.values(DishCategory).reduce(
    (acc, category) => {
      const icon = DishIcon[category as DishCategory]; // type-safe access
      const formatted = category.charAt(0).toUpperCase() + category.slice(1);
      acc[category] = `${icon} ${formatted}`;
      return acc;
    },
    {} as Record<DishCategory, string>,
  );

  const handleAddDish = (day: Date, category: string) => {
    setSelectedDay(day);
    setSelectedCategory(category);
  };

  const handleSelectDish = (dish: Dish) => {
    if (!selectedDay || !selectedCategory) return;
    addDishToDay(selectedDay, dish);
    setSelectedDay(null);
    setSelectedCategory(null);
  };

  const handleRemoveDish = (date: Date, category: DishCategory) => {
    removeDishFromDay(date, category);
  };

  return (
    <div className='min-h-screen bg-background'>
      <Navigation />

      <main className='container mx-auto px-4 py-8'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-foreground mb-2'>Almost Weekly Menu</h1>
          <p className='text-muted-foreground'>
            Plan and manage your house&apos;s almost weekly menu
          </p>
        </div>

        <div className='grid gap-6 mb-2'>
          {calendar.map((dayMenu) => {
            // when the data gets stored on the local storage
            // it cannot automatically change a string date to date
            if (typeof dayMenu.date === 'string') {
              dayMenu.date = new Date(dayMenu.date);
            }
            return <MenuDayCard
              key={format(dayMenu.date, 'EEEE')}
              dayMenu={dayMenu}
              categoryColors={categoryColors}
              categoryLabels={categoryLabels}
              onAddDish={handleAddDish}
              onRemoveDish={handleRemoveDish}
            />
          }
          )}
        </div>
        <Button variant='outlined' className='w-full' onClick={addDayToCalendar}> Add another day</Button>
      </main>
      <DishSelectionDialog
        open={!!selectedDay}
        onClose={() => setSelectedDay(null)}
        selectedCategory={selectedCategory}
        categoryLabels={categoryLabels}
        dishes={getDishSelectionPool().filter((dish) => dish.category === selectedCategory)}
        onSelectDish={handleSelectDish}
      />
    </div>
  );
};

export default MenuView;
