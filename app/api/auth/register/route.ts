import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('Register request body:', body);
    console.log('API URL:', `${process.env.NEXT_PUBLIC_API_URL}/api/users/register`);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    console.log('Backend response:', response.status, data);

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Register API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
