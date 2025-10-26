import { Link, useLocation } from 'react-router-dom';
import { Calendar, Utensils, CookingPot } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Calendar, label: 'Weekly Menu' },
    { path: '/dishes', icon: Utensils, label: 'Manage Dishes' },
  ];

  return (
    <nav className='border-b border-border bg-card shadow-sm'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center gap-2'>
            <div className='bg-gradient-to-br from-primary to-accent rounded-lg p-2'>
              <CookingPot className='h-6 w-6 text-primary-foreground' />
            </div>
            <span className='text-xl font-bold text-foreground'>Cantina</span>
          </div>

          <div className='flex gap-1'>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <Icon className='h-5 w-5' />
                  <span className='font-medium'>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
