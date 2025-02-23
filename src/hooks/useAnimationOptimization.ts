import { useCallback } from 'react';
import { useDeviceOptimization } from './useDeviceOptimization';

interface AnimationOptions {
  enableReducedMotion?: boolean;
  threshold?: number;
  rootMargin?: string;
}

export function useAnimationOptimization(options: AnimationOptions = {}) {
  const { getAnimationSettings, getPerformanceSettings } = useDeviceOptimization({
    enableReducedMotion: options.enableReducedMotion,
  });

  const getScrollAnimationSettings = useCallback((index: number = 0) => {
    const { shouldReduceMotion } = getPerformanceSettings();
    const baseDelay = shouldReduceMotion ? 0 : 0.1;

    return {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { 
        once: true, 
        margin: options.rootMargin || "-50px",
        threshold: options.threshold || 0.1,
      },
      transition: {
        type: "spring",
        stiffness: shouldReduceMotion ? 100 : 50,
        damping: shouldReduceMotion ? 20 : 10,
        delay: baseDelay * index,
      },
    };
  }, [getPerformanceSettings, options.rootMargin, options.threshold]);

  const getFadeAnimationSettings = useCallback(() => {
    const { shouldReduceMotion } = getPerformanceSettings();

    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.2,
      },
    };
  }, [getPerformanceSettings]);

  const getSlideAnimationSettings = useCallback((direction: 'left' | 'right' | 'up' | 'down' = 'up') => {
    const { shouldReduceMotion } = getPerformanceSettings();
    const distance = shouldReduceMotion ? 10 : 50;

    const getTransform = () => {
      switch (direction) {
        case 'left':
          return { x: -distance };
        case 'right':
          return { x: distance };
        case 'up':
          return { y: -distance };
        case 'down':
          return { y: distance };
      }
    };

    return {
      initial: { opacity: 0, ...getTransform() },
      animate: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, ...getTransform() },
      transition: {
        type: "spring",
        stiffness: shouldReduceMotion ? 100 : 50,
        damping: shouldReduceMotion ? 20 : 10,
      },
    };
  }, [getPerformanceSettings]);

  const getHoverAnimationSettings = useCallback(() => {
    const { shouldReduceMotion } = getPerformanceSettings();

    return {
      whileHover: shouldReduceMotion ? {} : {
        scale: 1.02,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10,
        },
      },
      whileTap: shouldReduceMotion ? {} : {
        scale: 0.98,
      },
    };
  }, [getPerformanceSettings]);

  return {
    ...getAnimationSettings(),
    getScrollAnimationSettings,
    getFadeAnimationSettings,
    getSlideAnimationSettings,
    getHoverAnimationSettings,
  };
} 