import { Suspense } from 'react';
import { motion } from 'framer-motion';

interface LazyComponentProps {
  children: React.ReactNode;
}

const LoadingFallback = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center justify-center p-8"
  >
    <div className="w-8 h-8 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin" />
  </motion.div>
);

const LazyComponent = ({ children }: LazyComponentProps) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      {children}
    </Suspense>
  );
};

export default LazyComponent; 