import { ACCOUNT_URL } from '@/constant/env'
import { cookieNames } from '@/services/common/cookie'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // ✅ Tambahkan cookie dari header jika ada
  const tokenFromHeader = request.headers.get('single-use-token')
  const sessionId = request.headers.get('session-id')

  if (tokenFromHeader) {
    response.cookies.set(cookieNames.USER_ACCESS_TOKEN, tokenFromHeader, {
      httpOnly: true,
      path: '/',
    })
  }

  if (sessionId) {
    response.cookies.set(cookieNames.SESSION_ID, sessionId, {
      httpOnly: true,
      path: '/',
    })
  }

  // ✅ Cek URL yang perlu redirect login
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/my')) {
    const token = request.cookies.get(cookieNames.USER_ACCESS_TOKEN)?.value

    const url = new URL(request.url)
    const loginToken = url.searchParams.get('accessToken')

    // Jika tidak ada token dan token dari query, set cookie
    if (!token && loginToken) {
      response.cookies.set(cookieNames.USER_ACCESS_TOKEN, loginToken, {
        httpOnly: true,
        path: '/',
      })
    }

    // Jika tidak ada token sama sekali, redirect ke login
    if (!token && !loginToken) {
      const loginUrl = new URL(
        `${ACCOUNT_URL}/auth/login?redirectUri=${encodeURIComponent(request.nextUrl.toString())}`
      )
      return NextResponse.redirect(loginUrl)
    }
  }

  return response
}

export const config = {
  matcher: ['/my(.*)', '/article(.*)'],
}
