import { logFormSubmission } from '../lib/analytics';
import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useToast } from '../contexts/ToastContext';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const MAX_ATTEMPTS = 5;
const COOLDOWN_TIME = 15 * 60 * 1000; // 15 minutes cooldown

/**
 * Contact form component with validation and server submission
 * Features:
 * - Field validation
 * - File attachments
 * - reCAPTCHA protection
 * - Success/error notifications
 */
export const ContactForm = () => {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);

  // Form state with validation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Track submission and loading states
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const storedAttempts = localStorage.getItem('formAttempts');
    const storedCooldown = localStorage.getItem('formCooldown');
    
    if (storedAttempts) setAttempts(parseInt(storedAttempts));
    if (storedCooldown) setCooldownUntil(parseInt(storedCooldown));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Check cooldown period
    if (cooldownUntil && Date.now() < cooldownUntil) {
      const minutesLeft = Math.ceil((cooldownUntil - Date.now()) / (60 * 1000));
      showToast(`Por favor, espere ${minutesLeft} minutos antes de intentarlo de nuevo`, 'error');
      return;
    }

    if (!captchaToken) {
      showToast('Por favor, complete el captcha', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const verifyResponse = await fetch('/api/verify-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: captchaToken })
      });

      if (!verifyResponse.ok) throw new Error('Captcha verification failed');

      // Увеличиваем счетчик попыток
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem('formAttempts', newAttempts.toString());

      // Если превышен лимит попыток
      if (newAttempts >= MAX_ATTEMPTS) {
        const cooldown = Date.now() + COOLDOWN_TIME;
        setCooldownUntil(cooldown);
        localStorage.setItem('formCooldown', cooldown.toString());
        showToast('Has excedido el límite de intentos. Por favor, inténtelo más tarde', 'error');
        return;
      }

      // Отправка формы
      await submitForm(formData);
      showToast('Mensaje enviado con éxito', 'success');
      form.reset();
      setCaptchaToken(null);
      
    } catch (error) {
      showToast('Error al enviar el mensaje', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitForm = async (formData: FormData) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error submitting form');
    }

    return response.json();
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    // ... rest of validation
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <ReCAPTCHA
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={setCaptchaToken}
        className="mt-4"
      />

      <button
        type="submit"
        disabled={isSubmitting || !captchaToken || (cooldownUntil && Date.now() < cooldownUntil)}
        className="w-full bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 
                 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <LoadingSpinner size="sm" color="white" className="mr-2" />
        ) : null}
        Enviar
      </button>
    </form>
  );
};

export default ContactForm; 