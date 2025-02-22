'use client';

import { createContext, useContext, useState } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

const ToastContext = createContext<{
  showToast: (message: string, type: ToastType) => void;
}>({
  showToast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded-lg shadow-lg text-white ${
              toast.type === 'success' ? 'bg-green-500' :
              toast.type === 'error' ? 'bg-red-500' :
              'bg-blue-500'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const toast = {
  success: (message: string) => {
    const context = useContext(ToastContext);
    context.showToast(message, 'success');
  },
  error: (message: string) => {
    const context = useContext(ToastContext);
    context.showToast(message, 'error');
  },
  info: (message: string) => {
    const context = useContext(ToastContext);
    context.showToast(message, 'info');
  },
}; 