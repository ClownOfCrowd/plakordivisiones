'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReviewFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const serviceOptions = [
  { value: 'pladur', label: 'Instalación de Pladur' },
  { value: 'reforma', label: 'Reforma Integral' },
  { value: 'aislamiento', label: 'Aislamiento' },
  { value: 'otros', label: 'Otros Servicios' }
];

const errorVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

export function ReviewForm({ onSubmit, onClose }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    text: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!rating) {
      newErrors.rating = 'Por favor, selecciona una valoración';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!formData.service) {
      newErrors.service = 'Por favor, selecciona un servicio';
    }
    if (!formData.text.trim()) {
      newErrors.text = 'La reseña es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ ...formData, rating });
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrors({ submit: 'Error al enviar la reseña. Por favor, inténtalo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-secondary">
          Tu valoración
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className="focus:outline-none"
            >
              <svg
                className={`w-8 h-8 ${
                  value <= rating ? 'text-yellow-400' : 'text-gray-300'
                } transition-colors`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
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
  );
}
