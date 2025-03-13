'use client';

import { Container } from "@/components/ui/container";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useDeviceOptimization } from "@/hooks/use-device-optimization";

// Структура данных для услуг с группировкой
const services = [
  {
    category: "Construcción en Seco",
    items: [
      {
        title: "Montajes de Pladur",
        description: "Instalación profesional de placas de yeso para tabiques, techos y trasdosados.",
        image: "/images/services/montajes-pladur.jpg",
        icon: "wall",
        id: "pladur"
      },
      {
        title: "Tabiques Divisorios",
        description: "Instalación de tabiques para división de espacios.",
        image: "/images/services/tabiques-divisorios.jpg",
        icon: "panel",
        id: "tabiques"
      },
      {
        title: "Techos Fijos",
        description: "Montaje de techos fijos de yeso o pladur.",
        image: "/images/services/techos-fijos.jpg",
        icon: "ceiling",
        id: "techos"
      }
    ]
  },
  {
    category: "Reformas y Remodelaciones",
    items: [
      {
        title: "Albañilería",
        description: "Servicios de albañilería para reformas y obra nueva.",
        image: "/images/services/albanileria.jpg",
        icon: "bricks",
        id: "albanileria"
      },
      {
        title: "Reformas en General",
        description: "Renovación integral de viviendas y locales.",
        image: "/images/services/reformas.jpg",
        icon: "renovation",
        id: "reformas"
      },
      {
        title: "Chimeneas/Estufas",
        description: "Instalación de chimeneas y estufas.",
        image: "/images/services/chimeneas.jpg",
        icon: "fireplace",
        id: "chimeneas"
      }
    ]
  },
  {
    category: "Aislamientos",
    items: [
      {
        title: "Aislamientos Acústicos",
        description: "Instalación de materiales para reducir el ruido.",
        image: "/images/services/aislamiento-acustico.jpg",
        icon: "sound",
        id: "aislamiento-acustico"
      },
      {
        title: "Aislamientos Térmicos",
        description: "Aislamiento térmico para mejorar la eficiencia energética.",
        image: "/images/services/aislamiento-termico.jpg",
        icon: "thermal",
        id: "aislamiento-termico"
      },
      {
        title: "Impermeabilizaciones",
        description: "Protección contra humedad y filtraciones.",
        image: "/images/services/impermeabilizacion.jpg",
        icon: "waterproof",
        id: "impermeabilizacion"
      }
    ]
  },
  {
    category: "Instalaciones",
    items: [
      {
        title: "Fontanería/Electricidad",
        description: "Instalación y reparación de fontanería y electricidad.",
        image: "/images/services/fontaneria-electricidad.jpg",
        icon: "utilities",
        id: "fontaneria-electricidad"
      }
    ]
  },
  {
    category: "Acabados y Decoración",
    items: [
      {
        title: "Alicatados",
        description: "Instalación de azulejos y baldosas.",
        image: "/images/services/alicatados.jpg",
        icon: "tiles",
        id: "alicatados"
      },
      {
        title: "Parquet/Pintura",
        description: "Colocación de parquet y pintura de interiores.",
        image: "/images/services/parquet-pintura.jpg",
        icon: "paint",
        id: "parquet-pintura"
      }
    ]
  }
];

export function Services() {
  const { getScrollAnimationSettings, imageSettings } = useDeviceOptimization();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-20 relative overflow-hidden">
      <Container>
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-6">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            Ofrecemos soluciones integrales en construcción en seco, reformas y acabados. 
            Calidad y profesionalidad garantizada en cada proyecto.
          </p>
        </motion.div>

        {services.map((category, categoryIndex) => (
          <div 
            key={category.category} 
            className="mb-20 last:mb-0"
            suppressHydrationWarning
          >
            <motion.h3
              {...getScrollAnimationSettings()}
              className="text-2xl md:text-3xl font-bold text-primary mb-8"
            >
              {category.category}
            </motion.h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((service, serviceIndex) => (
                <motion.div
                  key={service.title}
                  {...getScrollAnimationSettings(serviceIndex * 0.1)}
                  className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  suppressHydrationWarning
                >
                  <div className="relative h-48">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes={imageSettings.sizes}
                      className="object-cover"
                      quality={imageSettings.quality}
                      priority={serviceIndex < 3}
                      loading={serviceIndex < 3 ? "eager" : "lazy"}
                    />
                  </div>
                  
                  <div className="p-6" suppressHydrationWarning>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <Link 
                      href={`/servicios#${service.id}`}
                      className="text-primary hover:text-primary/80 font-medium inline-flex items-center transition-colors"
                      suppressHydrationWarning
                    >
                      Ver más
                      <svg 
                        className="w-4 h-4 ml-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
} 