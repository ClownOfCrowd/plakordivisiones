'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ServiceModal } from '@/components/ui/service-modal';
import { servicesData } from '@/data/services';
import { useDesktopOptimization } from '@/hooks/useDesktopOptimization';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);
  const { getAnimationSettings, getTransformSettings } = useDesktopOptimization();
  const animationSettings = getAnimationSettings();
  const transformSettings = getTransformSettings();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service, index) => (
          <motion.div
            key={service.title}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={animationSettings.transition}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => setSelectedService(service)}
            style={{
              transform: `perspective(1000px)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="relative h-64">
              {/* Изображение */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 3}
                className="object-cover"
                style={{
                  ...transformSettings,
                  backfaceVisibility: 'hidden',
                }}
                loading={index < 3 ? 'eager' : 'lazy'}
              />
              
              {/* Градиент */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-90"
                style={{
                  willChange: 'opacity',
                  transition: 'opacity 200ms ease-out',
                }}
              />
              
              {/* Контент */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 
                  className="text-2xl font-bold text-white mb-2 group-hover:text-primary-200 transition-colors"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(20px)',
                  }}
                >
                  {service.title}
                </h3>
                <p 
                  className="text-white/90 line-clamp-2 text-base"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(10px)',
                  }}
                >
                  {service.description}
                </p>
                
                {/* Кнопка "Ver más" */}
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={animationSettings.transition}
                  style={{
                    willChange: 'transform, opacity',
                    transform: 'translateZ(30px)',
                  }}
                >
                  <span className="inline-flex items-center text-white font-medium bg-primary/80 px-4 py-2 rounded-lg">
                    Ver más
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Превью функций */}
            <div 
              className="p-6 border-t"
              style={{
                willChange: 'transform',
                transform: 'translateZ(5px)',
              }}
            >
              <ul className="space-y-2">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-center text-secondary">
                    <svg
                      className="w-5 h-5 text-primary mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
} 