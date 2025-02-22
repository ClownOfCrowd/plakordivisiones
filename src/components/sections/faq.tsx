'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const faqs = [
  {
    category: "Presupuestos y Plazos",
    questions: [
      {
        q: "¿Cuánto cuesta una reforma completa en Tarragona?",
        a: "El coste depende de varios factores como el tamaño del espacio, materiales seleccionados y complejidad del proyecto. Para una vivienda estándar en Tarragona, los precios pueden oscilar entre 500-700€/m². Ofrecemos presupuestos personalizados sin compromiso, incluyendo:\n\n• Evaluación detallada del espacio\n• Propuesta de materiales de primera calidad\n• Planificación de trabajos\n• Mano de obra profesional\n• Gestión de residuos",
        cta: "Solicitar Presupuesto Gratuito"
      },
      {
        q: "¿Cuál es el plazo medio de una reforma integral en Tarragona?",
        a: "Los plazos varían según el alcance del proyecto:\n\n• Reforma básica: 2-3 semanas\n• Reforma integral de vivienda: 2-3 meses\n• Reforma comercial: 1-2 meses\n\nProporcionamos un cronograma detallado que incluye:\n• Fase de demolición\n• Instalaciones nuevas\n• Acabados\n• Limpieza final",
        cta: "Consultar Plazos Específicos"
      },
      {
        q: "¿Realizan presupuestos detallados por fases?",
        a: "Sí, desglosamos el presupuesto por partidas incluyendo:\n\n• Costes de materiales\n• Mano de obra\n• Instalaciones\n• Acabados\n• Gestión de residuos\n\nEsto permite adaptar el proyecto a diferentes presupuestos y planificar las fases según tus necesidades.",
        cta: "Solicitar Presupuesto Desglosado"
      }
    ]
  },
  {
    category: "Pladur y Materiales",
    questions: [
      {
        q: "¿Por qué elegir Pladur para la construcción en seco en Tarragona?",
        a: "El Pladur ofrece múltiples ventajas:\n\n• Excelente aislamiento térmico y acústico\n• Instalación más rápida que materiales tradicionales\n• Acabado perfecto\n• Ideal para ocultar instalaciones\n• Versatilidad en diseños\n• Mejor relación calidad-precio\n• Material sostenible\n• Reformas más limpias",
        cta: "Ver Proyectos con Pladur"
      },
      {
        q: "¿Qué garantía ofrecen en sus trabajos de construcción y reforma?",
        a: "Ofrecemos una garantía completa:\n\n• 5 años en instalación\n• Materiales de primeras marcas\n• Profesionales cualificados\n• Servicio post-venta\n• Mantenimiento incluido\n\nTrabajamos solo con materiales certificados y proveedores de confianza.",
        cta: "Consultar Garantías"
      },
      {
        q: "¿Qué tipos de acabados y materiales ofrecen?",
        a: "Disponemos de una amplia gama:\n\n• Pladur resistente a la humedad\n• Pladur térmico y acústico\n• Acabados lisos o texturizados\n• Materiales sostenibles\n• Opciones ignífugas\n• Soluciones decorativas\n\nAsesoramos en la selección según necesidades y presupuesto.",
        cta: "Ver Catálogo de Materiales"
      }
    ]
  },
  {
    category: "Proceso de Trabajo",
    questions: [
      {
        q: "¿Cómo es el proceso de inicio de una obra en Tarragona?",
        a: "Seguimos un proceso estructurado:\n\n1. Visita técnica gratuita\n2. Presupuesto detallado\n3. Planificación del proyecto\n4. Gestión de licencias\n5. Inicio de obras\n6. Supervisión continua\n7. Control de calidad\n8. Entrega final",
        cta: "Programar Visita Técnica"
      },
      {
        q: "¿Gestionan los permisos necesarios para obras en Tarragona?",
        a: "Sí, nos encargamos de toda la gestión administrativa:\n\n• Licencias de obra\n• Permisos municipales\n• Certificaciones necesarias\n• Documentación técnica\n• Gestión con comunidades\n\nTrabajamos con arquitectos y aparejadores locales.",
        cta: "Consultar Requisitos"
      },
      {
        q: "¿Cómo garantizan la calidad durante la ejecución?",
        a: "Implementamos un sistema de control riguroso:\n\n• Supervisión diaria\n• Controles de calidad\n• Documentación fotográfica\n• Informes de progreso\n• Certificaciones de materiales\n• Pruebas de instalaciones",
        cta: "Ver Proceso de Calidad"
      }
    ]
  },
  {
    category: "Servicios y Cobertura",
    questions: [
      {
        q: "¿En qué zonas de Tarragona realizan trabajos de reforma?",
        a: "Cubrimos toda la provincia de Tarragona:\n\n• Tarragona capital\n• Reus\n• Cambrils\n• Salou\n• Vila-seca\n• Torredembarra\n• Y poblaciones cercanas\n\nRealizamos proyectos en:\n• Viviendas\n• Locales comerciales\n• Oficinas\n• Comunidades",
        cta: "Verificar Cobertura"
      },
      {
        q: "¿Qué tipos de reformas y servicios ofrecen en Tarragona?",
        a: "Ofrecemos servicios integrales:\n\n• Reformas completas\n• Construcción en seco\n• Instalaciones\n• Aislamientos\n• Acabados\n• Cocinas y baños\n• Carpintería\n• Pintura\n\nNos adaptamos a cualquier tipo de proyecto.",
        cta: "Ver Todos los Servicios"
      },
      {
        q: "¿Trabajan con comunidades de vecinos en Tarragona?",
        a: "Sí, realizamos proyectos para comunidades:\n\n• Rehabilitación de fachadas\n• Mejoras en zonas comunes\n• Instalaciones comunitarias\n• Accesibilidad\n• Eficiencia energética\n\nGestionamos subvenciones y ayudas disponibles.",
        cta: "Consultar para Comunidades"
      }
    ]
  }
];

export function FaqSection() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const router = useRouter();

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/contacto');
  };

  return (
    <section className="pt-32 pb-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Preguntas Frecuentes
            </h1>
            <p className="text-lg text-secondary mb-8">
              Resolvemos tus dudas sobre reformas, instalaciones y servicios
            </p>
            <Link href="/contacto">
              <Button 
                variant="cta" 
                size="lg"
              >
                ¿No encuentras tu pregunta? Contáctanos
              </Button>
            </Link>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((category) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenCategory(
                    openCategory === category.category ? null : category.category
                  )}
                  className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <h2 className="text-xl font-semibold text-primary">
                    {category.category}
                  </h2>
                  <svg
                    className={`w-6 h-6 transform transition-transform ${
                      openCategory === category.category ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <AnimatePresence>
                  {openCategory === category.category && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 space-y-4">
                        {category.questions.map((item) => (
                          <div key={item.q} className="border-b last:border-0 pb-4 last:pb-0">
                            <button
                              onClick={() => setOpenQuestion(
                                openQuestion === item.q ? null : item.q
                              )}
                              className="w-full text-left flex justify-between items-center py-2"
                            >
                              <h3 className="text-lg font-medium pr-8">
                                {item.q}
                              </h3>
                              <svg
                                className={`w-5 h-5 transform transition-transform ${
                                  openQuestion === item.q ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>

                            <AnimatePresence>
                              {openQuestion === item.q && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-secondary mt-2 whitespace-pre-line">
                                    {item.a}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
} 