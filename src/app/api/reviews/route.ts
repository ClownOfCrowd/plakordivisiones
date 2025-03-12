import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Временная заглушка
    return NextResponse.json(
      { message: 'Reseña enviada con éxito' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al enviar la reseña' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Временные тестовые данные
  const reviews = [
    {
      id: 1,
      name: "Juan García",
      rating: 5,
      text: "Excelente servicio y profesionalidad",
      service: "Reforma integral",
      date: "2024-03-10"
    },
    {
      id: 2,
      name: "María López",
      rating: 5,
      text: "Muy satisfecha con el resultado",
      service: "Instalación de pladur",
      date: "2024-03-09"
    }
  ];

  return NextResponse.json(reviews);
}
