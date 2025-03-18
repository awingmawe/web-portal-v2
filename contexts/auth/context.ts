import { createContext, useContext } from 'react'
import { Profile } from './shared/type'

type AuthContext = {
  profile?: Profile
  refetchProfile: () => void
  isMobile: boolean
  state: any
  setState: (_key: string, _value: any) => void
  logout: () => void
  permissions?: { identity: string[] }
  refetchPermissions: () => void
  hasPermission: (
    targetPermission: string,
    srcPermissions?: string[]
  ) => boolean
}

export const Context = createContext<AuthContext>({
  profile: undefined,
  refetchProfile: () => {
    return
  },
  isMobile: false,
  state: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setState: (_key: string, _value: any) => {
    return
  },
  logout: () => {
    return
  },
  permissions: undefined,
  refetchPermissions: () => {
    return
  },
  hasPermission: () => false,
})

export const useAuth = () => useContext(Context)
