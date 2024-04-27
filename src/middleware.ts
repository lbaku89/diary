// * import from next/server
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// * import type
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const isLoggedIn: RequestCookie | undefined = request.cookies.get('isLoggedIn')
  const requestPathname: string = request.nextUrl.pathname

  // localStorage 에 바로 접근하는 것은 불가능 으로 보임

  // * 로그인 여부에 따른 페이지 리다이렉션 처리
  if (requestPathname === '/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if (requestPathname !== '/login' && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return null
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login', '/modifyDiary:path*', '/writeDiary:path*'],
}
