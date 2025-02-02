import { rest } from 'msw';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const handlers = [
  // GET reviews
  rest.get(`${API_URL}/api/reviews`, (req, res, ctx) => {
    const reviews = {
      data: [
        {
          id: 1,
          name: "Test User",
          rating: 5,
          comment: "Great service!",
          estado: "approved",
          publishedAt: "2024-02-02T12:00:00.000Z"
        }
      ],
      meta: {
        pagination: {
          page: 1,
          pageSize: 25,
          pageCount: 1,
          total: 1
        }
      }
    };

    return res(ctx.status(200), ctx.json(reviews));
  }),

  // POST review
  rest.post(`${API_URL}/api/reviews`, async (req, res, ctx) => {
    const body = await req.json();
    
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          id: 2,
          ...body.data,
          createdAt: new Date().toISOString()
        }
      })
    );
  })
]; 