import React from 'react';
import { format } from 'date-fns';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@mui/material';
import { Card, CardContent, CardHeader } from '@mui/material';
import { Badge } from '@mui/material';

import { DishCategory, DishIcon, Menu } from '#/index';

interface MenuDayCardProps {
  dayMenu: Menu;
  categoryColors: Record<string, string>;
  categoryLabels: Record<DishCategory, string>;
  onAddDish: (day: Date, category: string) => void;
  onRemoveDish: (date: Date, category: DishCategory) => void;
}

const MenuDayCard: React.FC<MenuDayCardProps> = ({
  dayMenu,
  categoryColors,
  categoryLabels,
  onAddDish,
  onRemoveDish,
}) => {
  return (
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
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4'>
          {Object.values(DishCategory).map((category) => {
            const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
            const colorClass = categoryColors[category];

            return (
              <div
                key={category}
                className='flex border-2 border-border rounded-lg overflow-hidden bg-card hover:shadow-md transition-all'
              >
                {/* Icon square with category label overlay */}
                <div className={`aspect-square relative flex items-center justify-center ${colorClass} bg-opacity-20`}>
                  <div className='text-7xl select-none'>
                    {DishIcon[category]}
                  </div>
                  <div className='absolute bottom-0 left-0 right-0 flex justify-center pb-2'>
                    <span className={`inline-block px-4 py-1.5 ${colorClass} rounded-full text-xs font-semibold shadow-md`}>
                      {categoryName}
                    </span>
                  </div>
                </div>

                {/* Dish content or Add button */}
                <div className='p-4 w-full'>
                  {dayMenu[category] ? (
                    <div className='flex items-center justify-between gap-2'>
                      <p className='font-medium text-foreground flex-1'>
                        {dayMenu[category]?.name || ''}
                      </p>
                      <Button
                        variant='text'
                        size='small'
                        className='min-w-0 p-1 text-destructive hover:text-destructive hover:bg-destructive/10'
                        onClick={() => onRemoveDish(dayMenu.date, category)}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant='outlined'
                      className='w-full border-dashed hover:bg-primary/5 hover:border-primary min-h-[72px]'
                      onClick={() => onAddDish(dayMenu.date, category)}
                    >
                      <Plus className='h-4 w-4 mr-2' />
                      Add Dish
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuDayCard;
