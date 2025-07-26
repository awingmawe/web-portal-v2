'use client'

import ChecklistIcon from '@/components/icons/checklist'
import { EmailIcon } from '@/components/icons/email'
import VerificationDialog from '@/components/pages/my/4-Profile/Card/VerificationDialog'
import LayoutDrawerDialog from '@/components/pages/umrah-personal/common/LayoutDrawerDialog'
import PhoneNumberNotVerified from '@/components/pages/umrah-personal/landing/dialog/PhoneNumberNotVerified'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth/context'
import { useAuthNavigation } from '@/hooks/umrah-personal/landing/useAuthNavigation'
import { usePhoneVerification } from '@/hooks/umrah-personal/landing/usePhoneNumberVerification'
import Frame from '@/public/images/frame-umrah-personal.png'
import Image from 'next/image'
import React from 'react'

interface UmrohLandingSectionProps {
  token: string
}

const UmrohLandingSection: React.FC<UmrohLandingSectionProps> = ({ token }) => {
  const { profile } = useAuth()

  const [open, setOpen] = React.useState(false)
  const features: string[] = [
    'Harga paket fleksibel sesuai kebutuhan',
    'Pilih tanggal keberangkatan yang Anda inginkan',
    'Bebas memilih hotel sesuai preferensi',
    'Tentukan maskapai yang paling nyaman untuk Anda',
  ]

  const onClickLearnMore = () => {
    // Look for the first learn more section
    const element = document.getElementById('section-learn-more-1')

    if (!element) {
      console.warn('Target section not found')
      return
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }
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
    phoneNumber,
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
    await handleSendOtp(setOpen)
  }
  return (
    <section
      className={`relative overflow-hidden bg-white p-6 max-lg:snap-start max-lg:p-0 lg:h-[100vh]`}
      id="umrah-landing"
    >
      <div className="relative grid h-full w-full grid-cols-2 overflow-hidden rounded-xl bg-gradient-to-b from-[#FFF6DD] to-[#FFF]">
        <div className="col-span-1 flex flex-col gap-4 px-14 max-lg:col-span-2 max-lg:mt-12 max-lg:px-4 lg:justify-center">
          <h2 className="heading-2-regular">
            Rencanakan & Sesuaikan Paket Umroh Impianmu Sendiri
          </h2>
          <p className="text-m-regular">
            Ayo wujudkan perjalanan Umroh sesuai keinginanmu! Pilih tanggal
            keberangkatan, hotel, dan maskapai yang paling cocok untukmu. Dengan
            fleksibilitas penuh, pengalaman Umroh jadi lebih nyaman dan sesuai
            dengan kebutuhanmu. Yuk, mulai rencanakan sekarang! 🕋✈️
          </p>
          <div className="flex flex-col gap-3">
            {features.map((item: string) => (
              <p key={item} className="text-m-regular flex items-center gap-2">
                <ChecklistIcon className="min-w-6" />
                {item}
              </p>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3 max-lg:flex-col">
            {profile?.phonenumberVerified || !token ? (
              <Button
                className="bg-primary-500 px-10 py-4 max-lg:w-full"
                type="button"
                onClick={handleToForm}
              >
                Buat Paket Umroh Sekarang!
              </Button>
            ) : (
              <LayoutDrawerDialog
                isOpen={open}
                setIsOpen={setOpen}
                trigger={
                  <Button
                    className="bg-primary-500 px-10 py-4 max-lg:w-full"
                    type="button"
                    onClick={handleToForm}
                  >
                    Buat Paket Umroh Sekarang!
                  </Button>
                }
                title={<></>}
                content={
                  <PhoneNumberNotVerified
                    name={profile?.name || ''}
                    phoneNumber={phoneNumber || ''}
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
            <Button
              className="bg-transparent px-10 py-4 max-lg:w-full"
              type="button"
              variant="outline"
              onClick={onClickLearnMore}
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
        <div className="relative col-span-1 h-full w-full max-lg:col-span-2 max-lg:mt-8">
          <Image
            src="https://storage.googleapis.com/m101-prods/umroh-personal/image-landing-personal.png"
            alt="kaabah-umroh-personal"
            width={700}
            height={500}
            sizes="(max-width: 768px) 100vw, 700px"
            className="right-0 bottom-0 ml-auto h-auto max-h-[600px] w-full max-w-[600px] lg:absolute"
            priority
          />
        </div>
        <Image
          src={Frame}
          alt="frame-image"
          width={0}
          height={0}
          sizes="100vw"
          className="absolute top-0 left-0"
        />
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

export default UmrohLandingSection
