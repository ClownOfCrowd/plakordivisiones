import { NextResponse } from 'next/server';
import { submitReview } from '@/lib/strapi';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, rating, text, service } = body;

    // Проверяем обязательные поля
    if (!name || !email || !rating || !text || !service) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    // Отправляем данные в Strapi
    const strapiResponse = await submitReview({
      name,
      email,
      rating,
      text,
      service,
    });

    return NextResponse.json({ 
      success: true, 
      data: strapiResponse
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json(
      { error: 'Error al enviar la reseña' },
      { status: 500 }
    );
  }
} 