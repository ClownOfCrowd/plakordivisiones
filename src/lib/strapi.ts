/**
 * Утилиты для работы со Strapi CMS
 */

// Базовый URL API Strapi
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Получение данных из Strapi API
 * @param endpoint - Конечная точка API
 * @param query - Параметры запроса
 * @returns Данные из API
 */
export async function fetchFromStrapi(endpoint: string, query: Record<string, any> = {}) {
  try {
    // Формируем URL с параметрами запроса
    const queryString = Object.keys(query)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
      .join('&');
    
    const url = `${STRAPI_API_URL}/api/${endpoint}${queryString ? `?${queryString}` : ''}`;
    
    // Формируем заголовки запроса
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Добавляем токен авторизации, если он есть
    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }
    
    // Выполняем запрос
    const response = await fetch(url, { headers });
    
    // Проверяем статус ответа
    if (!response.ok) {
      throw new Error(`Error fetching from Strapi: ${response.statusText}`);
    }
    
    // Парсим JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    return null;
  }
}

/**
 * Получение проектов из Strapi
 * @param limit - Лимит проектов
 * @returns Список проектов
 */
export async function getProjects(limit?: number) {
  const query: Record<string, any> = {
    populate: '*',
    sort: 'createdAt:desc',
  };
  
  if (limit) {
    query.pagination = { limit };
  }
  
  const data = await fetchFromStrapi('projects', query);
  return data?.data || [];
}

/**
 * Получение отзывов из Strapi
 * @param limit - Лимит отзывов
 * @returns Список отзывов
 */
export async function getReviews(limit?: number) {
  const query: Record<string, any> = {
    populate: '*',
    sort: 'createdAt:desc',
    filters: {
      approved: {
        $eq: true,
      },
    },
  };
  
  if (limit) {
    query.pagination = { limit };
  }
  
  const data = await fetchFromStrapi('reviews', query);
  return data?.data || [];
}

/**
 * Отправка формы обратной связи в Strapi
 * @param formData - Данные формы
 * @returns Результат отправки
 */
export async function submitContactForm(formData: any) {
  try {
    const url = `${STRAPI_API_URL}/api/contact-forms`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }
    
    console.log('Sending data to Strapi:', {
      url,
      headers,
      data: formData
    });
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ data: formData }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Strapi error response:', errorText);
      throw new Error(`Error submitting form: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
}

/**
 * Отправка отзыва в Strapi
 * @param reviewData - Данные отзыва
 * @returns Результат отправки
 */
export async function submitReview(reviewData: any) {
  try {
    const url = `${STRAPI_API_URL}/api/reviews`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }
    
    // Подготавливаем данные для Strapi
    const formattedData = {
      data: {
        name: reviewData.name,
        email: reviewData.email,
        rating: reviewData.rating,
        text: reviewData.text,
        service: reviewData.service,
        status: 'pending', // По умолчанию отзыв ожидает модерации
        source: 'Web',
      }
    };
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(formattedData),
    });
    
    if (!response.ok) {
      throw new Error(`Error submitting review: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
} 