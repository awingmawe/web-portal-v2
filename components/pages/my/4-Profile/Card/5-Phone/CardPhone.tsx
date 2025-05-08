import { EditIcon } from '@/components/icons/edit'
import { EmailIcon } from '@/components/icons/email'
import { PlusIcon } from '@/components/icons/plus'
import CardPhoneNumberDialog from '@/components/pages/my/4-Profile/Card/5-Phone/CardPhoneDialog'
import VerificationDialog from '@/components/pages/my/4-Profile/Card/VerificationDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/sonner'
import { changePhoneOtp, updatePhoneNumber } from '@/services/identity-service'
import { useState } from 'react'
interface CardPhoneProps {
  phoneNumber: string
  onUpdated: () => void
}

interface PhoneNumberFormValue {
  phoneNumber: string
}

export default function CardPhone({ phoneNumber, onUpdated }: CardPhoneProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] =
    useState(false)
  const [phoneNumberEdited, setPhoneNumberEdited] = useState(phoneNumber)
  const verificationPurpose = phoneNumber ? 'post-edit-phone' : 'post-add-phone'

  const handleEditPasswordClick = () => {
    setIsEditDialogOpen(true)
    // setIsVerificationDialogOpen(true)
  }

  const handleVerify = async (otp: string) => {
    setIsLoading(true)
    try {
      const response = await updatePhoneNumber({
        otp,
        phoneNumber: phoneNumberEdited,
      })

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

  const handleEditPassword = async (data: Omit<PhoneNumberFormValue, 'id'>) => {
    // Store the pending changes and open verification dialog for final confirmation
    setIsLoading(true)
    try {
      const response = await changePhoneOtp({ phoneNumber: data.phoneNumber })
      setPhoneNumberEdited(data.phoneNumber)
      setIsVerificationDialogOpen(true)
      setIsEditDialogOpen(false)
      setIsLoading(false)
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

  const handleResendOtp = async () => {
    try {
      const response = await changePhoneOtp({ phoneNumber: phoneNumberEdited })
      setIsLoading(false)
      setIsEditDialogOpen(false)
      setIsVerificationDialogOpen(true)
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
        <CardTitle className="text-m-semibold">Nomor Telepon</CardTitle>
      </CardHeader>
      <CardContent className="gap-0 space-y-4 px-4 pt-5">
        {!phoneNumber ? (
          <div className="flex items-center justify-between">
            <p className="text-neutral-500">Nomor telepon belum diatur</p>
            <Button
              variant="ghost"
              className="text-l-medium gap-1 rounded-full border-gray-300 px-3 py-2"
              onClick={handleEditPasswordClick}
            >
              <PlusIcon className="h-4 w-4" /> Tambah No. Telpon
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-neutral-500">
              +62{' '}
              <span className="text-neutral-900">
                {phoneNumber.replace(/^0/, '').replace(/^62/, '')}
              </span>
            </p>
            <Button
              variant="ghost"
              className="text-l-medium gap-1 rounded-full border-gray-300 px-3 py-2"
            >
              <EditIcon className="h-4 w-4" /> Ganti Nomor
            </Button>
          </div>
        )}
      </CardContent>

      <CardPhoneNumberDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditPassword}
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
