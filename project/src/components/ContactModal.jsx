import React, { useState } from 'react';

const ContactModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Валидация имени
    if (!name.trim()) {
      setNameError('Se requiere el nombre');
    } else {
      setNameError('');
    }

    // Валидация телефона
    if (!phone.trim()) {
      setPhoneError('Se requiere el número de teléfono');
    } else {
      setPhoneError('');
    }

    // Если все поля заполнены, отправляем форму
    if (name.trim() && phone.trim()) {
      console.log('Form submitted:', { name, phone });
      onClose(); // Закрываем модальное окно
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6">Solicitar Llamada</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
            />
            {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
            />
            {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-700 text-white py-2 px-4 rounded-md hover:bg-cyan-800 transition-colors"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;