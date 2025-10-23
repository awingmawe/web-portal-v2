import axios, { AxiosInstance, AxiosError } from 'axios'
import { redirect } from 'next/navigation'
import {
  clearAuth,
  getAccessToken,
  getRefreshToken,
  getWukalaReferral,
  setAccessToken,
  setRefreshToken,
} from './auth'
import { ACCOUNT_URL, API_URL } from '@/constant/env'
import { getLocalReferralCode } from '@/lib/utils'
import { cookieNames } from '@/services/common/cookie'
import { toast } from '@/components/ui/sonner'
import { refreshToken } from '@/contexts/auth/shared/token'

// More specific header type
interface RequestHeaders {
  Authorization?: string
  'Content-Type'?: string
  Accept?: string
  [key: string]: string | undefined
}

let isRefreshing = false
let refreshPromise: Promise<string | null> | null = null

class HeadersManager {
  private headers: RequestHeaders = {}

  setHeader(key: string, value: string): void {
    this.headers[key] = value
  }

  removeHeader(key: string): void {
    delete this.headers[key]
  }

  getHeaders(): RequestHeaders {
    return { ...this.headers }
  }
}

export const headersManager = new HeadersManager()

// Error types
export interface ApiErrorResponse {
  message?: string
  reason?: string
  errorMessage?: string
  errorValidation?: Record<string, string[]>
  status?: number
}

async function getServerReferralCode(): Promise<string | undefined> {
  const { cookies } = await import('next/headers') // dynamic import
  const cookieStore = await cookies()
  const wukalaCookie = cookieStore.get(cookieNames.WUKALA_REFERRAL)
  return wukalaCookie?.value
}

async function refreshAccessToken(): Promise<string | null> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise
  }

  let refreshtoken: string | undefined

  if (typeof window !== 'undefined') {
    refreshtoken = getRefreshToken()
  } else {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    refreshtoken = cookieStore.get(cookieNames.USER_REFRESH_TOKEN)?.value
  }

  if (!refreshtoken) {
    return null
  }

  isRefreshing = true
  refreshPromise = (async () => {
    try {
      const resp = await refreshToken(refreshtoken as string)
      const newToken = resp.data?.accessToken
      const newRefreshToken = resp.data?.refreshToken
      const exp = resp.data?.expiresIn

      if (newToken) {
        setRefreshToken(newRefreshToken, Number(exp))
        setAccessToken(newToken, Number(exp))
        return newToken
      }
      return null
    } catch (e) {
      clearAuth()
      return null
    } finally {
      isRefreshing = false
      refreshPromise = null
    }
  })()

  return refreshPromise
}

function handleApiError(error: AxiosError<ApiErrorResponse>): never {
  const { response } = error

  if (response?.status === 500) {
    toast.error('Terjadi kesalahan, silakan coba lagi nanti.')
  }

  // Format error message
  let errorMessage = 'An error occurred'

  if (response?.data) {
    const {
      errorValidation,
      message,
      reason,
      errorMessage: apiErrorMessage,
    } = response.data

    errorMessage =
      message ||
      reason ||
      apiErrorMessage ||
      `Network error with status ${response.status}`

    // Format validation errors
    if (errorValidation) {
      const validationMessages = Object.entries(errorValidation)
        .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
        .join('\n')

      errorMessage = `${errorMessage}\n\nValidation errors:\n${validationMessages}`
    }

    if (response.status == 429) {
      errorMessage = 'Terlalu banyak permintaan, silakan coba lagi nanti.'
    }
  } else {
    errorMessage = error.message || 'Network error. Please try again.'
  }

  const enhancedError = new Error(errorMessage)
  enhancedError.name = 'ApiError'
  throw enhancedError
}

// Form data helper
export function createFormData(
  files: Array<{ key: string; file: File }> = [],
  data: Record<string, any> = {}
): FormData {
  const formData = new FormData()

  // Add files
  files.forEach(({ key, file }) => {
    formData.append(key, file)
  })

  // Add other data
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(
        key,
        typeof value === 'object' ? JSON.stringify(value) : String(value)
      )
    }
  })

  return formData
}

// Create API client
function createApiClient(baseURL: string, useAuth = false): AxiosInstance {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 30000, // Add reasonable timeout
  })

  // Request interceptor
  instance.interceptors.request.use(async (config: any) => {
    // Apply custom headers
    config.headers = {
      ...config.headers,
      ...headersManager.getHeaders(),
    }

    // Add referral code
    let wukalaReferral: string | undefined
    if (typeof window !== 'undefined') {
      wukalaReferral = getWukalaReferral() ?? getLocalReferralCode()
    } else {
      wukalaReferral = await getServerReferralCode()
    }
    if (wukalaReferral) {
      config.headers['X-Wukalla-Referral'] = wukalaReferral
    }

    // Add auth token if needed
    if (useAuth) {
      const token = getAccessToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  })

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiErrorResponse>) => {
      const { response, config } = error

      if (response?.status === 401 && config) {
        try {
          const newToken = await refreshAccessToken()
          if (newToken) {
            config.headers = config.headers ?? {}
            config.headers['Authorization'] = `Bearer ${newToken}`
            return instance(config) // retry original request
          }
        } catch (e) {
          clearAuth()
        }

        // If refresh failed → redirect to login
        const currentUrl =
          typeof window !== 'undefined'
            ? window.location.href
            : config?.url || '/'
        const redirectUrl = `${ACCOUNT_URL}/auth/login?redirectUri=${encodeURIComponent(
          currentUrl
        )}&logout=1`

        if (typeof window !== 'undefined') {
          window.location.href = redirectUrl
        } else {
          redirect(redirectUrl)
        }
      }

      return handleApiError(error)
    }
  )

  return instance
}

export function createServerApiClient(token: string): AxiosInstance {
  const instance = axios.create({
    baseURL: API_URL as string,
    withCredentials: true,
    timeout: 30000,
  })

  // Request interceptor
  instance.interceptors.request.use((config: any) => {
    // Apply custom headers
    config.headers = {
      ...config.headers,
      ...headersManager.getHeaders(),
    }

    // Add the provided token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiErrorResponse>) => handleApiError(error)
  )

  return instance
}

// Export API instances
export const api = createApiClient(API_URL as string) // public, when call in server side need to pass the TOKEN
export const apiWithAuth = createApiClient(API_URL as string, true) // ONLY USE IN CLIENT-SIDE
