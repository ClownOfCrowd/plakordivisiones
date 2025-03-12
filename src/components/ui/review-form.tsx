'use client';

import { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, type SelectOption } from '@/components/ui/select';
import { Star, Mail, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface ReviewFormProps {
  onClose: () => void;
  onSubmit: (data: ReviewFormData) => void;
}

// Определяем типы для работы со Strapi в будущем
export interface ReviewFormData {
  name: string;
  email: string;
  rating: number;
  text: string;
  service: string;
  status?: 'pending' | 'approved' | 'rejected';
  publishedAt?: string | null;
}

// Варианты услуг
const serviceOptions: SelectOption[] = [
  { value: '', label: 'Selecciona un servicio', disabled: true },
  { value: 'pladur', label: 'Instalación de Pladur' },
  { value: 'reforma', label: 'Reforma' },
  { value: 'techos', label: 'Techos' },
  { value: 'otros', label: 'Otros' }
];

// Анимация для сообщений об ошибках
const errorVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Анимация для звезд рейтинга
const starVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.2 },
  tap: { scale: 0.9 },
  selected: { scale: 1.1 }
};

export function ReviewForm({ onClose, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState<Omit<ReviewFormData, 'rating' | 'status' | 'publishedAt'>>({
    name: '',
    email: '',
    service: '',
    text: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Валидация email
  const isValidEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  // Мемоизированная функция валидации
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.service.trim()) {
      newErrors.service = 'El servicio es obligatorio';
    }

    if (!formData.text.trim()) {
      newErrors.text = 'La reseña es obligatoria';
    } else if (formData.text.length < 10) {
      newErrors.text = 'La reseña debe tener al menos 10 caracteres';
    }

    if (rating === 0) {
      newErrors.rating = 'La valoración es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, rating, isValidEmail]);

  // Обработчик изменения полей
  const handleChange = useCallback((
    name: keyof typeof formData,
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  }, [errors]);

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Подготавливаем данные в формате для Strapi
        const reviewData: ReviewFormData = {
          ...formData,
          rating,
          status: 'pending',
          publishedAt: null,
        };

        await onSubmit(reviewData);
        toast.success('Reseña enviada correctamente', {
          description: 'Gracias por compartir tu experiencia'
        });
        onClose();
      } catch (error) {
        toast.error('Error al enviar la reseña', {
          description: 'Por favor, inténtalo de nuevo más tarde'
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Фокус на первое поле с ошибкой
      if (formRef.current) {
        const firstError = formRef.current.querySelector('[aria-invalid="true"]');
        if (firstError instanceof HTMLElement) {
          firstError.focus();
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg mx-auto shadow-[0_0_50px_0_rgba(0,0,0,0.25)] border border-gray-100"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">
            Comparte tu experiencia
          </h2>
          <p className="text-secondary">
            Tu opinión nos ayuda a mejorar
          </p>
        </div>
      </div>

      <form 
        ref={formRef}
        onSubmit={handleSubmit} 
        className="space-y-6"
        noValidate
      >
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">
            Valoración
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <motion.button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(0)}
                variants={starVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                animate={value <= rating ? "selected" : "initial"}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-full p-1"
                aria-label={`${value} estrellas`}
              >
                <Star
                  className={`w-8 h-8 transition-colors transform-gpu ${
                    value <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {errors.rating && (
              <motion.p
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-red-500 text-sm mt-1"
              >
                {errors.rating}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <Input
          label="Nombre"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          required
          placeholder="Tu nombre"
          autoComplete="name"
        />

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          required
          placeholder="tu@email.com"
          autoComplete="email"
          leftIcon={<Mail className="w-5 h-5" />}
        />

        <Select
          label="Servicio contratado"
          options={serviceOptions}
          value={formData.service}
          onChange={(value) => handleChange('service', value)}
          error={errors.service}
          required
          placeholder="Selecciona un servicio"
        />

        <Textarea
          label="Tu reseña"
          value={formData.text}
          onChange={(e) => handleChange('text', e.target.value)}
          error={errors.text}
          required
          placeholder="Cuéntanos tu experiencia..."
          rows={4}
        />

        <div className="flex justify-center pt-2">
          <Button 
            type="submit" 
            variant="default"
            className="min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
            loading={isSubmitting}
            loadingText="Enviando..."
          >
            Enviar reseña
          </Button>
        </div>
      </form>
    </motion.div>
  );
} 