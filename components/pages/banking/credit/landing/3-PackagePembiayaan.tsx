'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { BedIcon2, BedIcon3 } from '@/components/icons/bed'
import { Calendar2 } from '@/components/icons/calendar'
import { PeopleIcon } from '@/components/icons/people'
import FinancingSimulation from '@/components/pages/banking/common/TenorCalculation'
import { PackageListEvent } from '@/components/pages/homepage/4-PackageList/PackageListEvent'
import { Button } from '@/components/ui/button'
import { ACCOUNT_URL, LOCAL_STORAGE_PEMBIAYAAN } from '@/constant/env'
import { Facility } from '@/constant/types/FacilityProps'
import { GenericResponseV2 } from '@/constant/types/GeneralProps'
import { Package } from '@/constant/types/PackageProps'
import { PembiayaanDataLocalStorage } from '@/constant/types/Pembiayaan'
import { useEventTracker } from '@/contexts/event-tracker/context'
import { useLocalStorageListener } from '@/hooks/common/useLocalStorageListener'
import {
  usePembiayaanCalculationEventData,
  usePembiayaanPackageEventData,
} from '@/hooks/pembiayaan/usePembiayaanEventData'
import { mapProductsToCardData } from '@/lib/data-formatter'
import { isEmpty } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// Skeleton Component
const PackagePembiayaanSkeleton = () => {
  return (
    <>
      {/* Financing Simulation Skeleton */}
      <section className="mx-auto mt-4 flex flex-col space-y-6 max-lg:space-y-4 max-lg:px-4 lg:max-w-4xl xl:max-w-5xl">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          {/* Title Skeleton */}
          <div className="mb-6 h-8 w-48 animate-pulse rounded bg-neutral-200" />

          {/* Input Fields Skeleton */}
          <div className="space-y-4">
            <div className="h-12 w-full animate-pulse rounded-lg bg-neutral-200" />
            <div className="h-12 w-full animate-pulse rounded-lg bg-neutral-200" />
            <div className="h-12 w-full animate-pulse rounded-lg bg-neutral-200" />
          </div>

          {/* Result Card Skeleton */}
          <div className="mt-6 rounded-xl bg-neutral-50 p-4">
            <div className="space-y-3">
              <div className="h-6 w-3/4 animate-pulse rounded bg-neutral-200" />
              <div className="h-6 w-1/2 animate-pulse rounded bg-neutral-200" />
              <div className="h-6 w-2/3 animate-pulse rounded bg-neutral-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Package Card Skeleton */}
      <section className="mx-auto mt-4 flex flex-col space-y-6 max-lg:space-y-4 max-lg:px-4 lg:max-w-4xl xl:max-w-5xl">
        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
          <div className="flex items-center space-x-4">
            <div className="h-32 w-32 animate-pulse rounded-lg bg-neutral-200" />
            <div className="flex-1 space-y-3">
              <div className="h-6 w-3/4 animate-pulse rounded bg-neutral-200" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-neutral-200" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Button Skeleton */}
      <div className="mx-auto mt-6 flex w-fit">
        <div className="h-12 w-40 animate-pulse rounded-full bg-neutral-200" />
      </div>
    </>
  )
}

const PackagePembiayaan = ({
  dataPackageProvider,
  dataTenor,
  token,
}: {
  dataPackageProvider: GenericResponseV2<Package>
  dataTenor: Facility[]
  token: string
}) => {
  const router = useRouter()
  const { pushEvent } = useEventTracker()
  const packageEventData = usePembiayaanPackageEventData()
  const calculationEventData = usePembiayaanCalculationEventData()

  const [dataPembiayaan] = useLocalStorageListener<PembiayaanDataLocalStorage>(
    LOCAL_STORAGE_PEMBIAYAAN
  )

  const [linkPembiayaan, setLinkPembiayaan] = useState<{
    link: string
    label: string
  }>({ link: '/search?package=pembiayaan', label: 'Cari Paket Lain' })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (dataPembiayaan) {
      setLinkPembiayaan({
        link: '/banking/credit/form/step-1',
        label: 'Lanjutkan Pengisian Permohonan',
      })
    }

    setIsLoading(false)
  }, [dataPembiayaan])

  const onClickLinkPembiayaan = () => {
    // Track event when clicking "Cari Paket Lain"
    if (!dataPembiayaan) {
      pushEvent({
        name: 'click_other_package_banking_credit',
        category: 'banking-credit',
        topic: 'umrah',
        data: calculationEventData,
      })
    }

    // Track event when clicking "Lanjutkan Pengisian Permohonan"
    if (dataPembiayaan) {
      pushEvent({
        name: 'click_umroh_banking_credit_continue',
        category: 'banking-credit',
        topic: 'umrah',
        data: packageEventData,
      })
    }

    // Kalo sudah memilih paket pengajuan pembiaayan tetapi belum login
    // Lempar ke halaman login
    if (dataPembiayaan && !token) {
      window.location.href = `${ACCOUNT_URL}/auth/login?redirectUri=${window.location.href}`
      return
    }

    router.push(linkPembiayaan.link)
  }

  // Show skeleton while loading
  if (isLoading) {
    return <PackagePembiayaanSkeleton />
  }

  return (
    <>
      <section className="container mx-auto flex flex-col space-y-6 max-lg:space-y-4 max-lg:px-4 lg:max-w-4xl xl:max-w-5xl">
        <FinancingSimulation
          dataTenor={dataTenor}
          price={dataPembiayaan?.price}
          showInput
        />
      </section>
      {!dataPembiayaan ? (
        <PackageListEvent
          dataPembiayaan={mapProductsToCardData(dataPackageProvider)}
          eventCategory="pembiayaan"
          className="container mx-auto flex flex-col space-y-6 max-lg:space-y-4"
        />
      ) : (
        <section className="container mx-auto mt-8 flex flex-col space-y-6 max-lg:mt-6 max-lg:space-y-4 max-lg:px-4 lg:max-w-4xl xl:max-w-5xl">
          <div className="mb-6 flex flex-col gap-2 max-lg:mb-2">
            <p className="heading-3-semibold max-lg:text-xl max-lg:leading-[26px] max-lg:font-bold">
              Paket Pembiayaan
            </p>
            <p className="text-l-regular max-lg:text-[14px] max-lg:leading-5 max-lg:font-normal">
              Paket pilihan yang sudah tersedia pembiayaan{' '}
            </p>
          </div>
          <div className="border-primary-500 flex flex-col gap-3 rounded-2xl border p-4 max-lg:gap-2">
            {/* Organization Name */}
            <div className="flex items-center gap-1">
              <Image
                width={32}
                height={32}
                src={dataPembiayaan.selectedPackage.organizationThumbnail}
                alt={dataPembiayaan.selectedPackage.organizationName}
              />
              <div className="flex flex-col">
                <p className="text-m-medium capitalize">
                  {dataPembiayaan.selectedPackage.organizationName}
                </p>
                <p className="text-s-regular capitalize lg:hidden">
                  {dataPembiayaan.selectedPackage.organizationCity}
                </p>
              </div>
            </div>
            <div className="flex gap-3 max-lg:flex-col lg:items-center">
              {/* Package Thumbnail */}
              <div className="flex items-center gap-3">
                <Image
                  src={dataPembiayaan.selectedPackage.packageThumbnail}
                  alt={dataPembiayaan.selectedPackage.packageName}
                  width={144}
                  height={144}
                  className="rounded-xl max-lg:h-15 max-lg:w-15"
                />
                {/* Package Name Mobile*/}
                <p className="text-s-medium lg:hidden">
                  {dataPembiayaan.selectedPackage.packageName}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {/* Package Name Desktop*/}
                <p className="text-m-semibold max-lg:hidden">
                  {dataPembiayaan.selectedPackage.packageName}
                </p>

                {/* Date Departure and Arrival */}
                <div className="flex items-center gap-2">
                  <Calendar2 size={20} className="text-neutral-500" />
                  <div className="flex items-center gap-1">
                    <p className="text-m-regular text-neutral-500 max-lg:text-xs max-lg:leading-4">
                      {dataPembiayaan.selectedPackage.departureDate}
                    </p>
                    <ArrowIcon
                      size={18}
                      className="inline-flex text-neutral-500"
                    />
                    <p className="text-m-regular text-neutral-500 max-lg:text-xs max-lg:leading-4">
                      {dataPembiayaan.selectedPackage.arrivalDate}
                    </p>
                  </div>
                </div>

                {/* Quantity Jemaah */}
                <div className="flex items-center gap-2">
                  <PeopleIcon size={20} className="text-neutral-500" />
                  <p className="text-m-regular text-neutral-500 max-lg:text-xs max-lg:leading-4">
                    {dataPembiayaan.totalQty} Jemaah
                  </p>
                </div>

                {/* Room Type Information */}
                <div className="flex flex-wrap items-center justify-between gap-4 max-lg:w-full max-lg:gap-2">
                  {/* Double */}
                  {!isEmpty(dataPembiayaan?.selectedRoomType?.double) && (
                    <div className="flex items-center gap-2">
                      <BedIcon3
                        size={20}
                        className="flex-none text-neutral-500"
                      />
                      <div className="flex flex-1 flex-col">
                        <p className="text-s-regular text-neutral-500">
                          Double
                        </p>
                        <p className="text-m-medium text-neutral-500 max-lg:text-xs max-lg:leading-4 max-lg:font-medium">
                          {dataPembiayaan?.selectedRoomType?.double} Jemaah
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="w-px self-stretch bg-neutral-100 lg:hidden" />

                  {/* Triple */}
                  {!isEmpty(dataPembiayaan?.selectedRoomType?.triple) && (
                    <div className="flex items-center gap-2">
                      <BedIcon2
                        size={20}
                        className="flex-none text-neutral-500"
                      />
                      <div className="flex flex-col">
                        <p className="text-s-regular text-neutral-500">
                          Triple
                        </p>
                        <p className="text-m-medium text-neutral-500 max-lg:text-xs max-lg:leading-4 max-lg:font-medium">
                          {dataPembiayaan?.selectedRoomType?.triple} Jemaah
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="w-px self-stretch bg-neutral-100 lg:hidden" />

                  {/* Quad */}
                  {!isEmpty(dataPembiayaan?.selectedRoomType?.quad) && (
                    <div className="flex items-center gap-2">
                      <BedIcon2
                        size={20}
                        className="flex-none text-neutral-500"
                      />
                      <div className="flex flex-col">
                        <p className="text-s-regular text-neutral-500">Quad</p>
                        <p className="text-m-medium text-neutral-500 max-lg:text-xs max-lg:leading-4 max-lg:font-medium">
                          {dataPembiayaan?.selectedRoomType?.quad} Jemaah
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Button
        onClick={onClickLinkPembiayaan}
        className="text-s-regular mx-auto mt-6 flex! w-fit rounded-full px-10 py-4 text-center transition-all duration-300"
      >
        {linkPembiayaan?.label}
      </Button>
    </>
  )
}

export default PackagePembiayaan
