import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Twitter, WhatsApp, Mail, Phone, MapPin, Clock, AtSign, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  // Показываем кнопку, когда пользователь прокрутил страницу вниз
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Плавный скролл к началу страницы
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-4">Ubicación</h3>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 mt-1 text-cyan-700 flex-shrink-0" />
              <address className="not-italic text-sm md:text-base">
                Camí de Sant Joan, 4<br />
                43391 Vinyols i els Arcs,<br />
                España
              </address>
            </div>
          </div>

          {/* Horario Section */}
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-4">Horario</h3>
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 mt-1 text-cyan-700 flex-shrink-0" />
              <div className="space-y-2 text-sm md:text-base">
                <div className="grid grid-cols-2 gap-2">
                  <span>Lunes</span>
                  <span>8:00 - 19:00</span>
                  <span>Martes</span>
                  <span>8:00 - 19:00</span>
                  <span>Miércoles</span>
                  <span>8:00 - 19:00</span>
                  <span>Jueves</span>
                  <span>8:00 - 19:00</span>
                  <span>Viernes</span>
                  <span>8:00 - 19:00</span>
                  <span>Sábado</span>
                  <span>Cerrado</span>
                  <span>Domingo</span>
                  <span>Cerrado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Social Section */}
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-cyan-700 flex-shrink-0" />
                <a href="tel:+34977350508" className="hover:text-white transition-colors text-sm md:text-base break-all">
                  +34 977 350 508
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-cyan-700 flex-shrink-0" />
                <a href="tel:+34646629414" className="hover:text-white transition-colors text-sm md:text-base break-all">
                  +34 646 629 414
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-cyan-700 flex-shrink-0" />
                <a 
                  href="mailto:plakordivisiones@hotmail.com" 
                  className="hover:text-white transition-colors text-sm md:text-base break-all"
                >
                  plakordivisiones@hotmail.com
                </a>
              </div>
              <div className="pt-4">
                <h4 className="text-white mb-3 text-sm md:text-base">Síguenos</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-cyan-700 transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-cyan-700 transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-cyan-700 transition-colors"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <p className="text-center text-xs md:text-sm">
            © {currentYear} Plakor Divisiones. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Кнопка "Наверх" */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-cyan-700 text-white p-3 rounded-full shadow-lg hover:bg-cyan-800 hover:shadow-xl transition-all duration-300"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </footer>
  );
};

export default Footer;