'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Фоновое изображение */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        suppressHydrationWarning
      >
        {/* Темный оверлей */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Контент */}
      <Container className="relative z-10">
        <div 
          className="text-center max-w-4xl mx-auto"
          suppressHydrationWarning
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Construyendo su visión,<br />
            superando las expectativas
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 mb-8"
          >
            Servicios de construcción de alta calidad para residencial y proyectos comerciales
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            suppressHydrationWarning
          >
            <Link 
              href="/proyectos"
              className="inline-flex items-center justify-center min-w-[200px] px-8 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
              suppressHydrationWarning
            >
              Ver Proyectos
            </Link>
            <Link 
              href="/contacto"
              className="inline-flex items-center justify-center min-w-[200px] px-8 py-3 text-base font-medium text-white bg-black/20 hover:bg-black/30 rounded-lg transition-colors"
              suppressHydrationWarning
            >
              Solicitar Presupuesto
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
} 