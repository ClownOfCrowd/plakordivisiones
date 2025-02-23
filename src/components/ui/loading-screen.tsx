'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  minimumLoadingTime?: number;
}

export function LoadingScreen({ minimumLoadingTime = 2000 }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Гарантируем минимальное время показа прелоадера
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minimumLoadingTime);

    return () => clearTimeout(timer);
  }, [minimumLoadingTime]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)',
          }}
        >
          <div className="relative w-64 h-64">
            {/* Фоновая "стена" */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                duration: 1,
                ease: 'easeOut',
              }}
              className="absolute inset-0 bg-white/10 rounded-lg"
              style={{ originY: 1 }}
            />

            {/* Анимированные блоки стены */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: i * 0.2,
                  duration: 0.8,
                  ease: 'easeOut',
                }}
                className="absolute h-8 bg-white/20 rounded"
                style={{
                  bottom: `${i * 10}px`,
                  left: '10%',
                  right: '10%',
                  transformOrigin: 'left',
                }}
              />
            ))}

            {/* Анимированный мастерок */}
            <motion.div
              initial={{ rotate: -45, y: 50, x: -50 }}
              animate={{
                rotate: 45,
                y: [-50, 0, -50],
                x: [50, 0, 50],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute right-0 top-1/2 w-16 h-32"
            >
              <div className="relative w-full h-full">
                <div className="absolute top-0 w-12 h-12 bg-gray-200 rounded-full shadow-lg">
                  <div className="w-3 h-20 bg-gray-300 absolute top-8 left-4 rounded-b-lg shadow-md" />
                </div>
              </div>
            </motion.div>

            {/* Анимированные частицы */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: [0, (i % 2 ? 50 : -50) * Math.random()],
                  y: [0, -100 * Math.random()],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeOut',
                }}
                className="absolute w-2 h-2 bg-white/40 rounded-full"
                style={{
                  left: '50%',
                  bottom: '20%',
                }}
              />
            ))}

            {/* Логотип и текст */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-8 text-center w-full"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-2xl font-bold text-white mb-2"
              >
                Plakor Divisiones
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="h-0.5 bg-white/20 w-24 mx-auto mb-2"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-blue-100"
              >
                Construyendo calidad
              </motion.p>
            </motion.div>

            {/* Индикатор прогресса */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: minimumLoadingTime / 1000,
                ease: 'linear',
              }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"
              style={{ transformOrigin: 'left' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 