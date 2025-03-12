'use client';

import Image, { ImageProps } from 'next/image';
import { useDeviceOptimization } from '@/hooks/useDeviceOptimization';
import { useCallback, useState, memo, useEffect } from 'react';
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  wrapperClassName?: string;
  showLoadingPlaceholder?: boolean;
  priority?: boolean;
  mobileSizes?: string;
}

const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  className,
  wrapperClassName,
  width,
  height,
  showLoadingPlaceholder = true,
  priority = false,
  mobileSizes,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { imageSettings, shouldReduceMotion } = useDeviceOptimization({
    enableLazyLoading: !priority,
    enableLowBandwidth: true
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setError(true);
    setIsLoading(false);
  }, []);

  if (error) {
    return (
      <div 
        className={cn(
          'relative overflow-hidden bg-gray-50 flex items-center justify-center',
          wrapperClassName
        )}
        style={{ 
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height
        }}
      >
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <ImageOff className="w-6 h-6" />
          <span className="text-sm text-center px-2">{alt}</span>
        </div>
      </div>
    );
  }

  const optimizedSizes = mobileSizes || (isMobile 
    ? '(max-width: 768px) 100vw, 50vw' 
    : imageSettings.sizes
  );

  return (
    <div 
      className={cn(
        'relative overflow-hidden bg-gray-50 touch-none',
        wrapperClassName
      )}
    >
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          {isLoading && showLoadingPlaceholder && !priority && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              className="absolute inset-0 bg-gray-100 animate-pulse"
            />
          )}
        </AnimatePresence>

        <motion.div
          initial={priority ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              'w-full h-full object-cover select-none',
              isLoading && !priority ? 'opacity-0' : 'opacity-100',
              className
            )}
            quality={isMobile ? Math.min(imageSettings.quality, 75) : imageSettings.quality}
            loading={priority ? 'eager' : imageSettings.loading}
            sizes={optimizedSizes}
            fetchPriority={priority ? 'high' : imageSettings.fetchPriority}
            onLoadingComplete={handleLoadingComplete}
            onError={handleError}
            {...props}
          />
        </motion.div>
      </LazyMotion>
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";

export { OptimizedImage };
