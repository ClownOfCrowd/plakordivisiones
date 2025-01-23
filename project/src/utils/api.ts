import config from '@config';
import { ApiResponse, BookingFormData, ReviewFormData, ContactFormData } from '@/types';

// API endpoints
const API = {
  booking: '/api/booking',
  reviews: '/api/reviews',
  contact: '/api/contact'
};

// Базовые методы для работы с API
async function get<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${config.apiBaseUrl}${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: 'Se ha producido un error en la ejecución de la petición.'
    };
  }
}

async function post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: 'Se ha producido un error en la ejecución de la petición.'
    };
  }
}

// Валидация форм
interface ValidationError {
  [key: string]: string;
}

export function validateForm(data: BookingFormData | ReviewFormData | ContactFormData): ValidationError {
  const errors: ValidationError = {};

  // Проверка email
  if ('email' in data && data.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = 'Por favor, introduzca el correo electrónico correcto';
    }
  }

  // Проверка телефона
  if ('phone' in data && data.phone) {
    const phoneRegex = /^\+?[0-9]{10,12}$/;
    if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
      errors.phone = 'Por favor, introduzca el número de teléfono correcto';
    }
  }

  // Проверка имени
  if ('name' in data && (!data.name || data.name.length < 2)) {
    errors.name = 'El nombre debe contener al menos 2 caracteres';
  }

  // Проверка сообщения
  if ('message' in data && data.message && data.message.length < 10) {
    errors.message = 'El mensaje debe contener al menos 10 caracteres';
  }

  // Проверка рейтинга
  if ('rating' in data && (data.rating < 1 || data.rating > 5)) {
    errors.rating = 'La calificación debe ser de 1 a 5';
  }

  return errors;
}

// API методы
export const api = {
  booking: {
    create: (data: BookingFormData) => post<{ id: number }>(API.booking, data),
    get: (id: number) => get<BookingFormData>(`${API.booking}/${id}`)
  },
  reviews: {
    create: (data: ReviewFormData) => post<{ id: number }>(API.reviews, data),
    get: () => get<ReviewFormData[]>(API.reviews)
  },
  contact: {
    send: (data: ContactFormData) => post<void>(API.contact, data)
  }
};

// Типы для форм
export interface BookingFormData {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  comment?: string;
}

export interface ReviewFormData {
  name: string;
  service: string;
  rating: number;
  review: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

// API endpoints
export const endpoints = {
  booking: '/api/booking',
  reviews: '/api/reviews',
  contact: '/api/contact'
}; 