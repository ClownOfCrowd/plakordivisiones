'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookies } from '@/hooks/useCookies';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const { setCookieValue, hasConsent } = useCookies();

  useEffect(() => {
    // Показываем уведомление только если пользователь еще не дал согласие
    if (!hasConsent()) {
      setIsVisible(true);
    }
  }, [hasConsent]);

  const handleAccept = () => {
    setCookieValue('cookie-consent', 'true');
    setCookieValue('ga-consent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    setCookieValue('cookie-consent', 'false');
    setCookieValue('ga-consent', 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 z-50"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-800 dark:text-gray-200 text-sm sm:text-base text-center sm:text-left">
              Utilizamos cookies propias y de terceros para mejorar nuestros servicios y mostrarle publicidad relacionada con sus preferencias mediante el análisis de sus hábitos de navegación.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <button
                onClick={handleAccept}
                className="px-6 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-primary/90 transition-colors"
              >
                Aceptar
              </button>
              <button
                onClick={handleDecline}
                className="px-6 py-2 border border-primary text-primary text-sm font-medium rounded hover:bg-primary/10 transition-colors"
              >
                Rechazar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 