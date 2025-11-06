import React from 'react';
import { Button } from '@mui/material';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

import { Dish, DishCategory } from '#/index';

interface DishSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  selectedCategory: string | null;
  categoryLabels: Record<DishCategory, string>;
  dishes: Dish[];
  onSelectDish: (dish: Dish) => void;
}

const DishSelectionDialog: React.FC<DishSelectionDialogProps> = ({
  open,
  onClose,
  selectedCategory,
  categoryLabels,
  dishes,
  onSelectDish,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Select a{' '}
        {selectedCategory && categoryLabels[selectedCategory as keyof typeof categoryLabels]}
      </DialogTitle>
      <DialogContent className='max-w-2xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto'>
          {dishes.map((dish) => (
            <Button
              key={dish.id}
              variant='outlined'
              className='justify-start h-auto py-3 hover:bg-primary/10 hover:border-primary'
              onClick={() => onSelectDish(dish)}
            >
              {dish.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DishSelectionDialog;
