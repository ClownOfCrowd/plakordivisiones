const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
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

  console.log('Sending request to:', `${STRAPI_URL}/api/${endpoint}`);
  console.log('Request options:', {
    ...defaultOptions,
    ...options,
  });

  const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    ...defaultOptions,
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error Response:', errorText);
    throw new Error(`API error: ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  return data;
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
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
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
  getReviews: () => fetchAPI('reviews?filters[status][$eq]=approved'),
  submitReview: (data: ReviewFormData) => 
    fetchAPI('reviews', {
      method: 'POST',
      body: JSON.stringify({ 
        data: {
          ...data,
          status: 'pending'
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