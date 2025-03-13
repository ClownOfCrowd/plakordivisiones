import { useReducedMotion } from "framer-motion";

export function useDeviceOptimization() {
  const prefersReducedMotion = useReducedMotion();

  const imageSettings = {
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    quality: 75,
  };

  const getScrollAnimationSettings = (delay = 0) => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 1 },
        whileInView: { opacity: 1 },
      };
    }

    return {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { 
        once: true, 
        margin: "-50px",
        amount: 0.3
      },
      transition: {
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    };
  };

  return {
    getScrollAnimationSettings,
    imageSettings,
  };
} 