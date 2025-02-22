import { Metadata } from 'next';
import { ContactPage } from '@/components/sections/contact-page';

export const metadata: Metadata = {
  title: 'Contacto | Plakor Divisiones',
  description: 'Contacte con nosotros para sus proyectos de construcción y reformas en Tarragona. Presupuesto sin compromiso.',
  keywords: 'contacto, presupuesto, reformas, construcción, Tarragona, pladur',
};

export default function ContactoPage() {
  return <ContactPage />;
} 