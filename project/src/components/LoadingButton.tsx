import { Loader2 } from 'lucide-react';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Button component with loading state
 * Features:
 * - Loading spinner
 * - Disabled state during loading
 * - Customizable styles
 */
const LoadingButton = ({ 
  isLoading, 
  children, 
  className = '',
  ...props 
}: LoadingButtonProps) => {
  return (
    <button
      disabled={isLoading}
      className={`
        relative
        inline-flex items-center justify-center
        ${isLoading ? 'cursor-not-allowed opacity-70' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <Loader2 className="absolute w-4 h-4 animate-spin" />
      )}
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
};

export default LoadingButton; 