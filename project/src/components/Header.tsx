import React, { useState, useEffect } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import RequestCallModal from './RequestCallModal';
import { motion } from 'framer-motion';

/**
 * Main navigation header component
 * Includes responsive menu and call request modal
 */
const Header = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/about' },
    { name: 'Servicios', path: '/services' },
    { name: 'Portafolio', path: '/projects' },
    { name: 'Reseñas', path: '/reviews' },
    { name: 'Contacto', path: '/contact' },
  ];

  // Close menu on page navigation or modal open
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, isModalOpen]);

  return (
    <header className={`${className} bg-white shadow-sm`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link 
            to="/" 
            className="text-2xl font-bold text-cyan-700"
            onClick={() => setIsOpen(false)}
          >
            Plakor Divisiones
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-600 hover:text-cyan-700 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden md:flex items-center px-6 py-2 bg-cyan-700 text-white rounded-md hover:bg-cyan-800 transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            Solicitar llamada
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg z-40">
            <nav className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-600 hover:text-cyan-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsOpen(false);
                }}
                className="flex items-center justify-center px-6 py-2 bg-cyan-700 text-white rounded-md hover:bg-cyan-800 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                Solicitar llamada
              </button>
            </nav>
          </div>
        )}
      </div>

      <RequestCallModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </header>
  );
};

export default Header;