import Image from 'next/image';
import { motion } from 'framer-motion';

type ProjectCardProps = {
  project: {
    id: string;
    title: string;
    category: string[];
    location: string;
    date: string;
    description: string;
    images: string[];
    tags: string[];
  };
  onClick: () => void;
};

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-64">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-white mb-2">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-white/20 text-white px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 2 && (
              <span className="text-white/80 text-sm">
                +{project.tags.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-secondary mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex justify-between text-sm text-secondary">
          <span>{project.location}</span>
          <span>{project.date}</span>
        </div>
      </div>
    </motion.div>
  );
} 