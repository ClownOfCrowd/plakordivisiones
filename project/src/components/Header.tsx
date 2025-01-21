import React, { useState, useEffect } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import RequestCallModal from './RequestCallModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-cyan-700">Plakor Divisiones</span>
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
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-600 hover:text-cyan-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center px-6 py-2 bg-cyan-700 text-white rounded-md hover:bg-cyan-700 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                Solicitar llamada
              </button>
            </nav>
          </div>
        )}
      </div>

      <RequestCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;