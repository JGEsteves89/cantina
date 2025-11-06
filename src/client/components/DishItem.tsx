import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@mui/material';

import { Dish } from '#/index';

interface DishItemProps {
  dish: Dish;
  onEdit: (dish: Dish) => void;
  onDelete: (id: string) => void;
}

const DishItem: React.FC<DishItemProps> = ({ dish, onEdit, onDelete }) => {
  return (
    <div className='flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-all'>
      <span className='font-medium text-foreground'>{dish.name}</span>
      <div className='flex gap-2'>
        <Button
          variant='outlined'
          size='small'
          className='h-8 w-8 hover:bg-primary/10 hover:text-primary'
          onClick={() => onEdit(dish)}
        >
          <Pencil className='h-4 w-4' />
        </Button>
        <Button
          variant='outlined'
          size='small'
          className='h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10'
          onClick={() => onDelete(dish.id)}
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};

export default DishItem;
