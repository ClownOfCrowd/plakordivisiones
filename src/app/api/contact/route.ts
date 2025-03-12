import { NextResponse } from 'next/server';
import { ContactFormSchema } from '@/lib/schema';
import { STRAPI_API_URL, STRAPI_API_TOKEN } from '@/lib/constants';

// Функция для добавления заголовков CORS
function corsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

// Обработчик OPTIONS запросов для CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Валидация данных
    const validatedData = ContactFormSchema.parse(body);
    
    // Подготовка данных для Strapi
    const strapiData = {
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
        service: validatedData.service,
      },
    };

    // Отправка данных в Strapi
    const strapiResponse = await fetch(`${STRAPI_API_URL}/api/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify(strapiData),
    });

    if (!strapiResponse.ok) {
      throw new Error('Error submitting to Strapi');
    }

    return corsHeaders(NextResponse.json({ success: true }));
  } catch (error) {
    return corsHeaders(NextResponse.json(
      { error: 'Error processing contact form' },
      { status: 400 }
    ));
  }
} 