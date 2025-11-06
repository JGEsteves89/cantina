import React from 'react';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@mui/material';
import Navigation from '@/components/Navigation';

import { useToast } from '@/components/ToastProvider';
import { Dish, DishCategory } from '#/index';
import { useAppStore } from '@/store/appStore';
import NewDishDialog from '@/components/NewDishDialog';
import DishCategoryCard from '@/components/DishCategoryCard';

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

  const handleOpenDialog = (dish?: Dish, category?: DishCategory) => {
    if (dish) {
      setEditingDish(dish);
      setFormData({ name: dish.name, category: dish.category });
    } else if (category) {
      setEditingDish(null);
      setFormData({ name: '', category: category });
    } else {
      setEditingDish(null);
      setFormData(null);
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    if (formData.name === '') return;

    addOrUpdateDish(formData.name, formData.category);
    showToast({ title: 'Dish created successfully' });

    setIsDialogOpen(false);
    setFormData(null);
  };

  const handleDelete = (id: string) => {
    removeDish(id);
    showToast({ title: 'Dish deleted successfully', variant: 'destructive' });
  };

  return (
    <div className='min-h-screen bg-background'>
      <Navigation />

      <main className='container mx-auto px-4 py-8'>
        <div className='mb-8 flex items-center justify-between'>
          <div>
            <h1 className='text-4xl font-bold text-foreground mb-2'>Manage Dishes</h1>
            <p className='text-muted-foreground'>
              Add, edit, and organize your house&apos;s dishes
            </p>
          </div>
          <Button onClick={() => handleOpenDialog()} className='shadow-lg'>
            <Plus className='h-5 w-5 mr-2' />
            Add New Dish
          </Button>
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          {(Object.keys(groupedDishes) as Array<keyof typeof groupedDishes>).map((category) => (
            <DishCategoryCard
              key={category}
              category={category as DishCategory}
              dishes={groupedDishes[category]}
              categoryColor={categoryColors[category]}
              categoryIcon={categoryIcons[category]}
              onAddDish={(cat) => handleOpenDialog(undefined, cat)}
              onEditDish={(dish) => handleOpenDialog(dish)}
              onDeleteDish={handleDelete}
            />
          ))}
        </div>
      </main>
      <NewDishDialog
        open={isDialogOpen}
        editingDish={editingDish}
        formData={formData}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        onFormChange={setFormData}
      />
    </div>
  );
};

export default DishView;
