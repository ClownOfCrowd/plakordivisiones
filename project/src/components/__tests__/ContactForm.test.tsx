import { render, fireEvent, waitFor, screen, within, act } from '@testing-library/react';
import { vi } from 'vitest';
import ContactForm from '../ContactForm';
import { ToastProvider } from '../../contexts/ToastContext';

// Мокаем ReCAPTCHA
vi.mock('react-google-recaptcha', () => ({
  default: ({ onChange }: { onChange: (token: string) => void }) => (
    <div data-testid="mock-recaptcha">
      <button onClick={() => onChange('test-token')}>ReCAPTCHA</button>
    </div>
  )
}));

// Мокаем ToastContext
const mockShowToast = vi.fn();
vi.mock('../../contexts/ToastContext', () => ({
  useToast: () => ({
    showToast: mockShowToast
  }),
  ToastProvider: ({ children }: { children: React.ReactNode }) => children
}));

describe('ContactForm', () => {
  const renderForm = () => {
    return render(
      <ToastProvider>
        <ContactForm />
      </ToastProvider>
    );
  };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    mockShowToast.mockClear();

    // Мокаем fetch для успешной отправки формы
    global.fetch = vi.fn().mockImplementation((url) => {
      if (url === '/api/verify-captcha') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true })
        });
      }
      if (url === '/api/contact') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true })
        });
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  it('should show error when submitting without captcha', async () => {
    await act(async () => {
      renderForm();
    });

    const submitButton = screen.getByRole('button', { name: /enviar/i });
    
    await act(async () => {
      fireEvent.submit(submitButton.closest('form')!);
      // Добавляем небольшую задержку для обработки события
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockShowToast).toHaveBeenCalledWith(
      'Por favor, complete el captcha',
      'error'
    );
  });

  it('should handle rate limiting', async () => {
    localStorage.setItem('formAttempts', '5');
    const cooldown = Date.now() + 15 * 60 * 1000;
    localStorage.setItem('formCooldown', cooldown.toString());

    await act(async () => {
      renderForm();
    });

    const submitButton = screen.getByRole('button', { name: /enviar/i });
    
    await act(async () => {
      fireEvent.submit(submitButton.closest('form')!);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockShowToast).toHaveBeenCalledWith(
      expect.stringMatching(/Por favor, espere/),
      'error'
    );
  });

  it('should submit form successfully', async () => {
    await act(async () => {
      renderForm();
    });

    // Заполняем форму
    const nameInput = screen.getByLabelText(/nombre/i);
    const emailInput = screen.getByLabelText(/email/i);
    
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'Test User' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    });

    // Симулируем капчу
    const recaptcha = screen.getByTestId('mock-recaptcha');
    const captchaButton = within(recaptcha).getByRole('button');
    
    await act(async () => {
      fireEvent.click(captchaButton);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Отправляем форму
    const submitButton = screen.getByRole('button', { name: /enviar/i });
    
    await act(async () => {
      fireEvent.submit(submitButton.closest('form')!);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockShowToast).toHaveBeenCalledWith(
      'Mensaje enviado con éxito',
      'success'
    );
  });
}); 