import { useEffect, useState } from 'react';
import { measureWebVitals, measureResourceTiming } from '../utils/performance';

interface Metric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    // Измеряем Web Vitals
    measureWebVitals((metric) => {
      setMetrics(prev => [...prev.slice(-9), metric]);
    });

    // Обновляем ресурсы каждые 5 секунд
    const interval = setInterval(() => {
      setResources(measureResourceTiming());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2">Real-time Performance</h3>
      
      <div className="space-y-2">
        {metrics.map((metric, index) => (
          <div key={index} className="flex justify-between">
            <span>{metric.name}:</span>
            <span className={`font-mono ${
              metric.rating === 'good' ? 'text-green-600' :
              metric.rating === 'needs-improvement' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {metric.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceMonitor; 