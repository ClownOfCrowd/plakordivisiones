'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback, memo, createContext, useContext } from 'react';
import { useDeviceOptimization } from '@/hooks/useDeviceOptimization';

// Создаем контекст для отслеживания состояния загрузки
export const LoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}>({
  isLoading: true,
  setIsLoading: () => {},
});

// Хук для использования контекста загрузки
export const useLoadingContext = () => useContext(LoadingContext);

interface LoadingScreenProps {
  minimumLoadingTime?: number;
  children?: React.ReactNode;
}

// Мемоизированные анимированные компоненты
const AnimatedWall = memo(({ index, total }: { index: number; total: number }) => (
  <motion.div
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    transition={{
      delay: index * 0.1,
      duration: 0.4,
      ease: 'easeOut',
    }}
    className="absolute bottom-0 bg-white/30 w-6 rounded-t-lg"
    style={{
      height: `${(index + 1) * (100 / total)}%`,
      left: `${(100 / total) * index + 10}%`,
    }}
  />
));

AnimatedWall.displayName = 'AnimatedWall';

const RotatingElement = memo(() => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    }}
    className="absolute inset-0 flex items-center justify-center"
  >
    <div className="w-16 h-1 bg-white/40 rounded-full transform origin-right" />
  </motion.div>
));

RotatingElement.displayName = 'RotatingElement';

const PulsingCircle = memo(() => (
  <motion.div
    animate={{
      scale: [1, 1.1, 1],
      opacity: [0.5, 0.8, 0.5],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className="absolute inset-4 rounded-full border-2 border-white/40"
  />
));

PulsingCircle.displayName = 'PulsingCircle';

export function LoadingScreen({ children }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { isMounted } = useDeviceOptimization();

  useEffect(() => {
    if (!isMounted) return;

    // Устанавливаем стиль для body, чтобы предотвратить прокрутку и мигание
    document.body.style.overflow = 'hidden';

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
            // Восстанавливаем прокрутку после загрузки
            document.body.style.overflow = '';
          }, 500);
          return 100;
        }
        return next;
      });
    }, 200);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, [isMounted]);

  // Не рендерим ничего на сервере
  if (!isMounted) {
    return null;
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary overflow-hidden"
            style={{
              backgroundImage: 'linear-gradient(45deg, var(--primary-dark) 0%, var(--primary) 100%)'
            }}
          >
            <div className="relative w-full max-w-sm mx-4 sm:mx-auto">
              {/* Основная анимация */}
              <div className="relative aspect-square">
                {/* Фоновый круг */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeOut',
                  }}
                  className="absolute inset-0 rounded-full border-4 border-white/20"
                />

                {/* Анимированные элементы */}
                <div className="absolute inset-0">
                  {/* Стены */}
                  {[...Array(4)].map((_, i) => (
                    <AnimatedWall key={i} index={i} total={4} />
                  ))}

                  {/* Вращающийся элемент */}
                  <RotatingElement />

                  {/* Пульсирующий круг */}
                  <PulsingCircle />
                </div>
              </div>

              {/* Прогресс бар */}
              <div className="mt-8 relative">
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: progress / 100 }}
                    transition={{ duration: 0.1 }}
                    className="h-full bg-white origin-left"
                  />
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white/90 text-sm"
                >
                  {progress.toFixed(0)}%
                </motion.p>
              </div>

              {/* Логотип и текст */}
              <div className="mt-12 text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl sm:text-3xl font-bold text-white mb-2"
                >
                  Plakor Divisiones
                </motion.h1>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="h-0.5 bg-white/20 w-24 mx-auto mb-2"
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-blue-100"
                >
                  Construyendo calidad
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Контент, который будет скрыт во время загрузки */}
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </LoadingContext.Provider>
  );
} 