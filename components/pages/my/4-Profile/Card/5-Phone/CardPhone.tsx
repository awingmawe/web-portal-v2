import { EditIcon } from '@/components/icons/edit'
import { PhoneIcon } from '@/components/icons/phone'
import { PlusIcon } from '@/components/icons/plus'
import CardPhoneNumberDialog from '@/components/pages/my/4-Profile/Card/5-Phone/CardPhoneDialog'
import VerificationDialog from '@/components/pages/my/4-Profile/Card/VerificationDialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/sonner'
import { changePhoneOtp, updatePhoneNumber } from '@/services/identity-service'
import dayjs from 'dayjs'
import { useState } from 'react'
interface CardPhoneProps {
  phoneNumber: string
  onUpdated: () => void
  phonenumberVerified: boolean
}

interface PhoneNumberFormValue {
  phoneNumber: string
}

export default function CardPhone({
  phoneNumber,
  onUpdated,
  phonenumberVerified,
}: CardPhoneProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditOpened, setIsEditOpened] = useState(() => {
    const isExpired = sessionStorage.getItem('isEditPhoneExpired')
    return isExpired ? isExpired >= dayjs().format() : false
  })
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] =
    useState(false)
  const [phoneNumberEdited, setPhoneNumberEdited] = useState(phoneNumber)
  const verificationPurpose = phoneNumber ? 'post-edit-phone' : 'post-add-phone'

  const handleEditPasswordClick = () => {
    if (isEditOpened) {
      setIsVerificationDialogOpen(true)
    } else {
      setIsEditDialogOpen(true)
      setIsEditOpened(true)
      sessionStorage.setItem(
        'isEditPhoneExpired',
        dayjs().add(5, 'minutes').format()
      )
    }
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
        <CardTitle className="text-m-semibold flex items-center justify-between">
          <span>Nomor Telepon</span>
          {phonenumberVerified ? (
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
        {!phoneNumber ? (
          <div className="max-lg: flex flex-col items-center justify-between">
            <p className="text-neutral-500">Nomor telepon belum diatur</p>
            <Button
              variant="ghost"
              className="text-l-medium gap-1 rounded-full border-gray-300 px-3 py-2 max-lg:text-lg"
              onClick={handleEditPasswordClick}
            >
              <PlusIcon className="h-4 w-4 max-lg:h-5 max-lg:w-5" /> Tambah No.
              Telpon
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
              onClick={handleEditPasswordClick}
            >
              <EditIcon className="h-4 w-4 max-lg:h-5 max-lg:w-5" />

              <span className="max-lg:hidden">Ganti Nomor</span>
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
        icon={<PhoneIcon className="h-7 w-7 text-yellow-600" />}
        purpose={verificationPurpose}
        isLoading={isLoading}
      />
    </Card>
  )
}
