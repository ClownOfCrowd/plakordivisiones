import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white';
  className?: string;
}

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary',
  className = ''
}: LoadingSpinnerProps) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colors = {
    primary: 'border-cyan-600 border-t-transparent',
    white: 'border-white border-t-transparent'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`inline-block ${className}`}
    >
      <div
        className={`
          ${sizes[size]}
          ${colors[color]}
          border-2
          rounded-full
          animate-spin
        `}
      />
    </motion.div>
  );
};

export default LoadingSpinner; 