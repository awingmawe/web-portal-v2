import { EditIcon } from '@/components/icons/edit'
import { PasswordIcon } from '@/components/icons/password'
import { PlusIcon } from '@/components/icons/plus'
import CardPasswordDialog from '@/components/pages/my/4-Profile/Card/3-Password/CardPasswordDialog'
import VerificationDialog from '@/components/pages/my/4-Profile/Card/VerificationDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/sonner'
import {
  addPasswordOtp,
  changeBankOtp,
  changePassword,
  firstSetPassword,
} from '@/services/identity-service'
import { useState } from 'react'
interface CardPasswordProps {
  havePassword?: boolean
  onUpdated: () => void
}

interface PasswordFormValues {
  oldPassword?: string
  newPassword: string
  newPasswordConfirmation: string
}

export default function CardPassword({
  havePassword,
  onUpdated,
}: CardPasswordProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [newPassword, setNewPassword] = useState<string>('')
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] =
    useState(false)

  const [verificationPurpose, setVerificationPurpose] =
    useState<'post-add-password'>('post-add-password')

  const handleAddClick = () => {
    setVerificationPurpose('post-add-password')
    setIsEditDialogOpen(true)
    setIsEditing(false)
  }

  const handleEditClick = () => {
    // setCurrentAccount(account)
    setIsEditDialogOpen(true)
    setIsEditing(true)
    // setIsVerificationDialogOpen(true)
  }

  const handleVerify = async (otp: string) => {
    setIsLoading(true)

    try {
      const response = await firstSetPassword({
        otp,
        newPassword,
      })

      setIsLoading(false)
      setIsVerificationDialogOpen(false)
      toast.success(response)
      onUpdated()
    } catch (error: any) {
      setIsLoading(false)
      const message = error?.response?.data?.errorMessage || error?.message
      toast.error(message)
    }
  }

  const handleEditAccount = async (data: Omit<PasswordFormValues, 'id'>) => {
    // Store the pending changes and open verification dialog for final confirmation
    setIsLoading(true)
    try {
      let response
      if (havePassword) {
        response = await changePassword({
          newPassword: data.newPassword,
          oldPassword: data.oldPassword || '',
        })
      } else {
        response = await addPasswordOtp()
        setNewPassword(data.newPassword)
        setIsVerificationDialogOpen(true)
        setVerificationPurpose('post-add-password')
      }
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
      const response = await changeBankOtp()
      setIsLoading(false)
      setIsEditDialogOpen(false)
      setIsVerificationDialogOpen(true)
      setVerificationPurpose('post-add-password')
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
        <CardTitle className="text-m-semibold">Password</CardTitle>
      </CardHeader>
      <CardContent className="gap-0 space-y-4 px-4 pt-5">
        {havePassword ? (
          <div className="flex items-center justify-between">
            <p className="text-l-medium">*************</p>
            <Button
              variant="ghost"
              className="text-l-medium gap-1 rounded-full border-gray-300 px-3 py-2"
              onClick={handleEditClick}
            >
              <EditIcon className="h-4 w-4" />
              <span>
                Ganti <i>Password</i>
              </span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-neutral-500">
              Belum memiliki <i>password</i>
            </p>
            <Button
              variant="ghost"
              className="text-l-medium gap-1 rounded-full border-gray-300 px-3 py-2"
              onClick={handleAddClick}
            >
              <PlusIcon className="h-4 w-4" />
              <span>
                Tambah <i>Password</i>
              </span>
            </Button>
          </div>
        )}
      </CardContent>

      <VerificationDialog
        open={isVerificationDialogOpen}
        onOpenChange={setIsVerificationDialogOpen}
        onVerify={handleVerify}
        onResendOtp={handleResendOtp}
        icon={<PasswordIcon className="h-7 w-7 text-yellow-600" />}
        purpose={verificationPurpose}
        isLoading={isLoading}
      />

      <CardPasswordDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        havePassword={havePassword || false}
        isEditing={isEditing}
        isLoading={isLoading}
        onSubmit={handleEditAccount}
      />
    </Card>
  )
}
