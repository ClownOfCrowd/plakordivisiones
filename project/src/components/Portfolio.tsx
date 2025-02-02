import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 'casino-reus',
    title: 'Reforma integral casino de Reus',
    description: 'Reforma integral del casino de Reus, combinando historia y modernidad en un espacio exclusivo',
    category: 'Comercial',
    image: 'https://i.ibb.co/ksmcF2Vy/pixelcut-export2.jpg'
  },
  {
    id: 1,
    title: 'Instalación de estufa en Chalet de Altafulla',
    description: 'Calidez y confort en casa – Instalación de estufa en chalet de Altafulla, combinando eficiencia y estilo para un ambiente acogedor',
    image: 'https://i.ibb.co/DfZ2fBwh/5260402358922374205.jpg',
    category: 'Residencial',
  },
  {
    id: 2,
    title: 'Instalación de chimenea en salón',
    description: 'Elegancia y funcionalidad se unen para crear un espacio cálido y sofisticado',
    image: 'https://i.ibb.co/0jRWDXr9/pixelcut-export.jpg',
    category: 'Residencial',
  },
  
 
];

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="relative group">
      <img 
        src={project.image} 
        alt={project.title}
        className="w-full h-[300px] object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-center items-center text-white p-4">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm text-center mb-2">{project.description}</p>
        <span className="text-sm font-medium px-3 py-1 bg-primary rounded-full">
          {project.category}
        </span>
      </div>
    </div>
  );
};

const Portfolio = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Portafolio</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubra nuestros proyectos más destacados
          </p>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="relative"
        >
          {projects.map((item) => (
            <SwiperSlide key={item.id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-lg shadow-lg"
              >
                {/* Фиксируем высоту контейнера изображения */}
                <div className="h-64"> {/* Высота 16rem (256px) */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-6 text-white"
                >
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.description}</p>
                    <span className="inline-block mt-3 text-sm bg-cyan-700 px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}

          {/* Оригинальные кнопки навигации Swiper */}
          <div className="swiper-button-next bg-gradient-to-r from-cyan-700 to-cyan-800 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg opacity-50 hover:opacity-100 hover:from-cyan-800 hover:to-cyan-900 hover:shadow-xl hover:scale-110 transition-all duration-300">
            &rarr; {/* Большая стрелка вправо */}
          </div>
          <div className="swiper-button-prev bg-gradient-to-r from-cyan-700 to-cyan-800 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg opacity-50 hover:opacity-100 hover:from-cyan-800 hover:to-cyan-900 hover:shadow-xl hover:scale-110 transition-all duration-300">
            &larr; {/* Большая стрелка влево */}
          </div>
        </Swiper>

        {/* Добавляем кнопку */}
        <div className="text-center mt-12">
          <Link 
            to="/projects"
            className="inline-flex items-center px-8 py-3 bg-cyan-700 text-white rounded-md hover:bg-cyan-800 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Ver todos los proyectos
            <svg 
              className="ml-2 w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Скрываем стандартные иконки Swiper */}
      <style>
        {`
          .swiper-button-next::after,
          .swiper-button-prev::after {
            display: none; /* Скрываем стандартные иконки Swiper */
          }
        `}
      </style>
    </section>
  );
};

export default Portfolio;