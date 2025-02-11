const CACHE_TIME = 5 * 60 * 1000; // 5 минут

interface CacheItem {
  data: any;
  timestamp: number;
}

const cache: Map<string, CacheItem> = new Map();

export const cacheApi = {
  get: (key: string) => {
    const item = cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > CACHE_TIME) {
      cache.delete(key);
      return null;
    }
    
    return item.data;
  },
  
  set: (key: string, data: any) => {
    cache.set(key, {
      data,
      timestamp: Date.now()
    });
  },
  
  clear: () => cache.clear()
}; 