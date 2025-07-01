import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // const req = await request.json();
  // console.log('req: ', req);
  const { searchParams } = new URL(request.url);
  console.log('id：', searchParams.get('id'));

  const response = NextResponse.json({ message: 'Hello World' });
  response.headers.set('Custom-Header', 'Custom Value');
  return response;
}
