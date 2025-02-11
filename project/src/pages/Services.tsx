import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Square, Layout, HomeIcon, Hammer, Wrench, Flame, VolumeX, Thermometer, Droplets, Zap, Grid, Brush } from 'lucide-react';
import RequestCallModal from '../components/RequestCallModal';
import SEO from '../components/SEO';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    alert('Solicitud enviada con éxito');
  };

  const services = [
    {
      title: 'Montajes de Pladur',
      description: 'Instalación profesional de placas de yeso para tabiques, techos y trasdosados.',
      image: 'https://i.postimg.cc/WbxqZqsM/freepik-upload-35041.png',
      icon: Square,
    },
    {
      title: 'Tabiques Divisorios',
      description: 'Instalación de tabiques para división de espacios.',
      image: 'https://i.postimg.cc/3RCb40V1/freepik-upload-98997.png',
      icon: Layout,
    },
    {
      title: 'Techos Fijos',
      description: 'Montaje de techos fijos de yeso o pladur.',
      image: 'https://i.postimg.cc/2Skvrb7m/freepik-upload-3092.png',
      icon: HomeIcon,
    },
    {
      title: 'Albañilería',
      description: 'Servicios de albañilería para reformas y obra nueva.',
      image: 'https://i.postimg.cc/ryBt0tV5/freepik-upload-24488.png',
      icon: Hammer,
    },
    {
      title: 'Reformas en General',
      description: 'Renovación integral de viviendas y locales.',
      image: 'https://i.postimg.cc/NMH2p1B8/freepik-upload-33969.png',
      icon: Wrench,
    },
    {
      title: 'Chimeneas/Estufas',
      description: 'Instalación de chimeneas y estufas.',
      image: 'https://i.postimg.cc/W4tkqByH/freepik-upload-39701.png',
      icon: Flame,
    },
    {
      title: 'Aislamientos Acústicos',
      description: 'Instalación de materiales para reducir el ruido.',
      image: 'https://i.postimg.cc/25q1S4bp/freepik-upload-84757.png',
      icon: VolumeX,
    },
    {
      title: 'Aislamientos Térmicos',
      description: 'Aislamiento térmico para mejorar la eficiencia energética.',
      image: 'https://i.postimg.cc/4nC5WJDy/erik-mclean-a-Csh-Jn3y93s-unsplash.jpg',
      icon: Thermometer,
    },
    {
      title: 'Impermeabilizaciones',
      description: 'Protección contra humedad y filtraciones.',
      image: 'https://i.postimg.cc/GtDNLSrB/61003.jpg',
      icon: Droplets,
    },
    {
      title: 'Fontanería/Electricidad',
      description: 'Instalación y reparación de fontanería y electricidad.',
      image: 'https://i.postimg.cc/BbCTBxBY/pexels-ranjeet-860714737-27928761.jpg',
      icon: Zap,
    },
    {
      title: 'Alicatados',
      description: 'Instalación de azulejos y baldosas.',
      image: 'https://i.postimg.cc/rFZ3NcHG/freepik-upload-72167.png',
      icon: Grid,
    },
    {
      title: 'Parquet/Pintura',
      description: 'Colocación de parquet y pintura de interiores.',
      image: 'https://i.postimg.cc/QCmPPKqC/freepik-upload-71843.png',
      icon: Brush,
    },
  ];

  return (
    <>
      <SEO 
        title="Servicios de Construcción y Reformas | Plakor Divisiones"
        description="Ofrecemos servicios profesionales de pladur, reformas integrales, aislamientos y tabiquería en Tarragona. Presupuesto sin compromiso."
        keywords="servicios construcción, reformas integrales, pladur, aislamientos, Tarragona"
      />
      <div className="py-20 bg-white overflow-x-hidden">
        <section ref={ref} className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Servicios</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ofrecemos soluciones de construcción completas adaptadas a sus necesidades específicas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <button
              onClick={handleOpenModal}
              className="bg-cyan-700 text-white px-8 py-3 rounded-md hover:bg-cyan-800 transition-colors"
            >
              Solicitar presupuesto
            </button>
          </motion.div>
        </section>

        <RequestCallModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal}
          onSuccess={handleFormSuccess}
        />
      </div>
    </>
  );
};

export default Services;