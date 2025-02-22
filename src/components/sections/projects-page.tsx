'use client';

import { Container } from '@/components/ui/container';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useDesktopOptimization } from '@/hooks/useDesktopOptimization';
import Link from 'next/link';

// Оптимизированные анимации
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.05,
      ease: 'easeOut'
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.5
    }
  }
};

// Интерфейс для проекта
interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  tags: string[];
  details: {
    area?: string;
    services: string[];
  };
  seoDescription: string;
}

// Данные проектов
const projects: Project[] = [
  {
    id: 1,
    title: 'Reforma integral Casino de Reus',
    description: 'Reforma integral del casino de Reus, combinando historia y modernidad en un espacio exclusivo',
    seoDescription: 'Proyecto emblemático de reforma integral del Casino de Reus: restauración histórica y modernización de espacios interiores, preservando el patrimonio arquitectónico mientras se incorporan elementos contemporáneos.',
    imageUrl: '/images/projects/reforma-1.jpg',
    location: 'Reus',
    tags: ['comercial', 'reforma integral', 'diseño interior'],
    details: {
      area: '450m²',
      services: ['Restauración histórica', 'Modernización', 'Acabados exclusivos']
    }
  },
  {
    id: 2,
    title: 'Reforma Tienda de Estufas y Chimeneas',
    description: 'Reforma de tienda de estufas y chimeneas en c. Mercè Rodoreda de Reus. Transformación completa del espacio comercial.',
    seoDescription: 'Reforma integral de local comercial en Reus: transformación de tienda de estufas y chimeneas, optimización del espacio de exposición y mejora de la experiencia del cliente.',
    imageUrl: '/images/projects/pladur-1.jpg',
    location: 'Reus',
    tags: ['comercial', 'reforma', 'pladur'],
    details: {
      services: ['Reforma integral', 'Instalación de pladur', 'Acabados comerciales']
    }
  },
  {
    id: 3,
    title: 'Centro Médico en Tarragona',
    description: 'Obra nueva centro médico en Tarragona, diseñado para ofrecer un ambiente profesional y acogedor.',
    seoDescription: 'Construcción de nuevo centro médico en Tarragona: diseño moderno y funcional, optimización de espacios sanitarios y cumplimiento de normativas específicas del sector.',
    imageUrl: '/images/projects/techos-1.jpg',
    location: 'Tarragona',
    tags: ['comercial', 'obra nueva', 'sanitario'],
    details: {
      services: ['Obra nueva', 'Instalaciones sanitarias', 'Acabados profesionales']
    }
  }
];

export function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { getAnimationSettings, getTransformSettings } = useDesktopOptimization();
  const animationSettings = getAnimationSettings();
  const transformSettings = getTransformSettings();
  
  // Используем useRef для кэширования обработчиков событий
  const intersectionObserver = useRef<IntersectionObserver | null>(null);
  
  // Оптимизированный обработчик для выбора проекта
  const handleProjectSelect = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <section className="pt-32 pb-20">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{
              willChange: 'opacity, transform',
              perspective: '1000px',
            }}
          >
            <motion.div
              variants={itemVariants}
              className="text-center mb-16"
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Nuestros Proyectos
              </h1>
              <p className="text-lg text-secondary max-w-3xl mx-auto">
                Descubre nuestra selección de proyectos de reformas, 
                instalaciones de pladur y trabajos especializados en Tarragona. 
                Más de 15 años de experiencia garantizando calidad y profesionalidad 
                en cada proyecto.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="group cursor-pointer"
                  onClick={() => handleProjectSelect(project)}
                  style={{
                    ...transformSettings,
                    willChange: 'transform',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                    <Image
                      src={project.imageUrl}
                      alt={project.seoDescription}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transform-gpu transition-transform duration-300 group-hover:scale-105"
                      loading={index < 6 ? "eager" : "lazy"}
                      quality={85}
                      style={{
                        willChange: 'transform',
                        backfaceVisibility: 'hidden',
                      }}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-hidden="true"
                      style={{
                        willChange: 'opacity',
                        transform: 'translateZ(1px)',
                      }}
                    >
                      <div 
                        className="absolute bottom-0 left-0 right-0 p-6"
                        style={{
                          transform: 'translateZ(20px)',
                        }}
                      >
                        <h3 className="text-white text-xl font-semibold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-white/90 text-sm mb-2">
                          {project.location}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map(tag => (
                            <span 
                              key={tag}
                              className="text-xs bg-white/20 px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              className="mt-16 text-center"
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
            >
              <div 
                className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto"
                style={{
                  transform: 'translateZ(1px)',
                }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  ¿Tienes un proyecto en mente?
                </h2>
                <p className="text-lg text-secondary mb-8">
                  Cuéntanos tu idea y te ayudaremos a hacerla realidad. Nuestro equipo 
                  está listo para asesorarte y ofrecerte la mejor solución.
                </p>
                <Link href="/contacto">
                  <Button 
                    variant="cta" 
                    size="lg" 
                    className="min-w-[200px]"
                    style={{
                      transform: 'translateZ(20px)',
                    }}
                  >
                    Contactar ahora
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
} 