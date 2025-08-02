'use client'
import { Airplane } from '@/components/icons/airplane'
import { ArrowDiagonalIcon } from '@/components/icons/arrow'
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
import { MoneyTimeBoldIcon } from '@/components/icons/money-time'
import { MouseSquareIcon } from '@/components/icons/mouse-square'
import { Muslim101Logo } from '@/components/icons/muslim101'
import { TimerIcon2 } from '@/components/icons/timer'
import BottomNavigation from '@/components/pages/search-packages/mobile/BottomFilterMobile/BottomFilter'
import { Button } from '@/components/ui/button'
import { LINKAJA_REFERRAL } from '@/constant/env'
import { Facility } from '@/constant/types/FacilityProps'
import { GenericResponse } from '@/constant/types/GeneralProps'
import { useFilterProduct } from '@/contexts/filter-product-context'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { setLocalReferralCode } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LandingLinkAja({
  dataMinMax,
  dataTagPackages,
  dataFacility,
  dataSection,
  dpMinMax,
}: {
  dataMinMax: { min: string; max: string }
  dataTagPackages: { id: number; name: string }[]
  dataFacility: GenericResponse<Facility>
  dataSection: { id: number; name: string }[]
  dpMinMax: { minDpAmount: string; maxDpAmount: string }
}) {
  const { filters, setFilters } = useFilterProduct()
  const searchParams = useSearchParams()
  const updateQueryParams = useUpdateQueryParams()
  const [showBottomBar, setShowBottomBar] = useState(false)

  useEffect(() => {
    setFilters({
      ...filters,
    })

    // Update URL parameters
    updateQueryParams(['dpMin', 'dpMax', 'page'], [0, 18000000, 1])
    sessionStorage.setItem('isLinkAja', 'true')
    setLocalReferralCode(LINKAJA_REFERRAL)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!searchParams.get('dpMin')) {
      updateQueryParams(['dpMin'], ['0'])
    }
    if (!searchParams.get('dpMax')) {
      updateQueryParams(['dpMax'], ['18000000'])
    }
  }, [searchParams, updateQueryParams])

  useEffect(() => {
    const handleResize = () => {
      const packageList = document.getElementById('packageList')
      if (packageList) {
        const scrollHeight = Math.max(
          document.body.scrollHeight,
          packageList.scrollHeight,
          document.body.offsetHeight,
          packageList.offsetHeight,
          document.body.clientHeight,
          packageList.clientHeight
        )

        if (window.scrollY + 1000 >= scrollHeight) {
          setShowBottomBar(true)
        } else {
          setShowBottomBar(false)
        }
      }
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('scroll', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="relative">
      <div
        className="flex justify-between bg-white p-3"
        style={{
          boxShadow:
            '0px 5.44px 11.79px 0px rgba(0, 0, 0, 0.06), 0px 21.77px 21.77px 0px rgba(0, 0, 0, 0.05), 0px 49.89px 29.93px 0px rgba(0, 0, 0, 0.03), 0px 87.98px 35.37px 0px rgba(0, 0, 0, 0.01), 0px 137.86px 39px 0px rgba(0, 0, 0, 0)',
        }}
      >
        <Muslim101Logo />
        <Link href="/my/transaction" className="flex items-center gap-2">
          <TimerIcon2 />
          <span className="text-xs-regular">Riwayat</span>
        </Link>
      </div>
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
            background:
              'linear-gradient(90.11deg, #FFCE35 0.09%, #FFD03C 50.5%)',
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
                  Pilih paket, bayar dengan LinkAja.
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
      <Link
        href={'/linkaja/booking'}
        className={`border-primary fixed  z-50 mx-3 mt-10 mb-3 flex w-93 animate-bounce items-center rounded-xl border border-2 bg-white px-3 py-2 ${
          showBottomBar ? 'bottom-12' : 'bottom-2'
        }`}
      >
        <MoneyTimeBoldIcon className="text-primary-500 mr-2" />
        <div>
          <p className="text-m-medium">Lunasi Pembayaran Paket</p>
          <p className="text-xs-medium text-neutral-500">
            Terdapat paket yang perlu kamu lunasi
          </p>
        </div>
        <div className="ml-auto flex items-center">
          <p className="text-s-medium ">Lihat</p>
          <ArrowDiagonalIcon size={20} />
        </div>
        <div
          className="absolute -top-2 -right-2 rounded-xl bg-red-500 p-3"
          style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
        ></div>
      </Link>
      {showBottomBar && (
        <BottomNavigation
          dataMinMax={dataMinMax}
          dataFacility={dataFacility}
          dataTagPackages={dataTagPackages}
          dataSection={dataSection}
          dpMinMax={dpMinMax}
          forceMobile
        />
      )}
    </div>
  )
}
