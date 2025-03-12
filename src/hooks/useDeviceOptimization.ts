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

const DEFAULT_DEVICE_STATE: DeviceState = {
  isMobile: false,
  isDesktop: false,
  isLowPowerMode: false,
  prefersReducedMotion: false,
  connection: null,
};

export function useDeviceOptimization(options: DeviceOptimizationOptions = {}) {
  const [deviceState, setDeviceState] = useState<DeviceState>(DEFAULT_DEVICE_STATE);

  // Определение типа устройства и предпочтений анимации
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 768px)');

    const updateDeviceState = () => {
      setDeviceState(prev => ({
        ...prev,
        isMobile: mobileQuery.matches,
        isDesktop: mediaQuery.matches,
        prefersReducedMotion: motionQuery.matches,
      }));
    };

    // Инициализация
    updateDeviceState();

    // Используем ResizeObserver вместо resize event для лучшей производительности
    const resizeObserver = new ResizeObserver(updateDeviceState);
    resizeObserver.observe(document.documentElement);

    // Слушаем изменения медиа-запросов
    mediaQuery.addEventListener('change', updateDeviceState);
    motionQuery.addEventListener('change', updateDeviceState);
    mobileQuery.addEventListener('change', updateDeviceState);

    return () => {
      resizeObserver.disconnect();
      mediaQuery.removeEventListener('change', updateDeviceState);
      motionQuery.removeEventListener('change', updateDeviceState);
      mobileQuery.removeEventListener('change', updateDeviceState);
    };
  }, []);

  // Определение состояния подключения с debounce
  useEffect(() => {
    if (!('connection' in navigator)) return;

    const nav = navigator as Navigator & { connection: NetworkInformation };
    let timeoutId: NodeJS.Timeout;
    
    const updateConnectionStatus = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDeviceState(prev => ({ ...prev, connection: nav.connection }));
      }, 1000);
    };

    updateConnectionStatus();
    nav.connection.addEventListener('change', updateConnectionStatus);
    
    return () => {
      clearTimeout(timeoutId);
      nav.connection.removeEventListener('change', updateConnectionStatus);
    };
  }, []);

  // Определение режима энергосбережения с debounce
  useEffect(() => {
    if (!('getBattery' in navigator)) return;

    let batteryManager: BatteryManager | null = null;
    let timeoutId: NodeJS.Timeout;

    (navigator as Navigator & { getBattery: () => Promise<BatteryManager> })
      .getBattery()
      .then((battery: BatteryManager) => {
        batteryManager = battery;
        
        const updateBatteryStatus = () => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            setDeviceState(prev => ({
              ...prev,
              isLowPowerMode: battery.charging === false && battery.level <= 0.2
            }));
          }, 1000);
        };

        battery.addEventListener('chargingchange', updateBatteryStatus);
        battery.addEventListener('levelchange', updateBatteryStatus);
        updateBatteryStatus();
      });

    return () => {
      clearTimeout(timeoutId);
      if (batteryManager) {
        batteryManager.removeEventListener('chargingchange', () => {});
        batteryManager.removeEventListener('levelchange', () => {});
      }
    };
  }, []);

  // Мемоизированные настройки производительности
  const performanceSettings = useMemo(() => ({
    shouldReduceMotion: deviceState.isLowPowerMode || deviceState.prefersReducedMotion || options.enableReducedMotion,
    isLowBandwidth: deviceState.connection?.saveData || deviceState.connection?.effectiveType === 'slow-2g',
    isMobile: deviceState.isMobile,
    isDesktop: deviceState.isDesktop,
    isLowPowerMode: deviceState.isLowPowerMode,
    connection: deviceState.connection?.effectiveType,
  }), [
    deviceState.isLowPowerMode,
    deviceState.prefersReducedMotion,
    deviceState.connection?.saveData,
    deviceState.connection?.effectiveType,
    deviceState.isMobile,
    deviceState.isDesktop,
    options.enableReducedMotion
  ]);

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
    sizes: `(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw`,
    fetchPriority: performanceSettings.isLowBandwidth ? 'low' as const : 'auto' as const,
  }), [performanceSettings.isLowBandwidth, options.enableLazyLoading]);

  const getScrollAnimationSettings = useCallback((index: number = 0) => {
    if (performanceSettings.shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0 }
      };
    }

    const baseDelay = ANIMATION_CONSTANTS.BASE_DELAY;
    const spring = ANIMATION_CONSTANTS.SPRING.NORMAL;

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
    if (performanceSettings.shouldReduceMotion) {
      return getFadeAnimationSettings();
    }

    const distance = ANIMATION_CONSTANTS.SLIDE.NORMAL_DISTANCE;
    const spring = ANIMATION_CONSTANTS.SPRING.NORMAL;

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
  }, [performanceSettings.shouldReduceMotion, getFadeAnimationSettings]);

  const getHoverAnimationSettings = useCallback(() => {
    if (performanceSettings.shouldReduceMotion) {
      return {};
    }

    return {
      whileHover: {
        scale: ANIMATION_CONSTANTS.HOVER_SCALE,
        transition: {
          type: "spring",
          stiffness: ANIMATION_CONSTANTS.SPRING.HOVER.STIFFNESS,
          damping: ANIMATION_CONSTANTS.SPRING.HOVER.DAMPING,
        },
      },
      whileTap: {
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