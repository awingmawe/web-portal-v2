import { AppleIcon } from '@/components/icons/apple'
import { EditIcon } from '@/components/icons/edit'
import { EmailIcon } from '@/components/icons/email'
import { GoogleIcon } from '@/components/icons/google'
import CardEmailDialog from '@/components/pages/my/4-Profile/Card/4-Email/CardEmailDialog'
import VerificationDialog from '@/components/pages/my/4-Profile/Card/VerificationDialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/sonner'
import {
  changeEmailOtp,
  verifyEmail,
  verifyEmailOtp,
} from '@/services/identity-service'
import { useState } from 'react'
interface CardEmailProps {
  email: string
  provider: string
  emailVerified: boolean
  onUpdated: () => void
}

interface PasswordFormValues {
  email: string
}

export default function CardEmail({
  email,
  provider,
  emailVerified,
  onUpdated,
}: CardEmailProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] =
    useState(false)
  const [emailEdited, setEmailEdited] = useState(email)
  const [verificationPurpose, setVerificationPurpose] = useState<
    'post-verify-email' | 'post-change-email'
  >('post-verify-email')

  const handleVerifyEmail = async () => {
    await verifyEmailOtp()
    setVerificationPurpose('post-verify-email')
    setIsVerificationDialogOpen(true)
  }

  const handleEditEmailClick = () => {
    setIsEditDialogOpen(true)
    // setIsVerificationDialogOpen(true)
  }

  const handleVerify = async (otp: string) => {
    setIsLoading(true)
    try {
      let response
      if (verificationPurpose == 'post-verify-email') {
        response = await verifyEmail({
          otp,
          purpose: null,
          email,
        })
      } else {
        response = await verifyEmail({
          otp,
          purpose: 'change-email',
          email: emailEdited,
        })
      }

      setIsLoading(false)
      setIsVerificationDialogOpen(false)
      toast.success(response)
      onUpdated()
    } catch (error: any) {
      setIsLoading(false)
      setIsVerificationDialogOpen(false)
      const message = error?.response?.data?.errorMessage || error?.message
      toast.error(message)
    }
  }

  const handleEditEmail = async (data: Omit<PasswordFormValues, 'id'>) => {
    // Store the pending changes and open verification dialog for final confirmation
    setIsLoading(true)
    try {
      const response = await changeEmailOtp({ email: data.email })
      setIsVerificationDialogOpen(true)
      setEmailEdited(data.email)
      setVerificationPurpose('post-change-email')
      setIsEditDialogOpen(false)
      setIsLoading(false)
      toast.success(response)
    } catch (error: any) {
      setIsLoading(false)
      const message = error?.response?.data?.errorMessage || error?.message
      toast.error(message)
    }
  }

  const handleResendOtp = async () => {
    try {
      let response
      if (verificationPurpose == 'post-verify-email') {
        response = await verifyEmailOtp()
        setIsLoading(false)
        setIsEditDialogOpen(false)
        setIsVerificationDialogOpen(true)
      }
      toast.success(response)
    } catch (error: any) {
      setIsLoading(false)
      const message = error?.response?.data?.errorMessage || error?.message
      if (
        message ==
        'Tidak dapat mengirim kembali OTP yang masih berlaku. Pastikan Anda memasukan alamat email yang sesuai.'
      ) {
        setIsEditDialogOpen(false)
        setIsVerificationDialogOpen(true)
      } else {
        toast.error(message)
      }
    }
  }

  return (
    <Card className="mb-6 !gap-[0px] rounded-3xl border border-neutral-200 !pt-3 shadow-none">
      <CardHeader className="pt border-b border-neutral-200 px-5 !pb-2">
        <CardTitle className="text-m-semibold flex items-center justify-between">
          <span>Email</span>
          {emailVerified ? (
            <Badge
              variant="outline"
              className="bg-success-100 !text-success-600 text-m-medium rounded-full border-0 px-3 py-1.5"
            >
              Sudah Diverifikasi
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-error-100 !text-error-600 text-m-medium rounded-full border-0 px-3 py-1.5"
            >
              Belum Diverifikasi
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="gap-0 space-y-4 px-4 pt-5">
        <div className="flex items-center justify-between">
          <div className="items-center gap-3">
            <p>{email}</p>
            {!emailVerified && (
              <Button
                className="mt-1 px-3 py-2 font-medium"
                type="button"
                onClick={handleVerifyEmail}
              >
                Verifikasi Email
              </Button>
            )}
          </div>
          {provider == 'google' && <GoogleIcon />}
          {provider == 'apple' &&
          !email.includes('privaterelay.appleid.com') ? (
            <AppleIcon />
          ) : (
            <Button
              variant="ghost"
              type="button"
              className="text-l-medium gap-1 rounded-full border-gray-300 px-3 py-2"
              onClick={handleEditEmailClick}
            >
              <EditIcon className="h-4 w-4 max-lg:h-5 max-lg:w-5" />
              <span className="max-lg:hidden">Ganti Email</span>
            </Button>
          )}
          {provider == 'local' && (
            <Button
              variant="ghost"
              type="button"
              className="text-l-medium gap-1 rounded-full border-gray-300 px-3 py-2"
              onClick={handleEditEmailClick}
            >
              <EditIcon className="h-4 w-4 max-lg:h-5 max-lg:w-5" />
              <span className="max-lg:hidden">Ganti Email</span>
            </Button>
          )}
        </div>
      </CardContent>

      <CardEmailDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditEmail}
        isLoading={isLoading}
      />

      <VerificationDialog
        open={isVerificationDialogOpen}
        onOpenChange={setIsVerificationDialogOpen}
        onVerify={handleVerify}
        onResendOtp={handleResendOtp}
        icon={<EmailIcon className="h-7 w-7 text-yellow-600" />}
        purpose={verificationPurpose}
        isLoading={isLoading}
      />
    </Card>
  )
}
