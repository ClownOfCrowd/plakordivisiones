'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
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
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="sr-only">Menú</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
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