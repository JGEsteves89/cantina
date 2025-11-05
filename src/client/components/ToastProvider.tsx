/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert, type AlertColor } from '@mui/material';

interface ToastMessage {
  title: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
}

interface ToastContextType {
  showToast: (message: ToastMessage) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; severity: AlertColor } | null>(null);

  // Map variants to Material UI AlertColor
  const mapVariantToSeverity = (variant?: ToastMessage['variant']): AlertColor => {
    switch (variant) {
      case 'destructive':
        return 'error';
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      case 'default':
      default:
        return 'info';
    }
  };

  const showToast = ({ title, variant }: ToastMessage) => {
    const severity = mapVariantToSeverity(variant);
    setToast({ message: title, severity });
  };

  const getToast = () =>
    toast ? (
      <div>
        <Alert onClose={() => setToast(null)} severity={toast.severity}>
          {toast.message}
        </Alert>
      </div>
    ) : undefined;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={!!toast}
        autoHideDuration={6000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {getToast()}
      </Snackbar>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
