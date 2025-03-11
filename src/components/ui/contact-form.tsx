'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, type SelectOption } from '@/components/ui/select';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Send } from 'lucide-react';

// Типы для формы
interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

// Варианты услуг
const serviceOptions: SelectOption[] = [
  { value: '', label: 'Selecciona un servicio', disabled: true },
  { value: 'pladur', label: 'Instalación de Pladur' },
  { value: 'reforma', label: 'Reforma' },
  { value: 'techos', label: 'Techos' },
  { value: 'aislamientos', label: 'Aislamientos' },
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

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Валидация email
  const isValidEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  // Валидация телефона
  const isValidPhone = useCallback((phone: string): boolean => {
    const phoneRegex = /^(?:\+34|0034|34)?[6789]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  }, []);

  // Мемоизированная функция валидации
  const validateForm = useCallback(() => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'El teléfono no es válido';
    }

    if (!formData.service) {
      newErrors.service = 'Selecciona un servicio';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    } else if (formData.message.length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, isValidEmail, isValidPhone]);

  // Обработчик изменения полей
  const handleChange = useCallback((
    name: keyof FormData,
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Отправка данных на API
        const response = await fetch('/api/contact-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: formData }),
        });

        if (!response.ok) {
          throw new Error('Error al enviar el mensaje');
        }
        
        toast.success('Mensaje enviado correctamente', {
          description: 'Nos pondremos en contacto contigo lo antes posible'
        });
        
        // Очищаем форму
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });

        // Фокус на первое поле
        if (formRef.current) {
          const firstInput = formRef.current.querySelector('input, select, textarea');
          if (firstInput instanceof HTMLElement) {
            firstInput.focus();
          }
        }
      } catch (error) {
        toast.error('Error al enviar el mensaje', {
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
    <form 
      ref={formRef}
      onSubmit={handleSubmit} 
      className="space-y-6"
      noValidate
    >
      <Input
        label="Nombre"
        type="text"
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

      <Input
        label="Teléfono"
        type="tel"
        value={formData.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
        error={errors.phone}
        required
        placeholder="+34 XXX XXX XXX"
        autoComplete="tel"
        leftIcon={<Phone className="w-5 h-5" />}
      />

      <Select
        label="Servicio"
        options={serviceOptions}
        value={formData.service}
        onChange={(value) => handleChange('service', value)}
        error={errors.service}
        required
        placeholder="Selecciona un servicio"
      />

      <div className="space-y-1">
        <label 
          htmlFor="message"
          className="block text-sm font-medium text-secondary"
        >
          Mensaje
          <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-shadow min-h-[120px] resize-y ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Describe tu proyecto o consulta..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        <AnimatePresence mode="wait">
          {errors.message && (
            <motion.p 
              id="message-error"
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-red-500 text-sm mt-1"
            >
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <Button
        type="submit"
        variant="default"
        className="w-full transform-gpu"
        disabled={isSubmitting}
        loading={isSubmitting}
        loadingText="Enviando..."
        leftIcon={<Send className="w-5 h-5" />}
      >
        Enviar mensaje
      </Button>
    </form>
  );
} 