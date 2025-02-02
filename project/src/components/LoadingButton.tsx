import { Loader2 } from 'lucide-react';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

const LoadingButton = ({ isLoading, children, ...props }: LoadingButtonProps) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`relative ${props.className}`}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center bg-inherit">
          <Loader2 className="w-5 h-5 animate-spin" />
        </span>
      )}
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
};

export default LoadingButton; 