import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button, type SelectChangeEvent } from '@mui/material';
import { Card, CardContent, CardHeader } from '@mui/material';
import { Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { TextField } from '@mui/material';
import { FormLabel } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Navigation from '@/components/Navigation';
import { Badge } from '@mui/material';

import { useToast } from '@/components/ToastProvider'; // Your custom hook
import { Dish, DishCategory, DishIcon } from '#/index';
import { useAppStore } from '@/store/appStore';

// Mock dishes pool
const DishView = () => {
  const { dishes, addOrUpdateDish, removeDish } = useAppStore();
  const { showToast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    category: DishCategory;
  } | null>(null);

  const categoryColors = {
    soup: 'bg-orange-100 text-orange-800 border-orange-200',
    main: 'bg-red-100 text-red-800 border-red-200',
    side: 'bg-amber-100 text-amber-800 border-amber-200',
    salad: 'bg-green-100 text-green-800 border-green-200',
  };

  const categoryIcons = {
    soup: '🍲',
    main: '🍖',
    side: '🥔',
    salad: '🥗',
  };

  const groupedDishes = {
    soup: dishes.filter((d) => d.category === DishCategory.Soup),
    main: dishes.filter((d) => d.category === DishCategory.Main),
    side: dishes.filter((d) => d.category === DishCategory.Side),
    salad: dishes.filter((d) => d.category === DishCategory.Salad),
  };

  const handleOpenDialog = (dish?: Dish) => {
    if (dish) {
      setEditingDish(dish);
      setFormData({ name: dish.name, category: dish.category });
    } else {
      setEditingDish(null);
      setFormData(null);
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    addOrUpdateDish(formData.name, formData.category);
    showToast({ title: 'Dish created successfully' });

    setIsDialogOpen(false);
    setFormData(null);
  };

  const handleDelete = (id: string) => {
    removeDish(id);
    showToast({ title: 'Dish deleted successfully', variant: 'destructive' });
  };

  console.log('from the view', dishes.length);

  return (
    <div className='min-h-screen bg-background'>
      <Navigation />

      <main className='container mx-auto px-4 py-8'>
        <div className='mb-8 flex items-center justify-between'>
          <div>
            <h1 className='text-4xl font-bold text-foreground mb-2'>Manage Dishes</h1>
            <p className='text-muted-foreground'>
              Add, edit, and organize your restaurant's dishes
            </p>
          </div>
          <Button onClick={() => handleOpenDialog()} className='shadow-lg'>
            <Plus className='h-5 w-5 mr-2' />
            Add New Dish
          </Button>
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          {(Object.keys(groupedDishes) as Array<keyof typeof groupedDishes>).map((category) => (
            <Card key={category} className='overflow-hidden'>
              <CardHeader
                className={`bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border ${categoryColors[category]}`}
                title={
                  <div className='flex items-center gap-2'>
                    <span className='text-2xl'>{categoryIcons[category]}</span>
                    <span className='capitalize'>{category}s</span>
                    <Badge variant='standard' color='secondary' className='ml-auto'>
                      {groupedDishes[category].length}
                    </Badge>
                  </div>
                }
              />
              <CardContent className='p-4'>
                <div className='space-y-2'>
                  {groupedDishes[category].length === 0 ? (
                    <p className='text-center text-muted-foreground py-8'>No dishes yet</p>
                  ) : (
                    groupedDishes[category].map((dish) => (
                      <div
                        key={dish.id}
                        className='flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-all'
                      >
                        <span className='font-medium text-foreground'>{dish.name}</span>
                        <div className='flex gap-2'>
                          <Button
                            variant='outlined'
                            size='small'
                            className='h-8 w-8 hover:bg-primary/10 hover:text-primary'
                            onClick={() => handleOpenDialog(dish)}
                          >
                            <Pencil className='h-4 w-4' />
                          </Button>
                          <Button
                            variant='outlined'
                            size='small'
                            className='h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10'
                            onClick={() => handleDelete(dish.id)}
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Dialog open={isDialogOpen}>
        <DialogTitle>{editingDish ? 'Edit Dish' : 'Add New Dish'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <FormLabel htmlFor='name'>Dish Name</FormLabel>
              <TextField
                id='name'
                value={formData ? formData.name : ''}
                onChange={(e: { target: { value: string } }) => {
                  const category = formData?.category || DishCategory.Soup;
                  const name = e.target.value;
                  return setFormData({ name, category });
                }}
                placeholder='Enter dish name'
                required
              />
            </div>
            <div>
              <FormLabel htmlFor='category'>Category</FormLabel>
              <FormControl fullWidth>
                <InputLabel id='category-label'>Category</InputLabel>
                <Select
                  labelId='category-label'
                  value={formData ? formData.category : ''}
                  onChange={(e: SelectChangeEvent<string>) => {
                    const value = e.target.value as DishCategory;
                    if (formData) {
                      setFormData({
                        ...formData,
                        category: value,
                      });
                    } else {
                      // initialize form with empty name and selected category
                      setFormData({ name: '', category: value });
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
                onClick={() => setIsDialogOpen(false)}
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
    </div>
  );
};

export default DishView;
