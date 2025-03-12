import { useState, useEffect } from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

interface CookieOptions {
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export function useCookies() {
  const [cookies, setCookies] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Загружаем все cookie при монтировании
    const loadCookies = () => {
      const cookieConsent = getCookie('cookie-consent');
      const gaConsent = getCookie('ga-consent');
      
      setCookies({
        cookieConsent: cookieConsent?.toString() || '',
        gaConsent: gaConsent?.toString() || ''
      });
    };

    loadCookies();
  }, []);

  const getCookieValue = (name: string) => {
    return getCookie(name)?.toString() || '';
  };

  const setCookieValue = (name: string, value: string, options?: CookieOptions) => {
    setCookie(name, value, {
      maxAge: 365 * 24 * 60 * 60, // По умолчанию 1 год
      path: '/',
      sameSite: 'strict',
      ...options
    });
    setCookies(prev => ({ ...prev, [name]: value }));
  };

  const removeCookie = (name: string, options?: CookieOptions) => {
    deleteCookie(name, options);
    setCookies(prev => {
      const newCookies = { ...prev };
      delete newCookies[name];
      return newCookies;
    });
  };

  const hasConsent = () => {
    return getCookieValue('cookie-consent') === 'true';
  };

  const hasAnalyticsConsent = () => {
    return getCookieValue('ga-consent') === 'true';
  };

  return {
    cookies,
    getCookieValue,
    setCookieValue,
    removeCookie,
    hasConsent,
    hasAnalyticsConsent
  };
} 