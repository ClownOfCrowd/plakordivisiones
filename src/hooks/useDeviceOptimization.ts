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

interface ImageSettings {
  quality: number;
  loading: 'lazy' | 'eager';
  fetchPriority: 'high' | 'low' | 'auto';
  sizes: string;
}

const DEFAULT_DEVICE_STATE: DeviceState = {
  isMobile: false,
  isDesktop: true,
  isLowPowerMode: false,
  prefersReducedMotion: false,
  connection: null,
};

export function useDeviceOptimization(options: DeviceOptimizationOptions = {}) {
  const [deviceState, setDeviceState] = useState<DeviceState>(DEFAULT_DEVICE_STATE);
  const [isMounted, setIsMounted] = useState(false);

  // Определение типа устройства и предпочтений анимации
  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 768px)');

    const updateDeviceState = () => {
      setDeviceState(prev => ({
        ...prev,
        isMobile: mobileQuery.matches,
        isDesktop: mediaQuery.matches,
        prefersReducedMotion: motionQuery.matches || options.enableReducedMotion || false,
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

    // Определение сетевого соединения
    if ('connection' in navigator) {
      const connection = (navigator as any).connection as NetworkInformation;
      
      const updateConnectionInfo = () => {
        setDeviceState(prev => ({
          ...prev,
          connection,
          isLowPowerMode: connection.saveData || options.enableLowBandwidth || false
        }));
      };

      updateConnectionInfo();
      connection.addEventListener('change', updateConnectionInfo);

      return () => {
        connection.removeEventListener('change', updateConnectionInfo);
      };
    }

    return () => {
      resizeObserver.disconnect();
      mediaQuery.removeEventListener('change', updateDeviceState);
      motionQuery.removeEventListener('change', updateDeviceState);
      mobileQuery.removeEventListener('change', updateDeviceState);
    };
  }, [options.enableReducedMotion, options.enableLowBandwidth]);

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

  const performanceSettings = useMemo(() => {
    const shouldReduceMotion = deviceState.prefersReducedMotion || options.enableReducedMotion || false;
    const isLowBandwidth = deviceState.isLowPowerMode || options.enableLowBandwidth || false;
    const shouldLazyLoad = options.enableLazyLoading !== false && !isLowBandwidth;

    return {
      shouldReduceMotion,
      isLowBandwidth,
      shouldLazyLoad
    };
  }, [
    deviceState.prefersReducedMotion,
    deviceState.isLowPowerMode,
    options.enableReducedMotion,
    options.enableLowBandwidth,
    options.enableLazyLoading
  ]);

  const imageSettings = useMemo<ImageSettings>(() => {
    const { isLowBandwidth, shouldLazyLoad } = performanceSettings;
    const isMobile = deviceState.isMobile;

    return {
      quality: isLowBandwidth ? 60 : isMobile ? 75 : 85,
      loading: shouldLazyLoad ? 'lazy' : 'eager',
      fetchPriority: isLowBandwidth ? 'low' : 'auto',
      sizes: isMobile 
        ? '(max-width: 768px) 100vw, 50vw'
        : '(max-width: 1024px) 50vw, 33vw'
    };
  }, [performanceSettings, deviceState.isMobile]);

  const getHoverAnimationSettings = useCallback(() => {
    if (!isMounted) return {};
    
    if (performanceSettings.shouldReduceMotion) {
      return {
        whileHover: { scale: 1 },
        whileTap: { scale: 1 }
      };
    }

    const spring = ANIMATION_CONSTANTS.SPRING.HOVER;

    return {
      whileHover: { 
        scale: ANIMATION_CONSTANTS.HOVER_SCALE,
        transition: {
          type: "spring",
          stiffness: spring.STIFFNESS,
          damping: spring.DAMPING
        }
      },
      whileTap: { 
        scale: ANIMATION_CONSTANTS.TAP_SCALE 
      }
    };
  }, [performanceSettings.shouldReducedMotion, isMounted]);

  const getScrollAnimationSettings = useCallback((index: number = 0) => {
    if (!isMounted) return {};
    
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
  }, [
    performanceSettings.shouldReduceMotion,
    options.rootMargin,
    options.threshold,
    isMounted
  ]);

  const getFadeAnimationSettings = useCallback(() => {
    if (!isMounted) return {};
    
    const duration = performanceSettings.shouldReduceMotion 
      ? ANIMATION_CONSTANTS.FADE.REDUCED_DURATION 
      : ANIMATION_CONSTANTS.FADE.NORMAL_DURATION;

    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration },
    };
  }, [performanceSettings.shouldReduceMotion, isMounted]);

  return {
    ...deviceState,
    ...performanceSettings,
    imageSettings,
    getHoverAnimationSettings,
    getScrollAnimationSettings,
    getFadeAnimationSettings,
    isMounted
  };
} 