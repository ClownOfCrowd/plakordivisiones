import '@testing-library/jest-dom';
import { beforeAll, afterAll, afterEach, vi } from 'vitest';
import { server } from './mocks/server';

beforeAll(() => {
  // Изменяем стратегию на "bypass" вместо "error"
  server.listen({ onUnhandledRequest: 'bypass' });
});

afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
}); 