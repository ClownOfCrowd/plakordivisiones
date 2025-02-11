interface ErrorDetails {
  message: string;
  stack?: string;
  url: string;
  timestamp: number;
  userAgent: string;
  additionalInfo?: Record<string, any>;
}

class ErrorTrackingService {
  private static instance: ErrorTrackingService;
  private readonly STORAGE_KEY = 'error_logs';
  private readonly MAX_LOGS = 100;

  private constructor() {
    this.setupErrorListeners();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ErrorTrackingService();
    }
    return this.instance;
  }

  private setupErrorListeners() {
    window.addEventListener('error', (event) => {
      this.logError({
        message: event.message,
        stack: event.error?.stack,
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent
      });
    });
  }

  logError(error: ErrorDetails) {
    // Сохраняем локально
    this.saveToLocalStorage(error);

    // Отправляем на сервер если есть подключение
    if (navigator.onLine) {
      this.sendToServer(error);
    } else {
      // Добавляем в очередь для отправки позже
      this.queueForLater(error);
    }

    // В development выводим в консоль
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracked:', error);
    }
  }

  private saveToLocalStorage(error: ErrorDetails) {
    try {
      const logs = this.getStoredLogs();
      logs.unshift(error);
      
      // Ограничиваем количество логов
      while (logs.length > this.MAX_LOGS) {
        logs.pop();
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logs));
    } catch (e) {
      console.error('Failed to save error log:', e);
    }
  }

  private getStoredLogs(): ErrorDetails[] {
    try {
      const logs = localStorage.getItem(this.STORAGE_KEY);
      return logs ? JSON.parse(logs) : [];
    } catch {
      return [];
    }
  }

  private async sendToServer(error: ErrorDetails) {
    try {
      const response = await fetch('/api/error-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(error),
      });

      if (!response.ok) {
        throw new Error('Failed to send error log');
      }
    } catch (e) {
      this.queueForLater(error);
    }
  }

  private queueForLater(error: ErrorDetails) {
    const queue = this.getQueuedLogs();
    queue.push(error);
    localStorage.setItem('error_queue', JSON.stringify(queue));
  }

  private getQueuedLogs(): ErrorDetails[] {
    try {
      const queue = localStorage.getItem('error_queue');
      return queue ? JSON.parse(queue) : [];
    } catch {
      return [];
    }
  }

  // Метод для отправки накопленных ошибок
  async processQueue() {
    const queue = this.getQueuedLogs();
    if (queue.length === 0) return;

    for (const error of queue) {
      await this.sendToServer(error);
    }

    localStorage.removeItem('error_queue');
  }
}

export const errorTracker = ErrorTrackingService.getInstance(); 