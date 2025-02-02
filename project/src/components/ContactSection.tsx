import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin } from 'lucide-react';
import { api } from '../lib/api';

const ContactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio';
    }
    
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await api.contacto.create(formData);
      setSubmitSuccess(true);
      setFormData({ nombre: '', telefono: '', email: '', mensaje: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setErrors({ submit: 'Error al enviar el mensaje. Por favor, inténtelo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contacta con nosotros</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Póngase en contacto con nosotros con cualquier pregunta o consulta acerca de nuestros servicios.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white p-6 md:p-8 rounded-lg shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="nombre">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.nombre && (
                    <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="telefono">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.telefono && (
                    <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email (opcional)
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="mensaje">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  rows={4}
                  value={formData.mensaje}
                  onChange={(e) => setFormData(prev => ({ ...prev, mensaje: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.mensaje ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.mensaje && (
                  <p className="text-red-500 text-sm mt-1">{errors.mensaje}</p>
                )}
              </div>

              {errors.submit && (
                <p className="text-red-500 text-center">{errors.submit}</p>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </div>

              {submitSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 text-center font-medium"
                >
                  ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Map and Address */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
              <div className="flex items-start space-x-4 mb-4 md:mb-6">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-cyan-700 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1 md:mb-2">Ubicación</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Camí de Sant Joan, 4<br />
                    43391 Vinyols i els Arcs,<br />
                    España
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 mb-4 md:mb-6">
                <Phone className="w-5 h-5 md:w-6 md:h-6 text-cyan-700 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1 md:mb-2">Teléfono</h3>
                  <a href="tel:+34977350508" className="text-gray-600 hover:text-cyan-700 text-sm md:text-base">
                    +34 977 350 508
                  </a><br />
                  <a href="tel:+34646629414" className="text-gray-600 hover:text-cyan-700 text-sm md:text-base">
                    +34 646 629 414
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-cyan-700 flex-shrink-0" />
                <div className="w-full">
                  <h3 className="font-semibold text-lg mb-1 md:mb-2">Email</h3>
                  <a 
                    href="mailto:plakordivisiones@hotmail.com" 
                    className="text-gray-600 hover:text-cyan-700 text-sm md:text-base break-all"
                  >
                    plakordivisiones@hotmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Карта */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!4v1737477513500!6m8!1m7!1sZNiOntMvkSj1xDhJlU-TGA!2m2!1d41.07889977341467!2d1.060381155206556!3f79.93690559160865!4f-4.188574625260912!5f0.8092302647419771"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;