import { ACCOUNT_URL } from '@/constant/env'
import { cookieNames } from '@/services/common/cookie'
import { cookies, headers } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/article')) {
    const tokenFromHeader = (await headers()).get('single-use-token') || ''
    const sessionId = (await headers()).get('session-id') || ''

    if (tokenFromHeader) {
      cookieStore.set(cookieNames.USER_ACCESS_TOKEN, tokenFromHeader)
    }

    if (sessionId) {
      cookieStore.set(cookieNames.SESSION_ID, sessionId)
    }
  }

  if (pathname.startsWith('/my')) {
    const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value

    // Parse the current URL
    const url = new URL(request.url)
    const loginToken = url.searchParams.get('accessToken')

    if (!token && loginToken) {
      cookieStore.set(cookieNames.USER_ACCESS_TOKEN, loginToken)
    }

    // If no token, redirect to login page
    if (!token) {
      const loginUrl = new URL(
        `${ACCOUNT_URL}/auth/login?redirectUri=${encodeURIComponent(request.nextUrl.toString())}`
      )
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/my(.*)', '/article(.*)'],
}
