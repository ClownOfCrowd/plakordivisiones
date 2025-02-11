import { useState, useEffect } from 'react';
import { optimizeImage, preloadImage } from '../utils/imageOptimizer';
import { trackError } from '../lib/analytics';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  className?: string;
}

/**
 * Optimized image component with lazy loading and fallback
 * Features:
 * - Automatic image optimization
 * - Lazy loading
 * - Loading placeholder
 * - Error handling
 */
export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 75,
  className = '',
  ...props
}: Props) => {
  const [imageSrc, setImageSrc] = useState<string>('/images/placeholder.jpg');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        setIsLoading(true);
        const optimizedSrc = await optimizeImage(src, { width, height, quality });
        
        if (priority) {
          await preloadImage(optimizedSrc);
        }
        
        setImageSrc(optimizedSrc);
        setError(null);
      } catch (err) {
        console.error('Failed to load image:', src);
        trackError(err instanceof Error ? err : new Error('Failed to load image'), 'OptimizedImage');
        setError(err instanceof Error ? err : new Error('Failed to load image'));
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [src, width, height, quality, priority]);

  return (
    <div className={`relative ${className}`}>
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`
          w-full h-full object-cover
          ${isLoading ? 'animate-pulse bg-gray-200' : ''}
          ${error ? 'opacity-50' : ''}
        `}
        {...props}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-red-500">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage; 