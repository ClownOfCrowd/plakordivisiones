'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useCallback, useRef } from 'react';

interface ServiceModalProps {
  service: {
    title: string;
    description: string;
    image: string;
    features: string[];
    longDescription?: string;
    benefits?: string[];
    process?: {
      title: string;
      description: string;
    }[];
  };
  onClose: () => void;
}

// Оптимизированные варианты анимаций
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, delay: 0.1 }
  }
};

const modalVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.5
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { 
      duration: 0.2 
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3
    }
  })
};

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Оптимизированная обработка клавиши Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Оптимизированная обработка клика вне модального окна
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    // Блокируем прокрутку при открытом модальном окне
    document.body.style.overflow = 'hidden';
    
    // Добавляем обработчики событий
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Очищаем при закрытии
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleKeyDown, handleClickOutside]);

  return (
    <div 
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={prefersReducedMotion ? {} : overlayVariants}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />
      
      <div className="fixed inset-0 overflow-y-auto">
        <div className="min-h-screen px-4 flex items-center justify-center">
          <motion.div
            ref={modalRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={prefersReducedMotion ? {} : modalVariants}
            className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl relative my-8 transform-gpu"
          >
            {/* Кнопка закрытия */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/90 rounded-full p-2 hover:bg-white transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Cerrar modal"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Изображение с градиентом */}
            <div className="relative h-72 sm:h-96">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 1536px) 100vw, 1536px"
                className="object-cover"
                priority
                quality={85}
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h2 
                  id="modal-title"
                  className="text-3xl sm:text-4xl font-bold text-white mb-2"
                >
                  {service.title}
                </h2>
                <p className="text-white/90 text-lg">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Контент */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Особенности */}
              <motion.div
                custom={0}
                variants={contentVariants}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-primary">
                  Características principales
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      custom={index + 1}
                      variants={contentVariants}
                      className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg transform-gpu"
                    >
                      <svg
                        className="w-6 h-6 text-primary flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-secondary">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Подробное описание */}
              {service.longDescription && (
                <motion.div
                  custom={2}
                  variants={contentVariants}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold text-primary">
                    Descripción detallada
                  </h3>
                  <p className="text-secondary whitespace-pre-line">
                    {service.longDescription}
                  </p>
                </motion.div>
              )}

              {/* Преимущества */}
              {service.benefits && (
                <motion.div
                  custom={3}
                  variants={contentVariants}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold text-primary">
                    Beneficios
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        custom={index + 4}
                        variants={contentVariants}
                        className="flex items-center gap-3 transform-gpu"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <span className="text-secondary">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Процесс работы */}
              {service.process && (
                <motion.div
                  custom={5}
                  variants={contentVariants}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold text-primary">
                    Proceso de trabajo
                  </h3>
                  <div className="space-y-4">
                    {service.process.map((step, index) => (
                      <motion.div
                        key={index}
                        custom={index + 6}
                        variants={contentVariants}
                        className="flex gap-4 transform-gpu"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary mb-1">
                            {step.title}
                          </h4>
                          <p className="text-secondary">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Кнопки действий */}
              <motion.div 
                custom={7}
                variants={contentVariants}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link href="/contacto" className="flex-1">
                  <Button variant="cta" size="lg" className="w-full transform-gpu">
                    Solicitar presupuesto
                  </Button>
                </Link>
                <Link href="/proyectos" className="flex-1">
                  <Button variant="outline" size="lg" className="w-full transform-gpu">
                    Ver proyectos similares
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 