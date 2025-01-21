import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X } from 'lucide-react';

interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  categoria: string;
}

const proyectos: Proyecto[] = [
  {
    id: 1,
    titulo: 'Complejo de oficinas modernas',
    descripcion: 'Un edificio de oficinas moderno con diseño sostenible',
    imagen: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
    categoria: 'Comercial',
  },
  {
    id: 2,
    titulo: 'Residencia de lujo',
    descripcion: 'Casa de lujo personalizada con acabados premium',
    imagen: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
    categoria: 'Residencial',
  },
  {
    id: 3,
    titulo: 'Instalación industrial',
    descripcion: 'Complejo industrial moderno con infraestructura avanzada',
    imagen: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80',
    categoria: 'Industrial',
  },
  {
    id: 4,
    titulo: 'Centro comercial',
    descripcion: 'Espacio comercial de varios niveles con diseño contemporáneo',
    imagen: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&q=80',
    categoria: 'Comercial',
  },
  {
    id: 5,
    titulo: 'Apartamentos',
    descripcion: 'Complejo residencial moderno con servicios incluidos',
    imagen: 'https://i.postimg.cc/SNcyxgxb/seungcheol-baek-f-Hw-Sf-Nzr98-unsplash.jpg',
    categoria: 'Residencial',
  },
  {
    id: 6,
    titulo: 'Campus educativo',
    descripcion: 'Instalaciones educativas de última generación',
    imagen:'https://i.postimg.cc/25k29y7S/ludovic-charlet-LFWF2tm-Df-X0-unsplash.jpg',
    categoria: 'Institucional',
  },                    
];

const Proyectos = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto | null>(null);

  return (
    <div className="py-20 overflow-x-hidden">
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
          {proyectos.map((proyecto) => (
            <motion.div
              key={proyecto.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="group relative bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => setProyectoSeleccionado(proyecto)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={proyecto.imagen}
                  alt={proyecto.titulo}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-center px-4">
                    Haz clic para ver más
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{proyecto.titulo}</h3>
                <p className="text-gray-600">{proyecto.descripcion}</p>
                <span className="inline-block mt-3 text-sm bg-cyan-700 text-white px-3 py-1 rounded-full">
                  {proyecto.categoria}
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
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setProyectoSeleccionado(null)}
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Botón de cierre con posicionamiento adaptativo */}
                <button
                  onClick={() => setProyectoSeleccionado(null)}
                  className="absolute top-4 right-4 lg:top-6 lg:right-6 p-2 bg-gray-800 bg-opacity-75 rounded-full hover:bg-opacity-100 transition-all duration-300 z-50"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                <img
                  src={proyectoSeleccionado.imagen}
                  alt={proyectoSeleccionado.titulo}
                  className="w-full h-auto object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{proyectoSeleccionado.titulo}</h3>
                  <p className="text-gray-600">{proyectoSeleccionado.descripcion}</p>
                  <span className="inline-block mt-3 text-sm bg-cyan-700 text-white px-3 py-1 rounded-full">
                    {proyectoSeleccionado.categoria}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Proyectos;