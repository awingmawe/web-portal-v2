'use client'
import { Airplane } from '@/components/icons/airplane'
import { ArrowCircleDown2 } from '@/components/icons/arrow-circle-down'
import { ClipboardTextIcon } from '@/components/icons/clipboard-text'
import { LinkAja, LinkAjaSyariah } from '@/components/icons/linkaja'
import {
  LinkAjaAccent,
  LinkAjaAccent2,
  LinkAjaAccent3,
  LinkAjaAccent4,
  LinkAjaAccent5,
  LinkAjaAccent6,
} from '@/components/icons/linkaja-accent'
import { MoneyTickIcon } from '@/components/icons/money-tick'
import { MouseSquareIcon } from '@/components/icons/mouse-square'
import { Muslim101Logo } from '@/components/icons/muslim101'
import { Button } from '@/components/ui/button'
import { LINKAJA_REFERRAL } from '@/constant/env'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { setLocalReferralCode } from '@/lib/utils'
import Image from 'next/image'
import { useEffect } from 'react'

export default function LandingLinkAja() {
  const { filters, setFilters } = useFilterProduct()
  const updateQueryParams = useUpdateQueryParams()

  useEffect(() => {
    setFilters({
      ...filters,
      priceRange: {
        hargaMin: '0',
        hargaMax: '40000000',
      },
    })

    // Update URL parameters
    updateQueryParams(['prMin', 'prMax', 'page'], [0, 40000000, 1])
    sessionStorage.setItem('isLinkAja', 'true')
    setLocalReferralCode(LINKAJA_REFERRAL)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="bg-primary-500 relative z-10 overflow-hidden px-4 pt-6 pb-30"
      style={{
        background:
          'linear-gradient(180deg, #FFCE34 0%, rgba(255, 206, 52, 0) 100%)',
      }}
    >
      <LinkAjaAccent className="absolute -top-18 -left-17 -z-1" />
      <LinkAjaAccent2 className="absolute -top-12 -right-10 -z-1" />
      <div className="mt-10 flex gap-5">
        <LinkAjaSyariah />
        <LinkAja />
      </div>
      <h1 className="heading-2-bold mt-5">
        Umrah jadi lebih <br /> mudah dan aman <br />
        bareng LinkAja & <br />
        LinkAja Syariah
      </h1>
      <p className="text-l-regular mt-2">
        Nikmati pengalaman ibadah yang damai <br /> dan nyaman dengan harga
        terjangkau!
      </p>
      <div className="mt-5 w-full">
        <Button
          className="w-full"
          onClick={() => {
            document
              .getElementById('packageList')
              ?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          Cari Paket
          <ArrowCircleDown2 size={18} />
        </Button>
      </div>

      <p className="text-s-regular mt-5 mb-3">Powered By</p>
      <Muslim101Logo />
      <p className="text-xs-regular mt-3 mb-3 text-neutral-600">
        PT. Muslim Seratus Satu - All-in-One Digital Islamic Platform
      </p>

      <Image
        src="https://storage.googleapis.com/m101-prods/general/Frame%201000007465.png"
        alt=""
        width={100}
        height={500}
        className="my-10 w-full object-contain"
      ></Image>

      <div
        className="relative z-10 w-full overflow-x-hidden rounded-3xl p-5 text-center"
        style={{
          background: 'linear-gradient(90.11deg, #FFCE35 0.09%, #FFD03C 50.5%)',
        }}
      >
        <LinkAjaAccent3 className="absolute -top-25 -left-60 -z-1" />
        <LinkAjaAccent4 className="absolute -top-0 -right-0 -z-1" />
        <p className="text-l-semibold">
          4 Langkah Mudah Umroh <br /> Permata x Muslim101
        </p>

        <div className="mt-5 grid grid-cols-2 gap-5">
          <div className="border-primary-500 relative z-10 rounded-3xl border border-2 bg-white px-2 py-4 text-center">
            <div className="flex flex-col items-center justify-center">
              <LinkAjaAccent5 className="absolute top-1/2 right-[-17px] -z-1" />
              <MouseSquareIcon className="text-primary-500" size={32} />
              <p className="text-m-regular mt-2">
                Pilih paket, bayar dengan Permata Bank.
              </p>
            </div>
          </div>
          <div className="border-primary-500 rounded-3xl border border-2 bg-white px-2 py-4 text-center">
            <div className="flex flex-col items-center justify-center">
              <ClipboardTextIcon className="text-primary-500" size={32} />
              <p className="text-m-regular mt-2">
                Buat akun & lengkapi data di Muslim101.
              </p>
            </div>
          </div>
          <div className="border-primary-500 relative z-10 rounded-3xl border border-2 bg-white px-2 py-4 text-center">
            <LinkAjaAccent6 className="absolute top-[-23px] right-[-30px] -z-1" />
            <LinkAjaAccent5 className="absolute top-1/2 right-[-17px] -z-1" />
            <div className="flex flex-col items-center justify-center">
              <MoneyTickIcon className="text-primary-500" size={32} />
              <p className="text-m-regular mt-2">
                Lakukan pelunasan paket di Muslim101.
              </p>
            </div>
          </div>
          <div className="border-primary-500 rounded-3xl border border-2 bg-white px-2 py-4 text-center">
            <div className="flex flex-col items-center justify-center">
              <Airplane className="text-primary-500" size={32} />
              <p className="text-m-regular mt-2">
                Administrasi selesai, berangkat!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
