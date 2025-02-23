import { useEffect, useState, useCallback } from 'react';

interface DeviceOptimizationOptions {
  enableLazyLoading?: boolean;
  enableReducedMotion?: boolean;
  enableLowBandwidth?: boolean;
}

export function useDeviceOptimization(options: DeviceOptimizationOptions = {}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [connection, setConnection] = useState<any>(null);

  // Определение типа устройства
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Определение состояния подключения
  useEffect(() => {
    if ('connection' in navigator) {
      const nav = navigator as any;
      setConnection(nav.connection);

      const updateConnectionStatus = () => {
        setConnection(nav.connection);
      };

      nav.connection.addEventListener('change', updateConnectionStatus);
      return () => nav.connection.removeEventListener('change', updateConnectionStatus);
    }
  }, []);

  // Определение режима энергосбережения
  useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBatteryStatus = () => {
          setIsLowPowerMode(battery.charging === false && battery.level <= 0.2);
        };

        battery.addEventListener('chargingchange', updateBatteryStatus);
        battery.addEventListener('levelchange', updateBatteryStatus);
        updateBatteryStatus();

        return () => {
          battery.removeEventListener('chargingchange', updateBatteryStatus);
          battery.removeEventListener('levelchange', updateBatteryStatus);
        };
      });
    }
  }, []);

  // Оптимизация анимаций
  const getAnimationSettings = useCallback(() => {
    const shouldReduceMotion = options.enableReducedMotion && (
      isLowPowerMode || 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    return {
      duration: shouldReduceMotion ? 0 : undefined,
      transition: shouldReduceMotion ? { duration: 0 } : undefined,
      animate: !shouldReduceMotion,
    };
  }, [isLowPowerMode, options.enableReducedMotion]);

  // Оптимизация изображений
  const getImageSettings = useCallback(() => {
    const isLowBandwidth = options.enableLowBandwidth && (
      connection?.saveData || 
      connection?.type === 'cellular' || 
      connection?.effectiveType === 'slow-2g'
    );

    return {
      quality: isLowBandwidth ? 60 : 80,
      loading: options.enableLazyLoading ? 'lazy' : undefined,
      sizes: isMobile ? '100vw' : undefined,
    };
  }, [connection, isMobile, options.enableLazyLoading, options.enableLowBandwidth]);

  // Оптимизация производительности
  const getPerformanceSettings = useCallback(() => {
    return {
      shouldReduceMotion: isLowPowerMode || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      isLowBandwidth: connection?.saveData || connection?.effectiveType === 'slow-2g',
      isMobile,
      isLowPowerMode,
      connection: connection?.effectiveType,
    };
  }, [isLowPowerMode, connection, isMobile]);

  return {
    isMobile,
    isLowPowerMode,
    connection,
    getAnimationSettings,
    getImageSettings,
    getPerformanceSettings,
  };
} 