import { ReferralActions } from '@/constant/types/CheckoutProps'
import { checkReferralCode } from '@/services/wukala-service'

interface UseReferralActionsProps {
  referralCode: string
  setReferralCode: (code: string) => void
  setIsReferralCodeChecked: (checked: boolean) => void
  setIsReferralValid: (valid: boolean) => void
  setWukalaSetting: (setting: boolean) => void
  setShouldRunCheckPre: (should: boolean) => void
  setShouldCheckPreAfterClear: (should: boolean) => void
}

export const useReferralActions = ({
  referralCode,
  setReferralCode,
  setIsReferralCodeChecked,
  setIsReferralValid,
  setWukalaSetting,
  setShouldRunCheckPre,
  setShouldCheckPreAfterClear,
}: UseReferralActionsProps): ReferralActions => {
  const handleCheckReferral = async (): Promise<void> => {
    setIsReferralCodeChecked(false)
    setIsReferralValid(false)

    try {
      const res = await checkReferralCode(referralCode)
      setIsReferralCodeChecked(true)
      setIsReferralValid(true)
      setWukalaSetting(res)
      setShouldRunCheckPre(true)
    } catch (error: any) {
      console.log(error)
      setIsReferralCodeChecked(true)
      setIsReferralValid(false)
      setWukalaSetting(false)
    }
  }

  const handleRemoveReferralCode = (): void => {
    setReferralCode('')
    setIsReferralValid(false)
    setIsReferralCodeChecked(false)
    setWukalaSetting(false)
    setShouldCheckPreAfterClear(true)
  }

  return {
    handleCheckReferral,
    handleRemoveReferralCode,
  }
}
