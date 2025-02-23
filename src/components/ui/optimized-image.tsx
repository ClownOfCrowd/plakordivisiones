'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps, StaticImageData } from 'next/image';
import { useDeviceOptimization } from '@/hooks/useDeviceOptimization';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'loading' | 'quality'> {
  lowQualityUrl?: string;
  enableLazyLoading?: boolean;
  enableLowBandwidth?: boolean;
  withBlur?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className,
  lowQualityUrl,
  enableLazyLoading = true,
  enableLowBandwidth = true,
  withBlur = true,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLowQuality, setShowLowQuality] = useState(true);
  const { getImageSettings } = useDeviceOptimization({
    enableLazyLoading,
    enableLowBandwidth,
  });

  const imageSettings = getImageSettings();

  useEffect(() => {
    // Предзагрузка изображения высокого качества
    const img = document.createElement('img');
    const imgSrc = typeof src === 'string' 
      ? src 
      : (src as StaticImageData).src || '';
      
    if (imgSrc) {
      img.src = imgSrc;
      img.onload = () => {
        setIsLoaded(true);
        setTimeout(() => setShowLowQuality(false), 100);
      };
    }
  }, [src]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {withBlur && showLowQuality && lowQualityUrl && (
        <Image
          src={lowQualityUrl}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover blur-lg scale-105 transform-gpu"
          fill
          priority
        />
      )}
      <Image
        src={src}
        alt={alt}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300 transform-gpu will-change-transform',
          !isLoaded && 'opacity-0',
          isLoaded && 'opacity-100'
        )}
        quality={imageSettings.quality}
        loading={imageSettings.loading}
        sizes={imageSettings.sizes}
        {...props}
      />
    </div>
  );
} 