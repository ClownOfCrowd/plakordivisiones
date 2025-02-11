import { http, HttpResponse } from 'msw';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const handlers = [
  // GET reviews
  http.get(`${API_URL}/api/reviews`, () => {
    return HttpResponse.json({
      data: [
        {
          id: 1,
          attributes: {
            name: 'Test User',
            content: 'Test Review',
            rating: 5,
            estado: 'approved',
            publishedAt: '2024-02-02T12:00:00.000Z'
          }
        }
      ]
    });
  }),

  // POST reviews
  http.post(`${API_URL}/api/reviews`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      data: {
        id: 2,
        attributes: body.data
      }
    });
  }),

  // POST verify-captcha
  http.post(`${API_URL}/api/verify-captcha`, () => {
    return HttpResponse.json({ success: true });
  })
]; 