'use client'

import { ArrowCircleRight } from '@/components/icons/arrow-circle-right'
import { LockIcon2 } from '@/components/icons/lock2'
import OrnamentBanking from '@/components/icons/ornament-banking'
import OrnamentBankingMobile from '@/components/icons/ornament-banking-mobile'
import { WalletIcon } from '@/components/icons/wallet'
import { Button } from '@/components/ui/button'
import { ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function BankingSection() {
  return (
    <div className="relative z-4 w-full bg-white px-4">
      {/* Background accent pattern - show appropriate version based on screen size */}
      <OrnamentBanking className="absolute top-0 right-0 z-10 hidden lg:block" />
      <OrnamentBankingMobile className="absolute top-0 right-0 z-10 block lg:hidden" />

      <div className="relative z-20 container mx-auto px-4 py-8 pt-0 lg:px-8">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-16">
          {/* Image - Top on mobile/tablet, LEFT on desktop */}
          <div className="w-full max-w-[350px] lg:order-first lg:w-1/3">
            <div className="flex justify-center py-0 lg:justify-start">
              <Image
                src="https://storage.googleapis.com/m101-prods/about-us/pembiayaan-tabungan.png"
                alt="Hand saving coins in jar"
                width={500}
                height={700}
                className="w-full max-w-[280px] lg:max-w-[300px]"
                priority
              />
            </div>
          </div>

          {/* Content - Always below image on mobile/tablet, on right on desktop */}
          <div className="flex w-full flex-col text-left lg:w-7/12 lg:py-12">
            <h1 className="mb-4 text-2xl font-semibold sm:text-3xl lg:mb-10 lg:text-7xl lg:font-medium">
              Pembiayaan & <br className="hidden sm:block" />
              Tabungan Umroh
            </h1>

            <p className="lg:text-l-regular mb-6 text-base lg:mb-8">
              Muslim101 mendukung impian perjalanan ibadah kamu melalui program
              pembiayaan dan tabungan yang inovatif sesuai syariat Islam. Kami
              menyediakan layanan pembiayaan yang fleksibel dan aman melalui
              mitra institusi keuangan tepercaya.
            </p>

            <div className="mx-auto mb-8 flex w-full max-w-md flex-row gap-3 max-lg:justify-between max-lg:gap-2 lg:mx-0 lg:mb-12">
              <Link
                href={'/banking?page=tabungan'}
                className="flex max-lg:flex-1 sm:w-1/2 lg:w-auto"
              >
                <Button
                  variant="outline"
                  intent="primary"
                  className="flex w-full px-4 whitespace-nowrap max-lg:gap-[6px] lg:px-8"
                  type="button"
                >
                  Mulai Menabung <ArrowCircleRight size={14} />
                </Button>
              </Link>
              <Link
                href={'/banking?page=pembiayaan'}
                className="w-fit max-lg:flex-1 sm:w-1/2 lg:w-auto"
              >
                <Button
                  variant="outline"
                  intent="primary"
                  className="flex w-full px-4 whitespace-nowrap max-lg:gap-[6px] lg:px-8"
                  type="button"
                >
                  Ajukan Pembiayaan <ArrowCircleRight size={14} />
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="flex gap-4 max-lg:gap-2 lg:justify-between">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="border-primary-100 text-primary-500 mb-3 flex h-12 w-12 items-center justify-center rounded-lg border">
                  <LockIcon2 className="h-16 w-16 lg:h-10 lg:w-10" size={600} />
                </div>
                <h3 className="lg:text-l-regular mb-2 text-base font-medium">
                  Aman
                </h3>
                <p className="text-sm text-neutral-500 max-lg:text-[10px]">
                  Dana tabungan dan pembiayaan dikelola sesuai prinsip syariah
                  dan diawasi oleh lembaga keuangan terpercaya.
                </p>
              </div>
              {/* Separator */}
              <div className="h-auto w-px flex-none bg-neutral-100" />
              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="border-primary-100 text-primary-500 mb-3 flex h-12 w-12 items-center justify-center rounded-lg border">
                  <WalletIcon className="h-14 w-14 lg:h-10 lg:w-10" />
                </div>
                <h3 className="lg:text-l-regular mb-2 text-base font-medium">
                  Fleksibel
                </h3>
                <p className="text-sm text-neutral-500 max-lg:text-[10px]">
                  Nikmati pilihan paket pembiayaan yang dapat disesuaikan dengan
                  kebutuhan serta kemampuan finansial kamu.
                </p>
              </div>
              {/* Separator */}
              <div className="h-auto w-px flex-none bg-neutral-100" />
              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="border-primary-100 text-primary-500 mb-3 flex h-12 w-12 items-center justify-center rounded-lg border">
                  <ShieldCheck className="h-7 w-7 lg:h-8 lg:w-8" />
                </div>
                <h3 className="lg:text-l-regular mb-2 text-base font-medium">
                  Terpercaya
                </h3>
                <p className="text-sm text-neutral-500 max-lg:text-[10px]">
                  Bekerja sama dengan institusi keuangan yang telah berizin
                  resmi untuk menjamin keamanan dan transparansi dana.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
