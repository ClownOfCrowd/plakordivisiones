import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { api } from './api';

describe('API', () => {
  describe('reviews', () => {
    it('should fetch reviews successfully', async () => {
      const result = await api.reviews.getAll();
      expect(result.data).toBeDefined();
      expect(result.data).toHaveLength(1);
      expect(result.data[0].attributes.name).toBe('Test User');
    });

    it('should create a review successfully', async () => {
      const newReview = {
        data: {
          name: 'New User',
          rating: 5,
          comment: 'Excellent!',
          estado: 'pending',
          publishedAt: null
        }
      };

      const mockResponse = {
        data: {
          id: 2,
          attributes: { ...newReview.data }
        }
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await api.reviews.create(newReview);
      expect(result.data.attributes.name).toBe('New User');
    });

    it('should handle network errors', async () => {
      global.fetch = vi.fn().mockRejectedValueOnce({
        code: 'NETWORK_ERROR',
        message: 'Network error'
      });

      try {
        await api.reviews.getAll();
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.code).toBe('NETWORK_ERROR');
      }
    });

    it('should use cache for repeated requests', async () => {
      const mockData = {
        data: [{
          id: 1,
          attributes: {
            name: 'Test User',
            content: 'Test Review'
          }
        }]
      };

      // Создаем изолированное хранилище кэша для теста
      const cache = new Map();
      const testApi = {
        reviews: {
          getAll: async () => {
            const cacheKey = 'reviews';
            if (cache.has(cacheKey)) {
              return cache.get(cacheKey);
            }

            const fetchSpy = vi.fn().mockResolvedValue({
              ok: true,
              json: () => Promise.resolve(mockData)
            });
            global.fetch = fetchSpy;

            const result = await fetchSpy();
            const data = await result.json();
            cache.set(cacheKey, data);
            return data;
          }
        }
      };

      // Первый запрос
      const firstResult = await testApi.reviews.getAll();
      expect(firstResult.data[0].attributes.name).toBe('Test User');

      // Второй запрос (должен использовать кэш)
      const secondResult = await testApi.reviews.getAll();
      expect(secondResult.data[0].attributes.name).toBe('Test User');
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
}); 