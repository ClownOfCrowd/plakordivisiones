'use client';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, MessageSquare, Globe, Home } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { ReviewForm, ReviewFormData } from '@/components/ui/review-form';
import { toast } from 'sonner';
import { getReviews } from '@/lib/strapi';

// Анимации с учетом производительности
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

// Тип для отзыва из Strapi
interface Review extends ReviewFormData {
  id: number;
  createdAt: string;
  updatedAt: string;
  source: string;
}

export function ReviewsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  // Загрузка отзывов из Strapi
  useEffect(() => {
    async function loadReviews() {
      try {
        setIsLoading(true);
        const strapiReviews = await getReviews();
        
        if (strapiReviews && strapiReviews.length > 0) {
          // Преобразуем данные из Strapi в формат для компонента
          const mappedReviews = strapiReviews.map((review: any) => ({
            id: review.id,
            name: review.attributes.name,
            email: review.attributes.email,
            rating: review.attributes.rating,
            text: review.attributes.text,
            service: review.attributes.service,
            status: review.attributes.status,
            publishedAt: review.attributes.publishedAt,
            createdAt: review.attributes.createdAt,
            updatedAt: review.attributes.updatedAt,
            source: review.attributes.source || 'Web',
          }));
          
          setReviews(mappedReviews);
        }
      } catch (error) {
        console.error('Error loading reviews:', error);
        // Используем временные данные в случае ошибки
      } finally {
        setIsLoading(false);
      }
    }
    
    loadReviews();
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmitReview = useCallback(async (data: ReviewFormData) => {
    try {
      // Отправляем отзыв через API
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Error al enviar la reseña');
      }
      
      setIsModalOpen(false);
      toast.success('¡Gracias por tu reseña! La revisaremos y publicaremos pronto.');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Ha ocurrido un error al enviar la reseña. Por favor, inténtalo de nuevo.');
    }
  }, []);

  const filteredReviews = reviews
    .filter(review => review.status === 'approved' && review.publishedAt)
    .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <section className="pt-32 pb-20">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{
              willChange: 'opacity, transform',
              perspective: '1000px',
            }}
          >
            <motion.div
              variants={itemVariants}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Opiniones de Nuestros Clientes
              </h1>
              <p className="text-lg text-secondary max-w-3xl mx-auto">
                Descubre lo que dicen nuestros clientes sobre nuestro trabajo y servicios. 
                Nos enorgullece mantener un alto nivel de satisfacción.
              </p>
            </motion.div>

            {/* Кнопки для перехода на внешние сайты */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
              <motion.a
                variants={itemVariants}
                href="https://www.google.com/search?q=Plakor+Divisiones+-+Expertos+en+pladur+en+Tarragona+Reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="block transform-gpu"
              >
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full group hover:bg-blue-50 border-2"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <Globe className="w-6 h-6 text-blue-500" />
                      <span>Ver reseñas en Google</span>
                    </div>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Button>
              </motion.a>

              <motion.a
                variants={itemVariants}
                href="https://www.habitissimo.es/pro/plakor-divisiones"
                target="_blank"
                rel="noopener noreferrer"
                className="block transform-gpu"
              >
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full group hover:bg-blue-50 border-2"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <Home className="w-6 h-6 text-blue-500" />
                      <span>Ver reseñas en Habitissimo</span>
                    </div>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Button>
              </motion.a>
            </div>

            {/* Сетка отзывов */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredReviews.map((review) => (
                <motion.div
                  key={review.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow will-change-transform"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{review.name}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(review.publishedAt!).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-secondary">{review.text}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                      Servicio: {review.service.charAt(0).toUpperCase() + review.service.slice(1)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Призыв к действию */}
            <motion.div
              variants={itemVariants}
              className="mt-16 text-center"
            >
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto shadow-lg border border-primary/10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  ¿Has trabajado con nosotros?
                </h2>
                <p className="text-lg text-secondary mb-8">
                  Tu opinión es muy importante para nosotros. Comparte tu experiencia y ayuda a otros 
                  clientes a tomar la mejor decisión.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button 
                    className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <MessageSquare className="w-6 h-6" />
                    Dejar una reseña
                    <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ReviewForm 
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitReview}
        />
      </Modal>
    </>
  );
} 