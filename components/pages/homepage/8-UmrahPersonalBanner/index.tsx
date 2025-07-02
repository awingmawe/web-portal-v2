'use client'

import { ArrowCircleRight } from '@/components/icons/arrow-circle-right'
import ChecklistIcon from '@/components/icons/checklist'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface UmrahPersonalBannerProps {
  className?: string
}

const UmrahPersonalBanner: React.FC<UmrahPersonalBannerProps> = ({
  className = '',
}) => {
  const features = [
    'Harga paket fleksibel sesuai kebutuhan',
    'Pilih tanggal keberangkatan yang Anda inginkan',
    'Bebas memilih hotel sesuai preferensi',
    'Tentukan maskapai yang paling nyaman untuk Anda',
  ]
  return (
    <section className={`w-full ${className} max-lg:px-4`}>
      <p
        className={`heading-2-bold mt-5 mb-7 text-neutral-900 max-lg:mb-2 max-lg:text-xl max-lg:leading-6.5`}
      >
        Fitur Eksklusif Muslim101
      </p>
      <div className="from-primary-100 to-primary-500 relative overflow-hidden rounded-[12px] bg-gradient-to-r px-10 py-7 max-lg:p-4 max-lg:pb-0">
        <Image
          src={'/images/frame-bg-umrah-personal.png'}
          alt="umrah-personal"
          width={0}
          height={0}
          sizes="100vw"
          className="absolute top-0 left-0 z-0 h-auto w-full"
        />
        <div className="relative flex justify-between">
          <div className="relative max-lg:grid max-lg:grid-cols-2 max-lg:gap-x-1 max-lg:gap-y-3 lg:flex-1 lg:space-y-4">
            <h2 className="heading-2-bold text-neutral-900 max-lg:col-span-2 max-lg:text-xl max-lg:leading-6.5 max-sm:text-sm max-sm:leading-5 ">
              Rencanakan & Sesuaikan Paket Umroh Impianmu Sendiri
            </h2>
            <p className="text-s-regular max-lg:col-span-1 max-lg:pb-4 lg:hidden">
              Harga, tanggal keberangkatan, hotel dan maskapai bisa sesuai
              keinginan!
            </p>
            <Image
              src={'/images/umrah-personal-homepage.svg'}
              alt="umrah-personal"
              width={0}
              height={0}
              sizes="100vw"
              className="-bottom-10 z-0 mx-auto h-auto w-3/4 max-lg:right-0 max-lg:mt-auto max-lg:w-full lg:absolute lg:my-2"
            />
          </div>

          <div className="flex-1 max-lg:hidden">
            <div className="space-y-2">
              <p className="heading-4-semibold">
                Kenapa Anda harus membuat paket Umroh sendiri di Muslim101?
              </p>

              <div className="flex flex-col gap-3">
                {features.map((feature, index) => (
                  <p
                    key={index}
                    className="text-m-regular flex items-center gap-2"
                  >
                    <ChecklistIcon className="min-w-6" />

                    {feature}
                  </p>
                ))}
              </div>

              <p className="text-m-regular">
                Wujudkan perjalanan Umroh impianmu dengan paket yang bisa
                disesuaikan! Yuk, rencanakan dan sesuaikan sekarang!
              </p>
            </div>
            <Link href={'/umrah-personal/landing'}>
              <Button
                className="bg-neutral-0 mt-4 flex items-center gap-1.5 px-10 py-5 hover:bg-neutral-100 max-lg:w-full max-lg:py-3"
                type="button"
              >
                Buat Paket Umroh Impianmu Sekarang!
                <ArrowCircleRight size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UmrahPersonalBanner
