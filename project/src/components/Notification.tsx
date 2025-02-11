import { X } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { XCircle } from 'lucide-react';
import { Info } from 'lucide-react';
import { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

/**
 * Toast notification component
 * Features:
 * - Auto-dismiss timer
 * - Different types (success, error, info)
 * - Slide-in animation
 */
const Notification = ({ message, type = 'success', onClose }: NotificationProps) => {
  // Auto-dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  // Icon mapping for different notification types
  const icons = {
    success: <CheckCircle className="text-green-500 w-5 h-5" />,
    error: <XCircle className="text-red-500 w-5 h-5" />,
    info: <Info className="text-blue-500 w-5 h-5" />
  };

  return (
    <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50 flex items-center gap-3 animate-slide-in">
      {icons[type]}
      <p className="text-gray-800">{message}</p>
      <button 
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 ml-2"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Notification; 