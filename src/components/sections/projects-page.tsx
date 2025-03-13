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
    description: 'Transformación completa de este emblemático edificio histórico, combinando elegancia clásica con funcionalidad moderna.',
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
    challenge: 'El principal desafío fue renovar un edificio histórico protegido manteniendo su esencia y carácter original, mientras se incorporaban instalaciones modernas y se mejoraba la funcionalidad de los espacios. La estructura presentaba problemas de humedad y deterioro en elementos ornamentales que requerían una restauración meticulosa.',
    solution: 'Desarrollamos un enfoque que combinó técnicas tradicionales de restauración con soluciones modernas. Trabajamos con artesanos especializados para recuperar molduras, techos y elementos decorativos originales. Implementamos sistemas de climatización e iluminación discretos que respetan la estética histórica pero ofrecen el confort actual. Cada material fue cuidadosamente seleccionado para complementar el carácter del edificio.',
    features: [
      'Restauración completa de fachada y elementos arquitectónicos originales',
      'Modernización de instalaciones eléctricas, agua y climatización',
      'Mejora de accesibilidad con soluciones integradas en el diseño histórico',
      'Iluminación LED personalizada que realza los elementos decorativos',
      'Restauración de suelos de mosaico hidráulico original'
    ],
    date: 'marzo 2024'
  },
  {
    id: 2,
    title: 'Reforma Tienda de Estufas y Chimeneas',
    description: 'Rediseño integral de espacio comercial especializado, creando una experiencia inmersiva para los clientes con zonas de exposición y demostración.',
    seoDescription: 'Reforma integral de local comercial en Reus: transformación de tienda de estufas y chimeneas, optimización del espacio de exposición y mejora de la experiencia del cliente.',
    imageUrl: '/images/projects/pladur-1.jpg',
    location: 'Reus',
    tags: ['comercial', 'reforma', 'pladur'],
    details: {
      area: '120m²',
      services: ['Reforma integral', 'Instalación de pladur', 'Acabados comerciales']
    },
    images: [
      '/images/projects/pladur-1.jpg',
      '/images/projects/pladur-2.jpg',
      '/images/projects/pladur-3.jpg'
    ],
    challenge: 'El espacio original era un local rectangular sin personalidad, con techos bajos y poca iluminación natural. El reto consistía en crear un showroom atractivo que permitiera exponer diferentes modelos de estufas y chimeneas en funcionamiento, cumpliendo con todas las normativas de seguridad y ventilación, mientras se maximizaba el limitado espacio disponible.',
    solution: 'Diseñamos un layout modular con diferentes ambientes que simulan espacios domésticos, permitiendo al cliente visualizar cómo quedarían los productos en su hogar. Utilizamos pladur para crear separaciones parciales y nichos de exposición, jugando con diferentes alturas de techo para generar dinamismo. Instalamos un sistema de ventilación especializado que permite el funcionamiento seguro de varios modelos simultáneamente.',
    features: [
      'Iluminación LED direccional para destacar cada producto',
      'Mobiliario a medida con materiales ignífugos',
      'Zona central de demostración con chimeneas en funcionamiento',
      'Sistema de ventilación de alta capacidad oculto en el diseño',
      'Pantallas interactivas con información técnica de cada modelo'
    ],
    date: 'febrero 2024'
  },
  {
    id: 3,
    title: 'Centro Médico en Tarragona',
    description: 'Construcción de moderno centro de especialidades médicas con diseño centrado en el bienestar del paciente y eficiencia operativa para el personal sanitario.',
    seoDescription: 'Construcción de nuevo centro médico en Tarragona: diseño moderno y funcional, optimización de espacios sanitarios y cumplimiento de normativas específicas del sector.',
    imageUrl: '/images/projects/techos-1.jpg',
    location: 'Tarragona',
    tags: ['comercial', 'obra nueva', 'sanitario'],
    details: {
      area: '320m²',
      services: ['Obra nueva', 'Instalaciones sanitarias', 'Acabados profesionales']
    },
    images: [
      '/images/projects/techos-1.jpg',
      '/images/projects/techos-2.jpg',
      '/images/projects/techos-3.jpg'
    ],
    challenge: 'El proyecto requería crear un centro médico multidisciplinar en un espacio diáfano, dividiendo el área en consultas especializadas, zonas comunes y áreas administrativas. Era fundamental conseguir un equilibrio entre la privacidad necesaria en un entorno sanitario y la sensación de amplitud y bienestar. Además, debíamos cumplir con estrictas normativas sanitarias mientras creábamos un ambiente que redujera la ansiedad típica de los entornos médicos.',
    solution: 'Desarrollamos un diseño que prioriza la luz natural y utiliza una paleta de colores suaves y materiales cálidos para crear un ambiente acogedor. Las consultas fueron diseñadas con aislamiento acústico reforzado y sistemas de ventilación independientes. Utilizamos materiales antibacterianos y de fácil limpieza en todas las superficies, e implementamos un sistema de circulación que separa claramente los flujos de pacientes y personal médico para optimizar la operativa diaria.',
    features: [
      'Salas de espera con luz natural y vegetación interior',
      'Consultas completamente insonorizadas con sistemas audiovisuales integrados',
      'Sistema de climatización con filtración HEPA',
      'Señalética intuitiva con códigos de color por especialidad',
      'Mobiliario ergonómico diseñado específicamente para entornos sanitarios',
      'Iluminación regulable que simula la luz natural'
    ],
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
    imageSettings,
    getHoverAnimationSettings,
    getScrollAnimationSettings
  } = useDeviceOptimization();

  const hoverAnimation = useMemo(() => getHoverAnimationSettings(), [getHoverAnimationSettings]);

  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  return (
    <section className="pt-32 pb-20">
      <Container>
        <motion.div
          {...getScrollAnimationSettings(0)}
        >
          <motion.div
            {...getScrollAnimationSettings(1)}
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
                animationSettings={getScrollAnimationSettings(index + 2)}
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