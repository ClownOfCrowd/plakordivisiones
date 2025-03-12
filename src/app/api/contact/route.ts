import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Временная заглушка, просто возвращаем успех
    return NextResponse.json(
      { message: 'Mensaje enviado con éxito' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al enviar el mensaje' },
      { status: 500 }
    );
  }
}
