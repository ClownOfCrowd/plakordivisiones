'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface ReviewFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export function ReviewForm({ onSubmit, onClose }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [text, setText] = useState('');
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      rating,
      service,
      text,
      date: new Date().toISOString()
    });
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
          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-base"
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
          Servicio
        </label>
        <input
          type="text"
          id="service"
          required
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-base"
          placeholder="¿Qué servicio contrataste?"
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
          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none text-base"
          placeholder="Cuéntanos tu experiencia..."
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="w-full sm:w-auto px-6"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="w-full sm:w-auto px-6 bg-primary hover:bg-primary/90"
        >
          Enviar
        </Button>
      </div>
    </form>
  );
}
