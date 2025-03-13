'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useDeviceOptimization } from '@/hooks/useDeviceOptimization';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Tag } from 'lucide-react';

type ProjectModalProps = {
  project: {
    title: string;
    description: string;
    challenge?: string;
    solution?: string;
    features?: string[];
    images: string[];
    location: string;
    date: string;
    tags: string[];
    details?: {
      area?: string;
      services?: string[];
    };
  } | null;
  isOpen: boolean;
  onClose: () => void;
};

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const { 
    imageSettings,
    getHoverAnimationSettings,
    isMobile
  } = useDeviceOptimization();

  const hoverAnimation = useMemo(() => getHoverAnimationSettings(), [getHoverAnimationSettings]);

  useEffect(() => {
    if (!isOpen) {
      setActiveImage(0);
    }
  }, [isOpen]);

  const handleImageChange = useCallback((index: number) => {
    if (index === activeImage) return;
    setActiveImage(index);
  }, [activeImage]);

  const nextImage = useCallback(() => {
    if (!project) return;
    setActiveImage(prev => (prev < project.images.length - 1 ? prev + 1 : 0));
  }, [project]);

  const prevImage = useCallback(() => {
    if (!project) return;
    setActiveImage(prev => (prev > 0 ? prev - 1 : project.images.length - 1));
  }, [project]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, prevImage, nextImage]);

  // Блокировка прокрутки body при открытом модальном окне
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!project || !isOpen) return null;

  return (
    <AnimatePresence mode="sync">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-4 md:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Кнопка закрытия */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-800 hover:bg-white transition-colors"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            {/* Галерея изображений */}
            <div className="relative h-[30vh] sm:h-[40vh] md:h-[50vh]">
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
                    className="object-cover"
                    quality={75}
                    priority={activeImage === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1024px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Навигация по изображениям */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-800 hover:bg-white transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-800 hover:bg-white transition-colors"
                aria-label="Imagen siguiente"
              >
                <ChevronRight size={20} />
              </button>

              {/* Индикаторы изображений */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      activeImage === index ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => handleImageChange(index)}
                    aria-label={`Ver imagen ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Контент */}
            <div className="p-6 md:p-8">
              {/* Заголовок и метаданные */}
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
                  {project.title}
                </h2>
                
                <div className="flex flex-wrap gap-y-3 text-sm text-gray-700">
                  <div className="flex items-center mr-4">
                    <MapPin size={16} className="mr-1 text-primary" />
                    <span>{project.location}</span>
                  </div>
                  
                  <div className="flex items-center mr-4">
                    <Calendar size={16} className="mr-1 text-primary" />
                    <span>{project.date}</span>
                  </div>
                  
                  {project.details?.area && (
                    <div className="flex items-center">
                      <span className="font-medium mr-1">Área:</span>
                      <span>{project.details.area}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary/10 px-3 py-1 rounded-full text-sm text-primary font-medium flex items-center"
                    >
                      <Tag size={14} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Описание и детали */}
              <div className="space-y-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800">{project.description}</p>
                </div>
                
                {project.challenge && (
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2 text-primary flex items-center">
                      <span className="bg-primary/10 p-1 rounded-md mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                        </svg>
                      </span>
                      El Desafío
                    </h3>
                    <p className="text-gray-800">{project.challenge}</p>
                  </div>
                )}

                {project.solution && (
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2 text-primary flex items-center">
                      <span className="bg-primary/10 p-1 rounded-md mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </span>
                      Nuestra Solución
                    </h3>
                    <p className="text-gray-800">{project.solution}</p>
                  </div>
                )}

                {project.features && project.features.length > 0 && (
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-primary flex items-center">
                      <span className="bg-primary/10 p-1 rounded-md mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M12 2v4" />
                          <path d="m6.343 6.343 2.83 2.83" />
                          <path d="M2 12h4" />
                          <path d="m6.343 17.657 2.83-2.83" />
                          <path d="M12 18v4" />
                          <path d="m14.828 14.828 2.83 2.83" />
                          <path d="M18 12h4" />
                          <path d="m14.828 9.172 2.83-2.83" />
                        </svg>
                      </span>
                      Características
                    </h3>
                    <ul className="space-y-2">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 mt-1 flex-shrink-0">
                            <polyline points="9 11 12 14 22 4" />
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                          </svg>
                          <span className="text-gray-800">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.details?.services && project.details.services.length > 0 && (
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-primary flex items-center">
                      <span className="bg-primary/10 p-1 rounded-md mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                      </span>
                      Servicios Realizados
                    </h3>
                    <ul className="space-y-2">
                      {project.details.services.map((service) => (
                        <li key={service} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 mt-1 flex-shrink-0">
                            <polyline points="9 11 12 14 22 4" />
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                          </svg>
                          <span className="text-gray-800">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Миниатюры изображений */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-6">
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
                      sizes="(max-width: 640px) 25vw, (max-width: 1024px) 20vw, 192px"
                    />
                  </motion.button>
                ))}
              </div>

              {/* Кнопка закрытия */}
              <div className="flex justify-center">
                <Button 
                  onClick={onClose}
                  className="bg-primary text-white hover:bg-primary/90 transition-colors min-w-[200px]"
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
