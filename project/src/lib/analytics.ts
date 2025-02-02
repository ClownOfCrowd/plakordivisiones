import ReactGA from 'react-ga4';

const TRACKING_ID = 'G-XXXXXXXXXX'; // Здесь будет ваш ID из Google Analytics

export const initGA = () => {
  ReactGA.initialize(TRACKING_ID);
};

export const logPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label
  });
};

// События для форм
export const logFormSubmission = (formName: string, success: boolean) => {
  logEvent(
    'Form',
    success ? 'Submit Success' : 'Submit Error',
    formName
  );
};

// События для проектов
export const logProjectView = (projectTitle: string) => {
  logEvent(
    'Project',
    'View',
    projectTitle
  );
};

// События для контактов
export const logContactClick = (method: string) => {
  logEvent(
    'Contact',
    'Click',
    method
  );
}; 