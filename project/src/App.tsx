import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Reviews from './pages/Reviews';
import ContactSection from './components/ContactSection';

function App() {
  return (
    <Router>
      {/* Добавлен overflow-x-hidden для запрета горизонтальной прокрутки */}
      <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
        <Header />
        <main className="pt-20 flex-grow overflow-x-hidden"> {/* Добавлен overflow-x-hidden */}
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact" element={<ContactSection />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;