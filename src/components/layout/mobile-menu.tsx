'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Home,
  Wrench,
  FolderOpen,
  Star,
  HelpCircle,
  Phone
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  const menuItems = [
    { href: '/', icon: Home, label: 'Inicio' },
    { href: '/servicios', icon: Wrench, label: 'Servicios' },
    { href: '/proyectos', icon: FolderOpen, label: 'Proyectos' },
    { href: '/resenas', icon: Star, label: 'Reseñas' },
    { href: '/faq', icon: HelpCircle, label: 'FAQ' },
    { href: '/contacto', icon: Phone, label: 'Contacto' },
  ];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[101]"
            onClick={onClose}
            aria-hidden="true"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-[102] overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              <div className="h-20" />
              <div className="flex flex-col flex-grow p-6">
                <div className="flex flex-col space-y-4 flex-grow">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center space-x-4 p-3 rounded-lg transition-colors
                        ${pathname === item.href 
                          ? 'bg-primary/10 text-primary' 
                          : 'hover:bg-gray-100 text-secondary'
                        }`}
                    >
                      <item.icon className="w-6 h-6" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
                
                <div className="pt-4 mt-4 border-t">
                  <Link 
                    href="/contacto"
                    className="w-full"
                    onClick={onClose}
                  >
                    <Button 
                      variant="cta" 
                      size="lg" 
                      className="w-full"
                    >
                      Solicitar llamada
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 