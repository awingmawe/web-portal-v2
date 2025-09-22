'use client'
import { ACCOUNT_URL } from '@/constant/env'
import {
  clearAuth,
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from '@/services/common/auth'

import { toast } from '@/components/ui/sonner'
import { Context } from '@/contexts/auth/context'
import { usePermission, useProfile } from '@/contexts/auth/shared/api'
import { headersManager } from '@/services/common/http'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams?.get('accessToken')
  const refreshToken = searchParams?.get('refreshToken')
  const exp = searchParams?.get('exp')
  const [state, setState] = useState<any>({})
  const [isMobile, setIsMobile] = useState(false)

  // Hooks to fetch permissions and profile, only triggered when token exists
  const { data: permissions, mutate: refetchPermissions } = usePermission(
    {},
    typeof window !== 'undefined' && !!getAccessToken() // Pass isReady as true only if token exists
  )
  const {
    data: profile,
    mutate: refetchProfile,
    isLoading: isLoadingProfile,
  } = useProfile(
    {},
    typeof window !== 'undefined' && !!getAccessToken() // Pass isReady as true only if token exists
  )

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleChangeState = (key: string, value: any) => {
    setState((current: any) => ({ ...current, [key]: value }))
  }

  useEffect(() => {
    if (token && refreshToken) {
      // Save the token to cookies
      setAccessToken(token, Number(exp))
      setRefreshToken(refreshToken, Number(exp))

      // Remove the `token` parameter from the URL
      const updatedParams = new URLSearchParams(
        Array.from(searchParams?.entries() ?? [])
      )
      updatedParams.delete('accessToken')
      updatedParams.delete('exp')
      toast.success('Login Berhasil', { id: 'login-success' })
      refetchPermissions()
      refetchProfile()

      // Update the URL without refreshing
      router.replace(`${window.location.pathname}?${updatedParams.toString()}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, refreshToken])

  function handleLogout(isRedirect?: boolean, redirectUri?: string) {
    clearAuth()
    headersManager.setHeader('X-API-Key', '')
    setTimeout(() => {
      router.push(
        `${ACCOUNT_URL}/auth/logout?redirectUri=${redirectUri ?? window.location.href}&logout=1&redirectBack=${isRedirect ? 1 : 0}`
      )
    }, 1000)
    return Promise.resolve()
  }

  function hasPermission(permission: string): boolean {
    if (!permissions) return false

    const permissionList = permission.split(',')
    for (const perm of permissionList) {
      const [parent, target] = perm.split('.')
      if (parent && target) {
        if (permissions[parent as keyof typeof permissions]?.includes(target)) {
          return true
        }
      } else if (permissions.identity.includes(perm)) {
        return true
      }
    }
    return false
  }

  return (
    <Context.Provider
      value={{
        state,
        setState: handleChangeState,
        refetchProfile,
        profile,
        isLoadingProfile,
        isMobile,
        hasPermission,
        permissions,
        refetchPermissions,
        logout: (isRedirectBack?: boolean, redirectUri?: string) =>
          handleLogout(isRedirectBack, redirectUri),
      }}
    >
      {children}
    </Context.Provider>
  )
}
