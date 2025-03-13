const STRAPI_URL = 'https://www.plakordivisiones.es';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// Список публичных эндпоинтов, не требующих авторизации
const publicEndpoints = ['contact-submissions', 'reviews'];

async function fetchAPI(endpoint: string, options = {}) {
  const isPublicEndpoint = publicEndpoints.some(publicEndpoint => 
    endpoint.startsWith(publicEndpoint)
  );

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(isPublicEndpoint ? {} : { 'Authorization': `Bearer ${STRAPI_TOKEN}` }),
    },
  };

  const url = `${STRAPI_URL}/api/${endpoint}`;
  const finalOptions = {
    ...defaultOptions,
    ...options,
  };

  console.log('Request URL:', url);
  console.log('Is public endpoint:', isPublicEndpoint);
  console.log('Request options:', finalOptions);

  try {
    const response = await fetch(url, finalOptions);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      console.error('Response status:', response.status);
      console.error('Response headers:', Object.fromEntries(response.headers));
      throw new Error(`API error: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Типы данных
export interface Project {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    images: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
          alternativeText: string;
        };
      }>;
    };
    category: string;
    completionDate: string;
    location: string;
    featured: boolean;
  };
}

export interface Review {
  id: number;
  attributes: {
    name: string;
    rating: number;
    comment: string;
    service: string;
    estado: 'pending' | 'approved' | 'rejected';
    creadoEn: string;
  };
}

export interface Service {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    icon: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    featured: boolean;
    category: {
      data: {
        attributes: {
          name: string;
        };
      };
    };
  };
}

export interface FaqItem {
  id: number;
  attributes: {
    question: string;
    answer: string;
    category: string;
    order: number;
  };
}

export interface ContactSubmission {
  id: number;
  attributes: {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    estado: 'new' | 'in-progress' | 'completed';
    creadoSolicitud: string;
  };
}

type ContactFormData = Pick<ContactSubmission['attributes'], 'name' | 'email' | 'phone' | 'service' | 'message'>;
type ReviewFormData = Pick<Review['attributes'], 'name' | 'rating' | 'comment' | 'service'>;

// API методы
export const strapiApi = {
  // Проекты
  getProjects: () => fetchAPI('projects?populate=*'),
  getProjectBySlug: (slug: string) => fetchAPI(`projects?filters[slug][$eq]=${slug}&populate=*`),
  
  // Отзывы
  getReviews: () => fetchAPI('reviews?filters[estado][$eq]=approved&sort[0]=creadoEn:desc'),
  submitReview: (data: ReviewFormData) => 
    fetchAPI('reviews', {
      method: 'POST',
      body: JSON.stringify({ 
        data: {
          ...data,
          estado: 'pending',
          creadoEn: new Date().toISOString()
        }
      }),
    }),

  // Услуги
  getServices: () => fetchAPI('services?populate=*'),
  getServiceBySlug: (slug: string) => fetchAPI(`services?filters[slug][$eq]=${slug}&populate=*`),
  
  // FAQ
  getFaq: () => fetchAPI('faqs?sort[0]=order:asc'),
  
  // Контактная форма
  submitContact: (data: ContactFormData) => 
    fetchAPI('contact-submissions', {
      method: 'POST',
      body: JSON.stringify({ 
        data: {
          ...data,
          estado: 'new',
          creadoSolicitud: new Date().toISOString()
        }
      }),
    }),
}; 