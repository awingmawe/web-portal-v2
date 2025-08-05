import { CardPosIcon } from '@/components/icons/card-pos'
import { EditIcon } from '@/components/icons/edit'
import { PlusIcon } from '@/components/icons/plus'
import BankAccountDialog from '@/components/pages/my/4-Profile/Card/2-Rekening/CardRekeningDialog'
import VerificationDialog from '@/components/pages/my/4-Profile/Card/VerificationDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/sonner'
import { ellipsis } from '@/lib/utils'
import { changeBank, changeBankOtp } from '@/services/identity-service'
import Image from 'next/image'
import { useState } from 'react'
export interface CardRekeningProps {
  accountBank?: string
  accountNumber?: string
  accountName?: string
  bankLogo?: string
  onUpdated: () => void
}

interface BankAccount {
  id: string
  bank: string
  accountNumber: string
  accountName: string
  bankLogo?: string
}

export default function CardRekening({
  accountBank,
  accountNumber,
  accountName,
  bankLogo,
  onUpdated,
}: CardRekeningProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] =
    useState(false)
  const [pendingAccount, setPendingAccount] = useState<Omit<
    BankAccount,
    'id'
  > | null>(null)
  const [verificationPurpose, setVerificationPurpose] = useState<
    'pre-add-rekening' | 'pre-edit-rekening' | 'post-edit-rekening'
  >('pre-add-rekening')

  const handleAddClick = () => {
    setVerificationPurpose('pre-add-rekening')
    setIsEditDialogOpen(true)
    setIsEditing(false)
  }

  const handleEditClick = () => {
    // setCurrentAccount(account)
    setIsEditDialogOpen(true)
    setVerificationPurpose('pre-edit-rekening')
    setIsEditing(true)
    // setIsVerificationDialogOpen(true)
  }

  const handleVerify = async (otp: string) => {
    setIsLoading(true)

    try {
      const response = await changeBank({
        otp,
        bankLogo: pendingAccount?.bankLogo || '',
        accountBank: pendingAccount?.bank || '',
        accountNumber: pendingAccount?.accountNumber || '',
        accountName: pendingAccount?.accountName || '',
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

  const handleEditAccount = async (data: Omit<BankAccount, 'id'>) => {
    // Store the pending changes and open verification dialog for final confirmation
    setIsLoading(true)
    try {
      const response = await changeBankOtp()
      setPendingAccount(data)
      setIsLoading(false)
      setIsEditDialogOpen(false)
      setIsVerificationDialogOpen(true)
      setVerificationPurpose('post-edit-rekening')
      toast.success(response)
    } catch (error: any) {
      setIsLoading(false)
      const message = error?.response?.data?.errorMessage || error?.message
      if (message == 'Tidak dapat mengirim kembali OTP yang masih berlaku.') {
        setIsEditDialogOpen(false)
        setIsVerificationDialogOpen(true)
      } else {
        toast.error('Gagal edit rekening')
      }
    }
  }

  const handleResendOtp = async () => {
    try {
      const response = await changeBankOtp()
      setIsLoading(false)
      setIsEditDialogOpen(false)
      setIsVerificationDialogOpen(true)
      setVerificationPurpose('post-edit-rekening')
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
        <CardTitle className="text-m-semibold">Rekening Bank</CardTitle>
      </CardHeader>
      <CardContent className="gap-0 space-y-4 px-4 pt-5">
        {accountNumber ? (
          <div className="flex items-center justify-between">
            <div>
              <Image
                src={bankLogo || '/images/no-image.png'}
                alt="Bank Logo"
                width={50}
                height={50}
                className="mr-3"
              />
              <div className="mt-2 flex items-center">
                <p className="text-l-medium">
                  {`${accountNumber.slice(0, 3)}******${accountNumber.slice(
                    -3
                  )}`}
                </p>
                <Separator orientation="vertical" className="mx-2 !h-5" />
                <p className="text-l-medium">
                  {ellipsis(String(accountName), 20)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="text-l-medium gap-1 rounded-full border-gray-300 px-3 py-2"
              onClick={handleEditClick}
            >
              <EditIcon className="h-4 w-4 max-lg:h-5 max-lg:w-5" />
              <span className="max-lg:hidden">Ganti Rekening</span>
            </Button>
          </div>
        ) : (
          <div className="max-lg: flex flex-col items-center justify-between">
            <p className="text-neutral-500">
              Belum ada rekening bank ditambahkan
            </p>
            <Button
              variant="ghost"
              className="text-l-medium gap-1 rounded-full border-gray-300 px-3 py-2 max-lg:text-lg"
              onClick={handleAddClick}
            >
              <PlusIcon className="h-4 w-4 max-lg:h-5 max-lg:w-5" /> Tambah
              Rekening
            </Button>
          </div>
        )}
      </CardContent>

      <VerificationDialog
        open={isVerificationDialogOpen}
        onOpenChange={setIsVerificationDialogOpen}
        onVerify={handleVerify}
        onResendOtp={handleResendOtp}
        icon={<CardPosIcon className="h-7 w-7 text-yellow-600" />}
        purpose={verificationPurpose}
        isLoading={isLoading}
      />

      <BankAccountDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        isEditing={isEditing}
        defaultValues={{
          bank: accountBank,
          accountNumber: accountNumber,
          accountName: accountName,
        }}
        isLoading={isLoading}
        onSubmit={handleEditAccount}
      />
    </Card>
  )
}
