import { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    // Здесь можно добавить инициализацию аналитики
    initializeAnalytics();
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-700">
          Utilizamos cookies para mejorar su experiencia en nuestro sitio web. 
          Al continuar navegando, acepta nuestra política de cookies.
        </p>
        <div className="flex gap-4">
          <button
            onClick={acceptCookies}
            className="bg-cyan-700 text-white px-6 py-2 rounded-md hover:bg-cyan-800 transition-colors"
          >
            Aceptar
          </button>
          <button
            onClick={declineCookies}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent; 