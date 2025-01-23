interface Config {
  apiBaseUrl: string;
  siteName: string;
  contact: {
    email: string;
    phone: string;
    address: string;
    city: string;
    workingHours: {
      weekday: string;
      weekend: string;
    };
  };
  social: {
    facebook: string;
    instagram: string;
    whatsapp: string;
    telegram: string;
  };
}

const config: Config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  siteName: import.meta.env.VITE_SITE_NAME || 'Massage & SPA',
  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL || 'info@massage-spa.ru',
    phone: import.meta.env.VITE_PHONE || '+7XXXXXXXXXX',
    address: import.meta.env.VITE_ADDRESS || 'Camí de Sant Joan, 4, 43391 Vinyols i els Arcs, Tarragona',
    city: import.meta.env.VITE_CITY || 'Vinyols i els Arcs',
    workingHours: {
      weekday: import.meta.env.VITE_WORKING_HOURS_WEEKDAY || '8:00 - 19:00',
      weekend: import.meta.env.VITE_WORKING_HOURS_WEEKEND || 'Cerrado'
    }
  },
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    whatsapp: 'https://wa.me/',
    telegram: 'https://t.me/'
  }
};

export default config; 