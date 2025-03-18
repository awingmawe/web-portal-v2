import axios, { AxiosInstance, AxiosError } from 'axios'
import { redirect } from 'next/navigation'
import { getAccessToken } from './auth'
import { ACCOUNT_URL, API_URL } from '@/constant/env'

// More specific header type
interface RequestHeaders {
  Authorization?: string
  'Content-Type'?: string
  Accept?: string
  [key: string]: string | undefined
}

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
interface ApiErrorResponse {
  message?: string
  reason?: string
  errorMessage?: string
  errorValidation?: Record<string, string[]>
  status?: number
}

function handleApiError(error: AxiosError<ApiErrorResponse>): never {
  const { response } = error

  // Handle authentication errors
  if (response?.status === 401) {
    const currentUrl =
      typeof window !== 'undefined'
        ? window.location.href
        : response.config?.url || '/'

    const redirectUrl = `${ACCOUNT_URL}/auth/login?redirectUri=${encodeURIComponent(currentUrl)}&logout=1`

    if (typeof window !== 'undefined') {
      window.location.href = redirectUrl
    } else {
      redirect(redirectUrl)
    }
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
  instance.interceptors.request.use((config: any) => {
    // Apply custom headers
    config.headers = {
      ...config.headers,
      ...headersManager.getHeaders(),
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
    (error: AxiosError<ApiErrorResponse>) => handleApiError(error)
  )

  return instance
}

// Export API instances
export const api = createApiClient(API_URL as string) // public
export const apiWithAuth = createApiClient(API_URL as string, true)
