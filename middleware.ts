/* eslint-disable @next/next/no-server-import-in-page */
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  const basePath = request.nextUrl.pathname === '/';

  const loginUrl = new URL('/login', request.url);
  const kudokuUrl = new URL('/kudoku', request.url);

  if (basePath) return NextResponse.redirect(kudokuUrl);

  if (!token) return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/kudoku/:path*', '/'],
};
