import { useState, useEffect } from 'react';
import { measureWebVitals, measureResourceTiming, measureTTI } from '../utils/performance';
import { trackError } from '../lib/analytics';
import PerformanceMonitor from '../components/PerformanceMonitor';

interface MetricHistory {
  timestamp: number;
  metrics: {
    name: string;
    value: number;
    rating: string;
  }[];
}

const DevTools = () => {
  const [metricsHistory, setMetricsHistory] = useState<MetricHistory[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [tti, setTTI] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'metrics' | 'resources' | 'errors' | 'state' | 'routes'>('metrics');

  useEffect(() => {
    // Измеряем Web Vitals каждые 5 секунд
    const interval = setInterval(() => {
      measureWebVitals((metric) => {
        setMetricsHistory(prev => [...prev, {
          timestamp: Date.now(),
          metrics: [metric]
        }]);
      });

      // Обновляем ресурсы
      setResources(measureResourceTiming());

      // Измеряем TTI
      measureTTI().then(setTTI);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getAverageMetrics = () => {
    const metrics: Record<string, number[]> = {};
    metricsHistory.forEach(history => {
      history.metrics.forEach(metric => {
        if (!metrics[metric.name]) metrics[metric.name] = [];
        metrics[metric.name].push(metric.value);
      });
    });

    return Object.entries(metrics).map(([name, values]) => ({
      name,
      average: values.reduce((a, b) => a + b, 0) / values.length
    }));
  };

  const getSlowestResources = () => {
    return [...resources]
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 5);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Developer Tools</h1>

      <div className="flex gap-4 mb-6 flex-wrap">
        <button
          onClick={() => setActiveTab('metrics')}
          className={`px-4 py-2 rounded ${activeTab === 'metrics' ? 'bg-cyan-600 text-white' : 'bg-gray-200'}`}
        >
          Performance Metrics
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`px-4 py-2 rounded ${activeTab === 'resources' ? 'bg-cyan-600 text-white' : 'bg-gray-200'}`}
        >
          Resources
        </button>
        <button
          onClick={() => setActiveTab('state')}
          className={`px-4 py-2 rounded ${activeTab === 'state' ? 'bg-cyan-600 text-white' : 'bg-gray-200'}`}
        >
          State Inspector
        </button>
        <button
          onClick={() => setActiveTab('routes')}
          className={`px-4 py-2 rounded ${activeTab === 'routes' ? 'bg-cyan-600 text-white' : 'bg-gray-200'}`}
        >
          Routes
        </button>
        <button
          onClick={() => setActiveTab('errors')}
          className={`px-4 py-2 rounded ${activeTab === 'errors' ? 'bg-cyan-600 text-white' : 'bg-gray-200'}`}
        >
          Error Log
        </button>
      </div>

      {/* Performance Metrics Tab */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          <PerformanceMonitor />
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Current Web Vitals</h2>
            <div className="grid grid-cols-2 gap-4">
              {getAverageMetrics().map(metric => (
                <div key={metric.name} className="p-4 border rounded">
                  <div className="text-sm text-gray-600">{metric.name}</div>
                  <div className="text-2xl font-mono">{metric.average.toFixed(2)}</div>
                </div>
              ))}
              {tti && (
                <div className="p-4 border rounded">
                  <div className="text-sm text-gray-600">TTI</div>
                  <div className="text-2xl font-mono">{tti.toFixed(2)}ms</div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Metrics History</h2>
            <div className="space-y-2">
              {metricsHistory.slice(-10).map((history, i) => (
                <div key={i} className="text-sm">
                  <div className="text-gray-500">
                    {new Date(history.timestamp).toLocaleTimeString()}
                  </div>
                  {history.metrics.map(metric => (
                    <div key={metric.name} className="flex justify-between">
                      <span>{metric.name}:</span>
                      <span className={
                        metric.rating === 'good' ? 'text-green-600' :
                        metric.rating === 'needs-improvement' ? 'text-yellow-600' :
                        'text-red-600'
                      }>
                        {metric.value.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Slowest Resources</h2>
          <div className="space-y-2">
            {getSlowestResources().map((resource, i) => (
              <div key={i} className="flex justify-between items-center p-2 hover:bg-gray-50">
                <div className="flex-1">
                  <div className="font-medium">{resource.name.split('/').pop()}</div>
                  <div className="text-sm text-gray-500">{resource.type}</div>
                </div>
                <div className="font-mono text-red-600">
                  {resource.duration.toFixed(0)}ms
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* State Inspector Tab */}
      {activeTab === 'state' && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Global State</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Redux Store</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
                {JSON.stringify(window.__REDUX_STATE__, null, 2)}
              </pre>
            </div>
            <div>
              <h3 className="font-medium mb-2">Local Storage</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
                {JSON.stringify(Object.fromEntries(Object.entries(localStorage)), null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Routes Tab */}
      {activeTab === 'routes' && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Application Routes</h2>
          <div className="space-y-2">
            {[
              '/',
              '/about',
              '/services',
              '/projects',
              '/reviews',
              '/contact',
              '/dev-tools'
            ].map(route => (
              <div key={route} className="flex items-center justify-between p-2 hover:bg-gray-50">
                <span>{route}</span>
                <a 
                  href={route}
                  className="text-cyan-600 hover:text-cyan-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Log Tab */}
      {activeTab === 'errors' && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Error Log</h2>
          <div className="space-y-4">
            {window.__ERROR_LOG__?.map((error: any, index: number) => (
              <div key={index} className="p-4 bg-red-50 rounded">
                <div className="font-medium text-red-700">{error.message}</div>
                <div className="text-sm text-red-600 mt-1">{error.stack}</div>
                <div className="text-xs text-gray-500 mt-2">
                  {new Date(error.timestamp).toLocaleString()}
                </div>
              </div>
            )) || (
              <div className="text-gray-500">No errors logged</div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 text-sm text-gray-500">
        <p>Как использовать метрики:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>LCP (Largest Contentful Paint)</strong>: должен быть &lt; 2.5s для хорошей производительности</li>
          <li><strong>FID (First Input Delay)</strong>: должен быть &lt; 100ms</li>
          <li><strong>CLS (Cumulative Layout Shift)</strong>: должен быть &lt; 0.1</li>
          <li><strong>TTI (Time to Interactive)</strong>: желательно &lt; 3.8s</li>
        </ul>
      </div>
    </div>
  );
};

export default DevTools; 