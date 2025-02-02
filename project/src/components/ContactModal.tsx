import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { X } from 'lucide-react';
import { api } from '../lib/api';
import type { SolicitudFormData } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  formType: 'llamada' | 'presupuesto';
}

const ContactModal: FC<ContactModalProps> = ({ isOpen, onClose, onSuccess, formType }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = 'Se requiere el nombre';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Se requiere el número de teléfono';
    } else if (!/^\+?[\d\s-]+$/.test(phone)) {
      newErrors.phone = 'Número de teléfono no válido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const solicitudData: SolicitudFormData = {
        nombre: name,
        telefono: phone,
        tipo: 'presupuesto',
        fecha: new Date().toISOString(),
        estado: 'pendiente'
      };

      await api.solicitud.create(solicitudData);
      
      setName('');
      setPhone('');
      setErrors({});
      onClose();
      onSuccess?.();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Error al enviar la solicitud. Por favor, inténtelo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {formType === 'llamada' ? 'Solicitar llamada' : 'Solicitar presupuesto'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {submitError && (
            <p className="text-red-500 text-sm mb-4">{submitError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-cyan-700 text-white py-2 px-4 rounded-md hover:bg-cyan-800 transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : formType === 'llamada' ? 'Solicitar' : 'Enviar'}
          </button>
        </form>

        {showNotification && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full mx-4">
              <div className="text-center">
                <p className="text-gray-700 mb-4">Solicitud enviada con éxito</p>
                <button
                  onClick={() => setShowNotification(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
