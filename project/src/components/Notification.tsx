import { X } from 'lucide-react';
import { CheckCircle } from 'lucide-react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification = ({ message, onClose }: NotificationProps) => {
  return (
    <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50 flex items-center gap-3 animate-slide-in">
      <CheckCircle className="text-green-500 w-5 h-5" />
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