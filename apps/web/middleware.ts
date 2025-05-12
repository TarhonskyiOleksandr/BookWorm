import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value
  console.log('🧪 access_token cookie:', request.cookies)

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  try {
    jwt.verify(token, '45be46cb6070e24393a646e90d9d15eb6a7b2580496de9073f3e8cdbedce4f5ef90d7ecbfc3970105e8d731b9f2e72cc7ff6bd889235e7a04f5dcc926f96c343cb016558abf03b21150cd8e34b31fde4fbd3a648780177bca9ab08f44e017bec5c5fd6dd727e548d09e73af4fa4c88c5e8413be4bc6409370b0d06e3f02e0609')
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
}

export const config = {
  matcher: ['/account/:path*'],
};
