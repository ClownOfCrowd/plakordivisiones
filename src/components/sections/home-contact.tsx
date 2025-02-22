import { Container } from '@/components/ui/container';
import { ContactForm } from './contact-form';

export function HomeContact() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="text-lg text-secondary mb-12">
            Contáctanos para discutir tus ideas y obtener un presupuesto personalizado.
          </p>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
} 