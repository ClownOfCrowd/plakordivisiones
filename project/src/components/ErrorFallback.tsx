import React from 'react';
import { errorTracker } from '../services/errorTracking';

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback = ({ error, resetErrorBoundary }: Props) => {
  React.useEffect(() => {
    errorTracker.logError({
      message: error.message,
      stack: error.stack,
      url: window.location.href,
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Упс! Что-то пошло не так
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Мы уже работаем над исправлением проблемы
          </p>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 bg-red-50 p-4 rounded-md">
            <p className="text-sm text-red-700">{error.message}</p>
            <pre className="mt-2 text-xs text-red-500 overflow-auto">
              {error.stack}
            </pre>
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button
            onClick={resetErrorBoundary}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback; 