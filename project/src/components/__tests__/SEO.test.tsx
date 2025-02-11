import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { SEO } from '../SEO';

describe('SEO', () => {
  it('должен правильно устанавливать метатеги', async () => {
    const helmetContext: { helmet?: any } = {};
    
    render(
      <HelmetProvider context={helmetContext}>
        <SEO
          title="Test Title"
          description="Test Description"
          image="/test-image.jpg"
        />
      </HelmetProvider>
    );

    await waitFor(() => {
      const head = document.head;
      expect(head.querySelector('title')?.textContent).toBe('Test Title');
      expect(head.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('Test Description');
      expect(head.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe('/test-image.jpg');
    });
  });
}); 