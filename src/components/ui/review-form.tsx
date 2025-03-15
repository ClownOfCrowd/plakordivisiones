'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Select, type SelectOption } from '@/components/ui/select';
import { strapiApi } from '@/lib/strapi';
import { toast } from 'sonner';
import type { Review } from '@/lib/strapi';

interface ReviewFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

type ServiceType = NonNullable<Review['attributes']>['service'];

// Варианты услуг
const serviceOptions: SelectOption[] = [
  { value: '', label: 'Selecciona un servicio', disabled: true },
  { value: '     Instalación de Pladur', label: 'Instalación de Pladur' },
  { value: '     Reforma', label: 'Reforma' },
  { value: '     Techos', label: 'Techos' },
  { value: '     Aislamientos', label: 'Aislamientos' },
  { value: '     Otros', label: 'Otros' }
];

export function ReviewForm({ onSubmit, onClose }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [service, setService] = useState<ServiceType | ''>('');
  const [text, setText] = useState('');
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (service === '') {
      toast.error('Por favor, selecciona un servicio');
      return;
    }
    setIsSubmitting(true);

    try {
      await strapiApi.submitReview({
        name,
        rating,
        service,
        comment: text
      });
      
      toast.success('¡Gracias por tu reseña! La revisaremos y publicaremos pronto.');
      onSubmit({
        name,
        rating,
        service,
        text,
        date: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Ha ocurrido un error al enviar la reseña. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-base text-gray-900"
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
          Servicio
        </label>
        <Select
          options={serviceOptions}
          value={service}
          onChange={(value) => setService(value as ServiceType)}
          required
          placeholder="Selecciona un servicio"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Valoración
        </label>
        <div className="flex gap-1 sm:gap-2 justify-center sm:justify-start">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(null)}
              className="p-1 hover:scale-110 transition-transform touch-manipulation"
            >
              <Star
                className={`w-7 h-7 sm:w-8 sm:h-8 ${
                  (hoveredRating !== null ? star <= hoveredRating : star <= rating)
                    ? 'text-yellow-500 fill-current'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
          Tu opinión
        </label>
        <textarea
          id="text"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none text-base text-gray-900"
          placeholder="Cuéntanos tu experiencia..."
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="w-full sm:w-auto px-6 text-primary border-primary hover:bg-primary hover:text-white"
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="w-full sm:w-auto px-6 bg-primary hover:bg-primary/90"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Enviar
        </Button>
      </div>
    </form>
  );
}
