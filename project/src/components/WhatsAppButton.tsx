import { WhatsApp } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '+34646629414';
  const message = 'Hola, me gustaría obtener más información sobre sus servicios.';

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50"
      aria-label="Contactar por WhatsApp"
    >
      <WhatsApp className="w-6 h-6" />
    </a>
  );
};

export default WhatsAppButton; 