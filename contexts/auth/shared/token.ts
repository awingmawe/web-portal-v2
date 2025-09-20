import { api } from '@/services/common/http'

export function refreshToken(token: string) {
  return api.post('/auth/v2/refresh', { refreshToken: token })
}
