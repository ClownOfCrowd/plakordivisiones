import { useEffect, useState, useCallback, useMemo } from 'react';

interface NetworkInformation extends EventTarget {
  saveData: boolean;
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  type: 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown';
  addEventListener: (type: string, listener: EventListener) => void;
  removeEventListener: (type: string, listener: EventListener) => void;
}

interface BatteryManager extends EventTarget {
  charging: boolean;
  level: number;
  addEventListener: (type: string, listener: EventListener) => void;
  removeEventListener: (type: string, listener: EventListener) => void;
}

export const ANIMATION_CONSTANTS = {
  BASE_DELAY: 0.1,
  DEFAULT_THRESHOLD: 0.1,
  DEFAULT_ROOT_MARGIN: "-50px",
  HOVER_SCALE: 1.02,
  TAP_SCALE: 0.98,
  SPRING: {
    NORMAL: {
      STIFFNESS: 50,
      DAMPING: 10
    },
    REDUCED: {
      STIFFNESS: 100,
      DAMPING: 20
    },
    HOVER: {
      STIFFNESS: 400,
      DAMPING: 10
    }
  },
  FADE: {
    NORMAL_DURATION: 0.2,
    REDUCED_DURATION: 0.1
  },
  SLIDE: {
    NORMAL_DISTANCE: 50,
    REDUCED_DISTANCE: 10
  }
} as const;

interface DeviceOptimizationOptions {
  enableLazyLoading?: boolean;
  enableReducedMotion?: boolean;
  enableLowBandwidth?: boolean;
  threshold?: number;
  rootMargin?: string;
}

type SlideDirection = 'left' | 'right' | 'up' | 'down';

interface DeviceState {
  isMobile: boolean;
  isDesktop: boolean;
  isLowPowerMode: boolean;
  prefersReducedMotion: boolean;
  connection: NetworkInformation | null;
}

export function useDeviceOptimization(options: DeviceOptimizationOptions = {}) {
  const [deviceState, setDeviceState] = useState<DeviceState>({
    isMobile: false,
    isDesktop: false,
    isLowPowerMode: false,
    prefersReducedMotion: false,
    connection: null,
  });

  // Определение типа устройства и предпочтений анимации
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateDeviceState = () => {
      setDeviceState(prev => ({
        ...prev,
        isMobile: window.innerWidth <= 768,
        isDesktop: mediaQuery.matches,
        prefersReducedMotion: motionQuery.matches,
      }));
    };

    updateDeviceState();

    window.addEventListener('resize', updateDeviceState);
    mediaQuery.addEventListener('change', updateDeviceState);
    motionQuery.addEventListener('change', updateDeviceState);

    return () => {
      window.removeEventListener('resize', updateDeviceState);
      mediaQuery.removeEventListener('change', updateDeviceState);
      motionQuery.removeEventListener('change', updateDeviceState);
    };
  }, []);

  // Определение состояния подключения
  useEffect(() => {
    if ('connection' in navigator) {
      const nav = navigator as Navigator & { connection: NetworkInformation };
      
      const updateConnectionStatus = () => {
        setDeviceState(prev => ({ ...prev, connection: nav.connection }));
      };

      updateConnectionStatus();
      nav.connection.addEventListener('change', updateConnectionStatus);
      return () => nav.connection.removeEventListener('change', updateConnectionStatus);
    }
  }, []);

  // Определение режима энергосбережения
  useEffect(() => {
    if ('getBattery' in navigator) {
      let batteryManager: BatteryManager | null = null;

      (navigator as Navigator & { getBattery: () => Promise<BatteryManager> })
        .getBattery()
        .then((battery: BatteryManager) => {
          batteryManager = battery;
          
          const updateBatteryStatus = () => {
            setDeviceState(prev => ({
              ...prev,
              isLowPowerMode: battery.charging === false && battery.level <= 0.2
            }));
          };

          battery.addEventListener('chargingchange', updateBatteryStatus);
          battery.addEventListener('levelchange', updateBatteryStatus);
          updateBatteryStatus();
        });

      return () => {
        if (batteryManager) {
          batteryManager.removeEventListener('chargingchange', () => {});
          batteryManager.removeEventListener('levelchange', () => {});
        }
      };
    }
  }, []);

  // Мемоизированные настройки производительности
  const performanceSettings = useMemo(() => ({
    shouldReduceMotion: deviceState.isLowPowerMode || deviceState.prefersReducedMotion || options.enableReducedMotion,
    isLowBandwidth: deviceState.connection?.saveData || deviceState.connection?.effectiveType === 'slow-2g',
    isMobile: deviceState.isMobile,
    isDesktop: deviceState.isDesktop,
    isLowPowerMode: deviceState.isLowPowerMode,
    connection: deviceState.connection?.effectiveType,
  }), [deviceState, options.enableReducedMotion]);

  // Мемоизированные настройки анимации
  const animationSettings = useMemo(() => ({
    duration: performanceSettings.shouldReduceMotion ? 0 : undefined,
    transition: performanceSettings.shouldReduceMotion ? { duration: 0 } : undefined,
    animate: !performanceSettings.shouldReduceMotion,
  }), [performanceSettings.shouldReduceMotion]);

  // Мемоизированные настройки изображений
  const imageSettings = useMemo(() => ({
    quality: performanceSettings.isLowBandwidth ? 60 : 80,
    loading: options.enableLazyLoading ? 'lazy' as const : 'eager' as const,
    sizes: performanceSettings.isMobile ? '100vw' : undefined,
  }), [performanceSettings.isLowBandwidth, performanceSettings.isMobile, options.enableLazyLoading]);

  const getScrollAnimationSettings = useCallback((index: number = 0) => {
    const baseDelay = performanceSettings.shouldReduceMotion ? 0 : ANIMATION_CONSTANTS.BASE_DELAY;
    const spring = performanceSettings.shouldReduceMotion ? ANIMATION_CONSTANTS.SPRING.REDUCED : ANIMATION_CONSTANTS.SPRING.NORMAL;

    return {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { 
        once: true, 
        margin: options.rootMargin || ANIMATION_CONSTANTS.DEFAULT_ROOT_MARGIN,
        threshold: options.threshold || ANIMATION_CONSTANTS.DEFAULT_THRESHOLD,
      },
      transition: {
        type: "spring",
        stiffness: spring.STIFFNESS,
        damping: spring.DAMPING,
        delay: baseDelay * index,
      },
    };
  }, [performanceSettings.shouldReduceMotion, options.rootMargin, options.threshold]);

  const getFadeAnimationSettings = useCallback(() => {
    const duration = performanceSettings.shouldReduceMotion 
      ? ANIMATION_CONSTANTS.FADE.REDUCED_DURATION 
      : ANIMATION_CONSTANTS.FADE.NORMAL_DURATION;

    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration },
    };
  }, [performanceSettings.shouldReduceMotion]);

  const getSlideAnimationSettings = useCallback((direction: SlideDirection = 'up') => {
    const distance = performanceSettings.shouldReduceMotion 
      ? ANIMATION_CONSTANTS.SLIDE.REDUCED_DISTANCE 
      : ANIMATION_CONSTANTS.SLIDE.NORMAL_DISTANCE;
    const spring = performanceSettings.shouldReduceMotion ? ANIMATION_CONSTANTS.SPRING.REDUCED : ANIMATION_CONSTANTS.SPRING.NORMAL;

    const getTransform = () => {
      switch (direction) {
        case 'left': return { x: -distance };
        case 'right': return { x: distance };
        case 'up': return { y: -distance };
        case 'down': return { y: distance };
      }
    };

    return {
      initial: { opacity: 0, ...getTransform() },
      animate: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, ...getTransform() },
      transition: {
        type: "spring",
        stiffness: spring.STIFFNESS,
        damping: spring.DAMPING,
      },
    };
  }, [performanceSettings.shouldReduceMotion]);

  const getHoverAnimationSettings = useCallback(() => {
    return {
      whileHover: performanceSettings.shouldReduceMotion ? {} : {
        scale: ANIMATION_CONSTANTS.HOVER_SCALE,
        transition: {
          type: "spring",
          stiffness: ANIMATION_CONSTANTS.SPRING.HOVER.STIFFNESS,
          damping: ANIMATION_CONSTANTS.SPRING.HOVER.DAMPING,
        },
      },
      whileTap: performanceSettings.shouldReduceMotion ? {} : {
        scale: ANIMATION_CONSTANTS.TAP_SCALE,
      },
    };
  }, [performanceSettings.shouldReduceMotion]);

  return {
    ...performanceSettings,
    animationSettings,
    imageSettings,
    getScrollAnimationSettings,
    getFadeAnimationSettings,
    getSlideAnimationSettings,
    getHoverAnimationSettings,
  };
} 