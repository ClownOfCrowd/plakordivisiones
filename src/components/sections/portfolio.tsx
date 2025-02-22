'use client';

import { Container } from "@/components/ui/container";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import { useDesktopOptimization } from '@/hooks/useDesktopOptimization';

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
  const { getAnimationSettings, getTransformSettings } = useDesktopOptimization();
  const animationSettings = getAnimationSettings();
  const transformSettings = getTransformSettings();

  // Оптимизированный обработчик для смены категории
  const handleCategoryChange = useCallback((categoryId: string) => {
    setIsLoading(true);
    setActiveCategory(categoryId);
  }, []);

  // Фильтрация проектов с мемоизацией
  const filteredProjects = useCallback(() => {
    return activeCategory === "all" 
      ? projects 
      : projects.filter(project => project.category === activeCategory);
  }, [activeCategory]);

  // Эффект для анимации сетки при смене категории
  useEffect(() => {
    if (gridRef.current) {
      const grid = gridRef.current;
      grid.style.opacity = '0';
      grid.style.transition = 'opacity 0.3s ease-out';
      
      setTimeout(() => {
        grid.style.opacity = '1';
        setIsLoading(false);
      }, 300);
    }
  }, [activeCategory]);

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          style={{
            willChange: 'opacity, transform',
            perspective: '1000px',
          }}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Nuestros Proyectos
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Descubre algunos de nuestros trabajos más destacados
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex justify-center gap-4 mb-12"
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white text-secondary hover:bg-primary/10"
                }`}
                style={{
                  transform: activeCategory === category.id ? 'translateZ(10px)' : 'translateZ(0)',
                  transition: 'transform 0.3s ease-out',
                }}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          <div 
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{
              willChange: 'opacity',
            }}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full flex justify-center py-12"
                >
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </motion.div>
              ) : (
                filteredProjects().map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group cursor-pointer"
                    style={{
                      ...transformSettings,
                      willChange: 'transform',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div className="relative h-64 overflow-hidden rounded-lg shadow-lg">
                      <div 
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        style={{
                          willChange: 'opacity',
                          transform: 'translateZ(1px)',
                        }}
                      >
                        <div 
                          className="flex flex-col items-center justify-center h-full text-white p-6"
                          style={{
                            transform: 'translateZ(20px)',
                          }}
                        >
                          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                          <p className="text-sm text-center">{project.description}</p>
                        </div>
                      </div>
                      <div className="relative h-full transform-gpu transition-transform duration-300 group-hover:scale-105">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={85}
                          style={{
                            willChange: 'transform',
                            backfaceVisibility: 'hidden',
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </Container>
    </section>
  );
} 