import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, Users, Shield, Clock } from 'lucide-react';
import ContactModal from '../components/ContactModal'; // Импорт модального окна
import SEO from '../components/SEO'; // Импорт SEO компонента

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна

  // Функции для управления модальным окном
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <SEO 
        title="Sobre Nosotros | Plakor Divisiones"
        description="Empresa líder en construcción y reformas en Tarragona con más de 20 años de experiencia. Conozca nuestro equipo y valores."
        keywords="empresa construcción, reformas Tarragona, experiencia construcción"
      />
      <div className="container mx-auto px-4 py-20">
        <section ref={ref} className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">Sobre Nosotros</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Más de 20 años de experiencia en el sector de la construcción, ofreciendo servicios de alta calidad
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="https://i.postimg.cc/ZYM0L8YW/2149328067.jpg"
                alt="Equipo de trabajo"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold mb-4">Nuestra Historia</h2>
              <p className="text-gray-600">
                Desde nuestros inicios, nos hemos especializado en ofrecer servicios de montaje de pladur con la más alta calidad y precisión. Nuestro compromiso con la excelencia y la satisfacción de nuestros clientes nos ha consolidado como expertos en soluciones de pladur y líderes en el sector.
              </p>
              <p className="text-gray-600">
               Contamos con un equipo de profesionales altamente cualificados y una amplia experiencia en proyectos de diversa envergadura. Gracias a nuestra dedicación y al uso de las últimas tecnologías y materiales de primera calidad, garantizamos resultados impecables que superan las expectativas en cada instalación.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {[
              {
                icon: Building2,
                title: "150+",
                description: "Proyectos Completados",
              },
              {
                icon: Users,
                title: "100+",
                description: "Clientes Satisfechos",
              },
              {
                icon: Shield,
                title: "100%",
                description: "Garantía de Calidad",
              },
              {
                icon: Clock,
                title: "20+",
                description: "Años de Experiencia",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center p-6 bg-white rounded-lg shadow-lg"
              >
                <item.icon className="w-12 h-12 text-cyan-700 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Кнопка Contactar Ahora */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-cyan-700 text-white p-12 rounded-lg text-center"
          >
            <h2 className="text-3xl font-bold mb-4">¿Listo para empezar tu proyecto?</h2>
            <p className="mb-8">Contáctanos hoy mismo para una consulta gratuita</p>
            <button
              onClick={handleOpenModal} // Открываем модальное окно
              className="bg-white text-cyan-700 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Contactar Ahora
            </button>
          </motion.div>
        </section>

        {/* Модальное окно */}
        <ContactModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </>
  );
};

export default About;