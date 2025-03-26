'use client'

import { ArrowCircleRight } from '@/components/icons/arrow-circle-right'
import { LockIcon2 } from '@/components/icons/lock2'
import OrnamentBanking from '@/components/icons/ornament-banking'
import { WalletIcon } from '@/components/icons/wallet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function BankingSection() {
  return (
    <div className="relative w-full bg-white">
      {/* Background accent pattern */}
      <OrnamentBanking className="absolute top-0 right-0 z-10" />

      <div className="relative z-20 container mx-auto">
        <div className="flex flex-col items-start gap-8 md:flex-row md:gap-16">
          {/* Left side - Image */}
          <div className="relative h-full w-full justify-end md:w-1/3">
            <Image
              src="https://storage.googleapis.com/m101-prods/about-us/pembiayaan-tabungan.png"
              alt="Hand saving coins in jar"
              width={500}
              height={700}
              className="xxl:ml-50 ml-25 w-120"
              priority
            />
          </div>

          {/* Right side - Content */}
          <div className="xxl:mt-5 flex w-full flex-col items-center py-12 text-center md:mt-18 md:ml-18 md:w-7/12 md:items-start md:py-20 md:text-left">
            <h1 className="text-xxl-medium  mb-4">
              Pembiayaan & <br />
              Tabungan Umroh
            </h1>

            <p className="text-l-regular mb-8">
              Muslim101 mendukung impian perjalanan ibadah kamu melalui program
              pembiayaan dan tabungan yang inovatif sesuai syariat Islam. Kami
              menyediakan layanan pembiayaan yang fleksibel dan aman melalui
              mitra institusi keuangan tepercaya.
            </p>

            <div className="mb-12 flex w-full max-w-md flex-col gap-4 sm:flex-row">
              <Link href={'/banking?page=tabungan'}>
                <Button
                  variant="outline"
                  intent="primary"
                  className="px-8"
                  type="button"
                >
                  Mulai Menabung <ArrowCircleRight className="ml-2" size={14} />
                </Button>
              </Link>
              <Link href={'/banking?page=pembiayaan'}>
                <Button
                  variant="outline"
                  intent="primary"
                  className="px-8"
                  type="button"
                >
                  Ajukan Pembiayaan{' '}
                  <ArrowCircleRight className="ml-2" size={14} />
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="flex">
                <div className="mr-5 flex flex-col items-center">
                  <div className="border-primary-100 text-primary-500 mb-3 flex h-12 w-12 items-center justify-center rounded-lg border">
                    <LockIcon2 className="h-12 w-12 " />
                  </div>
                  <h3 className="text-l-regular mb-2">Aman</h3>
                  <p className="text-s-regular text-center text-neutral-500">
                    Dana tabungan dan pembiayaan dikelola sesuai prinsip syariah
                    dan diawasi oleh lembaga keuangan terpercaya.
                  </p>
                </div>
                <Separator className="bg-neutral-100" orientation="vertical" />
              </div>
              <div className="flex">
                <div className="flex flex-col items-center">
                  <div className="border-primary-100 text-primary-500 mb-3 flex h-12 w-12 items-center justify-center rounded-lg border">
                    <WalletIcon className="h-12 w-12" />
                  </div>
                  <h3 className="text-l-regular mb-2">Fleksibel</h3>
                  <p className="text-s-regular text-center text-neutral-500">
                    Nikmati pilihan paket pembiayaan yang dapat disesuaikan
                    dengan kebutuhan serta kemampuan finansial kamu.
                  </p>
                </div>
              </div>

              <div className="flex">
                <Separator className="bg-neutral-100" orientation="vertical" />
                <div className="ml-6 flex flex-col items-center">
                  <div className="border-primary-100 text-primary-500 mb-3 flex h-12 w-12 items-center justify-center rounded-lg border">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <h3 className="text-l-regular mb-2">Terpercaya</h3>
                  <p className="text-s-regular text-center text-neutral-500">
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
