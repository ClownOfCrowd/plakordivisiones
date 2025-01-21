import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom'; // Link для навигации

const reviews = [
  {
    id: 1,
    author: "Maria García",
    rating: 5,
    text: "Excelente calidad de trabajo y profesionalismo. Completaron nuestro proyecto de renovación de nuestra casa a tiempo y dentro del presupuesto.",
    date: "2023-12-15"
  },
  {
    id: 2,
    author: "Juan Martínez",
    rating: 5,
    text: "Muy satisfecho con sus servicios. El equipo y su encargado fueron profesionales y la comunicación fue excelente durante todo el proyecto. Gracias!",
    date: "2024-05-10"
  },
  {
    id: 3,
    author: "Ana López",
    rating: 5,
    text: "Gran atención a los detalles y servicio muy profesional. Lo recomiendo para cualquier proyecto de construcción.",
    date: "2024-04-05"
  },
  {
    id: 4,
    author: "Carlos Rodríguez",
    rating: 5,
    text: "Servicio excepcional de principio al fin. El equipo fue muy profesional y los resultados superaron nuestras expectativas.",
    date: "2024-01-30"
  }
];

const ReviewsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">¿Qué opinan nuestros clientes?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vea lo que nuestros clientes dicen sobre nuestros servicios de construcción
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gray-50 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">{review.text}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="font-medium">{review.author}</span>
                <span>{new Date(review.date).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/reviews" // Переход на вкладку Reseñas
            className="inline-flex items-center space-x-2 text-cyan-700 hover:text-cyan-800 transition-colors"
          >
            <span>Ver todas reseñas</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;