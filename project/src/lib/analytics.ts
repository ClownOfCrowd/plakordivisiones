import ReactGA from 'react-ga4';

const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

export const initGA = () => {
  if (GA_TRACKING_ID) {
    ReactGA.initialize(GA_TRACKING_ID);
  }
};

// Отслеживание просмотров страниц
export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

// События форм
export const trackFormSubmission = (formName: string, success: boolean) => {
  ReactGA.event({
    category: 'Form',
    action: success ? 'Submit Success' : 'Submit Error',
    label: formName
  });
};

// События кликов
export const trackButtonClick = (buttonName: string) => {
  ReactGA.event({
    category: 'Button',
    action: 'Click',
    label: buttonName
  });
};

// Отслеживание ошибок
export const trackError = (error: Error, componentName: string) => {
  ReactGA.event({
    category: 'Error',
    action: error.message,
    label: componentName
  });
};

// Отслеживание производительности
export const trackPerformance = (metric: string, value: number) => {
  ReactGA.event({
    category: 'Performance',
    action: metric,
    value
  });
};

// События для проектов
export const logProjectView = (projectTitle: string) => {
  ReactGA.event({
    category: 'Project',
    action: 'View',
    label: projectTitle
  });
};

// События для контактов
export const logContactClick = (method: string) => {
  ReactGA.event({
    category: 'Contact',
    action: 'Click',
    label: method
  });
}; 