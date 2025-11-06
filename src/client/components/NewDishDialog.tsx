import React from 'react';
import { Button, type SelectChangeEvent } from '@mui/material';
import { Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { TextField } from '@mui/material';
import { FormLabel } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { Dish, DishCategory, DishIcon } from '#/index';

interface NewDishDialogProps {
  open: boolean;
  editingDish: Dish | null;
  formData: { name: string; category: DishCategory } | null;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormChange: (data: { name: string; category: DishCategory }) => void;
}

const NewDishDialog: React.FC<NewDishDialogProps> = ({
  open,
  editingDish,
  formData,
  onClose,
  onSubmit,
  onFormChange,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{editingDish ? 'Edit Dish' : 'Add New Dish'}</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit} className='space-y-4'>
          <div>
            <FormLabel htmlFor='name'>Dish Name</FormLabel>
            <TextField
              id='name'
              value={formData ? formData.name : ''}
              onChange={(e: { target: { value: string } }) => {
                const category = formData?.category || DishCategory.Soup;
                const name = e.target.value;
                onFormChange({ name, category });
              }}
              placeholder='Enter dish name'
              required
            />
          </div>
          <div>
            <FormLabel htmlFor='category'>Category</FormLabel>
            <FormControl fullWidth>
              <Select
                labelId='category-label'
                value={formData ? formData.category : ''}
                onChange={(e: SelectChangeEvent<string>) => {
                  const value = e.target.value as DishCategory;
                  if (formData) {
                    onFormChange({
                      ...formData,
                      category: value,
                    });
                  } else {
                    // initialize form with empty name and selected category
                    onFormChange({ name: '', category: value });
                  }
                }}
              >
                {Object.values(DishCategory).map((category) => (
                  <MenuItem key={category} value={category}>
                    {DishIcon[category] +
                      ' ' +
                      category.charAt(0).toUpperCase() +
                      category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <DialogActions>
            <Button
              type='button'
              variant='outlined'
              onClick={onClose}
              className='flex-1'
            >
              Cancel
            </Button>
            <Button type='submit' className='flex-1'>
              {editingDish ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewDishDialog;
