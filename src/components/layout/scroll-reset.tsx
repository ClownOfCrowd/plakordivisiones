'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ScrollReset() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (typeof window === 'undefined') return;
    
    window.scrollTo(0, 0);
  }, [pathname, isMounted]);

  return null;
} 