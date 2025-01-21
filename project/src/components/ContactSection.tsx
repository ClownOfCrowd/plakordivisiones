import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
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
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 text-sm md:text-base"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 text-sm md:text-base"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 text-sm md:text-base"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 text-sm md:text-base"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-cyan-700 text-white py-2 px-4 rounded-md hover:bg-cyan-800 transition-colors text-sm md:text-base"
              >
                Enviar Mensaje
              </button>
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