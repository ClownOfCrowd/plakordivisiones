import { describe, it, expect, beforeEach } from 'vitest';
import { api } from './api';

describe('API', () => {
  describe('reviews', () => {
    it('should fetch reviews successfully', async () => {
      const result = await api.reviews.getAll();
      
      expect(result.data).toBeDefined();
      expect(result.data).toHaveLength(1);
      expect(result.data[0].name).toBe('Test User');
    });

    it('should create a review successfully', async () => {
      const reviewData = {
        name: 'New User',
        rating: 5,
        comment: 'Excellent!'
      };

      const result = await api.reviews.create(reviewData);
      
      expect(result.data).toBeDefined();
      expect(result.data.name).toBe(reviewData.name);
      expect(result.data.estado).toBe('pending');
    });

    it('should handle network errors', async () => {
      // Имитируем отсутствие сети
      const originalFetch = window.fetch;
      window.fetch = () => Promise.reject(new Error('Network error'));

      try {
        await api.reviews.getAll();
      } catch (error: any) {
        expect(error.code).toBe('NETWORK_ERROR');
      }

      window.fetch = originalFetch;
    });

    it('should use cache for repeated requests', async () => {
      const firstResult = await api.reviews.getAll();
      const secondResult = await api.reviews.getAll();
      
      expect(firstResult).toBe(secondResult); // Проверяем, что данные взяты из кэша
    });
  });
}); 