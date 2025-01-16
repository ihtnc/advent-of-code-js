import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const publicRoutes = ['/login']

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublic = publicRoutes.includes(path)

  const session = (await cookies()).get('session')?.value

  if (!isPublic && !session) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}