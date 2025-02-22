import { useEffect, useState } from 'react';

export function useDesktopOptimization() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Определяем, является ли устройство десктопом
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Проверяем настройки reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);

    // Слушаем изменения размера окна
    window.addEventListener('resize', checkIsDesktop);
    checkIsDesktop();

    // Слушаем изменения настроек reduced motion
    mediaQuery.addEventListener('change', (e) => setShouldReduceMotion(e.matches));

    return () => {
      window.removeEventListener('resize', checkIsDesktop);
      mediaQuery.removeEventListener('change', (e) => setShouldReduceMotion(e.matches));
    };
  }, []);

  // Оптимизированные настройки анимации для десктопа
  const getAnimationSettings = () => {
    if (!isDesktop || shouldReduceMotion) {
      return {
        transition: { duration: 0 },
        shouldAnimate: false,
      };
    }

    return {
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        mass: 0.1, // Уменьшаем массу для более быстрых анимаций
        restSpeed: 0.5, // Оптимизируем порог остановки
        restDelta: 0.1, // Оптимизируем дельту остановки
      },
      shouldAnimate: true,
    };
  };

  // Оптимизированные настройки transform для десктопа
  const getTransformSettings = () => {
    if (!isDesktop || shouldReduceMotion) {
      return {
        scale: 1,
        transition: 'none',
      };
    }

    return {
      scale: 'var(--scale, 1.02)', // Уменьшаем масштаб для десктопа
      transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      willChange: 'transform',
    };
  };

  return {
    isDesktop,
    shouldReduceMotion,
    getAnimationSettings,
    getTransformSettings,
  };
} 