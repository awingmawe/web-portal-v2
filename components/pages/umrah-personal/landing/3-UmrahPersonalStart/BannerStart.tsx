'use client'

import { ArrowCircleRight } from '@/components/icons/arrow-circle-right'
import { EmailIcon } from '@/components/icons/email'
import VerificationDialog from '@/components/pages/my/4-Profile/Card/VerificationDialog'
import PhoneNumberNotVerified from '@/components/pages/umrah-personal/landing/dialog/PhoneNumberNotVerified'
import LayoutDrawerDialog from '@/components/shared/LayoutDrawerDialog'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth/context'
import { useAuthNavigation } from '@/hooks/umrah-personal/landing/useAuthNavigation'
import { usePhoneVerification } from '@/hooks/umrah-personal/landing/usePhoneNumberVerification'
import Image from 'next/image'
import { useState } from 'react'

const UmrohPersonalStartSection = () => {
  const { profile } = useAuth()
  const [open, setOpen] = useState(false)

  // Use phone verification hook
  const {
    setPhoneNumber,
    isLoading,
    openOtp,
    setOpenOtp,
    verificationPurpose,
    handleSendOtp,
    handleVerifyOtp,
    handleResendOtp,
  } = usePhoneVerification({
    initialPhoneNumber: profile?.persona?.phoneNumber,
  })

  // Use auth navigation hook
  const { handleNavigateWithAuth } = useAuthNavigation({
    redirectPath: '/umrah-personal/form',
    requirePhoneVerification: true,
  })

  const handleToForm = () => {
    handleNavigateWithAuth(() => {
      // This callback is called when phone verification is required
      setOpen(true)
    })
  }

  const handleSavePhoneNumber = async () => {
    await handleSendOtp()
    setOpen(false)
  }

  return (
    <section
      className={`relative h-[100dvh] overflow-hidden bg-white max-lg:mt-12 max-lg:snap-center lg:h-[100vh]`}
      id="umrah-personal-start"
    >
      <Image
        src={'/images/mosque.png'}
        alt="mosque"
        width={0}
        height={0}
        sizes="100vw"
        className="absolute top-0 z-0 h-screen w-full object-cover object-left"
      />
      <div className="relative mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-center gap-3 overflow-hidden p-6 max-lg:max-w-xs max-lg:p-4">
        <p className="heading-4-semibold text-center font-bold lg:text-[60px] lg:leading-[76px]">
          Sudah Lebih Tertarik Untuk Membuat Paket Umroh Sendiri?
        </p>

        {profile?.phonenumberVerified ? (
          <Button
            className="bg-primary-500 flex items-center gap-1.5 px-10 py-5 max-lg:w-full max-lg:py-3"
            type="button"
            onClick={handleToForm}
          >
            Mulai Buat Paket Umroh Mandiri
            <ArrowCircleRight size={14} />
          </Button>
        ) : (
          <LayoutDrawerDialog
            isOpen={open}
            setIsOpen={setOpen}
            title={<></>}
            trigger={
              <Button
                className="bg-primary-500 flex items-center gap-1.5 px-10 py-5 max-lg:w-full max-lg:py-3"
                type="button"
                onClick={handleToForm}
              >
                Mulai Buat Paket Umroh Mandiri
                <ArrowCircleRight size={14} />
              </Button>
            }
            content={
              <PhoneNumberNotVerified
                name={profile?.name || ''}
                phoneNumber={profile?.persona?.phoneNumber || ''}
                setPhoneNumber={setPhoneNumber}
              />
            }
            footerContent={
              <div className="ml-auto flex w-full justify-end gap-3 lg:max-w-sm">
                <Button
                  variant="default"
                  className="px-10 py-3"
                  onClick={handleSavePhoneNumber}
                  isLoading={isLoading}
                >
                  Simpan Nomor Telepon
                </Button>
              </div>
            }
          />
        )}
      </div>

      <VerificationDialog
        open={openOtp}
        onOpenChange={setOpenOtp}
        onVerify={handleVerifyOtp}
        onResendOtp={handleResendOtp}
        icon={<EmailIcon className="text-primary-500 h-7 w-7" />}
        purpose={verificationPurpose}
        isLoading={isLoading}
      />
    </section>
  )
}

export default UmrohPersonalStartSection
