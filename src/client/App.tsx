import React from 'react';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

import { ToastProvider, useToast } from '@/components/ToastProvider';

import MenuView from '@/pages/MenuView';
import DishView from '@/pages/DishView';
import NotFound from '@/pages/NotFound';

import { useAppStore } from '@/store/appStore';
import { Footer } from './components/Footer';

const queryClient = new QueryClient();

const AppContent = () => {
  const { errorMessage, clearError } = useAppStore();
  const { showToast } = useToast();

  // Watch for errors and show toast notifications
  useEffect(() => {
    if (errorMessage) {
      showToast({ title: errorMessage, variant: 'destructive' });
      clearError();
    }
  }, [errorMessage, showToast, clearError]);

  return (
    <>
      <Routes>
        <Route path='/' element={<MenuView />} />
        <Route path='/dishes' element={<DishView />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

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
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
