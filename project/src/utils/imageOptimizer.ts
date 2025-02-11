interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Image optimization utilities
 * Handles:
 * - Resizing
 * - Format conversion
 * - Quality optimization
 * - Caching
 */

/**
 * Calculates optimal image dimensions while maintaining aspect ratio
 */
export const getOptimalImageSize = (
  originalDimensions: ImageDimensions,
  containerDimensions: ImageDimensions
): ImageDimensions => {
  const aspectRatio = originalDimensions.width / originalDimensions.height;
  
  let width = containerDimensions.width;
  let height = containerDimensions.height;
  
  if (width / height > aspectRatio) {
    width = height * aspectRatio;
  } else {
    height = width / aspectRatio;
  }
  
  return { width: Math.round(width), height: Math.round(height) };
};

interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg';
}

/**
 * Generates optimized image URL with provided parameters
 */
export const generateImageUrl = (url: string, options: ImageOptions = {}): string => {
  if (!url) return '';
  
  const baseUrl = url.split('?')[0];
  const params = new URLSearchParams();
  
  if (options.width) params.append('width', options.width.toString());
  if (options.height) params.append('height', options.height.toString());
  if (options.quality) params.append('quality', options.quality.toString());
  if (options.format) params.append('format', options.format);
  
  return `${baseUrl}?${params.toString()}`;
};

/**
 * Optimizes image with given parameters
 * Handles both external and local images differently
 */
export const optimizeImage = async (
  src: string,
  options: ImageOptions = {}
): Promise<string> => {
  const {
    width,
    height,
    quality = 75,
    format = 'webp'
  } = options;

  // Handle external URLs using image proxy
  if (src.startsWith('http')) {
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('q', quality.toString());
    params.append('f', format);

    return `${import.meta.env.VITE_IMAGE_PROXY_URL}/${encodeURIComponent(src)}?${params.toString()}`;
  }

  // Handle local images using vite-imagetools
  return new URL(`../assets${src}`, import.meta.url).href;
};

/**
 * Preloads image for better performance
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Checks browser support for modern image formats
 */
export const checkImageSupport = async (): Promise<Record<string, boolean>> => {
  const formats = {
    webp: 'image/webp',
    avif: 'image/avif'
  };

  const support: Record<string, boolean> = {};

  for (const [format, mime] of Object.entries(formats)) {
    const canvas = document.createElement('canvas');
    support[format] = canvas.toDataURL(mime).indexOf(mime) > -1;
  }

  return support;
}; 