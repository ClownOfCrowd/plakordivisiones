'use client';

import { Container } from "@/components/ui/container";
import { motion, useReducedMotion } from "framer-motion";
import { History, Award, Users, Layout } from "lucide-react";

const features = [
  {
    title: "+15 Años de Experiencia",
    description: "Trayectoria probada en el sector de la construcción y reformas",
    icon: History,
    gradient: "from-cyan-600 to-cyan-800"
  },
  {
    title: "Calidad Garantizada",
    description: "Materiales de primera calidad y acabados profesionales",
    icon: Award,
    gradient: "from-cyan-700 to-cyan-900"
  },
  {
    title: "Equipo Profesional",
    description: "Personal cualificado y comprometido con cada proyecto",
    icon: Users,
    gradient: "from-cyan-800 to-cyan-950"
  },
  {
    title: "Servicio Integral",
    description: "Gestión completa de su proyecto de principio a fin",
    icon: Layout,
    gradient: "from-cyan-700 to-cyan-900"
  }
];

// Анимации с учетом производительности
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1
    }
  }
};

export function WhyUs() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Декоративный фоновый элемент */}
      <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />

      <Container className="relative">
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary-800 bg-clip-text text-transparent mb-6">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-lg text-secondary/80 max-w-2xl mx-auto">
              Nuestra experiencia y compromiso nos distinguen en el sector
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative bg-white rounded-2xl p-6 h-full border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 will-change-transform">
                  {/* Градиентный фон при наведении */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                  {/* Иконка с эффектами */}
                  <div className="relative mb-6 transform-gpu">
                    <div className="w-16 h-16 mx-auto relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-800 opacity-10 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-800 opacity-10 rounded-2xl transform -rotate-6 group-hover:-rotate-12 transition-transform duration-300" />
                      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-800 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <feature.icon className="w-8 h-8 text-white transform group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Контент с эффектами */}
                  <div className="relative">
                    <h3 className="text-xl font-semibold text-primary mb-2 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-secondary text-center">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
} 