import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';

// Rate limiting
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // Лимит запросов с одного IP
  message: 'Too many requests from this IP, please try again later'
});

// Делаем массив доступным для тестов
export const blacklistedIPs: string[] = [];
export const whitelistedIPs: string[] = [];

export const ipFilter = (req: Request, res: Response, next: NextFunction) => {
  const clientIP = req.ip;

  if (blacklistedIPs.includes(clientIP)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  if (whitelistedIPs.length > 0 && !whitelistedIPs.includes(clientIP)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  next();
};

// Проверка заголовков
export const securityHeaders = (_req: Request, res: Response, next: NextFunction) => {
  // Защита от XSS
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Запрет встраивания сайта в iframe
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Принудительное использование HTTPS
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  // Запрет определения MIME-типа
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  next();
};

// Валидация входящих данных
export const validateInput = (req: Request, res: Response, next: NextFunction) => {
  const sanitizeValue = (value: string) => {
    return value.replace(/[<>]/g, ''); // Базовая защита от XSS
  };

  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeValue(req.body[key]);
      }
    });
  }

  next();
}; 