'use client';

import { useState, useCallback, useMemo, memo } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { motion, useReducedMotion } from 'framer-motion';
import { Star, ArrowRight, MessageSquare, Globe, Home } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { ReviewForm, ReviewFormData } from '@/components/ui/review-form';
import { toast } from 'sonner';

// Интерфейс для отзыва
interface Review extends ReviewFormData {
  id: number;
  date: string;
  approved: boolean;
}

// Локальные данные отзывов
const reviews: Review[] = [
  {
    id: 1,
    name: 'María García',
    rating: 5,
    text: 'Excelente trabajo en la reforma de mi cocina. El equipo fue muy profesional y cumplieron con los plazos.',
    service: 'Reforma de cocina',
    date: '2024-03-15',
    approved: true
  },
  {
    id: 2,
    name: 'Juan Martínez',
    rating: 5,
    text: 'Muy satisfecho con la renovación del baño. Acabados de primera calidad y atención personalizada.',
    service: 'Reforma de baño',
    date: '2024-02-28',
    approved: true
  },
  {
    id: 3,
    name: 'Ana López',
    rating: 5,
    text: 'Realizaron un excelente trabajo en la instalación del pladur. Rápidos, limpios y profesionales.',
    service: 'Instalación de pladur',
    date: '2024-02-15',
    approved: true
  }
];

// Оптимизированный компонент отзыва
const ReviewCard = memo(({ review }: { review: Review }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow will-change-transform"
  >
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="font-semibold text-lg">{review.name}</h3>
        <p className="text-sm text-gray-500">
          {new Date(review.date).toLocaleDateString('es-ES', {
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
));

ReviewCard.displayName = 'ReviewCard';

// Оптимизированная кнопка внешней ссылки
const ExternalLinkButton = memo(({ 
  href, 
  icon: Icon, 
  children 
}: { 
  href: string; 
  icon: typeof Globe; 
  children: React.ReactNode;
}) => (
  <motion.a
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="block transform-gpu"
  >
    <Button 
      variant="outline" 
      size="lg" 
      className="w-full group hover:bg-primary/5 hover:border-primary border-2"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6 text-primary" />
          <span className="text-primary">{children}</span>
        </div>
        <ArrowRight className="w-5 h-5 text-primary transition-transform group-hover:translate-x-1" />
      </div>
    </Button>
  </motion.a>
));

ExternalLinkButton.displayName = 'ExternalLinkButton';

export function ReviewsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = useCallback(async (data: ReviewFormData) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to submit review');
      
      toast.success('¡Gracias por tu reseña! La revisaremos y publicaremos pronto.');
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Ha ocurrido un error al enviar la reseña. Por favor, inténtalo de nuevo.');
    }
  }, []);

  const filteredReviews = useMemo(() => 
    reviews
      .filter(review => review.approved)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  );

  return (
    <>
      <section className="pt-32 pb-20">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
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
              <ExternalLinkButton
                href="https://www.google.com/search?q=Plakor+Divisiones+-+Expertos+en+pladur+en+Tarragona+Reviews"
                icon={Globe}
              >
                Ver reseñas en Google
              </ExternalLinkButton>

              <ExternalLinkButton
                href="https://www.habitissimo.es/pro/plakor-divisiones"
                icon={Home}
              >
                Ver reseñas en Habitissimo
              </ExternalLinkButton>
            </div>

            {/* Сетка отзывов */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {/* Призыв к действию */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
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

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Dejar una reseña"
      >
        <ReviewForm onSubmit={handleSubmit} />
      </Modal>
    </>
  );
} 