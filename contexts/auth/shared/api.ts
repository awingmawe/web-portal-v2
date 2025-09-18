import { Permissions, Profile } from './type'
import { SWRConfiguration } from 'swr'
import { useSWRFetcher } from '@/services/use-swr-fetcher'
import { api, apiWithAuth } from '@/services/common/http'
import { getRefreshToken } from '@/services/common/auth'

export function getMyProfile() {
  return apiWithAuth.get<Profile>('/identity/my-profile')
}

export function getMyPermission() {
  return apiWithAuth.get<Permissions>(`/identity/my-profile/permissions`)
}

export function useProfile(
  config?: Partial<SWRConfiguration>,
  isReady?: boolean
) {
  return useSWRFetcher(
    isReady ? ['get-my-profile'] : null,
    getMyProfile,
    config
  )
}

export function usePermission(
  config?: Partial<SWRConfiguration>,
  isReady?: boolean
) {
  return useSWRFetcher(
    isReady ? ['get-my-profile-permission'] : null,
    getMyPermission,
    config
  )
}

export function refreshToken() {
  const refreshToken = getRefreshToken()

  return api.post('/auth/v2/refresh', {
    refreshToken: refreshToken,
  })
}
