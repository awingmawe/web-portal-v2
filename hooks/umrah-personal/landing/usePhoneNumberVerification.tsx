import { toast } from '@/components/ui/sonner'
import { useAuth } from '@/contexts/auth/context'
import { changePhoneOtp, updatePhoneNumber } from '@/services/identity-service'
import { useState } from 'react'

interface UsePhoneVerificationProps {
  initialPhoneNumber?: string
}

interface UsePhoneVerificationReturn {
  // State
  phoneNumber: string | undefined
  setPhoneNumber: (phone: string | undefined) => void
  isLoading: boolean
  openOtp: boolean
  setOpenOtp: (open: boolean) => void

  // Computed values
  verificationPurpose: 'post-edit-phone' | 'post-add-phone'

  // Actions
  handleSendOtp: () => Promise<void>
  handleVerifyOtp: (otp: string) => Promise<void>
  handleResendOtp: () => Promise<void>
}

export const usePhoneVerification = ({
  initialPhoneNumber,
}: UsePhoneVerificationProps = {}): UsePhoneVerificationReturn => {
  const { profile, refetchProfile } = useAuth()

  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    initialPhoneNumber || profile?.persona?.phoneNumber
  )
  const [isLoading, setIsLoading] = useState(false)
  const [openOtp, setOpenOtp] = useState(false)

  const verificationPurpose = profile?.persona?.phoneNumber
    ? 'post-edit-phone'
    : 'post-add-phone'

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      toast.error('Nomor telepon wajib diisi')
      return
    }

    setIsLoading(true)
    try {
      const response = await changePhoneOtp({
        phoneNumber,
      })

      setIsLoading(false)
      setOpenOtp(true)
      toast.success(response)
      refetchProfile()
    } catch (error: any) {
      setIsLoading(false)
      const message = error?.response?.data?.errorMessage || error?.message

      // Handle specific case where OTP is still valid
      if (
        message ===
        'Tidak dapat mengirim kembali OTP yang masih berlaku. Pastikan Anda memasukan nomor telepon yang sesuai.'
      ) {
        setOpenOtp(true)
      } else {
        toast.error(message)
      }
    }
  }

  const handleVerifyOtp = async (otp: string) => {
    if (!phoneNumber) {
      toast.error('Nomor telepon tidak ditemukan')
      return
    }

    setIsLoading(true)
    try {
      const response = await updatePhoneNumber({
        otp,
        phoneNumber,
      })

      setIsLoading(false)
      setOpenOtp(false)
      toast.success(response)
      refetchProfile()
    } catch (error: any) {
      setIsLoading(false)
      setOpenOtp(false)
      const message = error?.response?.data?.errorMessage || error?.message
      toast.error(message)
    }
  }

  const handleResendOtp = async () => {
    if (!phoneNumber) {
      toast.error('Nomor telepon tidak ditemukan')
      return
    }

    try {
      const response = await changePhoneOtp({
        phoneNumber,
      })

      setIsLoading(false)
      setOpenOtp(true)
      toast.success(response)
    } catch (error: any) {
      setIsLoading(false)
      const message = error?.response?.data?.errorMessage || error?.message

      if (
        message ===
        'Tidak dapat mengirim kembali OTP yang masih berlaku. Pastikan Anda memasukan nomor telepon yang sesuai.'
      ) {
        setOpenOtp(true)
      } else {
        toast.error(message)
      }
    }
  }

  return {
    // State
    phoneNumber,
    setPhoneNumber,
    isLoading,
    openOtp,
    setOpenOtp,

    // Computed values
    verificationPurpose,

    // Actions
    handleSendOtp,
    handleVerifyOtp,
    handleResendOtp,
  }
}
