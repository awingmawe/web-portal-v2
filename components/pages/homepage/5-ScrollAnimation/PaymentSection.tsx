/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/ui/button'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import Image from 'next/image'
import Link from 'next/link'

const PaymentSection = () => {
  const { lg: isMobile } = useTailwindBreakpoint()

  return (
    <div className="relative z-3 bg-[#0000001A] px-4 py-2 backdrop-blur-[50px] max-lg:py-0">
      <div className="relative container m-auto flex max-lg:flex-col max-lg:px-4">
        {/* Content Section */}
        <div className="flex-auto pt-10 text-white sm:pt-16 lg:pt-32">
          <div className="mb-6 lg:mb-8">
            <p className="text-2xl leading-tight font-semibold text-white sm:text-4xl md:text-5xl lg:text-[72px] lg:leading-[72px]">
              Pembayaran Mudah
              <br />
              dan Aman
            </p>
          </div>

          <div className="font-light lg:mb-10 lg:max-w-[658px] [&>*]:text-[16px] [&>*]:leading-[120%] [&>*]:text-white">
            <p>
              Muslim101 percaya bahwa kenyamanan dan transparansi dalam
              bertransaksi adalah hal yang utama, sehingga kami menghadirkan
              proses pembayaran yang mudah, aman, dan tepercaya dengan beragam
              pilihan bank sesuai syariat Islam.
            </p>

            <p className="mt-4 font-semibold">Kemudahan</p>
            <p>Bayar sekarang atau nanti, pilih sesuka hati!</p>

            <p className="mt-4 font-semibold">Keamanan</p>
            <p>
              Setiap transaksi selalu kami awasi dengan cermat, memastikan
              perjalananmu pasti terpenuhi.
            </p>

            <p className="mt-4 font-semibold">Kenyamanan</p>
            <p>
              Pesan di mana saja, kapan saja, notifikasi up-to-date selalu
              menyapa.
            </p>
          </div>

          <Link href="/packages">
            <Button
              className="my-8 flex h-10 items-center rounded-full px-4 text-xs whitespace-nowrap sm:h-12 sm:px-6 md:px-8 lg:mb-8"
              variant="default"
            >
              Cari Paket Umroh Sekarang
              <Image
                src="/images/arrow-circle-right.svg"
                width={14}
                height={14}
                alt="arrow"
                className="ml-2"
              />
            </Button>
          </Link>

          {/* Bank Logos */}
          <div className="relative z-2 mb-8 flex flex-wrap items-center gap-2 sm:gap-4 lg:max-w-[720px]">
            {[
              {
                img: '/images/bank-mandiri.svg',
                label: 'mandiri',
              },
              {
                img: '/images/bank-bni.svg',
                label: 'bni',
              },
              {
                img: '/images/bank-bri.svg',
                label: 'bri',
              },
              {
                img: '/images/bank-permata.svg',
                label: 'permata',
              },
              {
                img: '/images/bank-bsi.svg',
                label: 'bsi',
              },
              {
                img: '/images/bank-cimb.svg',
                label: 'cimb',
              },
              {
                img: '/images/bank-bca.svg',
                label: 'bca',
              },
              {
                label: 'other',
              },
            ].map((each, i) => (
              <div
                key={i}
                className="flex h-12 w-[calc(50%-0.5rem)] items-center justify-center rounded-xl bg-white sm:h-16 sm:w-[calc(33.33%-1rem)] md:rounded-[20px] lg:h-[68px] lg:w-[138px]"
              >
                {each.img ? (
                  <Image
                    src={each.img}
                    alt={each.label}
                    width={isMobile ? 80 : 104}
                    height={isMobile ? 24 : 32}
                    className="max-w-[80%]"
                  />
                ) : (
                  <p className="text-xs sm:text-sm lg:text-[14px]">
                    + Bank Lainnya
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center lg:block">
          <img
            src="/images/easy-payment.png"
            alt="easy-payment"
            className="max-h-[300px] object-contain sm:max-h-[400px] md:max-h-[500px] lg:max-h-none"
          />
        </div>
      </div>

      {/* Background Pattern */}
      <img
        src="/images/pattern-1.svg"
        alt="pattern"
        className="absolute bottom-0 left-0 max-h-[100px] sm:max-h-[150px] md:max-h-none"
      />
    </div>
  )
}

export default PaymentSection
