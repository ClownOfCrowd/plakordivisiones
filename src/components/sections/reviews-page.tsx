'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';

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

  return (
    <Container className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-16 px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Reseñas de Nuestros Clientes
          </h1>
          <p className="text-lg text-gray-800 max-w-3xl mx-auto">
            Descubre lo que nuestros clientes dicen sobre nuestros servicios. 
            Tu opinión es importante para nosotros.
          </p>
        </div>

        {/* Внешние ссылки */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-16 px-4">
          <a
            href="https://g.page/r/CZk6RlVxWJWJEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button 
              variant="outline" 
              size="lg"
              className="w-full border-2 bg-white hover:bg-blue-50 text-gray-900 hover:text-blue-700 hover:border-blue-600 transition-all"
            >
              <span className="flex items-center justify-between w-full">
                <span className="font-medium">Reseña en Google</span>
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=100094772135416&sk=reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button 
              variant="outline" 
              size="lg"
              className="w-full border-2 bg-white hover:bg-blue-50 text-gray-900 hover:text-blue-700 hover:border-blue-600 transition-all"
            >
              <span className="flex items-center justify-between w-full">
                <span className="font-medium">Reseña en Facebook</span>
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
                  <p className="text-gray-800">{review.service}</p>
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
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 md:p-12 max-w-3xl mx-auto shadow-lg border border-blue-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                Dejar una reseña
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
