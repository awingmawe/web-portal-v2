'use client'

import ChecklistIcon from '@/components/icons/checklist'
import { Button } from '@/components/ui/button'
import Frame from '@/public/images/frame-umrah-personal.png'
import { animate } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const UmrohLandingSection: React.FC = () => {
  const features: string[] = [
    'Harga paket fleksibel sesuai kebutuhan',
    'Pilih tanggal keberangkatan yang Anda inginkan',
    'Bebas memilih hotel sesuai preferensi',
    'Tentukan maskapai yang paling nyaman untuk Anda',
  ]

  const onClickLearnMore = () => {
    // Look for the first learn more section
    const element = document.getElementById('section-learn-more-1')
    console.log(element)

    if (!element) {
      console.warn('Target section not found')
      return
    }

    const currentScroll = window.scrollY
    const targetScroll = element.offsetTop
    const distance = Math.abs(targetScroll - currentScroll)

    // Skip animation if already close to target
    if (distance < 50) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    const duration = Math.min(1.8 + distance / 5000, 3.0)

    animate(currentScroll, targetScroll, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (value) => {
        window.scrollTo({
          top: value,
          behavior: 'auto',
        })
      },
      onComplete: () => {
        window.scrollTo({
          top: targetScroll,
          behavior: 'auto',
        })
      },
    })
  }

  return (
    <section
      className={`relative snap-center overflow-hidden bg-white p-6 max-lg:mt-12 max-lg:p-0 lg:h-[100vh]`}
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
            <Button
              className="bg-primary-500 px-10 py-4 max-lg:w-full"
              type="button"
            >
              Buat Paket Umroh Sekarang!
            </Button>
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
    </section>
  )
}

export default UmrohLandingSection
