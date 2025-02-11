import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

/**
 * Toast component for displaying temporary messages
 * Features:
 * - Multiple types (success, error, info)
 * - Auto-dismiss
 * - Stacking support
 */
const Toast = ({ message, type, onClose, duration = 5000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-cyan-500" />
  };

  // Style variants based on type
  const variants = {
    success: 'border-green-500 bg-green-50',
    error: 'border-red-500 bg-red-50',
    info: 'border-blue-500 bg-blue-50'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`
        fixed bottom-4 right-4 z-50
        max-w-md p-4 rounded-lg shadow-lg
        ${variants[type]}
        flex items-center gap-3
      `}>
      {icons[type]}
      <p className="text-gray-700 flex-grow">{message}</p>
      <button
        onClick={onClose}
        className="p-1 hover:bg-black/5 rounded-full transition-colors"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </motion.div>
  );
};

export default Toast;