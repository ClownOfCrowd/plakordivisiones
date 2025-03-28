'use client';

import { Container } from '@/components/ui/container';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { ProjectModal } from '@/components/ui/project-modal';
import { useDeviceOptimization } from '@/hooks/useDeviceOptimization';
import { memo } from 'react';
import { strapiApi, type Project as StrapiProject } from '@/lib/strapi';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

// Интерфейс для проекта в UI
interface ProjectUI {
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

// Функция для преобразования проекта из Strapi в формат UI
function mapStrapiProjectToUI(project: StrapiProject): ProjectUI {
  console.log('Project from Strapi:', project);
  
  if (!project) {
    console.error('Invalid project data:', project);
    return {
      id: 0,
      title: 'Error: Invalid Project',
      description: 'This project data is invalid',
      seoDescription: 'Invalid project data',
      imageUrl: '/images/placeholder.jpg',
      location: 'Unknown',
      tags: [],
      details: {
        area: '',
        services: []
      },
      images: ['/images/placeholder.jpg'],
      challenge: '',
      solution: '',
      features: [],
      date: ''
    };
  }
  
  // Получаем базовый URL для изображений
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://www.plakordivisiones.es';
  
  // Функция для формирования полного URL изображения
  const getFullImageUrl = (url: string) => {
    if (!url) return '/images/placeholder.jpg';
    if (url.startsWith('http')) return url;
    return `${baseUrl}${url}`;
  };
  
  // Получаем URL первого изображения или используем заглушку
  const firstImageUrl = project.images?.[0]?.url;
  const imageUrl = firstImageUrl ? getFullImageUrl(firstImageUrl) : '/images/placeholder.jpg';
  
  // Получаем URL всех изображений
  const imageUrls = project.images?.map(img => getFullImageUrl(img.url)) || ['/images/placeholder.jpg'];
  
  console.log('Image URL:', imageUrl);
  console.log('All image URLs:', imageUrls);
  
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    seoDescription: project.seoDescription || project.description,
    imageUrl: imageUrl,
    location: project.location,
    tags: project.tags || [],
    details: {
      area: project.area,
      services: project.services || []
    },
    images: imageUrls,
    challenge: project.challenge || '',
    solution: project.solution || '',
    features: project.features || [],
    date: project.completionDate
  };
}

// Оптимизированный компонент карточки проекта
const ProjectCard = memo(({ 
  project, 
  index, 
  onSelect, 
  animationSettings,
  imageSettings,
  hoverAnimation 
}: { 
  project: ProjectUI;
  index: number;
  onSelect: (project: ProjectUI) => void;
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
  const [selectedProject, setSelectedProject] = useState<ProjectUI | null>(null);
  const [projects, setProjects] = useState<ProjectUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const { 
    imageSettings,
    getHoverAnimationSettings,
    getScrollAnimationSettings
  } = useDeviceOptimization();

  const hoverAnimation = useMemo(() => getHoverAnimationSettings(), [getHoverAnimationSettings]);

  const handleSelectProject = useCallback((project: ProjectUI) => {
    setSelectedProject(project);
  }, []);

  // Загрузка проектов из Strapi
  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        
        // Прямой запрос к API для отладки
        console.log('Making direct API request for debugging...');
        try {
          const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://www.plakordivisiones.es'}/api/projects?populate=*`;
          console.log('Direct API URL:', apiUrl);
          const directResponse = await fetch(apiUrl);
          const directResponseText = await directResponse.text();
          console.log('Direct API response status:', directResponse.status);
          console.log('Direct API raw response:', directResponseText);
          
          try {
            const directData = JSON.parse(directResponseText);
            console.log('Direct API parsed data:', directData);
          } catch (parseError) {
            console.error('Error parsing direct API response:', parseError);
          }
        } catch (directError) {
          console.error('Error making direct API request:', directError);
        }
        
        const response = await strapiApi.getProjects();
        
        console.log('Full API response:', response);
        
        if (response.data && Array.isArray(response.data)) {
          console.log('Projects data array:', response.data);
          
          // Отладочная информация о структуре данных
          response.data.forEach((project: StrapiProject, index: number) => {
            console.log(`Project ${index}:`, project);
            console.log(`Project ${index} has title:`, !!project.title);
            console.log(`Project ${index} has images:`, !!project.images);
          });
          
          // Проверяем каждый проект перед маппингом
          const validProjects = response.data.filter((project: StrapiProject) => {
            const isValid = project && typeof project === 'object' && project.title && project.id;
            console.log(`Project ${project?.id} is valid:`, isValid);
            return isValid;
          });
          
          console.log('Valid projects count:', validProjects.length);
          
          if (validProjects.length === 0) {
            console.warn('No valid projects found in the response');
            setProjects([]);
          } else {
            const mappedProjects = validProjects.map(mapStrapiProjectToUI);
            setProjects(mappedProjects);
          }
          
          // Если проектов нет, но запрос успешный - показываем пустой массив
          if (response.data.length === 0) {
            console.log('No projects found in Strapi');
          }
        } else {
          console.error('Unexpected API response format:', response);
          setError(true);
          toast.error('Error al cargar los proyectos.');
        }
      } catch (err) {
        console.error('Error loading projects:', err);
        setError(true);
        toast.error('Error al cargar los proyectos.');
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
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

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <span className="ml-3 text-lg text-secondary">Cargando proyectos...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center items-center py-20">
              <p className="text-xl text-red-500 mb-4">Error al cargar los proyectos</p>
              <p className="text-base text-secondary/80">Por favor, intenta recargar la página o contacta con nosotros si el problema persiste.</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-col justify-center items-center py-20">
              <p className="text-xl text-secondary mb-4">No hay proyectos disponibles actualmente.</p>
              <p className="text-base text-secondary/80">Por favor, vuelve más tarde o contacta con nosotros para más información.</p>
            </div>
          ) : (
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
          )}
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