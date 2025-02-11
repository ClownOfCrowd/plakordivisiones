import { vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { OptimizedImage } from '../OptimizedImage';
import { optimizeImage } from '../../utils/imageOptimizer';

// Мокаем утилиту оптимизации с задержкой
vi.mock('../../utils/imageOptimizer', () => ({
  optimizeImage: vi.fn().mockImplementation(() => 
    new Promise(resolve => 
      setTimeout(() => resolve('optimized-image-url.jpg'), 100)
    )
  )
}));

describe('OptimizedImage', () => {
  it('должен показывать placeholder во время загрузки', async () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test"
        width={300}
        height={200}
      />
    );

    // Проверяем placeholder сразу
    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/placeholder.jpg');
  });

  it('должен загружать оптимизированное изображение', async () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test"
        width={300}
        height={200}
      />
    );

    // Ждем загрузки оптимизированного изображения
    await waitFor(() => {
      expect(screen.getByRole('img')).toHaveAttribute('src', 'optimized-image-url.jpg');
    });
  });

  it('должен обрабатывать ошибки загрузки', async () => {
    vi.mocked(optimizeImage).mockRejectedValueOnce(new Error('Failed to load'));

    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test"
        width={300}
        height={200}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole('img')).toHaveAttribute('src', '/images/placeholder.jpg');
    });
  });
}); 