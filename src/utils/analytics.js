// Google Analytics 4 configuration
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('YOUR-GA4-ID');
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

// Cookie consent
export const initCookieConsent = () => {
  return window.cookieconsent.initialise({
    palette: {
      popup: { background: "#000" },
      button: { background: "#f1d600" },
    },
    content: {
      message: "Utilizamos cookies para mejorar su experiencia",
      dismiss: "Aceptar",
      link: "Más información",
    }
  });
}; 