'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { servicesData } from '@/data/services';
import { ServiceModal } from '@/components/ui/service-modal';
import { useDeviceOptimization } from '@/hooks/useDeviceOptimization';

export function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);
  
  const { getHoverAnimationSettings } = useDeviceOptimization();
  const hoverAnimation = getHoverAnimationSettings();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {servicesData.map((service) => (
        <motion.article
          key={service.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
          whileHover={{
            y: -5,
            transition: { duration: 0.2 }
          }}
          onClick={() => setSelectedService(service)}
          className="group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 transform-gpu"
        >
          <div className="flex items-center gap-4 mb-4">
            {service.icon && (
              <service.icon className="w-8 h-8 text-primary transform-gpu transition-transform duration-300 group-hover:scale-110" />
            )}
            <h3 className="text-xl font-semibold text-primary">{service.title}</h3>
          </div>
          <p className="text-secondary mb-4">{service.shortDescription}</p>
          <div className="flex flex-wrap gap-2">
            {service.features.slice(0, 3).map((feature) => (
              <span
                key={`${service.id}-${feature}`}
                className="text-sm text-primary/80 bg-primary/5 px-3 py-1 rounded-full transition-colors duration-300 group-hover:bg-primary/10"
              >
                {feature}
              </span>
            ))}
          </div>
        </motion.article>
      ))}

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
} 