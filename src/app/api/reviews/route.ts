import { NextResponse } from 'next/server';

const reviews = [
  {
    id: 1,
    name: 'María García',
    rating: 5,
    comment: 'Excelente trabajo en la reforma de mi cocina. El equipo fue muy profesional y cumplieron con los plazos.',
    service: 'Reforma de cocina',
    date: '2024-03-15',
    approved: true
  },
  {
    id: 2,
    name: 'Juan Martínez',
    rating: 5,
    comment: 'Muy satisfecho con la renovación del baño. Acabados de primera calidad y atención personalizada.',
    service: 'Reforma de baño',
    date: '2024-02-28',
    approved: true
  },
  {
    id: 3,
    name: 'Ana López',
    rating: 5,
    comment: 'Realizaron un excelente trabajo en la instalación del pladur. Rápidos, limpios y profesionales.',
    service: 'Instalación de pladur',
    date: '2024-02-15',
    approved: true
  }
];

export async function GET() {
  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newReview = {
      id: reviews.length + 1,
      ...body,
      date: new Date().toISOString().split('T')[0],
      approved: false
    };
    
    // В реальном приложении здесь был бы код для сохранения в базу данных
    reviews.push(newReview);

    return NextResponse.json(newReview);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al enviar la reseña' },
      { status: 400 }
    );
  }
} 