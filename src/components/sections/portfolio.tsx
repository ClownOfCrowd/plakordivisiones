'use client';

import { Container } from "@/components/ui/container";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import { useDeviceOptimization } from "@/hooks/useDeviceOptimization";

// Оптимизированные варианты анимаций
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      ease: "easeOut",
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.5,
    }
  }
};

// Временные данные для проектов
const projects = [
  {
    id: 1,
    title: "Reforma Integral Apartamento",
    category: "reformas",
    image: "/portfolio/project1.jpg",
    description: "Reforma completa de vivienda en Barcelona"
  },
  {
    id: 2,
    title: "Instalación Pladur Oficinas",
    category: "pladur",
    image: "/portfolio/project2.jpg",
    description: "Montaje de tabiques y techos en oficina comercial"
  },
  // Добавим еще проекты позже
];

const categories = [
  { id: "all", label: "Todos" },
  { id: "reformas", label: "Reformas" },
  { id: "pladur", label: "Pladur" },
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const { 
    animationSettings,
    imageSettings,
    getHoverAnimationSettings,
    getScrollAnimationSettings
  } = useDeviceOptimization();

  const hoverAnimation = getHoverAnimationSettings();

  const filteredProjects = projects.filter(
    (project) => activeCategory === "all" || project.category === activeCategory
  );

  return (
    <section className="py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={animationSettings.transition}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Nuestros Proyectos Destacados
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            Explora nuestra selección de proyectos más recientes y descubre cómo 
            transformamos espacios en toda la provincia de Tarragona.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-secondary hover:bg-gray-200"
              }`}
              {...hoverAnimation}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                {...getScrollAnimationSettings(index)}
                {...hoverAnimation}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transform-gpu transition-transform duration-300 group-hover:scale-105"
                    quality={imageSettings.quality}
                    loading={imageSettings.loading}
                    sizes={imageSettings.sizes}
                    onLoadingComplete={() => setIsLoading(false)}
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
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {!isLoading && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={animationSettings.transition}
            className="text-center py-12"
          >
            <p className="text-lg text-secondary">
              No hay proyectos disponibles en esta categoría.
            </p>
          </motion.div>
        )}
      </Container>
    </section>
  );
} 