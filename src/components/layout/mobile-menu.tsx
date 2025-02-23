'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    
    // Очищаем стили при размонтировании
    return () => {
      document.body.style.overflow = '';
      document.body.style.backgroundColor = '';
    };
  }, []);

  // Управляем overflow и фоном body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
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

  if (!mounted) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-[100] ${!isOpen && 'pointer-events-none'}`}>
      {/* Оверлей */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        style={{ willChange: 'opacity' }}
      />

      {/* Меню */}
      <div 
        className={`fixed top-0 right-0 h-[100dvh] w-[280px] bg-white shadow-xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ willChange: 'transform' }}
      >
        {/* Навигация */}
        <nav className="h-full flex flex-col">
          {/* Шапка */}
          <div className="flex items-center justify-end p-4 border-b">
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-primary transition-all"
              aria-label="Cerrar menú"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Список ссылок */}
          <div className="flex-1 p-6">
            <div className="space-y-3">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-4 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-primary text-white font-medium shadow-lg' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                    }`}
                  >
                    <span className={isActive ? 'text-white' : 'text-gray-400'}>
                      {item.icon}
                    </span>
                    <span className="text-lg">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
} 