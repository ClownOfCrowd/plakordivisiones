import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import OptimizedImage from './OptimizedImage';

interface ProjectCardProps {
  project: {
    id: number;
    attributes: {
      title: string;
      description: string;
      images: {
        data: Array<{
          id: number;
          attributes: {
            url: string;
            formats: {
              thumbnail: {
                url: string;
              };
            };
          };
        }>;
      };
    };
  };
  onClick: () => void;
}

/**
 * Project card component for portfolio
 * Features:
 * - Optimized image loading
 * - Hover animations
 * - Category badges
 */
const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const thumbnail = project.attributes.images?.data[0]?.attributes?.formats?.thumbnail?.url;
  const fullImage = project.attributes.images?.data[0]?.attributes?.url;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="group relative bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <OptimizedImage
          src={thumbnail}
          alt={project.attributes.title}
          className="w-full h-full"
          width={400}
          height={300}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{project.attributes.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {project.attributes.description}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 