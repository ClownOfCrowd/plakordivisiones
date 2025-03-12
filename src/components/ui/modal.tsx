'use client';

import { useEffect, useCallback, useRef, useState, memo } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const sizes = {
  sm: 'max-w-[400px]',
  md: 'max-w-[500px]',
  lg: 'max-w-[650px]',
  xl: 'max-w-[800px]',
  full: 'max-w-[1200px]'
} as const;

// Мемоизированная кнопка закрытия для оптимизации ререндеров
const CloseButton = memo(function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className={cn(
        'absolute right-3 top-3',
        'w-8 h-8',
        'rounded-lg',
        'bg-gray-100 hover:bg-gray-200',
        'flex items-center justify-center',
        'transition-colors',
        'z-[60]'
      )}
      aria-label="Закрыть"
    >
      <X className="w-4 h-4 text-gray-600" />
    </button>
  );
});

// Мемоизированный заголовок для оптимизации ререндеров
const ModalHeader = memo(function ModalHeader({ 
  title, 
  description 
}: { 
  title?: string; 
  description?: string;
}) {
  if (!title && !description) return null;

  return (
    <div className="border-b border-gray-100">
      <div className="px-6 py-4">
        {title && (
          <h2 
            id="modal-title"
            className="text-lg font-semibold text-gray-900 pr-10"
          >
            {title}
          </h2>
        )}
        {description && (
          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
});

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = 'md',
  className
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleClose = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    if (e?.type === 'click' && (e as React.MouseEvent).target !== modalRef.current) return;
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      ref={modalRef}
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 pt-[10vh] px-4"
    >
      <div 
        className={cn(
          'relative w-full',
          'bg-white rounded-lg shadow-xl',
          'my-4',
          sizes[size],
          className
        )}
        onClick={e => e.stopPropagation()}
      >
        <CloseButton onClose={onClose} />
        <ModalHeader title={title} description={description} />
        
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
} 