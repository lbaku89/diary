import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export function middleware(request: NextRequest) {
  const isLoggedIn: RequestCookie | undefined = request.cookies.get('isLoggedIn')
  const requestPathname: string = request.nextUrl.pathname
  if (requestPathname === '/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if (requestPathname !== '/login' && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return null
}

export const config = {
  matcher: ['/', '/login', '/modifyDiary:path*', '/writeDiary:path*'],
}
