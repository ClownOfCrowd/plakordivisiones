import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../contexts/ToastContext';
import { errorTracker } from '../services/errorTracking';

const PerformanceTest = () => {
  const { showToast } = useToast();
  const [heavyContent, setHeavyContent] = useState<string[]>([]);

  // Тест Web Vitals - создаем задержку загрузки
  useEffect(() => {
    performance.mark('startLoading');
    
    setTimeout(() => {
      setHeavyContent(Array(100).fill('Heavy content item'));
      performance.mark('endLoading');
      
      performance.measure('contentLoadTime', 'startLoading', 'endLoading');
      const measures = performance.getEntriesByType('measure');
      console.log('Content load time:', measures[measures.length - 1].duration);
    }, 2000);
  }, []);

  // Тест ошибок
  const testError = () => {
    try {
      throw new Error('Test error from button click');
    } catch (error) {
      errorTracker.logError({
        message: error.message,
        stack: error.stack,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent
      });
      showToast('Error logged successfully', 'error');
    }
  };

  // Тест производительности рендеринга
  const testHeavyOperation = () => {
    performance.mark('startOperation');
    
    // Симулируем тяжелую операцию
    const result = Array(1000000).fill(0).reduce((acc, curr) => acc + curr, 0);
    
    performance.mark('endOperation');
    performance.measure('heavyOperation', 'startOperation', 'endOperation');
    
    showToast(`Heavy operation completed: ${result}`, 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Performance Testing Panel</h2>
      
      <div className="space-y-4">
        <div>
          <button
            onClick={testError}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Test Error Tracking
          </button>
        </div>

        <div>
          <button
            onClick={testHeavyOperation}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
          >
            Test Heavy Operation
          </button>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Delayed Content ({heavyContent.length} items):</h3>
          <div className="h-40 overflow-auto bg-gray-50 p-4 rounded">
            {heavyContent.map((item, index) => (
              <div key={index} className="py-1 border-b border-gray-200">
                {item} #{index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceTest; 