declare global {
  interface Window {
    __REDUX_STATE__?: any;
    __ERROR_LOG__?: Array<{
      message: string;
      stack?: string;
      timestamp: number;
    }>;
  }
}

// Инициализация логгера ошибок
export const initErrorLogger = () => {
  if (process.env.NODE_ENV === 'development') {
    window.__ERROR_LOG__ = [];
    
    const originalConsoleError = console.error;
    console.error = (...args) => {
      window.__ERROR_LOG__?.unshift({
        message: args.join(' '),
        timestamp: Date.now()
      });
      originalConsoleError.apply(console, args);
    };

    window.onerror = (message, source, lineno, colno, error) => {
      window.__ERROR_LOG__?.unshift({
        message: message.toString(),
        stack: error?.stack,
        timestamp: Date.now()
      });
    };
  }
}; 