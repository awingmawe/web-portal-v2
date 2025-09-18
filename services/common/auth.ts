import { setCookie, getCookie, deleteCookie, cookieNames } from './cookie'

export function setAccessToken(token: string, expiresIn?: number) {
  const options = expiresIn
    ? { expires: new Date(Number(expiresIn) * 1000) }
    : {}
  setCookie(cookieNames.USER_ACCESS_TOKEN, token, options)
}

export function setRefreshToken(token: string, expiresIn?: number) {
  const options = expiresIn
    ? { expires: new Date(Number(expiresIn) * 1000) }
    : {}
  setCookie(cookieNames.USER_REFRESH_TOKEN, token, options)
}

export function getAccessToken(): string {
  return getCookie(cookieNames.USER_ACCESS_TOKEN)
}

export function getRefreshToken(): string {
  return getCookie(cookieNames.USER_REFRESH_TOKEN)
}

export function setUserAccount(accountData: string) {
  setCookie(cookieNames.USER_ACCOUNT, accountData)
}

export function clearAuth() {
  deleteCookie(cookieNames.USER_ACCESS_TOKEN)
  deleteCookie(cookieNames.USER_ACCOUNT)
}

export function setWukalaReferral(referralCode: string) {
  setCookie(cookieNames.WUKALA_REFERRAL, referralCode)
}
export function getWukalaReferral(): string {
  return getCookie(cookieNames.WUKALA_REFERRAL)
}
