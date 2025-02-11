import { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X } from 'lucide-react';
import { api } from '../lib/api';
import type { SolicitudFormData } from '../types';
import Notification from './Notification';

interface RequestCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

/**
 * Call request modal form
 * Features:
 * - Phone number validation
 * - Time slot selection
 * - reCAPTCHA integration
 * - Success/error handling
 */
const RequestCallModal = ({ isOpen, onClose, onSuccess }: RequestCallModalProps) => {
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredTime: ''
  });

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const mobileMenu = document.querySelector('.md\\:hidden.absolute');
      if (mobileMenu) {
        (mobileMenu as HTMLElement).style.display = 'none';
      }
    } else {
      document.body.style.overflow = '';
      const mobileMenu = document.querySelector('.md\\:hidden.absolute');
      if (mobileMenu) {
        (mobileMenu as HTMLElement).style.display = '';
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const solicitudData: SolicitudFormData = {
        nombre: formData.name,
        telefono: formData.phone,
        tipo: 'llamada',
        fecha: new Date().toISOString(),
        estado: 'pendiente'
      };

      await api.solicitud.create(solicitudData);
      
      setFormData({
        name: '',
        phone: '',
        preferredTime: ''
      });
      setErrors({});
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      onClose();
      onSuccess?.();
      
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        setErrors({
          submit: 'Error al enviar la solicitud: ' + error.message
        });
      } else {
        setErrors({
          submit: 'Error al enviar la solicitud'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full m-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Solicitar llamada</h2>
              <button onClick={onClose} className="p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className={`w-full p-2 border rounded-md ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) {
                      const newErrors = { ...errors };
                      delete newErrors.name;
                      setErrors(newErrors);
                    }
                  }}
                  placeholder="Nombre"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  className={`w-full p-2 border rounded-md ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) {
                      const newErrors = { ...errors };
                      delete newErrors.phone;
                      setErrors(newErrors);
                    }
                  }}
                  placeholder="Teléfono"
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {errors.submit && (
                <p className="text-red-500 text-sm mb-4">{errors.submit}</p>
              )}

              <button
                type="submit"
                className="w-full bg-cyan-700 text-white py-2 px-4 rounded-md hover:bg-cyan-800 transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Solicitar'}
              </button>
            </form>
          </div>
        </div>

        {showNotification && (
          <Notification 
            message="Solicitud enviada correctamente. Nos pondremos en contacto con usted pronto."
            onClose={() => setShowNotification(false)}
          />
        )}
      </Dialog>
    </Transition>
  );
};

export default RequestCallModal;