import { SolicitudFormData, ApiResponse, Project, Review } from '../types';
import { cacheApi } from './cache';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const API = {
  solicitud: `${API_URL}/api/solicituds`,
  contacto: `${API_URL}/api/contactos`
};

const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Добавим типы для ошибок
interface ApiError {
  message: string;
  code: string;
}

// Словарь ошибок на испанском
const errorMessages = {
  NETWORK_ERROR: 'Error de conexión. Por favor, compruebe su conexión a Internet.',
  VALIDATION_ERROR: 'Por favor, compruebe los datos introducidos.',
  SERVER_ERROR: 'Error del servidor. Por favor, inténtelo de nuevo más tarde.',
  NOT_FOUND: 'No se encontró el recurso solicitado.',
  RATE_LIMIT: 'Demasiadas solicitudes. Por favor, espere unos minutos.',
  DEFAULT: 'Ha ocurrido un error. Por favor, inténtelo de nuevo.'
};

// Функция для обработки ошибок
const handleApiError = (error: any): ApiError => {
  if (!navigator.onLine) {
    return { message: errorMessages.NETWORK_ERROR, code: 'NETWORK_ERROR' };
  }

  if (error.response) {
    switch (error.response.status) {
      case 400:
        return { message: errorMessages.VALIDATION_ERROR, code: 'VALIDATION_ERROR' };
      case 404:
        return { message: errorMessages.NOT_FOUND, code: 'NOT_FOUND' };
      case 429:
        return { message: errorMessages.RATE_LIMIT, code: 'RATE_LIMIT' };
      case 500:
        return { message: errorMessages.SERVER_ERROR, code: 'SERVER_ERROR' };
      default:
        return { message: errorMessages.DEFAULT, code: 'UNKNOWN_ERROR' };
    }
  }

  return { message: errorMessages.DEFAULT, code: 'UNKNOWN_ERROR' };
};

// Добавим простой кэш
const cache: { [key: string]: { data: any; timestamp: number } } = {};

// Увеличим время кэширования для разных типов данных
const CACHE_DURATION = {
  DEFAULT: 5 * 60 * 1000,      // 5 минут (для обычных данных)
  REVIEWS: 30 * 60 * 1000,     // 30 минут (для отзывов)
  PROJECTS: 60 * 60 * 1000     // 1 час (для проектов)
};

// Обновим функцию проверки кэша с учетом разной длительности
const getCachedData = (key: string, duration = CACHE_DURATION.DEFAULT) => {
  const cached = cache[key];
  if (cached && Date.now() - cached.timestamp < duration) {
    return cached.data;
  }
  return null;
};

// Функция для сохранения в кэш
const setCachedData = (key: string, data: any) => {
  cache[key] = {
    data,
    timestamp: Date.now()
  };
};

// Только для некритичных данных
const getCachedDataAsync = async (url: string) => {
  const cached = cacheApi.get(url);
  if (cached) return cached;

  const response = await fetch(url);
  const data = await response.json();
  
  cacheApi.set(url, data);
  return data;
};

// Обновляем функцию post с новой обработкой ошибок
async function post<T>(url: string, data: any): Promise<ApiResponse<T>> {
  try {
    // Добавляем базовую валидацию
    if (!data || Object.keys(data).length === 0) {
      throw new Error('VALIDATION_ERROR');
    }

    // Добавляем проверку rate limiting через localStorage
    const lastRequestTime = localStorage.getItem('lastRequestTime');
    const now = Date.now();
    if (lastRequestTime && now - parseInt(lastRequestTime) < 1000) { // 1 секунда между запросами
      throw new Error('RATE_LIMIT');
    }
    localStorage.setItem('lastRequestTime', now.toString());

    const requestData = {
      data: {
        Nombre: data.nombre,
        Telefono: data.telefono,
        Tipo: data.tipo,
        Fecha: data.fecha,
        Estado: 'pendiente'
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: defaultHeaders,
      credentials: 'same-origin',
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(response.status.toString());
    }

    return response.json();
  } catch (error) {
    const apiError = handleApiError(error);
    throw new Error(apiError.message);
  }
}

// Используем новое имя для интерфейса
interface ApiResponse<T> {
  data: T;
  error?: ApiError;
}

// Добавим интерфейс для данных контактной формы
interface ContactFormData {
  nombre: string;
  telefono: string;
  email?: string;
  mensaje: string;
}

// Обновляем методы API с новой обработкой ошибок
export const api = {
  solicitud: {
    create: async (data: SolicitudFormData) => {
      try {
        return await post<{ id: number }>(API.solicitud, data);
      } catch (error) {
        throw handleApiError(error);
      }
    }
  },
  projects: {
    getAll: async (): Promise<Project[]> => {
      const cacheKey = 'all_projects';
      const cached = getCachedData(cacheKey);
      
      if (cached) {
        return cached;
      }

      try {
        const response = await fetch(`${API_URL}/api/projects?populate=*`, {
          headers: defaultHeaders,
          credentials: 'same-origin'
        });
        
        if (!response.ok) {
          throw new Error(response.status.toString());
        }

        const data = await response.json();
        
        if (data.data && Array.isArray(data.data)) {
          setCachedData(cacheKey, data.data);
          return data.data;
        }
        
        throw new Error('VALIDATION_ERROR');
      } catch (error) {
        throw handleApiError(error);
      }
    },
    
    getBySlug: async (slug: string): Promise<Project | null> => {
      const cacheKey = `project_${slug}`;
      const cached = getCachedData(cacheKey);
      
      if (cached) {
        return cached;
      }

      try {
        const response = await fetch(`${API_URL}/api/projects?filters[slug][$eq]=${slug}&populate=*`, {
          headers: defaultHeaders,
          credentials: 'same-origin'
        });
        
        if (!response.ok) {
          throw new Error(response.status.toString());
        }

        const data = await response.json();
        if (data.data?.[0]) {
          setCachedData(cacheKey, data.data[0]);
          return data.data[0];
        }
        return null;
      } catch (error) {
        throw handleApiError(error);
      }
    }
  },
  contacto: {
    create: async (data: ContactFormData) => {
      const requestData = {
        data: {
          nombre: data.nombre,
          telefono: data.telefono,
          email: data.email || null,
          mensaje: data.mensaje,
          fecha: new Date().toISOString(),
          estado: 'pendiente'
        }
      };

      const response = await fetch(API.contacto, {
        method: 'POST',
        headers: defaultHeaders,
        credentials: 'same-origin',
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      return response.json();
    }
  },
  reviews: {
    getAll: async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/reviews?filters[publishedAt][$notNull]=true&filters[estado][$eq]=approved&populate=*`,
          {
            headers: {
              ...defaultHeaders,
              'Origin': window.location.origin
            }
          }
        );
        
        console.log('API URL:', `${API_URL}/api/reviews?filters[publishedAt][$notNull]=true&filters[estado][$eq]=approved&populate=*`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API response data:', data);
        return data;
      } catch (error) {
        console.error('Error in getAll reviews:', error);
        throw error;
      }
    },

    create: async (reviewData: {
      name: string;
      rating: number;
      comment: string;
    }) => {
      try {
        const response = await fetch(`${API_URL}/api/reviews`, {
          method: 'POST',
          headers: {
            ...defaultHeaders,
            'Origin': window.location.origin
          },
          body: JSON.stringify({
            data: {
              name: reviewData.name,
              rating: reviewData.rating,
              comment: reviewData.comment,
              estado: 'pending',
              publishedAt: null
            }
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('API Error Response:', errorData);
          throw new Error(errorData.error?.message || 'Error al enviar la reseña');
        }

        return response.json();
      } catch (error) {
        console.error('Error creating review:', error);
        throw error;
      }
    }
  },
};