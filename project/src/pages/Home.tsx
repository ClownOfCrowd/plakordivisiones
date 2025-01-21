import React, { useState } from 'react'; // Добавлен useState
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, Users, Briefcase, Hammer, Box, Square, Layout, Home as HomeIcon, Wrench, Flame, VolumeX, Thermometer, Droplets, Zap, Grid, Brush } from 'lucide-react';
import Portfolio from '../components/Portfolio';
import ReviewsSection from '../components/ReviewsSection';
import ContactSection from '../components/ContactSection';
import ContactModal from '../components/ContactModal'; // Импорт модального окна
import { Link } from 'react-router-dom'; // Импорт Link для навигации

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна
  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [portfolioRef, portfolioInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Функции для управления модальным окном
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Категории и услуги
  const categories = ['Construcción en Seco', 'Reformas y Remodelaciones', 'Aislamientos', 'Instalaciones', 'Acabados y Decoración'];

  const services = [
    {
      title: 'Montajes de Pladur',
      description: 'Instalación profesional de placas de yeso para tabiques, techos y trasdosados.',
      category: 'Construcción en Seco',
      image: 'https://i.postimg.cc/WbxqZqsM/freepik-upload-35041.png',
      icon: Square,
    },
    {
      title: 'Tabiques Divisorios',
      description: 'Instalación de tabiques para división de espacios.',
      category: 'Construcción en Seco',
      image: 'https://i.postimg.cc/3RCb40V1/freepik-upload-98997.png',
      icon: Layout,
    },
    {
      title: 'Techos Fijos',
      description: 'Montaje de techos fijos de yeso o pladur.',
      category: 'Construcción en Seco',
      image: 'https://i.postimg.cc/2Skvrb7m/freepik-upload-3092.png',
      icon: HomeIcon,
    },
    {
      title: 'Albañilería',
      description: 'Servicios de albañilería para reformas y obra nueva.',
      category: 'Reformas y Remodelaciones',
      image: 'https://i.postimg.cc/ryBt0tV5/freepik-upload-24488.png',
      icon: Hammer,
    },
    {
      title: 'Reformas en General',
      description: 'Renovación integral de viviendas y locales.',
      category: 'Reformas y Remodelaciones',
      image: 'https://i.postimg.cc/NMH2p1B8/freepik-upload-33969.png',
      icon: Wrench,
    },
    {
      title: 'Chimeneas/Estufas',
      description: 'Instalación de chimeneas y estufas.',
      category: 'Reformas y Remodelaciones',
      image: 'https://i.postimg.cc/W4tkqByH/freepik-upload-39701.png',
      icon: Flame,
    },
    {
      title: 'Aislamientos Acústicos',
      description: 'Instalación de materiales para reducir el ruido.',
      category: 'Aislamientos',
      image: 'https://i.postimg.cc/25q1S4bp/freepik-upload-84757.png',
      icon: VolumeX,
    },
    {
      title: 'Aislamientos Térmicos',
      description: 'Aislamiento térmico para mejorar la eficiencia energética.',
      category: 'Aislamientos',
      image: 'https://i.postimg.cc/4nC5WJDy/erik-mclean-a-Csh-Jn3y93s-unsplash.jpg',
      icon: Thermometer,
    },
    {
      title: 'Impermeabilizaciones',
      description: 'Protección contra humedad y filtraciones.',
      category: 'Aislamientos',
      image: 'https://i.postimg.cc/GtDNLSrB/61003.jpg',
      icon: Droplets,
    },
    {
      title: 'Fontanería/Electricidad',
      description: 'Instalación y reparación de fontanería y electricidad.',
      category: 'Instalaciones',
      image: 'https://i.postimg.cc/BbCTBxBY/pexels-ranjeet-860714737-27928761.jpg',
      icon: Zap,
    },
    {
      title: 'Alicatados',
      description: 'Instalación de azulejos y baldosas.',
      category: 'Acabados y Decoración',
      image: 'https://i.postimg.cc/rFZ3NcHG/freepik-upload-72167.png',
      icon: Grid,
    },
    {
      title: 'Parquet/Pintura',
      description: 'Colocación de parquet y pintura de interiores.',
      category: 'Acabados y Decoración',
      image: 'https://i.postimg.cc/QCmPPKqC/freepik-upload-71843.png',
      icon: Brush,
    },
  ];

  return (
    <div className="overflow-x-hidden"> {/* Добавлен overflow-x-hidden */}
      {/* Hero Section */}
      <section
        className="relative h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://i.postimg.cc/tJw6n4jB/freepik-169-23853.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-bold mb-6"
            >
              Construyendo su visión, superando las expectativas
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Servicios de construcción de alta calidad para residencial y
              comercial proyectos
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Servicios</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ofrecemos soluciones de construcción completas adaptadas a sus
              necesidades específicas
            </p>
          </motion.div>

          {/* Service Categories */}
          {categories.map((category, categoryIndex) => (
            <div key={category} className="mb-16 last:mb-0">
              <h3 className="text-2xl font-bold mb-8 text-gray-800">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {services
                  .filter(service => service.category === category)
                  .map((service, index) => (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <p className="text-white text-center px-4">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <service.icon className="w-8 h-8 text-cyan-700 flex-shrink-0" />
                          <h3 className="text-xl font-bold ml-3">{service.title}</h3>
                        </div>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <button
              onClick={handleOpenModal} // Открываем модальное окно
              className="bg-cyan-700 text-white px-8 py-3 rounded-md hover:bg-cyan-800 transition-colors"
            >
              Solicitar presupuesto
            </button>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section ref={portfolioRef} className="py-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <Portfolio />
        </motion.div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Stats Section */}
      <section className="bg-cyan-700 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div>Proyectos completados</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">20+</div>
              <div>Años de experiencia</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">80%</div>
              <div>de los clientes regresan con nuevos pedidos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div>Satisfacción del cliente</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Модальное окно */}
      <ContactModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Home;