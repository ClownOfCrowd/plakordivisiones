import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Lazy loading image component with animation
 * Uses Intersection Observer for performance
 */
const LazyImage = ({ src, alt, className = '', onClick }: LazyImageProps) => {
  // Track image loading state
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Setup intersection observer
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="relative w-full h-full"
      initial={{ opacity: 0 }}
      animate={imageLoaded ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Placeholder */}
      <div 
        className={`absolute inset-0 bg-gray-200 transition-opacity duration-300 ${
          imageLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      {/* Image */}
      {inView && (
        <img
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onClick={onClick}
          onLoad={() => setImageLoaded(true)}
        />
      )}
    </motion.div>
  );
};

export default LazyImage; 