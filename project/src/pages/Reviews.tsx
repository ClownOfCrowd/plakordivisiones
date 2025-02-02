import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReviewsSlider from '../components/ReviewsSlider';
import ReviewForm from '../components/ReviewForm';
import Modal from '../components/Modal';
import { Star } from 'lucide-react';

const Reviews = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="py-20">
      <div ref={ref} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Reseñas de Clientes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubra lo que nuestros clientes dicen sobre nuestros servicios y calidad de trabajo
          </p>
        </motion.div>

        <ReviewsSlider />

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

        <div className="mt-16 text-center">
          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-700 to-cyan-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-2">
              <Star className="w-5 h-5" />
              Deja tu opinión
            </span>
          </motion.button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Escribir una reseña"
      >
        <ReviewForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Reviews;