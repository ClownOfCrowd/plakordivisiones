import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Modern Office Complex',
    description: 'A state-of-the-art office building with sustainable design',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
    category: 'Commercial',
  },
  {
    id: 2,
    title: 'Luxury Residence',
    description: 'Custom-built luxury home with premium finishes',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
    category: 'Residential',
  },
  {
    id: 3,
    title: 'Industrial Facility',
    description: 'Modern industrial complex with advanced infrastructure',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80',
    category: 'Industrial',
  },
  {
    id: 4,
    title: 'Shopping Center',
    description: 'Multi-level retail space with contemporary design',
    image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&q=80',
    category: 'Commercial',
  },
  {
    id: 5,
    title: 'Apartments',
    description: 'Modern residential complex with amenities',
    image: 'https://i.postimg.cc/SNcyxgxb/seungcheol-baek-f-Hw-Sf-Nzr98-unsplash.jpg',
    category: 'Residential',
  },
  {
    id: 6,
    title: 'Educational Campus',
    description: 'State-of-the-art educational facility',
    image: 'https://images.unsplash.com/photo-1562886877-f12251816e01?auto=format&fit=crop&q=80',
    category: 'Institutional',
  },
];

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="py-20 overflow-x-hidden"> {/* Добавлен overflow-x-hidden */}
      <section ref={ref} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Nuestros Proyectos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore nuestra colección de proyectos completados y vea cómo transformamos espacios
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="group relative bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-center px-4">
                    Click para ver más
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
                <span className="inline-block mt-3 text-sm bg-cyan-700 text-white px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Лайтбокс с кнопкой закрытия */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Кнопка закрытия с адаптивным позиционированием */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 lg:top-6 lg:right-6 p-2 bg-gray-800 bg-opacity-75 rounded-full hover:bg-opacity-100 transition-all duration-300 z-50"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-auto object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                  <p className="text-gray-600">{selectedProject.description}</p>
                  <span className="inline-block mt-3 text-sm bg-cyan-700 text-white px-3 py-1 rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Projects;