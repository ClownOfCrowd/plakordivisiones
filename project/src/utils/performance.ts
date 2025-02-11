import { trackPerformance } from '../lib/analytics';

interface WebVitals {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

const getRating = (name: string, value: number): WebVitals['rating'] => {
  switch (name) {
    case 'CLS':
      return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
    case 'FID':
      return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
    case 'LCP':
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
    default:
      return 'good';
  }
};

/**
 * Measures and reports Web Vitals metrics
 * Tracks: LCP, FID, CLS, TTFB, and TTI
 * @param onReport - Callback function for metric reporting
 */
export const measureWebVitals = (onReport: (metric: WebVitals) => void) => {
  // Cumulative Layout Shift
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      const value = (entry as any).value;
      const metric: WebVitals = {
        name: 'CLS',
        value,
        rating: getRating('CLS', value)
      };
      onReport(metric);
      trackPerformance('CLS', value);
    }
  }).observe({ entryTypes: ['layout-shift'] });

  // First Input Delay
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      const value = entry.duration;
      const metric: WebVitals = {
        name: 'FID',
        value,
        rating: getRating('FID', value)
      };
      onReport(metric);
      trackPerformance('FID', value);
    }
  }).observe({ entryTypes: ['first-input'] });

  // Largest Contentful Paint
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      const value = entry.startTime;
      const metric: WebVitals = {
        name: 'LCP',
        value,
        rating: getRating('LCP', value)
      };
      onReport(metric);
      trackPerformance('LCP', value);
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] });
};

/**
 * Measures Time to Interactive (TTI)
 * Returns a promise that resolves with TTI value in milliseconds
 */
export const measureTTI = () => {
  return new Promise<number>((resolve) => {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      resolve(lastEntry.startTime);
    }).observe({ entryTypes: ['longtask'] });
  });
};

// Измерение времени загрузки ресурсов
export const measureResourceTiming = () => {
  const resources = performance.getEntriesByType('resource');
  return resources.map(resource => ({
    name: resource.name,
    duration: resource.duration,
    type: resource.initiatorType
  }));
};

export const initPerformanceMonitoring = () => {
  // Web Vitals
  const reportWebVitals = ({ name, delta, id }: any) => {
    // Отправка метрик в Google Analytics
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      non_interaction: true,
    });
  };

  // Performance Observer
  const perfObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime);
      }
      if (entry.entryType === 'layout-shift') {
        console.log('CLS:', entry.value);
      }
    });
  });

  perfObserver.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift'] });

  return reportWebVitals;
}; 