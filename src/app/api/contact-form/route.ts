import { NextResponse } from 'next/server';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received form data:', body);
    console.log('STRAPI_API_URL:', STRAPI_API_URL);
    console.log('STRAPI_API_TOKEN exists:', !!STRAPI_API_TOKEN);

    const strapiResponse = await fetch(`${STRAPI_API_URL}/api/contact-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    console.log('Strapi response status:', strapiResponse.status);

    if (!strapiResponse.ok) {
      const errorText = await strapiResponse.text();
      console.error('Strapi error:', errorText);
      console.error('Response headers:', Object.fromEntries(strapiResponse.headers.entries()));
      return NextResponse.json(
        { error: 'Failed to submit form to Strapi' },
        { status: strapiResponse.status }
      );
    }

    const data = await strapiResponse.json();
    console.log('Strapi success response:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 