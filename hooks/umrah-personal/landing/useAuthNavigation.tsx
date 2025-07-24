import { ACCOUNT_URL } from '@/constant/env'
import { useAuth } from '@/contexts/auth/context'
import { useRouter } from 'next/navigation'

interface UseAuthNavigationProps {
  redirectPath: string
  requirePhoneVerification?: boolean
}

interface UseAuthNavigationReturn {
  // Computed values
  isAuthenticated: boolean
  isPhoneVerified: boolean
  canProceed: boolean

  // Actions
  handleNavigateWithAuth: (onPhoneNotVerified?: () => void) => void
  redirectToLogin: () => void
}

export const useAuthNavigation = ({
  redirectPath,
  requirePhoneVerification = false,
}: UseAuthNavigationProps): UseAuthNavigationReturn => {
  const router = useRouter()
  const { profile } = useAuth()

  // Check if user has a valid token
  const isAuthenticated = !!profile
  const isPhoneVerified = !!profile?.phonenumberVerified

  // Determine if user can proceed based on requirements
  const canProceed =
    isAuthenticated && (!requirePhoneVerification || isPhoneVerified)

  const redirectToLogin = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
    router.push(
      `${ACCOUNT_URL}/auth/login?redirectUri=${encodeURIComponent(currentUrl)}`
    )
  }

  const handleNavigateWithAuth = (onPhoneNotVerified?: () => void) => {
    // Not authenticated - redirect to login
    if (!isAuthenticated) {
      redirectToLogin()
      return
    }

    // Authenticated but phone verification required and not verified
    if (requirePhoneVerification && !isPhoneVerified) {
      if (onPhoneNotVerified) {
        onPhoneNotVerified()
      }
      return
    }

    // All conditions met - proceed to redirect path
    router.push(redirectPath)
  }

  return {
    // Computed values
    isAuthenticated,
    isPhoneVerified,
    canProceed,

    // Actions
    handleNavigateWithAuth,
    redirectToLogin,
  }
}
