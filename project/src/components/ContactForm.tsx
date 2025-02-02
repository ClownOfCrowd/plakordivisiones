import { logFormSubmission } from '../lib/analytics';

// В обработчике формы:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await submitForm(formData);
    logFormSubmission('contact', true);
  } catch (error) {
    logFormSubmission('contact', false);
  }
}; 