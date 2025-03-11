'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const faqs = [
  {
    category: "Presupuestos y Plazos",
    questions: [
      {
        q: "¿Cómo solicitar un presupuesto para mi proyecto?",
        a: "El proceso es simple y sin compromiso:\n\n• Contacto inicial por teléfono o formulario\n• Visita técnica gratuita\n• Evaluación detallada del proyecto\n• Presupuesto desglosado en 24-48h\n• Resolución de dudas y ajustes\n\nNos adaptamos a tu presupuesto manteniendo la calidad."
      },
      {
        q: "¿Cuánto tiempo tarda una reforma completa?",
        a: "Los plazos varían según el proyecto:\n\n• Reformas pequeñas: 1-2 semanas\n• Reformas medias: 3-4 semanas\n• Reformas integrales: 6-8 semanas\n\nGarantizamos fechas de inicio y finalización por contrato."
      },
      {
        q: "¿Qué formas de pago aceptan?",
        a: "Ofrecemos opciones flexibles:\n\n• Pago por fases según avance\n• Financiación hasta 36 meses\n• Transferencia bancaria\n• Tarjeta de crédito/débito\n\nSin pagos finales hasta satisfacción completa."
      }
    ]
  },
  {
    category: "Pladur y Materiales",
    questions: [
      {
        q: "¿Por qué elegir Pladur para la construcción en seco en Tarragona?",
        a: "El Pladur ofrece múltiples ventajas:\n\n• Excelente aislamiento térmico y acústico\n• Instalación más rápida que materiales tradicionales\n• Acabado perfecto\n• Ideal para ocultar instalaciones\n• Versatilidad en diseños\n• Mejor relación calidad-precio\n• Material sostenible\n• Reformas más limpias"
      },
      {
        q: "¿Qué garantía ofrecen en sus trabajos de construcción y reforma?",
        a: "Ofrecemos una garantía completa:\n\n• 5 años en instalación\n• Materiales de primeras marcas\n• Profesionales cualificados\n• Servicio post-venta\n• Mantenimiento incluido\n\nTrabajamos solo con materiales certificados y proveedores de confianza."
      },
      {
        q: "¿Qué tipos de acabados y materiales ofrecen?",
        a: "Disponemos de una amplia gama:\n\n• Pladur resistente a la humedad\n• Pladur térmico y acústico\n• Acabados lisos o texturizados\n• Materiales sostenibles\n• Opciones ignífugas\n• Soluciones decorativas\n\nAsesoramos en la selección según necesidades y presupuesto."
      }
    ]
  },
  {
    category: "Servicios y Cobertura",
    questions: [
      {
        q: "¿En qué zonas de Tarragona realizan trabajos de reforma?",
        a: "Cubrimos toda la provincia de Tarragona:\n\n• Tarragona capital\n• Reus\n• Cambrils\n• Salou\n• Vila-seca\n• Torredembarra\n• Y poblaciones cercanas\n\nRealizamos proyectos en:\n• Viviendas\n• Locales comerciales\n• Oficinas\n• Comunidades"
      },
      {
        q: "¿Qué tipos de reformas y servicios ofrecen en Tarragona?",
        a: "Ofrecemos servicios integrales:\n\n• Reformas completas\n• Construcción en seco\n• Instalaciones\n• Aislamientos\n• Acabados\n• Cocinas y baños\n• Carpintería\n• Pintura\n\nNos adaptamos a cualquier tipo de proyecto."
      },
      {
        q: "¿Trabajan con comunidades de vecinos en Tarragona?",
        a: "Sí, realizamos proyectos para comunidades:\n\n• Rehabilitación de fachadas\n• Mejoras en zonas comunes\n• Instalaciones comunitarias\n• Accesibilidad\n• Eficiencia energética\n\nGestionamos subvenciones y ayudas disponibles."
      }
    ]
  }
];

export function FaqSection() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

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
            <p className="text-lg text-gray-600 mb-8">
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

          <div className="space-y-4">
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
                              <h3 className="text-lg font-medium text-gray-900 pr-8">
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
                                  <p className="text-gray-600 mt-2 whitespace-pre-line">
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