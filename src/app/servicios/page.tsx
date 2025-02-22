import { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { ServicesGrid } from '@/components/sections/services-grid';

export const metadata: Metadata = {
  title: 'Servicios de Construcción y Reformas | Plakor',
  description: 'Descubra nuestra amplia gama de servicios de construcción y reformas. Especialistas en construcción en seco, reformas integrales y acabados de alta calidad.',
};

export default function ServiciosPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-white border-b">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Nuestros Servicios
            </h1>
            <p className="text-lg text-secondary mb-8">
              Ofrecemos soluciones integrales en construcción y reformas, combinando experiencia, calidad y profesionalismo en cada proyecto.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <ServicesGrid />
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">
              ¿Necesita ayuda con su proyecto?
            </h2>
            <p className="text-lg text-secondary mb-8">
              Contáctenos hoy mismo para obtener una consulta gratuita y un presupuesto personalizado.
            </p>
            <a 
              href="/contacto" 
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary rounded-lg shadow-lg hover:bg-primary-800 transition-all"
            >
              Solicitar presupuesto
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
} 