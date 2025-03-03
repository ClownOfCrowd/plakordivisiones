import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { submitContactForm } from '@/lib/strapi';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Отправляем данные в Strapi
    let strapiResponse = null;
    try {
      strapiResponse = await submitContactForm({
        name,
        email,
        phone,
        service,
        message,
        status: 'new',
      });
    } catch (error) {
      console.error('Error submitting to Strapi:', error);
      // Продолжаем выполнение, даже если Strapi недоступен
    }

    // Отправляем email
    const data = await resend.emails.send({
      from: 'Plakor Website <no-reply@plakordivisiones.es>',
      to: ['plakordivisiones@hotmail.com'],
      subject: 'Nuevo mensaje de contacto',
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email || 'No proporcionado'}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        ${service ? `<p><strong>Servicio:</strong> ${service}</p>` : ''}
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      data,
      strapiResponse
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Error al enviar el mensaje' },
      { status: 500 }
    );
  }
} 