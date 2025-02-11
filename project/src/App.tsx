import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Reviews from './pages/Reviews';
import ContactSection from './components/ContactSection';
import CookieConsent from './components/CookieConsent';
import { initGA, trackPageView } from './lib/analytics';
import Layout from './components/Layout';
import LazyComponent from './components/LazyComponent';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './contexts/ToastContext';
import { measureWebVitals } from './utils/performance';
import { errorTracker } from './services/errorTracking';
import PWAUpdatePrompt from './components/PWAUpdatePrompt';
import { initErrorLogger } from './utils/devTools';

const DevTools = lazy(() => import('./pages/DevTools'));

// Создаем отдельный компонент для роутинга
const AppRoutes = () => {
  const location = useLocation();
  
  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm" />
      <AnimatePresence 
        mode="wait"
        initial={false}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <Layout>
              <LazyComponent>
                <Home />
              </LazyComponent>
            </Layout>
          } />
          <Route path="/about" element={
            <Layout>
              <LazyComponent>
                <About />
              </LazyComponent>
            </Layout>
          } />
          <Route path="/services" element={
            <Layout>
              <Services />
            </Layout>
          } />
          <Route path="/projects" element={
            <Layout>
              <LazyComponent>
                <Projects />
              </LazyComponent>
            </Layout>
          } />
          <Route path="/reviews" element={
            <Layout>
              <LazyComponent>
                <Reviews />
              </LazyComponent>
            </Layout>
          } />
          <Route path="/contact" element={
            <Layout>
              <LazyComponent>
                <ContactSection />
              </LazyComponent>
            </Layout>
          } />
          {process.env.NODE_ENV === 'development' && (
            <Route 
              path="/dev-tools" 
              element={
                <Layout>
                  <LazyComponent>
                    <DevTools />
                  </LazyComponent>
                </Layout>
              } 
            />
          )}
        </Routes>
      </AnimatePresence>
      <CookieConsent className="relative z-[60]" />
    </div>
  );
};

// Основной компонент App
const App = () => {
  useEffect(() => {
    // Измеряем Web Vitals
    measureWebVitals((metrics) => {
      console.log('Performance metrics:', metrics);
    });

    // Инициализируем трекер ошибок
    errorTracker;

    // Инициализируем инструменты разработчика
    if (process.env.NODE_ENV === 'development') {
      initErrorLogger();
    }
  }, []);

  return (
    <ErrorBoundary>
      <ToastProvider>
        <Router>
          <AppRoutes />
          <PWAUpdatePrompt />
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  );
};

export default App;