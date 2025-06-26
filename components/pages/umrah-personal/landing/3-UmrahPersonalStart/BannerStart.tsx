'use client'

import { ArrowCircleRight } from '@/components/icons/arrow-circle-right'
import { Button } from '@/components/ui/button'
import React from 'react'

const UmrohPersonalStartSection: React.FC = () => {
  return (
    <section
      className={`relative h-[100dvh] snap-center overflow-hidden bg-white p-6 max-lg:mt-12 max-lg:p-4 lg:h-[100vh]`}
      id="umrah-personal-start"
    >
      <div className="relative mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-center gap-3 overflow-hidden max-lg:max-w-xs">
        <p className="heading-4-semibold text-center font-bold lg:text-[60px] lg:leading-[76px]">
          Sudah Lebih Tertarik Untuk Membuat Paket Umroh Sendiri?
        </p>
        <Button
          className="bg-primary-500 flex items-center gap-1.5 px-10 py-5 max-lg:w-full max-lg:py-3"
          type="button"
        >
          Mulai Buat Paket Umroh Mandiri
          <ArrowCircleRight size={14} />
        </Button>
        {/* <div className="relative col-span-1 h-full w-full max-lg:col-span-2 max-lg:mt-8">
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
        /> */}
      </div>
    </section>
  )
}

export default UmrohPersonalStartSection
