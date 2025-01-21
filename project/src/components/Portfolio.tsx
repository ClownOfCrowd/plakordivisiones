import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const portfolioItems = [
  {
    id: 1,
    title: 'Modern Office Complex',
    description: 'A state-of-the-art office building with sustainable design',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
    category: 'Commercial',
  },
  {
    id: 2,
    title: 'Luxury Residence',
    description: 'Custom-built luxury home with premium finishes',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
    category: 'Residential',
  },
  {
    id: 3,
    title: 'Industrial Facility',
    description: 'Modern industrial complex with advanced infrastructure',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80',
    category: 'Industrial',
  },
  {
    id: 4,
    title: 'Shopping Center',
    description: 'Multi-level retail space with contemporary design',
    image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&q=80',
    category: 'Commercial',
  },
  {
    id: 5,
    title: 'Apartments',
    description: 'Modern residential complex with amenities',
    image: 'https://i.postimg.cc/SNcyxgxb/seungcheol-baek-f-Hw-Sf-Nzr98-unsplash.jpg',
    category: 'Residential',
  },
  {
    id: 6,
    title: 'Educational Campus',
    description: 'State-of-the-art educational facility',
    image: 'https://images.unsplash.com/photo-1562886877-f12251816e01?auto=format&fit=crop&q=80',
    category: 'Institutional',
  },
];

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
            Explore nuestra amplia gama de proyectos de construcción que muestran nuestra experiencia y compromiso con la calidad
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
          {portfolioItems.map((item) => (
            <SwiperSlide key={item.id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-lg shadow-lg"
              >
                <div className="aspect-w-16 aspect-h-12">
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

          {/* Кастомные кнопки навигации с Tailwind CSS */}
          <div className="swiper-button-next bg-gradient-to-r from-cyan-700 to-cyan-800 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg opacity-50 hover:opacity-100 hover:from-cyan-800 hover:to-cyan-900 hover:shadow-xl hover:scale-110 transition-all duration-300">
            &rarr; {/* Большая стрелка вправо */}
          </div>
          <div className="swiper-button-prev bg-gradient-to-r from-cyan-700 to-cyan-800 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg opacity-50 hover:opacity-100 hover:from-cyan-800 hover:to-cyan-900 hover:shadow-xl hover:scale-110 transition-all duration-300">
            &larr; {/* Большая стрелка влево */}
          </div>
        </Swiper>
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