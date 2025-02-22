import { Metadata } from 'next';
import { FaqSection } from '@/components/sections/faq';
import { getFaqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes sobre Reformas y Construcción en Seco | Plakor Divisiones',
  description: 'Resolvemos tus dudas sobre instalación de pladur, reformas integrales, presupuestos, plazos y materiales. Expertos en construcción y reformas en Tarragona con más de 15 años de experiencia.',
  keywords: [
    'FAQ construcción Tarragona',
    'preguntas pladur',
    'dudas reformas integrales',
    'presupuesto obras Tarragona',
    'plazos reforma vivienda',
    'precio pladur Tarragona',
    'reformas integrales FAQ',
    'construcción en seco dudas',
    'garantía reformas Tarragona',
    'permisos obra Tarragona'
  ].join(', '),
  alternates: {
    canonical: 'https://www.plakordivisiones.es/faq',
  },
  openGraph: {
    title: 'Preguntas Frecuentes sobre Reformas y Construcción | Plakor Divisiones',
    description: 'Encuentra respuestas a todas tus dudas sobre reformas, pladur, presupuestos y plazos. Expertos en construcción en Tarragona.',
    url: 'https://www.plakordivisiones.es/faq',
    type: 'website',
  }
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFaqSchema()),
        }}
      />
      <FaqSection />
    </>
  );
} 