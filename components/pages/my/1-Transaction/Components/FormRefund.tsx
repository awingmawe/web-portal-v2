'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Facility } from '@/constant/types/FacilityProps'
import { useAuth } from '@/contexts/auth/context'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { getFacilityEnum } from '@/services/general-service'
import {
  updateProfile,
  verifyEmailOtpBookingCanceled,
} from '@/services/identity-service'
import { DialogClose } from '@radix-ui/react-dialog'
import { CircleX, EditIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface FormRefundProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  setOpenVerifikasiEmail: any
  setSelectedBank: any
  selectedBank: any
  setAccountNumber: any
  accountNumber: any
  setAccountName: any
  accountName: any
}

export function ModalFormRefund({
  open,
  onOpenChange,
  setOpenVerifikasiEmail,
  setSelectedBank,
  selectedBank,
  setAccountNumber,
  accountNumber,
  setAccountName,
  accountName,
}: FormRefundProps) {
  const { profile } = useAuth()

  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { lg } = useTailwindBreakpoint()

  // State untuk menyimpan data yang sudah disimpan (bukan dari profile)
  const [savedBankData, setSavedBankData] = useState<{
    bank: string
    accountNumber: string
    accountName: string
    bankLogo?: string
  } | null>(null)

  // Check if user has existing bank account data
  const hasExistingBankData =
    profile?.persona?.accountBank &&
    profile?.persona?.accountNumber &&
    profile?.persona?.accountName

  useEffect(() => {
    if (hasExistingBankData && !savedBankData) {
      // Gunakan data dari profile hanya jika belum ada data yang disimpan
      setSelectedBank(profile?.persona?.accountBank || '')
      setAccountNumber(profile?.persona?.accountNumber || '')
      setAccountName(profile?.persona?.accountName || '')
      setIsEditing(false)
    } else if (savedBankData) {
      // Gunakan data yang sudah disimpan
      setSelectedBank(savedBankData.bank)
      setAccountNumber(savedBankData.accountNumber)
      setAccountName(savedBankData.accountName)
      setIsEditing(false)
    } else {
      setIsEditing(true)
    }
  }, [hasExistingBankData, profile, savedBankData])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const [banks, setBanks] = useState<Facility[]>([])

  useEffect(() => {
    const fetchBanks = async () => {
      const banks = await getFacilityEnum('bank')
      setBanks(banks.results)
    }
    fetchBanks()
  }, [])

  const handleCancel = () => {
    if (savedBankData) {
      // Reset ke data yang sudah disimpan
      setSelectedBank(savedBankData.bank)
      setAccountNumber(savedBankData.accountNumber)
      setAccountName(savedBankData.accountName)
      setIsEditing(false)
    } else if (hasExistingBankData) {
      // Reset to original values if canceling edit
      setSelectedBank(profile?.persona?.accountBank || '')
      setAccountNumber(profile?.persona?.accountNumber || '')
      setAccountName(profile?.persona?.accountName || '')
      setIsEditing(false)
    } else {
      // Clear form if no existing data
      setSelectedBank('')
      setAccountNumber('')
      setAccountName('')
    }

    onOpenChange(false)
  }

  const handleClose = () => {
    setSelectedBank('')
    setAccountNumber('')
    setAccountName('')
    setIsEditing(false)
    setSavedBankData(null)
    onOpenChange(false)
  }

  const handleSubmit = async () => {
    if (!selectedBank || !accountNumber || !accountName) return

    setIsLoading(true)

    try {
      const selectedBankData = banks.find((bank) => bank.name === selectedBank)
      // Update profile API call
      const data = {
        persona: {
          accountBank: selectedBank,
          accountNumber: accountNumber,
          accountName: accountName,
          bankLogo: selectedBankData?.image,
        },
      }
      const updateProfileResponse = await updateProfile(data)
      if (!updateProfileResponse) {
        throw new Error('Failed to update profile')
      }

      // Simpan data yang baru untuk ditampilkan

      setSavedBankData({
        bank: selectedBank,
        accountNumber: accountNumber,
        accountName: accountName,
        bankLogo: selectedBankData?.image || '/images/bank-default.png',
      })

      setIsEditing(false)
    } catch (error) {
      console.error('Error:', error)
      // Handle error - show error message to user
    } finally {
      setIsLoading(false)
    }
  }

  // Function untuk handle tombol "Proses Refund" ketika tidak dalam mode editing
  const handleProcessRefund = async () => {
    setIsLoading(true)

    try {
      await verifyEmailOtpBookingCanceled()
      // Handle success - maybe close modal or show success message
      onOpenChange(false)
      setOpenVerifikasiEmail(true)
    } catch (error) {
      console.error('Error processing refund:', error)
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const getCurrentBankLogo = () => {
    if (savedBankData) {
      return savedBankData.bankLogo || '/images/bank-default.png'
    }
    return profile?.persona?.bankLogo || '/images/bank-default.png'
  }

  const getCurrentDisplayData = () => {
    if (savedBankData) {
      return {
        accountNumber: savedBankData.accountNumber,
        accountName: savedBankData.accountName,
      }
    }
    return {
      accountNumber: profile?.persona?.accountNumber || '',
      accountName: profile?.persona?.accountName || '',
    }
  }

  const content = (
    <>
      <div className="mt-3 space-y-4">
        {/* Bank Selection */}
        <div>
          {!isEditing && (savedBankData || hasExistingBankData) ? (
            <div className="flex items-center justify-between rounded-[20px] border border-gray-300 bg-gray-50 px-4 py-3">
              <div className="flex flex-col gap-2">
                <Image
                  src={getCurrentBankLogo()}
                  width={32}
                  height={32}
                  alt="bank logo"
                />
                <span className="text-center text-sm text-gray-700">
                  {getCurrentDisplayData().accountNumber} -{' '}
                  {getCurrentDisplayData().accountName}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700"
              >
                <EditIcon className="h-4 w-4 max-lg:h-5 max-lg:w-5" />
                Ganti Rekening
              </Button>
            </div>
          ) : (
            <>
              <label className="mb-2 block text-[14px] font-medium text-gray-700">
                Pilih Bank <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full appearance-none rounded-[20px] border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 focus:border-yellow-500 focus:outline-none"
              >
                <option value="" disabled>
                  Pilih bank rekening kamu
                </option>
                {banks.map((a, index) => {
                  return (
                    <option value={a.name} key={index}>
                      {a.name}
                    </option>
                  )
                })}
              </select>
              {/* Account Number */}
              <div>
                <label className="mt-2 mb-2 block text-[14px] font-medium text-gray-700">
                  Nomor Rekening <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nomor rekening kamu"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full rounded-[20px] border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                />
              </div>

              {/* Account Name */}
              <div>
                <label className="mt-2 mb-2 block text-[14px] font-medium text-gray-700">
                  Nama Pemilik Rekening <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama pemilik rekening"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full rounded-[20px] border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <Button
          variant="outline"
          className="flex-1 rounded-full border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-100"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Batal
        </Button>
        <Button
          className="flex-1 rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
          disabled={
            isLoading ||
            (isEditing && (!selectedBank || !accountNumber || !accountName))
          }
          onClick={isEditing ? handleSubmit : handleProcessRefund}
        >
          {isLoading
            ? 'Loading...'
            : isEditing
              ? 'Simpan Rekening dan Proses Refund'
              : 'Proses Refund'}
        </Button>
      </div>
    </>
  )

  if (lg) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className=" z-[999] px-4 ">
          <DrawerHeader className="gap-3 px-0 pb-2">
            <div className="flex items-center">
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[8px] bg-yellow-100 ">
                <Image
                  src={'/images/icon-refund.svg'}
                  width={30}
                  height={30}
                  alt="refund"
                />
              </div>
              <DrawerTitle className="ml-3 text-[14px] font-[600] text-neutral-900">
                Proses Refund
              </DrawerTitle>
            </div>
            <p className="ml-1 text-[14px] font-[400] text-[#000]">
              Pastikan data rekening sudah sesuai
            </p>
          </DrawerHeader>
          {content}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[640px] gap-0 overflow-hidden rounded-2xl border-0 bg-white px-6 py-4 text-black">
        <DialogTitle asChild>
          <div className="relative flex items-center gap-3 pb-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-[8px] bg-yellow-100 ">
              <Image
                src={'/images/icon-refund.svg'}
                width={56}
                height={56}
                alt="refund"
              />
            </div>
            <div>
              <p className="text-[24px] font-semibold">Proses Refund</p>
              <p className="mt-2 text-[14px] font-[400] text-gray-500">
                {(savedBankData || hasExistingBankData) && !isEditing
                  ? 'Pastikan data rekening sudah sesuai'
                  : 'Masukkan data rekening untuk proses refund'}
              </p>
            </div>
            <DialogClose
              className="absolute top-4 right-4 cursor-pointer"
              onClick={handleClose}
            >
              <CircleX className="text-gray-500" />
            </DialogClose>
          </div>
        </DialogTitle>
        {content}
      </DialogContent>
    </Dialog>
  )
}
