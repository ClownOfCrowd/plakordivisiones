import { NextResponse } from 'next/server';
import { submitContactForm } from '@/lib/strapi';

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
  console.log('Contact form API endpoint called');
  
  try {
    const body = await request.json();
    console.log('Request body:', body);
    
    const { name, email, phone, service, message } = body;

    // Отправляем данные в Strapi
    try {
      console.log('Submitting to Strapi with data:', {
        name,
        email,
        phone,
        service,
        message,
        requestStatus: 'new',
      });
      
      const strapiResponse = await submitContactForm({
        name,
        email,
        phone,
        service,
        message,
        requestStatus: 'new',
      });
      
      console.log('Strapi response:', strapiResponse);

      return corsHeaders(NextResponse.json({ 
        success: true, 
        data: strapiResponse
      }));
    } catch (error) {
      console.error('Error submitting to Strapi:', error);
      return corsHeaders(NextResponse.json(
        { error: 'Error submitting form' },
        { status: 500 }
      ));
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return corsHeaders(NextResponse.json(
      { error: 'Error processing request' },
      { status: 500 }
    ));
  }
} 