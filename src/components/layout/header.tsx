'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { MobileMenu } from "./mobile-menu";
import { motion } from "framer-motion";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200" suppressHydrationWarning>
        <nav className="container mx-auto px-4 h-20" suppressHydrationWarning>
          <div className="flex items-center justify-between h-full" suppressHydrationWarning>
            <Link 
              href="/" 
              className="relative flex items-center"
              suppressHydrationWarning
            >
              <span className="text-xl md:text-2xl font-bold text-primary tracking-tight">
                Plakor Divisiones
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6" suppressHydrationWarning>
              <Link 
                href="/servicios"
                className="text-secondary hover:text-primary transition-colors"
                suppressHydrationWarning
              >
                Servicios
              </Link>
              <Link 
                href="/proyectos"
                className="text-secondary hover:text-primary transition-colors"
                suppressHydrationWarning
              >
                Proyectos
              </Link>
              <Link 
                href="/resenas"
                className="text-secondary hover:text-primary transition-colors"
                suppressHydrationWarning
              >
                Reseñas
              </Link>
              <Link 
                href="/faq"
                className="text-secondary hover:text-primary transition-colors"
                suppressHydrationWarning
              >
                FAQ
              </Link>
              <Link 
                href="/contacto"
                className="text-secondary hover:text-primary transition-colors"
                suppressHydrationWarning
              >
                Contacto
              </Link>
            </div>

            <div className="flex items-center space-x-4" suppressHydrationWarning>
              <Link 
                href="/contacto"
                className="hidden sm:inline-flex"
                suppressHydrationWarning
              >
                <Button 
                  variant="cta" 
                  size="lg"
                >
                  Solicitar llamada
                </Button>
              </Link>
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors relative z-[110]"
                aria-label="Abrir menú"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                suppressHydrationWarning
              >
                <div className="flex flex-col gap-1.5 w-6" suppressHydrationWarning>
                  <motion.span
                    animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-0.5 bg-primary rounded-full transform-gpu origin-center"
                  />
                  <motion.span
                    animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-0.5 bg-primary rounded-full transform-gpu"
                  />
                  <motion.span
                    animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-0.5 bg-primary rounded-full transform-gpu origin-center"
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={closeMenu}
      />
    </>
  );
} 