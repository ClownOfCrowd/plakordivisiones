'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useDesktopOptimization } from '@/hooks/useDesktopOptimization';

type ProjectModalProps = {
  project: {
    title: string;
    description: string;
    challenge: string;
    solution: string;
    features: string[];
    images: string[];
    location: string;
    date: string;
    tags: string[];
  };
  onClose: () => void;
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.5,
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const { getAnimationSettings, getTransformSettings } = useDesktopOptimization();
  const animationSettings = getAnimationSettings();
  const transformSettings = getTransformSettings();

  // Оптимизированный обработчик для смены изображения
  const handleImageChange = useCallback((index: number) => {
    setIsLoading(true);
    setActiveImage(index);
  }, []);

  // Обработчик клавиш
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setActiveImage(prev => (prev > 0 ? prev - 1 : project.images.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveImage(prev => (prev < project.images.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, project.images.length]);

  // Предзагрузка следующего изображения
  useEffect(() => {
    const nextIndex = (activeImage + 1) % project.images.length;
    const img = new Image();
    img.src = project.images[nextIndex];
  }, [activeImage, project.images]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
        style={{
          willChange: 'opacity',
          perspective: '1000px',
        }}
      >
        <motion.div
          ref={modalRef}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white rounded-xl max-w-4xl w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{
            ...transformSettings,
            willChange: 'transform',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="relative h-[60vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
                style={{
                  willChange: 'opacity',
                }}
              >
                <Image
                  src={project.images[activeImage]}
                  alt={`${project.title} - Imagen ${activeImage + 1}`}
                  fill
                  className="object-cover rounded-t-xl"
                  quality={85}
                  priority={activeImage === 0}
                  onLoadingComplete={() => setIsLoading(false)}
                  style={{
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Индикатор загрузки */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* Навигация по изображениям */}
            <div 
              className="absolute bottom-4 left-0 right-0 flex justify-center gap-2"
              style={{
                transform: 'translateZ(20px)',
              }}
            >
              {project.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    activeImage === index ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => handleImageChange(index)}
                  aria-label={`Ver imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="p-8">
            <div 
              className="flex justify-between items-start mb-6"
              style={{
                transform: 'translateZ(10px)',
              }}
            >
              <div>
                <h2 className="text-3xl font-bold text-primary mb-2">
                  {project.title}
                </h2>
                <div className="flex gap-2 text-sm text-secondary">
                  <span>{project.location}</span>
                  <span>•</span>
                  <span>{project.date}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div 
              className="prose prose-lg max-w-none mb-6"
              style={{
                transform: 'translateZ(5px)',
              }}
            >
              <p>{project.description}</p>
              
              <h3 className="text-xl font-semibold mb-2">El Desafío</h3>
              <p>{project.challenge}</p>

              <h3 className="text-xl font-semibold mb-2">Nuestra Solución</h3>
              <p>{project.solution}</p>

              <h3 className="text-xl font-semibold mb-2">Características</h3>
              <ul>
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>

            <div 
              className="flex justify-between items-center"
              style={{
                transform: 'translateZ(15px)',
              }}
            >
              <Button 
                variant="outline" 
                onClick={onClose}
                className="hover:bg-gray-100 transition-colors"
              >
                Cerrar
              </Button>
              <Button 
                variant="cta"
                onClick={() => window.location.href = '/contacto'}
                className="hover:brightness-110 transition-all"
              >
                Solicitar Presupuesto Similar
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 