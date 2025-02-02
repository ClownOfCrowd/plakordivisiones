import { useState } from 'react';
import { Star } from 'lucide-react';
import { api } from '../lib/api';
import LoadingButton from './LoadingButton';
import { motion, AnimatePresence } from 'framer-motion';

const ReviewForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
  });
  const [touched, setTouched] = useState({
    name: false,
    comment: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleBlur = (field: 'name' | 'comment') => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await api.reviews.create({
        name: formData.name,
        rating: formData.rating,
        comment: formData.comment
      });
      setSuccess(true);
      setTimeout(onClose, 2000);
    } catch (err) {
      console.error('Form Error:', err);
      setError(err instanceof Error ? err.message : 'Error al enviar la reseña');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Nombre
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onBlur={() => handleBlur('name')}
            className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-200"
            placeholder="Tu nombre completo"
          />
          <AnimatePresence>
            {touched.name && !formData.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 text-sm text-red-500"
              >
                El nombre es obligatorio
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Valoración
          </label>
          <div className="flex gap-3 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setFormData({ ...formData, rating: star })}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(null)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 transition-all duration-200 ${
                    star <= (hoveredStar ?? formData.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  } ${
                    hoveredStar && star <= hoveredStar
                      ? 'transform scale-110'
                      : ''
                  }`}
                />
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Tu opinión
          </label>
          <textarea
            required
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            onBlur={() => handleBlur('comment')}
            rows={4}
            className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-200"
            placeholder="Cuéntanos tu experiencia..."
          />
          <AnimatePresence>
            {touched.comment && !formData.comment && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 text-sm text-red-500"
              >
                La opinión es obligatoria
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-600 text-sm text-center"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {success ? (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-600 text-center font-medium"
        >
          ¡Gracias por su reseña! Será publicada después de la moderación.
        </motion.p>
      ) : (
        <LoadingButton
          type="submit"
          isLoading={isLoading}
          className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-6 py-3 rounded-lg hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Enviar reseña
        </LoadingButton>
      )}
    </form>
  );
};

export default ReviewForm; 