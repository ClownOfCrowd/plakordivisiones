'use client';

import { Container } from "@/components/ui/container";
import { motion, useReducedMotion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useRef, useCallback, useMemo } from "react";
import { ServiceModal } from "@/components/ui/service-modal";

// Расширяем интерфейс услуги
interface Service {
  title: string;
  description: string;
  image: string;
  icon: string;
  features: string[];
  longDescription?: string;
  benefits?: string[];
  process?: {
    title: string;
    description: string;
  }[];
}

interface Category {
  category: string;
  description: string;
  items: Service[];
}

// Добавляем подробные описания для услуг
const services: Category[] = [
  {
    category: "Construcción en Seco",
    description: "Especialistas en sistemas de construcción en seco, ofreciendo soluciones modernas y eficientes.",
    items: [
      {
        title: "Montajes de Pladur",
        description: "Instalación profesional de placas de yeso para tabiques, techos y trasdosados.",
        image: "/services/montajes-pladur.jpg",
        icon: "wall",
        features: [
          "Tabiques divisorios",
          "Trasdosados",
          "Techos continuos",
          "Acabados perfectos"
        ],
        longDescription: `Somos especialistas en la instalación de sistemas de pladur, ofreciendo soluciones completas para todo tipo de espacios. Nuestro equipo altamente cualificado garantiza un acabado perfecto en cada proyecto.

Utilizamos materiales de primera calidad y las técnicas más avanzadas para asegurar resultados duraderos y profesionales.`,
        benefits: [
          "Excelente aislamiento térmico y acústico",
          "Instalación rápida y limpia",
          "Versatilidad en diseños",
          "Acabados perfectos",
          "Materiales certificados",
          "Garantía profesional"
        ],
        process: [
          {
            title: "Evaluación inicial",
            description: "Visitamos el espacio y realizamos mediciones precisas"
          },
          {
            title: "Planificación",
            description: "Diseñamos la solución más adecuada para su proyecto"
          },
          {
            title: "Instalación",
            description: "Ejecutamos el trabajo con máxima precisión y limpieza"
          },
          {
            title: "Control de calidad",
            description: "Verificamos cada detalle para garantizar un acabado perfecto"
          }
        ]
      },
      {
        title: "Tabiques Divisorios",
        description: "Instalación de tabiques para división de espacios.",
        image: "/services/tabiques-divisorios.jpg",
        icon: "panel",
        features: [
          "División de espacios",
          "Aislamiento acústico",
          "Diferentes acabados",
          "Instalación rápida"
        ]
      },
      {
        title: "Techos Fijos",
        description: "Montaje de techos fijos de yeso o pladur.",
        image: "/services/techos-fijos.jpg",
        icon: "ceiling",
        features: [
          "Techos continuos",
          "Iluminación integrada",
          "Aislamiento térmico",
          "Diseños personalizados"
        ]
      }
    ]
  },
  {
    category: "Reformas y Remodelaciones",
    description: "Servicios integrales de reforma para renovar y mejorar espacios residenciales y comerciales.",
    items: [
      {
        title: "Albañilería",
        description: "Servicios de albañilería para reformas y obra nueva.",
        image: "/services/albanileria.jpg",
        icon: "bricks",
        features: [
          "Construcción de muros",
          "Reparaciones",
          "Obra nueva",
          "Rehabilitaciones"
        ]
      },
      {
        title: "Reformas en General",
        description: "Renovación integral de viviendas y locales.",
        image: "/services/reformas.jpg",
        icon: "renovation",
        features: [
          "Reformas integrales",
          "Cocinas y baños",
          "Espacios comerciales",
          "Proyectos personalizados"
        ]
      },
      {
        title: "Chimeneas/Estufas",
        description: "Instalación de chimeneas y estufas.",
        image: "/services/chimeneas.jpg",
        icon: "fireplace",
        features: [
          "Instalación de chimeneas",
          "Montaje de estufas",
          "Mantenimiento",
          "Asesoramiento técnico"
        ]
      }
    ]
  },
  {
    category: "Aislamientos",
    description: "Soluciones profesionales de aislamiento para mejorar el confort y la eficiencia energética.",
    items: [
      {
        title: "Aislamientos Acústicos",
        description: "Instalación de materiales para reducir el ruido.",
        image: "/services/aislamiento-acustico.jpg",
        icon: "sound",
        features: [
          "Reducción de ruido",
          "Materiales especializados",
          "Soluciones para viviendas",
          "Espacios comerciales"
        ]
      },
      {
        title: "Aislamientos Térmicos",
        description: "Aislamiento térmico para mejorar la eficiencia energética.",
        image: "/services/aislamiento-termico.jpg",
        icon: "thermal",
        features: [
          "Ahorro energético",
          "Confort térmico",
          "Materiales ecológicos",
          "Certificación energética"
        ]
      },
      {
        title: "Impermeabilizaciones",
        description: "Protección contra humedad y filtraciones.",
        image: "/services/impermeabilizacion.jpg",
        icon: "waterproof",
        features: [
          "Impermeabilización",
          "Prevención de humedades",
          "Tratamientos especiales",
          "Garantía de calidad"
        ]
      }
    ]
  },
  {
    category: "Instalaciones",
    description: "Servicios profesionales de instalación y mantenimiento de sistemas básicos.",
    items: [
      {
        title: "Fontanería/Electricidad",
        description: "Instalación y reparación de fontanería y electricidad.",
        image: "/services/fontaneria-electricidad.jpg",
        icon: "utilities",
        features: [
          "Instalaciones nuevas",
          "Reparaciones",
          "Mantenimiento",
          "Certificaciones"
        ]
      }
    ]
  },
  {
    category: "Acabados y Decoración",
    description: "Servicios de acabados y decoración para dar el toque final a su espacio.",
    items: [
      {
        title: "Alicatados",
        description: "Instalación de azulejos y baldosas.",
        image: "/services/alicatados.jpg",
        icon: "tiles",
        features: [
          "Colocación de azulejos",
          "Diseños personalizados",
          "Materiales de calidad",
          "Acabados perfectos"
        ]
      },
      {
        title: "Parquet/Pintura",
        description: "Colocación de parquet y pintura de interiores.",
        image: "/services/parquet-pintura.jpg",
        icon: "paint",
        features: [
          "Instalación de parquet",
          "Pintura interior",
          "Acabados decorativos",
          "Variedad de estilos"
        ]
      }
    ]
  }
];

// Оптимизированные варианты анимаций
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8
    }
  }
};

export function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Оптимизированный параллакс эффект
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Мемоизированная фильтрация услуг
  const filteredServices = useMemo(() => 
    activeCategory === "all"
      ? services
      : services.filter(cat => cat.category === activeCategory),
    [activeCategory]
  );

  // Оптимизированный обработчик выбора категории
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  return (
    <>
      <section className="relative pt-32 pb-20" ref={containerRef}>
        {/* Оптимизированный фоновый градиент */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white pointer-events-none"
          aria-hidden="true"
        />

        <Container>
          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="transform-gpu"
          >
            <motion.div
              variants={itemVariants}
              className="text-center mb-16"
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-primary mb-6"
                style={{ y }}
              >
                Nuestros Servicios
              </motion.h1>
              <p className="text-lg text-secondary max-w-3xl mx-auto">
                Ofrecemos una amplia gama de servicios profesionales en construcción, 
                reformas y acabados. Más de 15 años de experiencia nos avalan.
              </p>
            </motion.div>

            {/* Оптимизированный фильтр категорий */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                variant={activeCategory === "all" ? "default" : "outline"}
                onClick={() => handleCategoryChange("all")}
                className="min-w-[120px] transform-gpu"
              >
                Todos
              </Button>
              {services.map((category) => (
                <Button
                  key={category.category}
                  variant={activeCategory === category.category ? "default" : "outline"}
                  onClick={() => handleCategoryChange(category.category)}
                  className="min-w-[120px] transform-gpu"
                >
                  {category.category}
                </Button>
              ))}
            </div>

            {/* Оптимизированный список услуг */}
            {filteredServices.map((category, categoryIndex) => (
              <div 
                key={category.category} 
                className="mb-20 last:mb-0"
                id={category.category.toLowerCase().replace(/ /g, '-')}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="mb-12 transform-gpu"
                >
                  <motion.h2 
                    className="text-3xl font-bold text-primary mb-4"
                    style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30 * (categoryIndex + 1)]) }}
                  >
                    {category.category}
                  </motion.h2>
                  <p className="text-lg text-secondary max-w-3xl">
                    {category.description}
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((service, serviceIndex) => (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: serviceIndex * 0.1 }}
                      className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu"
                      onClick={() => setSelectedService(service)}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105 will-change-transform"
                          loading={serviceIndex < 6 ? "eager" : "lazy"}
                          quality={85}
                        />
                        <div 
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          aria-hidden="true"
                        >
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-white text-sm">Click para más detalles</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-primary mb-3">
                          {service.title}
                        </h3>
                        <p className="text-secondary mb-4">
                          {service.description}
                        </p>

                        <ul className="space-y-2 mb-6">
                          {service.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-center text-secondary">
                              <svg
                                className="w-5 h-5 text-primary mr-2 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <Button 
                          variant="outline"
                          className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                        >
                          Ver más detalles
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}

            {/* Оптимизированный CTA блок */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="mt-16 text-center transform-gpu"
            >
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  ¿Necesita un servicio personalizado?
                </h2>
                <p className="text-lg text-secondary mb-8">
                  Contáctenos para discutir su proyecto y obtener un presupuesto gratuito
                </p>
                <Link href="/contacto">
                  <Button variant="cta" size="lg">
                    Contactar ahora
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <AnimatePresence mode="wait">
        {selectedService && (
          <ServiceModal
            key="service-modal"
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
} 