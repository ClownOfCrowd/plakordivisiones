'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDeviceOptimization } from '@/hooks/useDeviceOptimization';

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
  isOpen: boolean;
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

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const { 
    imageSettings,
    getHoverAnimationSettings 
  } = useDeviceOptimization();

  const hoverAnimation = useMemo(() => getHoverAnimationSettings(), [getHoverAnimationSettings]);

  // Сброс состояний при закрытии
  useEffect(() => {
    if (!isOpen) {
      setActiveImage(0);
    }
  }, [isOpen]);

  // Оптимизированный обработчик для смены изображения
  const handleImageChange = useCallback((index: number) => {
    if (index === activeImage) return;
    setActiveImage(index);
  }, [activeImage]);

  // Обработчик клавиш
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setActiveImage(prev => (prev > 0 ? prev - 1 : project?.images.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveImage(prev => (prev < (project?.images.length ?? 0) - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, project?.images.length]);

  if (!project || !isOpen) return null;

  return (
    <AnimatePresence mode="sync">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 pt-24 px-4 pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-y-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative h-[50vh]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={project.images[activeImage]}
                    alt={`${project.title} - Imagen ${activeImage + 1}`}
                    fill
                    className="object-cover rounded-t-xl"
                    quality={75}
                    priority={activeImage === 0}
                    sizes="(max-width: 1024px) 90vw, 1024px"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Навигация по изображениям */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
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
              <div className="flex justify-between items-start mb-6">
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

              <div className="prose prose-lg max-w-none mb-6">
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

              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="border-gray-300 hover:bg-primary hover:text-white hover:border-primary transition-colors"
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

            <div className="grid grid-cols-4 gap-2 p-4">
              {project.images.map((image, index) => (
                <motion.button
                  key={image}
                  onClick={() => handleImageChange(index)}
                  className={`relative aspect-video rounded-lg overflow-hidden ${
                    index === activeImage ? 'ring-2 ring-primary' : ''
                  }`}
                  {...hoverAnimation}
                >
                  <Image
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    quality={60}
                    loading="lazy"
                    sizes="(max-width: 1024px) 25vw, 256px"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 