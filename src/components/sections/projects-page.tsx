'use client';

import { Container } from '@/components/ui/container';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useCallback, useMemo } from 'react';
import { ProjectModal } from '@/components/ui/project-modal';
import { useDeviceOptimization } from '@/hooks/useDeviceOptimization';
import { memo } from 'react';

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
  images: string[];
  challenge: string;
  solution: string;
  features: string[];
  date: string;
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
    },
    images: [
      '/images/projects/reforma-1.jpg',
      '/images/projects/reforma-2.jpg',
      '/images/projects/reforma-3.jpg'
    ],
    challenge: 'Renovar manteniendo la esencia histórica',
    solution: 'Combinación de técnicas tradicionales y modernas',
    features: ['Restauración de elementos originales', 'Modernización de instalaciones', 'Mejora de accesibilidad'],
    date: 'marzo 2024'
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
    },
    images: [
      '/images/projects/pladur-1.jpg',
      '/images/projects/pladur-2.jpg',
      '/images/projects/pladur-3.jpg'
    ],
    challenge: 'Optimizar el espacio de exposición',
    solution: 'Diseño modular y flexible',
    features: ['Iluminación LED', 'Mobiliario a medida', 'Zona de pruebas'],
    date: 'febrero 2024'
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
    },
    images: [
      '/images/projects/techos-1.jpg',
      '/images/projects/techos-2.jpg',
      '/images/projects/techos-3.jpg'
    ],
    challenge: 'Crear un ambiente sanitario acogedor',
    solution: 'Diseño centrado en el paciente',
    features: ['Salas de espera confortables', 'Consultas insonorizadas', 'Iluminación natural'],
    date: 'enero 2024'
  }
];

// Оптимизированный компонент карточки проекта
const ProjectCard = memo(({ 
  project, 
  index, 
  onSelect, 
  animationSettings,
  imageSettings,
  hoverAnimation 
}: { 
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
  animationSettings: any;
  imageSettings: any;
  hoverAnimation: any;
}) => (
  <motion.article
    {...hoverAnimation}
    onClick={() => onSelect(project)}
    className="group cursor-pointer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
      <Image
        src={project.imageUrl}
        alt={project.seoDescription}
        fill
        className="object-cover transform-gpu transition-transform duration-300 group-hover:scale-105"
        quality={imageSettings.quality}
        loading={imageSettings.loading}
        sizes={imageSettings.sizes}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      >
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-semibold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-white/90 text-sm line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags.slice(0, 3).map(tag => (
              <span 
                key={tag}
                className="px-2 py-1 bg-white/10 text-white/90 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.article>
));

ProjectCard.displayName = 'ProjectCard';

export function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const { 
    animationSettings,
    imageSettings,
    getHoverAnimationSettings
  } = useDeviceOptimization();

  const hoverAnimation = useMemo(() => getHoverAnimationSettings(), [getHoverAnimationSettings]);

  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  return (
    <section className="pt-32 pb-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={animationSettings.transition}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Nuestros Proyectos
            </h1>
            <p className="text-lg text-secondary max-w-3xl mx-auto">
              Descubre nuestra selección de proyectos más recientes y cómo 
              transformamos espacios en toda la provincia de Tarragona.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onSelect={handleSelectProject}
                animationSettings={animationSettings}
                imageSettings={imageSettings}
                hoverAnimation={hoverAnimation}
              />
            ))}
          </div>
        </motion.div>
      </Container>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
} 