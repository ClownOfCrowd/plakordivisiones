import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { data } = await request.json();
    
    // Отправляем данные в Strapi
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/contact-submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.service,
          message: data.message,
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }

    return NextResponse.json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
} 