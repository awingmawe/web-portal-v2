'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface VerificationDialogProps {
  open: boolean
  //   isLoading?: boolean
  //   icon?: React.ReactNode
  onOpenChange: (open: boolean) => void
  //   onVerify: (otp: string) => void
  //   onResendOtp?: () => void
}

export default function VerificationDialog({
  open,
  //   isLoading,
  //   icon,
  onOpenChange,
  //   onResendOtp,
  //   onVerify,
}: VerificationDialogProps) {
  const { lg } = useTailwindBreakpoint()
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null))
  const [isResend, setIsResend] = useState(60)
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (open) {
      setOtp(Array(6).fill(''))
      interval = setInterval(() => {
        setIsResend((prev) => prev - 1)
        if (isResend === 0) {
          clearInterval(interval)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(0, 1)
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text/plain').trim()

    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('')
      setOtp(newOtp)

      inputRefs.current[5]?.focus()
    }
  }

  const handleVerify = () => {
    const otpString = otp.join('')
    console.log(otpString)

    // onVerify(otpString)
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined
    if (isResend > 0) {
      intervalId = setInterval(() => {
        setIsResend((prev) => prev - 1)
      }, 1000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isResend])

  const handleResend = () => {
    // onResendOtp?.()
    setIsResend(60)
  }

  const formContent = (
    <div>
      <div className="mb-6 flex justify-between gap-0 max-lg:gap-2">
        {otp.map((digit, index) => (
          <Input
            key={index}
            ref={(el) => {
              if (el) inputRefs.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            className="h-20 w-20 rounded-md text-center max-lg:h-12 max-lg:w-12"
            style={{ fontSize: lg ? '1.5rem' : '2.5rem', textAlign: 'center' }}
          />
        ))}
      </div>

      <p className="mb-6 text-center text-sm max-lg:text-left">
        Tidak menerima kode?{' '}
        <button
          className={`text-m-regular ${
            isResend > 0
              ? 'cursor-not-allowed text-neutral-400'
              : 'text-primary-600 hover:text-primary-700 cursor-pointer'
          } ml-2`}
          onClick={() => {
            handleResend()
          }}
          disabled={isResend > 0}
        >
          {isResend > 0 ? `Tunggu ${isResend} detik` : 'Kirim Ulang OTP'}
        </button>
      </p>

      <div className="flex gap-3">
        {!lg && (
          <Button
            type="button"
            variant="outline"
            className="flex-1 rounded-full"
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>
        )}
        <Button
          type="button"
          className="flex-1 rounded-full bg-yellow-400 text-black hover:bg-yellow-500"
          onClick={handleVerify}
          disabled={otp.some((digit) => !digit)}
          //   isLoading={isLoading}
        >
          Simpan
        </Button>
      </div>
    </div>
  )

  const headerContent = (
    <div>
      {lg ? (
        <DrawerTitle>
          <div className="text-m-semibold mb-2">Verifikasi Email</div>
          <p className="text-m-regular mt-1 text-neutral-500">
            Masukkan OTP yang dikirimkan ke alamat email kamu
          </p>
        </DrawerTitle>
      ) : (
        <div className="mb-6 flex items-center">
          <div className="flex">
            <div className="bg-primary-100 flex h-12 w-12 items-center justify-center rounded-md">
              {/* {icon} */}
            </div>
          </div>
          <div className="ml-5">
            <DialogTitle className="heading-3-semibold">
              Verifikasi Email
            </DialogTitle>
            <p className="text-m-regular mt-1 text-neutral-500">
              Masukkan OTP yang dikirimkan ke alamat email kamu
            </p>
          </div>
          <DialogClose asChild>
            <Button className="absolute top-3 right-3 h-6 w-6 bg-[#E5E5E5] py-0 hover:bg-neutral-500">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </div>
      )}
    </div>
  )

  if (lg) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="z-[999] px-4 pb-6 ">
          <DrawerHeader className="gap-3 px-0 pb-2">
            {headerContent}
            <DrawerClose asChild>
              <Button
                className="absolute top-3 right-3 h-6 w-6  py-0 hover:bg-neutral-500"
                variant={'ghost'}
              >
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          {formContent}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl border-0 sm:max-w-xl">
        <DialogHeader className="gap-3 pb-2">
          {headerContent}
          <DialogClose asChild>
            <Button className="absolute top-3 right-3 h-6 w-6 bg-[#E5E5E5] py-0 hover:bg-neutral-500">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  )
}
