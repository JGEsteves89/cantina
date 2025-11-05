import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@mui/material';
import { Card, CardContent, CardHeader } from '@mui/material';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Navigation from '@/components/Navigation';
import { Badge } from '@mui/material';

import { Dish, DishCategory, DishIcon, Menu } from '#/index';
import { useAppStore } from '@/store/appStore';

const MenuView = () => {
  const { getDishSelectionPool, menus, getCalendar, addDishToDay, removeDishFromDay } =
    useAppStore();

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [calendar, setCalendar] = useState<Menu[]>([]);

  useEffect(() => {
    getCalendar().then((data) => {
      setCalendar(data);
    });
  }, [menus, getCalendar]);

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
            Plan and manage your restaurant's almost weekly menu
          </p>
        </div>

        <div className='grid gap-6'>
          {calendar.map((dayMenu) => (
            <Card
              key={format(dayMenu.date, 'EEEE')}
              className='overflow-hidden hover:shadow-lg transition-all'
            >
              <CardHeader
                className='bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border'
                title={
                  <div className='flex items-center justify-between'>
                    <span className='text-2xl font-bold text-foreground'>
                      {format(dayMenu.date, 'EEEE')}
                    </span>
                    <span className='text-sm text-muted-foreground ml-3'>
                      {format(dayMenu.date, 'yyyy-MM-dd')}
                    </span>
                  </div>
                }
              />
              <CardContent className='p-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                  {Object.values(DishCategory).map((category) => (
                    <div
                      key={category}
                      className='border-2 border-border rounded-lg p-4 bg-card hover:shadow-md transition-all'
                    >
                      <div className='flex items-center justify-between mb-3'>
                        <Badge className={categoryColors[category]}>
                          {categoryLabels[category]}
                        </Badge>
                        {dayMenu[category] && (
                          <Button
                            variant='outlined'
                            size='small'
                            className='h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10'
                            onClick={() => handleRemoveDish(dayMenu.date, category)}
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        )}
                      </div>
                      {dayMenu[category] ? (
                        <p className='font-medium text-foreground'>{dayMenu[category]?.name || ''}</p>
                      ) : (
                        <Button
                          variant='outlined'
                          className='w-full border-dashed hover:bg-primary/5 hover:border-primary'
                          onClick={() => handleAddDish(dayMenu.date, category)}
                        >
                          <Plus className='h-4 w-4 mr-2' />
                          Add Dish
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Dialog open={!!selectedDay} onClose={() => setSelectedDay(null)}>
        <DialogTitle>
          Select a{' '}
          {selectedCategory && categoryLabels[selectedCategory as keyof typeof categoryLabels]}
        </DialogTitle>
        <DialogContent className='max-w-2xl'>
          {' '}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto'>
            {getDishSelectionPool()
              .filter((dish) => dish.category === selectedCategory)
              .map((dish) => (
                <Button
                  key={dish.id}
                  variant='outlined'
                  className='justify-start h-auto py-3 hover:bg-primary/10 hover:border-primary'
                  onClick={() => handleSelectDish(dish)}
                >
                  {dish.name}
                </Button>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuView;
