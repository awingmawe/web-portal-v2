'use client'

import { ArrowCircleRight } from '@/components/icons/arrow-circle-right'
import LayoutDrawerDialog from '@/components/pages/umrah-personal/common/LayoutDrawerDialog'
import PhoneNumberNotVerified from '@/components/pages/umrah-personal/landing/dialog/PhoneNumberNotVerified'
import { Button } from '@/components/ui/button'
import { ACCOUNT_URL } from '@/constant/env'
import { useAuth } from '@/contexts/auth/context'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

interface UmrohPersonalStartSectionProps {
  token: string
}

const UmrohPersonalStartSection: React.FC<UmrohPersonalStartSectionProps> = ({
  token,
}) => {
  const router = useRouter()
  const { profile } = useAuth()

  const [open, setOpen] = React.useState(false)
  const handleToForm = () => {
    if (!token) {
      router.push(
        `${ACCOUNT_URL}/auth/login?redirectUri=${window.location.href}`
      )
      return
    }
    if (token && !profile?.phonenumberVerified) {
      setOpen(true)

      return
    } else {
      router.push('/umrah-personal/form')
    }
  }
  return (
    <section
      className={`relative h-[100dvh] overflow-hidden bg-white max-lg:mt-12 lg:h-[100vh]`}
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
        <LayoutDrawerDialog
          isOpen={open}
          setIsOpen={setOpen}
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
          content={<PhoneNumberNotVerified name={profile?.name || ''} />}
          footerContent={
            <div className="ml-auto flex w-full justify-end gap-3 lg:max-w-sm">
              <Button variant="default" className="px-10 py-3">
                Simpan Nomor Telepon
              </Button>
            </div>
          }
        />
      </div>
    </section>
  )
}

export default UmrohPersonalStartSection
