'use client';

import { memo, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

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

// Мемоизированная кнопка закрытия
const CloseButton = memo(function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className={cn(
        'absolute right-3 top-3 z-10',
        'w-8 h-8',
        'rounded-lg',
        'bg-white/90 hover:bg-white',
        'flex items-center justify-center',
        'shadow-sm transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-primary/20'
      )}
      aria-label="Cerrar"
    >
      <X className="w-5 h-5 text-gray-600" />
    </button>
  );
});

// Мемоизированный компонент особенностей
const FeatureList = memo(function FeatureList({ features }: { features: string[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg"
        >
          <svg
            className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
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
          <span className="text-secondary">{feature}</span>
        </div>
      ))}
    </div>
  );
});

// Мемоизированный компонент преимуществ
const BenefitList = memo(function BenefitList({ benefits }: { benefits: string[] }) {
  return (
    <div className="grid gap-4">
      {benefits.map((benefit, index) => (
        <div
          key={index}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
        </div>
      ))}
    </div>
  );
});

// Мемоизированный компонент процесса
const ProcessList = memo(function ProcessList({ 
  process 
}: { 
  process: { title: string; description: string; }[] 
}) {
  return (
    <div className="space-y-4">
      {process.map((step, index) => (
        <div
          key={index}
          className="flex gap-4"
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
        </div>
      ))}
    </div>
  );
});

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/40 overflow-y-auto pt-20"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-4xl shadow-xl relative my-4"
        onClick={e => e.stopPropagation()}
      >
        <CloseButton onClose={onClose} />

        <div className="relative h-[300px]">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              {service.title}
            </h2>
            <p className="text-white/90 text-lg">
              {service.description}
            </p>
          </div>
        </div>

        <div className="p-6 space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">
              Características principales
            </h3>
            <FeatureList features={service.features} />
          </div>

          {service.longDescription && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">
                Descripción detallada
              </h3>
              <p className="text-secondary whitespace-pre-line">
                {service.longDescription}
              </p>
            </div>
          )}

          {service.benefits && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">
                Beneficios
              </h3>
              <BenefitList benefits={service.benefits} />
            </div>
          )}

          {service.process && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">
                Proceso de trabajo
              </h3>
              <ProcessList process={service.process} />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/contacto" className="w-full sm:flex-1">
              <Button variant="cta" size="lg" className="w-full">
                Solicitar presupuesto
              </Button>
            </Link>
            <Link href="/proyectos" className="w-full sm:flex-1">
              <Button variant="outline" size="lg" className="w-full">
                Ver proyectos similares
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 