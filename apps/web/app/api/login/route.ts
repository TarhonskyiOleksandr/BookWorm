import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  });

  const data = await res.json();
  const response = new NextResponse(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });

  const rawSetCookies = res.headers.getSetCookie?.() || [];
  for (const cookie of rawSetCookies) {
    response.headers.append('set-cookie', cookie);
  }

  return response;
}
