'use client'

import { ArrowCircleRight } from '@/components/icons/arrow-circle-right'
import { LockIcon2 } from '@/components/icons/lock2'
import OrnamentBanking from '@/components/icons/ornament-banking'
import OrnamentBankingMobile from '@/components/icons/ornament-banking-mobile'
import { WalletIcon } from '@/components/icons/wallet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function BankingSection() {
  return (
    <div className="relative z-4 w-full bg-white">
      {/* Background accent pattern - show appropriate version based on screen size */}
      <OrnamentBanking className="absolute top-0 right-0 z-10 hidden lg:block" />
      <OrnamentBankingMobile className="absolute top-0 right-0 z-10 block lg:hidden" />

      <div className="relative z-20 container mx-auto max-lg:px-4">
        <div className="flex flex-col items-start gap-8 md:flex-row md:gap-16">
          {/* Left side - Image */}
          <div className="relative h-full w-full justify-end max-lg:order-2 max-lg:py-6 md:w-1/3">
            <Image
              src="https://storage.googleapis.com/m101-prods/about-us/pembiayaan-tabungan.png"
              alt="Hand saving coins in jar"
              width={500}
              height={700}
              className="mx-auto w-full max-w-[300px] md:mr-0 lg:ml-25 lg:w-120"
              priority
            />
          </div>

          {/* Right side - Content */}
          <div className="flex w-full flex-col pt-0 pb-12 text-left max-lg:order-1 max-lg:pt-8 md:mt-18 md:ml-18 md:w-7/12 md:py-20 lg:items-start lg:py-12">
            <h1 className="mb-4 text-2xl font-semibold sm:text-3xl lg:mb-10 lg:text-7xl lg:font-medium">
              Pembiayaan & <br />
              Tabungan Umroh
            </h1>

            <p className="lg:text-l-regular mb-6 text-base lg:mb-8">
              Muslim101 mendukung impian perjalanan ibadah kamu melalui program
              pembiayaan dan tabungan yang inovatif sesuai syariat Islam. Kami
              menyediakan layanan pembiayaan yang fleksibel dan aman melalui
              mitra institusi keuangan tepercaya.
            </p>

            <div className="mb-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:gap-4 lg:mb-12">
              <Link
                href={'/banking?page=tabungan'}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  intent="primary"
                  className="w-full px-4 sm:w-auto sm:px-5 lg:px-8"
                  type="button"
                >
                  Mulai Menabung <ArrowCircleRight className="ml-2" size={14} />
                </Button>
              </Link>
              <Link
                href={'/banking?page=pembiayaan'}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  intent="primary"
                  className="w-full px-4 sm:w-auto sm:px-5 lg:px-8"
                  type="button"
                >
                  Ajukan Pembiayaan{' '}
                  <ArrowCircleRight className="ml-2" size={14} />
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
              {/* Feature 1 */}
              <div className="flex max-sm:flex-row sm:flex-col">
                <div className="flex flex-col items-center max-sm:mr-4 max-sm:w-1/2">
                  <div className="border-primary-100 text-primary-500 mb-3 flex h-10 w-10 items-center justify-center rounded-lg border sm:h-12 sm:w-12">
                    <LockIcon2 className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
                  </div>
                  <h3 className="lg:text-l-regular mb-2 text-base font-medium sm:text-center">
                    Aman
                  </h3>
                  <p className="sm:text-s-regular text-xs text-neutral-500 max-sm:text-left sm:text-center">
                    Dana tabungan dan pembiayaan dikelola sesuai prinsip syariah
                    dan diawasi oleh lembaga keuangan terpercaya.
                  </p>
                </div>
                <Separator
                  className="bg-neutral-100 max-sm:hidden"
                  orientation="vertical"
                />
              </div>

              {/* Feature 2 */}
              <div className="flex max-sm:flex-row sm:flex-col">
                <div className="flex flex-col items-center max-sm:mr-4 max-sm:w-1/2">
                  <div className="border-primary-100 text-primary-500 mb-3 flex h-10 w-10 items-center justify-center rounded-lg border sm:h-12 sm:w-12">
                    <WalletIcon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
                  </div>
                  <h3 className="lg:text-l-regular mb-2 text-base font-medium sm:text-center">
                    Fleksibel
                  </h3>
                  <p className="sm:text-s-regular text-xs text-neutral-500 max-sm:text-left sm:text-center">
                    Nikmati pilihan paket pembiayaan yang dapat disesuaikan
                    dengan kebutuhan serta kemampuan finansial kamu.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex max-sm:flex-row sm:flex-col">
                <Separator
                  className="bg-neutral-100 max-sm:hidden"
                  orientation="vertical"
                />
                <div className="flex flex-col items-center max-sm:mr-4 max-sm:w-1/2 sm:ml-0">
                  <div className="border-primary-100 text-primary-500 mb-3 flex h-10 w-10 items-center justify-center rounded-lg border sm:h-12 sm:w-12">
                    <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                  </div>
                  <h3 className="lg:text-l-regular mb-2 text-base font-medium sm:text-center">
                    Terpercaya
                  </h3>
                  <p className="sm:text-s-regular text-xs text-neutral-500 max-sm:text-left sm:text-center">
                    Bekerja sama dengan institusi keuangan yang telah berizin
                    resmi untuk menjamin keamanan dan transparansi dana.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
