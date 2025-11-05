import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ToastProvider } from '@/components/ToastProvider';

import MenuView from '@/pages/MenuView';
import DishView from '@/pages/DishView';
import NotFound from '@/pages/NotFound';

import { useAppStore } from '@/store/appStore';
import { Footer } from './components/Footer';

const queryClient = new QueryClient();

const App = () => {
  const { initialize, isLoading } = useAppStore();

  // Run initialization only once on app mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen text-muted-foreground'>
        Loading menu data...
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Routes>
          <Route path='/' element={<MenuView />} />
          <Route path='/dishes' element={<DishView />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
