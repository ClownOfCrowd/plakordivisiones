import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../lib/api';

// Это будут дефолтные отзывы, пока загружаются реальные
const defaultReviews = [
  {
    id: '1',
    attributes: {
      name: "Maria García",
      rating: 5,
      comment: "Excelente calidad de trabajo y profesionalismo...",
      createdAt: "2024-02-15",
    }
  },
  {
    id: '2',
    attributes: {
      name: "Juan Martínez",
      rating: 5,
      comment: "Muy satisfecho con sus servicios. El equipo fue muy profesional y la comunicación fue excelente durante todo el proyecto.",
      createdAt: "2024-02-10",
    }
  },
  {
    id: '3',
    attributes: {
      name: "Ana López",
      rating: 5,
      comment: "Gran atención a los detalles y servicio muy profesional. Lo recomiendo para cualquier proyecto de construcción.",
      createdAt: "2024-04-05",
    }
  },
  {
    id: '4',
    attributes: {
      name: "Carlos Rodríguez",
      rating: 5,
      comment: "Servicio excepcional de principio al fin. El equipo fue muy profesional y los resultados superaron nuestras expectativas.",
      createdAt: "2024-01-30",
    }
  }
];

const ReviewsSlider = () => {
  const [reviews, setReviews] = useState(defaultReviews);
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;
  const autoSlideInterval = 10000; // 10 секунд

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const currentReviews = reviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  // Загрузка отзывов
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await api.reviews.getAll();
        console.log('Reviews structure:', JSON.stringify(fetchedReviews, null, 2));
        if (fetchedReviews && fetchedReviews.data) {
          // Преобразуем структуру данных в нужный формат
          const formattedReviews = fetchedReviews.data.map(review => ({
            id: review.id,
            attributes: {
              name: review.name,
              rating: review.rating,
              comment: review.comment,
              createdAt: review.createdAt
            }
          }));
          setReviews(formattedReviews);
        }
      } catch (error) {
        console.error('Error loading reviews:', error);
      }
    };
    
    fetchReviews();
  }, []);

  // Автоматическая смена слайдов
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [totalPages]);

  // Сброс таймера при ручном переключении
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4"
          >
            {currentReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">
                      {review.attributes?.name || 'Anónimo'}
                    </h3>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < (review.attributes?.rating || 5)
                              ? 'fill-current'
                              : 'fill-none'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  {review.attributes?.comment || 'Sin comentarios'}
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  {review.attributes?.createdAt 
                    ? new Date(review.attributes.createdAt).toLocaleDateString()
                    : ''}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={prevPage}
            className="p-2 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextPage}
            className="p-2 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSlider; 