'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  minimumLoadingTime?: number;
}

export function LoadingScreen({ minimumLoadingTime = 2000 }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Анимация прогресса
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, minimumLoadingTime / 100);

    // Гарантируем минимальное время показа прелоадера
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minimumLoadingTime);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
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
          <div className="relative w-full max-w-sm mx-4 sm:mx-auto">
            {/* Основная анимация */}
            <div className="relative aspect-square">
              {/* Фоновый круг */}
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{
                  duration: 1.5,
                  ease: 'easeOut',
                }}
                className="absolute inset-0 rounded-full border-4 border-white/20"
              />

              {/* Анимированные элементы строительства */}
              <div className="absolute inset-0">
                {/* Стены */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      delay: i * 0.2,
                      duration: 0.8,
                      ease: 'easeOut',
                    }}
                    className="absolute bottom-0 bg-white/30 w-6 rounded-t-lg"
                    style={{
                      height: `${(i + 1) * 25}%`,
                      left: `${25 * i + 10}%`,
                    }}
                  />
                ))}

                {/* Вращающийся элемент */}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-16 h-1 bg-white/40 rounded-full transform origin-right" />
                </motion.div>

                {/* Пульсирующий круг */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-4 rounded-full border-2 border-white/40"
                />
              </div>
            </div>

            {/* Прогресс бар */}
            <div className="mt-8 relative">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.2 }}
                  className="h-full bg-white origin-left"
                />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white/90 text-sm"
              >
                {progress}%
              </motion.p>
            </div>

            {/* Логотип и текст */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-2xl sm:text-3xl font-bold text-white mb-2"
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 