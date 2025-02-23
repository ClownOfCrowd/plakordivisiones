'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Закрываем меню при изменении маршрута
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    setMounted(true);
    
    // Управляем overflow и фоном body
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Очищаем стили при размонтировании
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuItems = [
    { href: '/servicios', label: 'Servicios', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )},
    { href: '/proyectos', label: 'Proyectos', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )},
    { href: '/resenas', label: 'Reseñas', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    )},
    { href: '/faq', label: 'FAQ', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { href: '/contacto', label: 'Contacto', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )}
  ];

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Оверлей */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[98]"
            onClick={onClose}
          />

          {/* Меню */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-[100dvh] w-[280px] bg-white shadow-xl z-[99]"
          >
            {/* Навигация */}
            <nav className="h-full flex flex-col">
              {/* Шапка */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-primary">Menú</h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-primary transition-all"
                  aria-label="Cerrar menú"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Список ссылок */}
              <div className="flex-1 overflow-y-auto py-6 px-4">
                <div className="space-y-2">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? 'bg-primary text-white shadow-lg'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                        }`}
                      >
                        <span className={isActive ? 'text-white' : 'text-primary'}>
                          {item.icon}
                        </span>
                        <span className="text-base font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Кнопка вызова */}
                <div className="mt-6">
                  <Button 
                    variant="cta" 
                    size="lg" 
                    className="w-full"
                    onClick={() => window.location.href = '/contacto'}
                  >
                    Solicitar llamada
                  </Button>
                </div>
              </div>

              {/* Футер меню */}
              <div className="p-4 border-t">
                <p className="text-sm text-gray-500 text-center">
                  © {new Date().getFullYear()} Plakor Divisiones
                </p>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 