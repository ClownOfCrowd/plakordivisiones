'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  preserveScrollBarGap?: boolean;
}

// Оптимизированные варианты анимаций
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.2,
      ease: 'easeIn'
    }
  }
};

const modalVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    y: 20 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.5
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { 
      duration: 0.2,
      ease: 'easeIn'
    }
  }
};

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[90vw] w-full'
} as const;

export function Modal({ 
  isOpen, 
  onClose, 
  children, 
  title,
  description,
  closeOnClickOutside = true,
  closeOnEsc = true,
  showCloseButton = true,
  size = 'md',
  className,
  preserveScrollBarGap = true
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Сохраняем предыдущий активный элемент
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Закрытие по Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (closeOnEsc && e.key === 'Escape') {
      onClose();
    }
  }, [closeOnEsc, onClose]);

  // Закрытие по клику вне модального окна
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (closeOnClickOutside && modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  }, [closeOnClickOutside, onClose]);

  // Управление фокусом внутри модального окна
  const handleTabKey = useCallback((e: KeyboardEvent) => {
    if (!modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  }, []);

  // Блокировка прокрутки и обработчики событий
  useEffect(() => {
    if (isOpen) {
      // Сохраняем текущую позицию прокрутки и блокируем прокрутку
      const scrollY = window.scrollY;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      
      if (preserveScrollBarGap) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      // Сохраняем предыдущий активный элемент
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Добавляем обработчики
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keydown', handleTabKey);
      document.addEventListener('mousedown', handleClickOutside);

      // Добавляем модальное окно в историю браузера
      router.push(window.location.pathname + '#modal', { scroll: false });

      return () => {
        // Восстанавливаем прокрутку
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.style.paddingRight = '';
        window.scrollTo(0, scrollY);

        // Удаляем обработчики
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keydown', handleTabKey);
        document.removeEventListener('mousedown', handleClickOutside);

        // Возвращаем фокус на предыдущий элемент
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }

        // Удаляем модальное окно из истории
        router.back();
      };
    }
  }, [isOpen, handleKeyDown, handleTabKey, handleClickOutside, router, preserveScrollBarGap]);

  // Управление фокусом при открытии
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElement = modalRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      
      if (focusableElement) {
        focusableElement.focus();
      }
    }
  }, [isOpen]);

  // Монтирование на клиенте
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <div 
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
        >
          {/* Оверлей */}
          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />
          
          {/* Контейнер для центрирования */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="min-h-full px-4 flex items-center justify-center">
              {/* Модальное окно */}
              <motion.div
                ref={modalRef}
                initial={prefersReducedMotion ? false : "hidden"}
                animate="visible"
                exit="exit"
                variants={modalVariants}
                className={cn(
                  'bg-white rounded-2xl overflow-hidden w-full shadow-2xl relative my-8 transform-gpu',
                  sizeClasses[size],
                  className
                )}
              >
                {/* Кнопка закрытия */}
                {showCloseButton && (
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 z-10 rounded-full p-2 hover:bg-gray-100"
                    aria-label="Cerrar modal"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                )}

                {/* Заголовок и описание */}
                {(title || description) && (
                  <div className="px-6 pt-6 pb-4">
                    {title && (
                      <h2 
                        id="modal-title"
                        className="text-2xl font-bold text-primary mb-2"
                      >
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p 
                        id="modal-description"
                        className="text-secondary"
                      >
                        {description}
                      </p>
                    )}
                  </div>
                )}

                {/* Контент */}
                <div className={!title && !description ? 'p-0' : 'px-6 pb-6'}>
                  {children}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
} 