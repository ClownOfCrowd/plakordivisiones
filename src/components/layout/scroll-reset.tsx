'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useLayoutEffect } from 'react';

export function ScrollReset() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [pathname, isMounted]);

  return null;
} 