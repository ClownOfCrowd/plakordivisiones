import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X } from 'lucide-react';
import { api } from '../lib/api';
import type { Project } from '../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/swiper-custom.css';
import SEO from '../components/SEO';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.projects.getAll();
        console.log('Полученные данные:', data);
        setProjects(data);
      } catch (err) {
        setError('Error al cargar los proyectos');
        console.error('Ошибка загрузки:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  // Добавим эффект для блокировки прокрутки
  useEffect(() => {
    if (proyectoSeleccionado) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [proyectoSeleccionado]);

  return (
    <div className="py-20 overflow-x-hidden">
      <SEO 
        title="Proyectos - Plakor Divisiones | Galería de Trabajos"
        description="Explore nuestra galería de proyectos completados. Reformas, construcciones y remodelaciones en Cambrils y alrededores."
        keywords="proyectos, reformas, construcción, galería, trabajos, Cambrils"
        url="https://plakordivisiones.es/proyectos"
      />
      <section ref={ref} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Nuestros Proyectos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore nuestra colección de proyectos completados y descubra cómo transformamos espacios.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="group relative bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => setProyectoSeleccionado(project)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_API_URL}${project.Image.url}`}
                  alt={project.Title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 filter contrast-[1.05] saturate-[1.1]"
                  style={{
                    imageRendering: 'crisp-edges',
                    WebkitFontSmoothing: 'antialiased'
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-center px-4">
                    Haz clic para ver más
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.Title}</h3>
                <p className="text-gray-600">{project.Description}</p>
                <span className="inline-block mt-3 text-sm bg-cyan-700 text-white px-3 py-1 rounded-full">
                  {project.Category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lighbox con botón de cierre */}
        <AnimatePresence>
          {proyectoSeleccionado && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gradient-to-b from-black to-gray-900 md:bg-black/90 z-50 flex flex-col md:items-center md:justify-center overflow-hidden"
              onClick={() => setProyectoSeleccionado(null)}
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                className="relative w-full h-full md:max-w-4xl md:h-auto md:rounded-lg overflow-hidden flex flex-col bg-gradient-to-b from-gray-900 to-black md:bg-white"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setProyectoSeleccionado(null)}
                  className="absolute top-6 right-6 z-10 p-2.5 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/75 transition-all duration-300"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  className="w-full flex-1"
                >
                  <SwiperSlide>
                    <div className="relative h-full">
                      <img
                        src={`${import.meta.env.VITE_API_URL}${proyectoSeleccionado.Image.url}`}
                        alt={proyectoSeleccionado.Title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:from-transparent" />
                    </div>
                  </SwiperSlide>
                  
                  {proyectoSeleccionado.Gallery?.map((image) => (
                    <SwiperSlide key={image.id}>
                      <div className="relative h-full">
                        <img
                          src={`${import.meta.env.VITE_API_URL}${image.url}`}
                          alt={proyectoSeleccionado.Title}
                          className="w-full h-full object-cover filter contrast-[1.05] saturate-[1.1] brightness-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="relative p-6 text-white md:text-gray-800 md:bg-white">
                  <span className="inline-block text-sm bg-cyan-700 text-white px-3 py-1 rounded-full md:mt-4 mb-4 md:mb-0 font-medium md:float-right">
                    {proyectoSeleccionado.Category}
                  </span>
                  <h3 className="text-2xl font-bold mb-3 leading-tight">
                    {proyectoSeleccionado.Title}
                  </h3>
                  <p className="text-gray-300 md:text-gray-600 leading-relaxed">
                    {proyectoSeleccionado.Description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Projects;