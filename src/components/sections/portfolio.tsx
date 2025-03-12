'use client';

import { Container } from "@/components/ui/container";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useCallback } from "react";
import { useDeviceOptimization } from "@/hooks/useDeviceOptimization";
import { ProjectModal } from "@/components/ui/project-modal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Интерфейс для проекта
interface Project {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  tags: string[];
  images: string[];
  challenge?: string;
  solution?: string;
  features?: string[];
}

// Данные проектов
const projects: Project[] = [
  {
    id: "reforma-integral-1",
    title: "Reforma Integral de Vivienda",
    location: "Tarragona",
    date: "2023",
    description: "Renovación completa de una vivienda de 120m² incluyendo tabiquería, instalaciones y acabados.",
    tags: ["Reforma", "Pladur", "Instalaciones"],
    images: [
      "/images/projects/reforma-1/main.jpg",
      "/images/projects/reforma-1/detail-1.jpg",
      "/images/projects/reforma-1/detail-2.jpg"
    ],
    challenge: "El principal desafío fue la redistribución completa del espacio para crear un ambiente más abierto y luminoso, manteniendo la estructura original del edificio.",
    solution: "Utilizamos sistemas de construcción en seco para crear nuevas divisiones, optimizamos las instalaciones y aplicamos acabados modernos que maximizan la luz natural.",
    features: [
      "Nueva distribución de espacios",
      "Instalación eléctrica renovada",
      "Sistema de climatización eficiente",
      "Acabados de alta calidad"
    ]
  },
  {
    id: "local-comercial-1",
    title: "Acondicionamiento de Local Comercial",
    location: "Reus",
    date: "2023",
    description: "Transformación de un local comercial de 80m² para una tienda de moda.",
    tags: ["Comercial", "Pladur", "Iluminación"],
    images: [
      "/images/projects/local-1/main.jpg",
      "/images/projects/local-1/detail-1.jpg",
      "/images/projects/local-1/detail-2.jpg"
    ],
    challenge: "Crear un espacio comercial atractivo y funcional con un presupuesto ajustado y un plazo de entrega corto.",
    solution: "Implementamos soluciones modulares y versátiles que permitieron una ejecución rápida sin comprometer la calidad y el diseño.",
    features: [
      "Iluminación LED eficiente",
      "Sistemas de exposición modulares",
      "Acabados duraderos",
      "Optimización del espacio"
    ]
  }
];

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { imageSettings, getHoverAnimationSettings, getScrollAnimationSettings } = useDeviceOptimization();

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <section className="py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-6">
            Nuestros Proyectos
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            Descubra algunos de nuestros trabajos más destacados en reformas y construcción.
            Cada proyecto es único y refleja nuestro compromiso con la calidad y la excelencia.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              {...getScrollAnimationSettings(index)}
              {...getHoverAnimationSettings()}
              onClick={() => handleProjectClick(project)}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  sizes={imageSettings.sizes}
                  className="object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-primary">
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>{project.location}</span>
                  <span>{project.date}</span>
                </div>

                <p className="text-secondary mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link href="/proyectos">
            <Button variant="cta" size="lg">
              Ver Más Proyectos
            </Button>
          </Link>
        </motion.div>

        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={handleCloseModal}
        />
      </Container>
    </section>
  );
} 