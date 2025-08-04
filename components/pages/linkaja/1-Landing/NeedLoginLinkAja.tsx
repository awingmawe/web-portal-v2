'use client'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/sonner'
import { formatPhoneNumber } from '@/lib/utils'
import { setAccessToken } from '@/services/common/auth'
import { authWithOtp, otpLogin } from '@/services/identity-service'
import { useEffect, useRef, useState } from 'react'

interface Props {
  phoneNumber: string
  onLoginAction: (data: { accessToken: string; exp: number }) => void
}

export default function NeedLoginLinkAja({
  phoneNumber,
  onLoginAction,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(true)
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null))
  const [isResend, setIsResend] = useState(300)
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

  const handleVerify = async () => {
    setLoading(true)
    try {
      const response = await authWithOtp({
        identifier: phoneNumber,
        otp: otp.join(''),
      })
      setAccessToken(response.accessToken)
      onLoginAction?.(response)
      setLoading(false)
      setOpen(false)
      toast.success('Login berhasil')
    } catch (error: any) {
      setLoading(false)
      const message = error?.response?.data?.errorMessage || error?.message
      toast.error(message)
    }
  }

  const handleResend = async () => {
    setIsResend(300)
    try {
      const response = await otpLogin({
        phoneNumber: phoneNumber,
      })
      toast.success(response)
    } catch (error: any) {
      const message = error?.response?.data?.errorMessage || error?.message
      toast.error(message)
    }
  }

  useEffect(() => {
    handleResend()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Drawer open={open} dismissible={false}>
      <DrawerContent className="px-4 pb-6">
        <DrawerTitle className="heading-4-regular mt-2">
          {phoneNumber == '' ? 'Gagal Login' : 'Masukkan Kode OTP'}
        </DrawerTitle>
        {phoneNumber == '' ? (
          <div className="pb-10">
            <DrawerHeader className=" gap-3 px-0 pt-1 pb-4 ">
              <span className="text-m-regular text-neutral-500">
                Invalid Phone Number
              </span>
            </DrawerHeader>
          </div>
        ) : (
          <div>
            <DrawerHeader className=" gap-3 px-0 pt-1 pb-4 ">
              <span className="text-m-regular text-neutral-500">
                Silakan masukkan kode OTP yang sudah dikirimkan pada nomor{' '}
                <span className="text-m-semibold text-neutral-900">
                  {formatPhoneNumber(phoneNumber)}.
                </span>{' '}
              </span>
            </DrawerHeader>
            <div className="mt-2 mb-4">
              <p className="text-s-regular mb-1 text-neutral-800">
                Kode OTP <span className="text-error-500">*</span>
              </p>
              <div className="flex justify-between gap-0 max-lg:gap-2">
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
                  />
                ))}
              </div>
            </div>
            <div className="mb-4 text-center">
              <p className="text-s-medium">
                Belum menerima kode?{' '}
                <button
                  className={`text-m-regular ${
                    isResend > 0
                      ? 'cursor-not-allowed text-neutral-400'
                      : 'text-primary-600 hover:text-primary-700 cursor-pointer'
                  } `}
                  onClick={() => {
                    handleResend()
                  }}
                  disabled={isResend > 0}
                >
                  {isResend > 0
                    ? `Tunggu ${isResend} detik`
                    : 'Kirim Ulang OTP'}
                </button>
              </p>
            </div>
            <Button
              type="button"
              className="flex-1 rounded-full bg-yellow-400 text-black hover:bg-yellow-500"
              onClick={handleVerify}
              disabled={otp.some((digit) => !digit)}
              isLoading={loading}
            >
              Masuk
            </Button>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  )
}
