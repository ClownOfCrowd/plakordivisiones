import React, { useState } from 'react';
import { X } from 'lucide-react';

interface RequestCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequestCallModal: React.FC<RequestCallModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Se requiere el nombre';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Se requiere el número de teléfono';
    } else if (!/^\+?[\d\s-]+$/.test(formData.phone)) {
      newErrors.phone = 'Número de teléfono no válido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log('Enviado:', formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Solicitar llamada</h2>
          <button onClick={onClose} className="p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              id="name"
              className={`w-full p-2 border rounded-md ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 mb-2">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              className={`w-full p-2 border rounded-md ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-700 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition-colors"
          >
            Solicitar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestCallModal;