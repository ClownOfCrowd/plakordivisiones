'use client';

import { Container } from "@/components/ui/container";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
        link: "/servicios#pladur"
      },
      {
        title: "Tabiques Divisorios",
        description: "Instalación de tabiques para división de espacios.",
        image: "/images/services/tabiques-divisorios.jpg",
        icon: "panel",
        link: "/servicios#tabiques"
      },
      {
        title: "Techos Fijos",
        description: "Montaje de techos fijos de yeso o pladur.",
        image: "/images/services/techos-fijos.jpg",
        icon: "ceiling",
        link: "/servicios#techos"
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
        link: "/servicios#albanileria"
      },
      {
        title: "Reformas en General",
        description: "Renovación integral de viviendas y locales.",
        image: "/images/services/reformas.jpg",
        icon: "renovation",
        link: "/servicios#reformas"
      },
      {
        title: "Chimeneas/Estufas",
        description: "Instalación de chimeneas y estufas.",
        image: "/images/services/chimeneas.jpg",
        icon: "fireplace",
        link: "/servicios#chimeneas"
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
        link: "/servicios#aislamiento-acustico"
      },
      {
        title: "Aislamientos Térmicos",
        description: "Aislamiento térmico para mejorar la eficiencia energética.",
        image: "/images/services/aislamiento-termico.jpg",
        icon: "thermal",
        link: "/servicios#aislamiento-termico"
      },
      {
        title: "Impermeabilizaciones",
        description: "Protección contra humedad y filtraciones.",
        image: "/images/services/impermeabilizacion.jpg",
        icon: "waterproof",
        link: "/servicios#impermeabilizacion"
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
        link: "/servicios#fontaneria-electricidad"
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
        link: "/servicios#alicatados"
      },
      {
        title: "Parquet/Pintura",
        description: "Colocación de parquet y pintura de interiores.",
        image: "/images/services/parquet-pintura.jpg",
        icon: "paint",
        link: "/servicios#parquet-pintura"
      }
    ]
  }
];

export function Services() {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1], // cubic-bezier
      }
    }
  };

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
          <div key={category.category} className="mb-20 last:mb-0">
            <motion.h3
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-2xl font-bold text-primary mb-8"
            >
              {category.category}
            </motion.h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((service, serviceIndex) => (
                <motion.div
                  key={service.title}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ 
                    once: true, 
                    margin: "-50px",
                    amount: 0.3 // Триггерит анимацию когда 30% элемента видно
                  }}
                  custom={serviceIndex}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu will-change-transform"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform"
                      priority={serviceIndex < 3} // Приоритетная загрузка первых трех изображений
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6">
                    <h4 className="text-xl font-bold text-primary mb-3">
                      {service.title}
                    </h4>
                    <p className="text-secondary mb-4">
                      {service.description}
                    </p>
                    <Link href={service.link}>
                      <Button 
                        variant="outline"
                        className="w-full group-hover:bg-primary group-hover:text-white text-primary border-primary transition-colors"
                      >
                        Más información
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* CTA секция */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              ¿Necesita un servicio personalizado?
            </h3>
            <p className="text-lg text-secondary mb-8">
              Contáctenos para discutir su proyecto y obtener un presupuesto gratuito
            </p>
            <Link href="/contacto">
              <Button variant="cta" size="lg">
                Solicitar Presupuesto
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
} 