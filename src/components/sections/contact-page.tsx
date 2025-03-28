'use client';

import { Container } from '@/components/ui/container';
import { ContactForm } from '@/components/ui/contact-form';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCallback, useState, useEffect } from 'react';

export function ContactPage() {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Мемоизированные обработчики
  const handlePhoneClick = useCallback((phone: string) => {
    window.location.href = `tel:${phone}`;
  }, []);

  const handleEmailClick = useCallback((email: string) => {
    window.location.href = `mailto:${email}`;
  }, []);

  const handleWhatsAppClick = useCallback((phone: string) => {
    window.location.href = `https://wa.me/${phone}`;
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" />
    );
  }

  return (
    <>
      {/* Hero секция */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white pt-32 pb-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="will-change-transform"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Contacta con Nosotros
              </h1>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Estamos aquí para ayudarte con tu proyecto. Contáctanos para obtener 
                un presupuesto gratuito o resolver cualquier duda que tengas.
              </p>
            </motion.div>

            {/* Карточки с контактной информацией */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow will-change-transform"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">Teléfono</h3>
                    <button 
                      onClick={() => handlePhoneClick('+34977350508')}
                      className="text-primary hover:underline block font-medium"
                      aria-label="Llamar al teléfono principal"
                    >
                      +34 977 350 508
                    </button>
                    <button 
                      onClick={() => handlePhoneClick('+34646829414')}
                      className="text-primary hover:underline block font-medium"
                      aria-label="Llamar al teléfono móvil"
                    >
                      +34 646 829 414
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow will-change-transform"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">Email</h3>
                    <button 
                      onClick={() => handleEmailClick('plakordivisiones@hotmail.com')}
                      className="text-primary hover:underline break-all font-medium"
                      aria-label="Enviar email"
                    >
                      plakordivisiones@hotmail.com
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow will-change-transform"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">Dirección</h3>
                    <address className="text-gray-700 not-italic">
                      Camí de Sant Joan, 4<br />
                      43391 Vinyols i els Arcs<br />
                      Tarragona
                    </address>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow will-change-transform"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">Horario</h3>
                    <dl className="text-gray-700">
                      <dt className="font-medium">Lun-Vie:</dt>
                      <dd className="mb-1">8:00 - 19:00</dd>
                      <dt className="font-medium">Sáb-Dom:</dt>
                      <dd>Cerrado</dd>
                    </dl>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Основной контент */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Форма обратной связи */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-8 will-change-transform"
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Enviar mensaje
                  </h2>
                  <p className="text-gray-700">
                    Rellena el formulario y nos pondremos en contacto contigo 
                    lo antes posible
                  </p>
                </div>
                <ContactForm />
              </motion.div>

              {/* Карта и дополнительная информация */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-8 will-change-transform"
              >
                {/* Google Maps */}
                <div className="rounded-2xl overflow-hidden shadow-xl bg-white h-[400px] md:h-[450px] relative">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!4v1741861696561!6m8!1m7!1sZNiOntMvkSj1xDhJlU-TGA!2m2!1d41.07890006544189!2d1.060382835849338!3f79.26030161364187!4f-6.932106169967341!5f0.7820865974627469" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 z-10"
                    title="Plakor Divisiones Location"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-0">
                    <div className="text-center p-4">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        Cargando mapa...
                      </p>
                      <p className="text-sm text-gray-600">
                        Camí de Sant Joan, 4<br />
                        43391 Vinyols i els Arcs<br />
                        Tarragona
                      </p>
                    </div>
                  </div>
                </div>

                {/* Дополнительная информация */}
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    ¿Por qué elegirnos?
                  </h3>
                  <ul className="space-y-4">
                    {[
                      'Más de 15 años de experiencia en el sector',
                      'Profesionales cualificados y materiales de primera calidad',
                      'Presupuestos detallados sin compromiso',
                      'Servicio personalizado y atención al cliente excepcional'
                    ].map((text, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <p className="text-gray-700">{text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Призыв к действию */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="will-change-transform"
          >
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center">
                ¿Necesitas un presupuesto rápido?
              </h2>
              <p className="text-lg text-secondary mb-8 text-center">
                Llámanos ahora y te atenderemos inmediatamente.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={() => handlePhoneClick('+34977350508')}
                  className="min-w-[200px] font-medium"
                >
                  Llamar ahora
                </Button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
} 