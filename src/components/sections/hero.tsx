'use client';

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Фоновое изображение */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Темный оверлей */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Контент */}
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-white max-w-4xl mx-auto px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Construyendo su visión,<br />
            superando las expectativas
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Servicios de construcción de alta calidad para residencial y proyectos comerciales
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/proyectos">
              <Button 
                variant="outline" 
                size="lg"
                className="text-white border-white hover:bg-white hover:text-primary min-w-[200px]"
              >
                Ver proyectos
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
} 