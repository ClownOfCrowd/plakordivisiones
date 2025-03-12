import { Metadata } from 'next';
import { ContactPage } from '@/components/sections/contact-page';

export const metadata: Metadata = {
  title: 'Contacto - Plakor Divisiones',
  description: 'Contacta con Plakor Divisiones para tus proyectos de pladur y reformas en Tarragona. Presupuesto sin compromiso. Atención personalizada y profesional.',
};

export const dynamic = 'force-dynamic';

export default function ContactoPage() {
  return <ContactPage />;
} 