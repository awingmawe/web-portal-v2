'use client'

import EventTrackerImpression from '@/contexts/event-tracker/components/EventTrackerImpression'
import { useCustomNavigation } from '@/hooks/common/useCustomNavigation'
import { usePembiayaanPackageEventData } from '@/hooks/pembiayaan/usePembiayaanEventData'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const PembiayaanLanding: React.FC = () => {
  const { goBack } = useCustomNavigation()
  const eventData = usePembiayaanPackageEventData()

  return (
    <section className="container mx-auto flex flex-col space-y-6 max-lg:space-y-4 max-lg:px-4">
      <EventTrackerImpression
        nameDidMount="impression_banking_credit_umrah"
        nameDidUnmount="exit_banking_credit_umrah	"
        category="banking-credit"
        topic="umrah"
        data={eventData}
      />
      <p
        onClick={() => goBack()}
        className="heading-3-semibold inline-flex w-fit cursor-pointer items-center gap-1 max-lg:hidden"
      >
        <ChevronLeft size={24} />
        Kembali
      </p>
      {/* Banner for mobile */}
      <Image
        src="/images/banner-pembiayaan-mobile.png"
        alt="Banner Pembiayaan"
        width={0}
        height={0}
        sizes="100vw"
        className="h-[250px] w-full rounded-[20px] object-cover object-center md:hidden"
      />
      {/* Banner for desktop */}
      <Image
        src="/images/banner-landing-pembiayaan.png"
        alt="Banner Pembiayaan"
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full rounded-[20px] object-contain max-md:hidden"
      />

      <div className="mx-auto space-y-6 max-lg:space-y-4 lg:max-w-4xl xl:max-w-5xl ">
        <h1 className="text-l-semibold max-lg:mb-2">
          Program Pembiayaan Umroh
        </h1>

        <p className="text-l-regular">
          Panggilan ke Baitullah adalah impian setiap Muslim. Jangan biarkan
          waktu dan biaya menjadi penghalang langkahmu menuju Tanah Suci. Setiap
          niat suci untuk beribadah adalah anugerah, dan kini saatnya kamu
          mewujudkannya dengan hati yang mantap dan penuh harap.
        </p>

        <div className="flex gap-4 max-lg:flex-col max-lg:gap-5">
          <div className="border-primary-500 relative w-full flex-1 rounded-lg border p-4.5">
            <p className="text-m-medium text-center">Proses Mudah & Cepat</p>
            <Image
              src="/images/time-pembiayaan.svg"
              alt="time-pembiayaan"
              width={48}
              height={48}
              className="absolute bottom-7 left-4"
            />
          </div>
          <div className="border-primary-500 relative w-full flex-1 rounded-lg border p-4.5">
            <p className="text-m-medium text-center">
              Menggunakan Akad Syariah
            </p>
            <Image
              src="/images/mosque-pembiayaan.svg"
              alt="time-pembiayaan"
              width={48}
              height={48}
              className="absolute top-7 left-4"
            />
          </div>
          <div className="border-primary-500 relative w-full flex-1 rounded-lg border p-4.5">
            <p className="text-m-medium text-center">Aman & Terpercaya</p>
            <Image
              src="/images/secure-pembiayaan.svg"
              alt="time-pembiayaan"
              width={48}
              height={48}
              className="absolute right-4 bottom-7"
            />
          </div>
        </div>

        <p className="text-l-regular">
          Cukup pilih paket umrah yang cocok untuk kamu, lengkapi data yang
          dibutuhkan, dan pengajuanmu akan segera diproses hingga siap berangkat
          dengan penuh rasa syukur.
        </p>
      </div>
    </section>
  )
}

export default PembiayaanLanding
