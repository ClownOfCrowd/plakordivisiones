'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MobileMenu } from "./mobile-menu";
import { motion } from "framer-motion";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold text-primary tracking-tight">
              Plakor Divisiones
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/servicios" 
              className="text-secondary hover:text-primary transition-colors"
            >
              Servicios
            </Link>
            <Link 
              href="/proyectos"
              className="text-secondary hover:text-primary transition-colors"
            >
              Proyectos
            </Link>
            <Link 
              href="/resenas"
              className="text-secondary hover:text-primary transition-colors"
            >
              Reseñas
            </Link>
            <Link 
              href="/faq"
              className="text-secondary hover:text-primary transition-colors"
            >
              FAQ
            </Link>
            <Link 
              href="/contacto"
              className="text-secondary hover:text-primary transition-colors"
            >
              Contacto
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button 
              variant="cta" 
              size="lg" 
              className="hidden sm:inline-flex"
              onClick={() => window.location.href = '/contacto'}
            >
              Solicitar llamada
            </Button>
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors relative z-50"
              aria-label="Abrir menú"
            >
              <div className="flex flex-col gap-1.5 w-6">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-primary rounded-full transform-gpu origin-center"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-primary rounded-full transform-gpu"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-primary rounded-full transform-gpu origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </header>
  );
} 