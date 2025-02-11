import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import LazyImage from './LazyImage';

// ... остальные импорты и интерфейсы ...

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  // ... существующий код ...

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ... остальной код ... */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {project.attributes.images.data.map((image) => (
            <LazyImage
              key={image.id}
              src={image.attributes.url}
              alt={project.attributes.title}
              className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleImageClick(image.attributes.url)}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal; 