import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Устанавливаем флаг после первого рендера
    setIsFirstLoad(false);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={isFirstLoad ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-grow flex flex-col bg-gray-50 fixed inset-0 pt-20 overflow-y-auto"
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0'
          }}
        >
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
          <ScrollToTop />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Layout; 