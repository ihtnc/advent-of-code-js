import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path.startsWith('/login')
  || path.startsWith('/logout')
  || path.startsWith('/error')
  || path.startsWith('/loading')
  || path.startsWith('/not-found')
  || path.startsWith('/images')
  || path.startsWith('/_next/static');

  const session = (await cookies()).get('session')?.value;
  const hasSession = session ? session.length > 0 : false;

  if (isPublicPath || hasSession) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/login', request.nextUrl));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)'],
};