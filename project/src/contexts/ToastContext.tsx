import { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Toast, { ToastType } from '../components/Toast';

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

/**
 * Global toast notification context
 * Provides:
 * - Toast message queue management
 * - Multiple toast types
 * - Position control
 */
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Add new toast to queue
  const addToast = useCallback((toast: Toast) => {
    setToasts(prev => [...prev, { ...toast, id: Date.now() }]);
  }, []);

  // Remove toast by ID
  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType) => {
    addToast({ message, type });
  }, [addToast]);

  const hideToast = useCallback(() => {
    removeToast(toasts[0].id);
  }, [removeToast, toasts]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
          />
        ))}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}; 