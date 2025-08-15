import * as cookieCutter from 'cookie-cutter'

export const cookieNames = {
  USER_ACCESS_TOKEN: 'user_access_token',
  USER_ACCOUNT: 'user_account',
  SESSION_ID: 'session-id',
  IS_WEBVIEW: 'is-web-view',
  WUKALA_REFERRAL: 'wukala-referral',
}

interface CookieOptions {
  path?: string
  expires?: Date
  maxAge?: number
  domain?: string
  secure?: boolean
  httpOnly?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
}

const defaultOptions: CookieOptions = {
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
) {
  cookieCutter.set(name, value, { ...defaultOptions, ...options })
}

export function getCookie(name: string): string {
  return cookieCutter.get(name)
}

export function deleteCookie(name: string) {
  cookieCutter.set(name, '', {
    ...defaultOptions,
    expires: new Date(0),
  })
}
