/**
 * Утилиты для работы со Strapi CMS
 */

import { STRAPI_API_URL, STRAPI_API_TOKEN } from './constants';

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiError {
  status: number;
  name: string;
  message: string;
  details: unknown;
}

async function fetchFromStrapi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${STRAPI_API_URL}/api/${endpoint}`;
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
  };

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error: StrapiError = await response.json();
    throw new Error(error.message || 'Failed to fetch from Strapi');
  }

  return response.json();
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  requestStatus: string;
}) {
  return fetchFromStrapi('contacts', {
    method: 'POST',
    body: JSON.stringify({ data }),
  });
}

export async function submitReview(data: {
  name: string;
  rating: number;
  comment: string;
  service: string;
}) {
  return fetchFromStrapi('reviews', {
    method: 'POST',
    body: JSON.stringify({ data }),
  });
}

export async function getReviews() {
  return fetchFromStrapi<StrapiResponse<any>>('reviews?populate=*');
}

export async function getServices() {
  return fetchFromStrapi<StrapiResponse<any>>('services?populate=*');
}

export async function getProjects() {
  return fetchFromStrapi<StrapiResponse<any>>('projects?populate=*');
}

export async function getServiceCategories() {
  return fetchFromStrapi<StrapiResponse<any>>('service-categories?populate=*');
} 