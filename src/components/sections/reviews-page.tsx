'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Star, ArrowRight, MessageSquare } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { ReviewForm } from '@/components/ui/review-form';
import { toast } from 'sonner';

// Временные данные отзывов
const reviews = [
  {
    id: 1,
    name: "Juan García",
    rating: 5,
    text: "Excelente trabajo con la instalación de pladur. El equipo fue muy profesional y limpio.",
    service: "Instalación de Pladur",
    date: "2024-01-15"
  },
  {
    id: 2,
    name: "María López",
    rating: 5,
    text: "La reforma quedó perfecta, muy contentos con el resultado final.",
    service: "Reforma Integral",
    date: "2024-01-10"
  }
];

export function ReviewsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      console.log('Submitting review:', data);
      toast.success('¡Gracias por tu reseña! La revisaremos y publicaremos pronto.');
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Ha ocurrido un error al enviar la reseña. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <Container className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-16 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Reseñas de Nuestros Clientes
          </h1>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            Descubre lo que nuestros clientes dicen sobre nuestros servicios. 
            Tu opinión es importante para nosotros.
          </p>
        </div>

        {/* Внешние ссылки на отзывы */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-16 px-4">
          <a
            href="https://www.google.com/search?sca_esv=0df777c87af9a454&uds=ABqPDvztZD_Nu18FR6tNPw2cK_RRCSuoUV8MrRZeaBBnvEaDGk5EZh36_QeGE39eBMZDuceApnsN2eFKUXttZTI9z5L1BrpTGhWbLYTNVGfHSYUELnbqNuuSmtltsSsKiqMGiKss6nU3_2tR3BoCk3AE7IlSRmxxgfut0KaTKy4Gv4mSyIKSHQ5N-bN9lo3WOLDHFfFqdqVA&q=Plakor+Divisiones+-+Expertos+en+pladur+en+Tarragona+Opiniones&si=APYL9bvoDGWmsM6h2lfKzIb8LfQg_oNQyUOQgna9TyfQHAoqUuO5pMAyAqVXw8WUw_IV2qdfGZastQ4lof-XIfqpyNMqx7gEnEtMaUNkkMbVhdlIoL1t8XCXpzAYJdl_8OrP-kg_avXn9QkrS2lXQUhiRqQ23CLzyeTj1a_I4jrsT9n-Lt_I9eBevLulEFEGnDWAGgq_TsqO&hl=es-419&sa=X&ved=2ahUKEwiL34jK14SMAxXXSaQEHR5TKa4Q_4MLegQINBAP&cshid=1741787457449615&biw=1707&bih=820&dpr=1.13"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button 
              variant="outline" 
              size="lg"
              className="w-full border-2 bg-white hover:bg-primary/5 text-primary hover:text-primary hover:border-primary transition-all"
            >
              <span className="flex items-center justify-between w-full">
                <span className="font-medium">Reseñas en Google</span>
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
          </a>

          <a
            href="https://www.habitissimo.es/pro/plakor-divisiones"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button 
              variant="outline" 
              size="lg"
              className="w-full border-2 bg-white hover:bg-primary/5 text-primary hover:text-primary hover:border-primary transition-all"
            >
              <span className="flex items-center justify-between w-full">
                <span className="font-medium">Reseñas en Habitissimo</span>
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
          </a>
        </div>

        {/* Отзывы */}
        <div className="grid md:grid-cols-2 gap-6 px-4 mb-16">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{review.name}</h3>
                  <p className="text-gray-700">{review.service}</p>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-800 text-lg mb-4">{review.text}</p>
              <p className="text-gray-700">
                {new Date(review.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Призыв к действию */}
        <div className="px-4">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto shadow-lg border border-primary/10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center">
              ¿Has trabajado con nosotros?
            </h2>
            <p className="text-lg text-gray-800 mb-8 text-center">
              Tu opinión es muy importante para nosotros. Comparte tu experiencia y ayuda a otros 
              clientes a tomar la mejor decisión.
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Dejar una reseña
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Dejar una reseña"
      >
        <ReviewForm onSubmit={handleSubmit} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </Container>
  );
}
