import React from 'react';
import { Plus } from 'lucide-react';
import { IconButton } from '@mui/material';
import { Card, CardContent, CardHeader } from '@mui/material';
import { Badge } from '@mui/material';

import { Dish, DishCategory } from '#/index';
import DishItem from './DishItem';

interface DishCategoryCardProps {
  category: DishCategory;
  dishes: Dish[];
  categoryColor: string;
  categoryIcon: string;
  onAddDish: (category: DishCategory) => void;
  onEditDish: (dish: Dish) => void;
  onDeleteDish: (id: string) => void;
}

const DishCategoryCard: React.FC<DishCategoryCardProps> = ({
  category,
  dishes,
  categoryColor,
  categoryIcon,
  onAddDish,
  onEditDish,
  onDeleteDish,
}) => {
  return (
    <Card className='overflow-hidden'>
      <CardHeader
        className={`bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border ${categoryColor}`}
        title={
          <div className='flex items-center gap-3'>
            <span className='text-2xl'>{categoryIcon}</span>
            <span className='capitalize text-lg font-semibold'>{category}s</span>

            <div className='ml-auto flex items-center gap-2'>
              {/* Count badge */}
              <Badge
                badgeContent={dishes.length}
                color='default'
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: 'background.paper',
                    color: 'text.secondary',
                    border: '1px solid',
                    borderColor: 'divider',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    minWidth: '24px',
                    height: '24px'
                  }
                }}
              >
              </Badge>

              {/* Add button */}
              <IconButton
                onClick={() => onAddDish(category)}
                aria-label="add dish"
                size="small"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.2s'
                }}
              >
                <Plus fontSize="small" />
              </IconButton>
            </div>
          </div>
        }
      />
      <CardContent className='p-4'>
        <div className='space-y-2'>
          {dishes.length === 0 ? (
            <p className='text-center text-muted-foreground py-8'>No dishes yet</p>
          ) : (
            dishes.map((dish) => (
              <DishItem
                key={dish.id}
                dish={dish}
                onEdit={onEditDish}
                onDelete={onDeleteDish}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DishCategoryCard;
