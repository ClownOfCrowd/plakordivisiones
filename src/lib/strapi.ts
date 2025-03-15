export const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://www.plakordivisiones.es');
export const STRAPI_API_URL = `${STRAPI_URL}/api`;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// Список публичных эндпоинтов, не требующих авторизации
const PUBLIC_ENDPOINTS = ['contact-submissions', 'reviews', 'projects'];

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  console.log(`Fetching API: ${endpoint}`);
  console.log(`Full URL: ${STRAPI_API_URL}/${endpoint}`);
  console.log(`Is public endpoint: ${PUBLIC_ENDPOINTS.some(e => endpoint.startsWith(e))}`);
  console.log(`Request options:`, options);

  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (STRAPI_TOKEN && !PUBLIC_ENDPOINTS.some(e => endpoint.startsWith(e))) {
      Object.assign(headers, {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      });
    }

    const mergedOptions = {
      headers,
      ...options,
    };

    const response = await fetch(`${STRAPI_API_URL}/${endpoint}`, mergedOptions);
    console.log(`Response status: ${response.status}`);
    console.log(`Response headers:`, Object.fromEntries([...response.headers.entries()]));
    
    const responseText = await response.text();
    console.log(`Raw response text:`, responseText);
    
    if (!response.ok) {
      console.error(`API error: ${response.statusText} - ${responseText}`);
      throw new Error(`API error: ${response.statusText} - ${responseText}`);
    }

    // Преобразуем текст обратно в JSON
    const data = responseText ? JSON.parse(responseText) : {};
    console.log('Parsed response data:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Типы данных
export interface Project {
  id: number;
  documentId: string;
  title: string;
  description: string;
  seoDescription: string;
  slug: string;
  images: Array<{
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      large: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: string | null;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
      small: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: string | null;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
      medium: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: string | null;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
      thumbnail: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: string | null;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }>;
  challenge: string;
  solution: string;
  features: string[];
  category: string;
  completionDate: string;
  location: string;
  tags: string[];
  area: string;
  services: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Для обратной совместимости создаем интерфейс с прежней структурой
export interface ProjectWithAttributes {
  id: number;
  attributes: {
    title: string;
    description: string;
    seoDescription: string;
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
    challenge: string;
    solution: string;
    features: string[];
    category: string;
    completionDate: string;
    location: string;
    tags: string[];
    area: string;
    services: string[];
    featured: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Review {
  id: number;
  attributes: {
    name: string;
    rating: number;
    comment: string;
    service: '     Instalación de Pladur'|'     Reforma'|'     Techos'|'     Aislamientos'|'     Otros';
    estado: '     pending'|'     approved'|'     rejected';
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
  getProjects: () => fetchAPI('projects?populate=*&sort[0]=completionDate:desc'),
  getFeaturedProjects: () => fetchAPI('projects?filters[featured][$eq]=true&populate=*&sort[0]=completionDate:desc'),
  getProjectBySlug: (slug: string) => fetchAPI(`projects?filters[slug][$eq]=${slug}&populate=*`),
  getProjectById: (id: number) => fetchAPI(`projects/${id}?populate=*`),
  getProjectsByCategory: (category: string) => fetchAPI(`projects?filters[category][$eq]=${category}&populate=*&sort[0]=completionDate:desc`),
  
  // Отзывы
  getReviews: () => {
    console.log('Fetching approved reviews with filter: estado=$eq=approved');
    return fetchAPI('reviews?filters[estado][$eq]=     approved&sort[0]=creadoEn:desc');
  },
  submitReview: (data: ReviewFormData) => {
    const reviewData = {
      data: {
        name: data.name,
        rating: data.rating,
        service: data.service,
        comment: data.comment,
        estado: '     pending',
        creadoEn: new Date().toISOString()
      }
    };
    console.log('Submitting review with data:', reviewData);
    return fetchAPI('reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },

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