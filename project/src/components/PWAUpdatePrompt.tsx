import { useEffect, useState } from 'react';

export const PWAUpdatePrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Регистрируем сервис-воркер
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((reg) => {
          setRegistration(reg);

          // Проверяем обновления
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setShowPrompt(true);
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('Service worker registration failed:', error);
        });

      // Слушаем сообщения от сервис-воркера
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }, []);

  const handleUpdate = () => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 bg-white rounded-lg shadow-lg">
      <p className="text-sm text-gray-700 mb-2">
        Hay una nueva versión disponible
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
        >
          Actualizar
        </button>
        <button
          onClick={() => setShowPrompt(false)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Después
        </button>
      </div>
    </div>
  );
};

export default PWAUpdatePrompt; 