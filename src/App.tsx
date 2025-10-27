import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuView from './pages/MenuView';
import DishView from './pages/DishView';
import NotFound from './pages/NotFound';
import { useEffect } from 'react';
import { useAppStore } from '@/store/appStore';

const queryClient = new QueryClient();
const Footer = () => (
  <footer style={{ textAlign: 'center', padding: '1rem' }}>Cantina App v{__APP_VERSION__}</footer>
);

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
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MenuView />} />
            <Route path='/dishes' element={<DishView />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
