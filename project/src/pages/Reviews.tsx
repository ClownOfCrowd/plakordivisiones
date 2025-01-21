import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  source: 'internal' | 'google' | 'habitissimo';
  approved: boolean;
}

const Reviews = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    text: '',
  });
  const [errors, setErrors] = useState({
    author: '',
    text: '',
  });

  const [reviews] = useState<Review[]>([
    {
      id: '1',
      author: "Maria García",
      rating: 5,
      text: "Excelente calidad de trabajo y profesionalismo. Completaron nuestro proyecto de renovación a tiempo y dentro del presupuesto.",
      date: "2024-02-15",
      source: 'internal',
      approved: true,
    },
    {
      id: '2',
      author: "Juan Martínez",
      rating: 5,
      text: "Muy satisfecho con sus servicios. El equipo fue muy profesional y la comunicación fue excelente durante todo el proyecto.",
      date: "2024-02-10",
      source: 'internal',
      approved: true,
    },
    {
      id: '3',
      author: "Ana López",
      rating: 5,
      text: "Gran atención a los detalles y servicio muy profesional. Lo recomiendo para cualquier proyecto de construcción.",
      date: "2024-04-05",
      source: 'internal',
      approved: true,
    },
    {
      id: '4',
      author: "Carlos Rodríguez",
      rating: 5,
      text: "Servicio excepcional de principio al fin. El equipo fue muy profesional y los resultados superaron nuestras expectativas.",
      date: "2024-01-30",
      source: 'internal',
      approved: true,
    },
  ]);

  const validateForm = () => {
    const newErrors = { author: '', text: '' };
    let isValid = true;

    if (!newReview.author.trim()) {
      newErrors.author = 'El nombre es obligatorio';
      isValid = false;
    }

    if (!newReview.text.trim()) {
      newErrors.text = 'La opinión es obligatoria';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Review submitted:', newReview);
      setNewReview({
        author: '',
        rating: 5,
        text: '',
      });
      setErrors({ author: '', text: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="py-20 overflow-x-hidden"> {/* Добавлен overflow-x-hidden */}
      <section ref={ref} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Reseñas de Clientes</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubra lo que nuestros clientes dicen sobre nuestros servicios
          </p>
        </motion.div>

        {/* Кнопка для открытия модального окна */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-cyan-700 text-white px-6 py-2 rounded-md hover:bg-cyan-800 transition-colors"
          >
            Deja tu opinión
          </button>
        </motion.div>

        {/* Модальное окно */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-6">Deja tu opinión</h2>
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="author"
                    className={`w-full px-4 py-2 border ${
                      errors.author ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:ring-cyan-500 focus:border-cyan-500`}
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                  />
                  {errors.author && (
                    <p className="text-red-500 text-sm mt-1">{errors.author}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valoración
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                    Tu opinión
                  </label>
                  <textarea
                    id="review"
                    rows={4}
                    className={`w-full px-4 py-2 border ${
                      errors.text ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:ring-cyan-500 focus:border-cyan-500`}
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  ></textarea>
                  {errors.text && (
                    <p className="text-red-500 text-sm mt-1">{errors.text}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-700 text-white py-2 px-4 rounded-md hover:bg-cyan-800 transition-colors"
                >
                  Enviar reseña
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Отображение отзывов */}
        <div className="grid md:grid-cols-2 gap-8">
          {reviews
            .filter((review) => review.approved)
            .map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  {review.source !== 'internal' && (
                    <span className="ml-2 text-sm text-gray-500">
                      via {review.source === 'google' ? 'Google' : 'Habitissimo'}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mb-4">{review.text}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="font-medium">{review.author}</span>
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Ссылки на внешние отзывы */}
        <div className="mt-12 text-center space-y-4">
          <a
            href="https://www.google.com/search?sca_esv=dcf525f11ea5bd34&rlz=1C1CHBF_esES1033ES1033&q=Plakor+Divisiones+-+Expertos+en+pladur+en+Tarragona&si=ACC90nzZwgO0P4Qu3-A0NldYnwAKwrAmvjJXmiihL2mEqps3A6g5n0Ib5HZi1DvZsjFQQcOSAyy_mufggWYz72M9vlovkC9E4eGB7ETY0UaWoIjGPmxyBxg%3D&uds=ADvngMg9jNQcehWDwmnlTKntTdHt36OPEYmtjHSCYuOz9Q5v0_QGlfP5NJC1E_RWJ-tN1vgkHepvJybhVDBeH2iTlrRuCr2flSjRHweYhwy3ujIYmpIdEqnsIr4iboAiRBUHC7ngt39Ps7Cvqr_i82-R_jzcPWzaAA&sa=X&ved=2ahUKEwjyvJeRkf-KAxUlS_EDHd3eKtsQ3PALegQIHBAE&biw=1707&bih=820&dpr=1.13"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-cyan-700 hover:text-cyan-800 transition-colors"
          >
            Ver reseñas en Google
          </a>
          <a
            href="https://habitissimo.es/pro/plakor-divisiones"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-cyan-700 hover:text-cyan-800 transition-colors"
          >
            Ver reseñas en Habitissimo
          </a>
        </div>
      </section>
    </div>
  );
};

export default Reviews;