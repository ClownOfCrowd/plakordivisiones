/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

// Активируем SW сразу
clientsClaim();

// Слушаем сообщение для обновления
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Предварительное кэширование всех статических ресурсов
precacheAndRoute(self.__WB_MANIFEST);

// Кэширование страниц приложения
registerRoute(
  // Возвращаем true для всех навигационных запросов
  ({ request }) => request.mode === 'navigate',
  // Используем NetworkFirst стратегию
  new StaleWhileRevalidate({
    cacheName: 'pages-cache',
  })
);

// Кэширование изображений
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 дней
      }),
    ],
  })
);

// Кэширование шрифтов
registerRoute(
  ({ request }) => request.destination === 'font',
  new CacheFirst({
    cacheName: 'fonts-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 365 * 24 * 60 * 60, // 1 год
      }),
    ],
  })
);

// Обработка оффлайн страниц
const offlineFallbackPage = '/offline.html';
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('offline-cache').then((cache) => {
      return cache.add(offlineFallbackPage);
    })
  );
}); 