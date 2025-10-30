'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { BedIcon2, BedIcon3 } from '@/components/icons/bed'
import { Calendar2 } from '@/components/icons/calendar'
import { ChevronRightIcon } from '@/components/icons/chevron'
import { PeopleIcon } from '@/components/icons/people'
import { LOCAL_STORAGE_PEMBIAYAAN } from '@/constant/env'
import { PembiayaanDataLocalStorage } from '@/constant/types/Pembiayaan'
import { useLocalStorageListener } from '@/hooks/common/useLocalStorageListener'
import { formatCurrency, isEmpty } from '@/lib/utils'
import Placeholder from '@/public/images/no-image-placeholder.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

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

const PackageSelection = () => {
  const router = useRouter()
  const [dataPembiayaan, isLoading] =
    useLocalStorageListener<PembiayaanDataLocalStorage>(
      LOCAL_STORAGE_PEMBIAYAAN
    )
  if (isEmpty(dataPembiayaan) && !isLoading) router.push('/banking/credit')

  // Show skeleton while loading
  if (isLoading) {
    return <PackagePembiayaanSkeleton />
  }

  if (!dataPembiayaan) return null

  return (
    <div className="flex flex-col gap-4 rounded-3xl border-1 border-neutral-200 bg-white px-8 py-5 max-lg:gap-2 max-lg:p-4">
      {/* Organization Name */}
      <div className="flex items-center gap-1">
        <div className="flex w-full items-center justify-between">
          <p className="text-m-semibold max-lg:text-xs max-lg:leading-4 max-lg:font-semibold">
            Data Produk
          </p>
          <div className="flex items-center gap-1">
            <Image
              width={32}
              height={32}
              src={dataPembiayaan.selectedPackage?.organizationThumbnail}
              alt={dataPembiayaan.selectedPackage.organizationName}
              className="max-lg:!h-5 max-lg:!w-5"
            />
            <p className="text-m-semibold capitalize max-lg:text-xs max-lg:leading-4 max-lg:font-medium">
              {dataPembiayaan.selectedPackage.organizationName}
            </p>
            <ChevronRightIcon size={20} />
          </div>
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
              <ArrowIcon size={18} className="inline-flex text-neutral-500" />
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
          <div className="flex items-center justify-between gap-4 max-lg:w-full">
            {/* Double */}
            {!isEmpty(dataPembiayaan?.selectedRoomType?.double) && (
              <div className="flex items-center gap-2">
                <BedIcon3 size={20} className="flex-none text-neutral-500" />
                <div className="flex flex-1 flex-col">
                  <p className="text-s-regular text-neutral-500">Double</p>
                  <p className="text-m-medium text-neutral-500 max-lg:text-xs max-lg:leading-4">
                    {dataPembiayaan?.selectedRoomType?.double} Jemaah
                  </p>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="w-[1px] self-stretch bg-neutral-100 lg:hidden" />

            {/* Triple */}
            {!isEmpty(dataPembiayaan?.selectedRoomType?.triple) && (
              <div className="flex items-center gap-2">
                <BedIcon2 size={20} className="flex-none text-neutral-500" />
                <div className="flex flex-col">
                  <p className="text-s-regular text-neutral-500">Triple</p>
                  <p className="text-m-medium text-neutral-500 max-lg:text-xs max-lg:leading-4">
                    {dataPembiayaan?.selectedRoomType?.triple} Jemaah
                  </p>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="w-[1px] self-stretch bg-neutral-100 lg:hidden" />

            {/* Quad */}
            {!isEmpty(dataPembiayaan?.selectedRoomType?.quad) && (
              <div className="flex items-center gap-2">
                <BedIcon2 size={20} className="flex-none text-neutral-500" />
                <div className="flex flex-col">
                  <p className="text-s-regular text-neutral-500">Quad</p>
                  <p className="text-m-medium text-neutral-500 max-lg:text-xs max-lg:leading-4">
                    {dataPembiayaan?.selectedRoomType?.quad} Jemaah
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <p className="text-s-regular">Total Harga Paket</p>
        <p className="text-m-medium">{formatCurrency(dataPembiayaan.price)}</p>
      </div>
      <p className="text-m-semibold">Mitra Pembiayaan</p>
      <div className="flew-wrap flex gap-4">
        {dataPembiayaan.provider?.map((provider, index) => (
          <div
            className="flex items-center justify-center gap-2 rounded-full border border-neutral-200 p-2"
            key={`${provider.providerName}-${index}`}
          >
            <Image
              src={provider.logo || Placeholder}
              alt={provider.providerName}
              width={20}
              height={20}
            />
            <p className="text-s-medium">{provider.providerName}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PackageSelection
