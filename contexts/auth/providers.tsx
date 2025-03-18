'use client'
import { ACCOUNT_URL } from '@/constant/env'
import {
  clearAuth,
  getAccessToken,
  setAccessToken,
} from '@/services/common/auth'

import { Context } from '@/contexts/auth/context'
import { usePermission, useProfile } from '@/contexts/auth/shared/api'
import { headersManager } from '@/services/common/http'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams?.get('accessToken')
  const exp = searchParams?.get('exp')
  const [state, setState] = useState<any>({})
  const [isMobile, setIsMobile] = useState(false)

  // Hooks to fetch permissions and profile, only triggered when token exists
  const { data: permissions, mutate: refetchPermissions } = usePermission(
    {},
    typeof window !== 'undefined' && !!getAccessToken() // Pass isReady as true only if token exists
  )
  const { data: profile, mutate: refetchProfile } = useProfile(
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
    if (token) {
      // Save the token to cookies
      setAccessToken(token, Number(exp))

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
  }, [token])

  function handleLogout() {
    clearAuth()
    headersManager.setHeader('X-API-Key', '')
    setTimeout(() => {
      router.push(
        `${ACCOUNT_URL}?redirectUri=${window.location.href}&logout=1&redirectBack=1`
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
        isMobile,
        hasPermission,
        permissions,
        refetchPermissions,
        logout: () => handleLogout(),
      }}
    >
      {children}
    </Context.Provider>
  )
}
