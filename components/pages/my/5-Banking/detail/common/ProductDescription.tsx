'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { BedIcon2, BedIcon3 } from '@/components/icons/bed'
import { Calendar2 } from '@/components/icons/calendar'
import { PeopleIcon } from '@/components/icons/people'
import Image from 'next/image'
// Import Icon-icon (sesuaikan path-nya)
import { ChevronRightIcon } from '@/components/icons/chevron'
import { SubmissionCredit } from '@/constant/types/SubmissionPembiayaan'
import { formatDateToDDMMYYYY, isEmpty } from '@/lib/utils'

interface ProductDescriptionPembiayaanProps {
  // Komponen ini sekarang menerima 'submission' sebagai prop
  submission: SubmissionCredit
}

export default function ProductDescriptionPembiayaan({
  submission,
}: ProductDescriptionPembiayaanProps) {
  // Ambil snapshot paket yang relevan (misalnya yang pertama)
  // Tipe data Anda 'packageSnapshots' adalah array
  const packageSnapshot = submission.packageSnapshots?.[0]?.snapshot

  // Ambil data kamar dari 'submission.room_type_quantity'
  const roomData = submission.room_type_quantity || {}

  // CATATAN: 'SubmissionCredit' tidak memiliki thumbnail.
  // Anda mungkin perlu mengambilnya dari 'packageSnapshot.package_variant.package.thumbnail'
  // atau dari API lain. Untuk saat ini, saya gunakan placeholder.
  const organizationThumbnail =
    packageSnapshot?.package_variant?.package?.organizationInstance
      ?.thumbnail || '/images/logo-koper.svg' // Fallback
  const packageThumbnail =
    packageSnapshot?.package_variant?.package?.thumbnail || '/thumbnail.png' // Fallback

  // Ambil tanggal dari snapshot jika ada
  const departureDate = formatDateToDDMMYYYY(
    new Date(packageSnapshot?.package_variant?.departureDate)
  )

  const arrivalDate = formatDateToDDMMYYYY(
    new Date(packageSnapshot?.package_variant?.arrivalDate)
  )

  return (
    <div className="mx-auto w-full space-y-4 px-8 max-lg:space-y-3 max-lg:px-4">
      <div className="flex flex-col gap-3 max-lg:gap-2">
        {/* Organization Name */}
        <div className="flex items-center justify-between gap-3">
          <p className="text-m-semibold max-lg:text-xs max-lg:leading-4">
            Data Produk
          </p>
          <div className="flex items-center gap-1">
            <Image
              width={32}
              height={32}
              // Menggunakan fallback thumbnail
              src={organizationThumbnail}
              alt={submission.name}
              className="max-lg:!h-5 max-lg:!w-5"
            />
            <p className="text-m-medium capitalize max-lg:text-xs max-lg:leading-4">
              {/* Menggunakan 'organization_instance_name' dari submission */}
              {submission.organizationInstanceName}
            </p>
            <ChevronRightIcon size={20} />
          </div>
        </div>
        <div className="flex gap-3 max-lg:flex-col lg:items-center">
          {/* Package Thumbnail */}
          <div className="flex items-center gap-3">
            <Image
              // Menggunakan fallback thumbnail
              src={packageThumbnail}
              alt={submission.package_name}
              width={144}
              height={144}
              className="rounded-xl max-lg:h-15 max-lg:w-15"
            />
            {/* Package Name Mobile*/}
            <p className="text-s-medium lg:hidden">
              {/* Menggunakan 'package_name' dari submission */}
              {submission.package_name}
            </p>
          </div>
          <div className="flex w-full  flex-col gap-2">
            {/* Package Name Desktop*/}
            <p className="text-m-semibold max-lg:hidden">
              {/* Menggunakan 'package_name' dari submission */}
              {submission.package_name}
            </p>

            {/* Date Departure and Arrival */}
            <div className="flex items-center gap-2">
              <Calendar2 size={20} className="text-neutral-500" />
              <div className="flex items-center gap-1">
                <p className="text-m-regular text-neutral-500 max-lg:text-xs max-lg:leading-4">
                  {/* Menggunakan data dari snapshot */}
                  {departureDate}
                </p>
                <ArrowIcon size={18} className="inline-flex text-neutral-500" />
                <p className="text-m-regular text-neutral-500 max-lg:text-xs max-lg:leading-4">
                  {/* Menggunakan data dari snapshot */}
                  {arrivalDate}
                </p>
              </div>
            </div>

            {/* Quantity Jemaah */}
            <div className="flex items-center gap-2">
              <PeopleIcon size={20} className="text-neutral-500" />
              <p className="text-m-regular text-neutral-500 max-lg:text-xs max-lg:leading-4">
                {/* Menggunakan 'jumlah_jemaah' dari submission */}
                {submission.jumlah_jemaah} Jemaah
              </p>
            </div>

            {/* Room Type Information */}
            <div className="flex flex-wrap items-center justify-between gap-4 max-lg:w-full max-lg:gap-2">
              {/* Double */}
              {/* Menggunakan 'room_type_quantity' (alias 'roomData') */}
              {!isEmpty(roomData?.double) && (
                <div className="flex items-center gap-2">
                  <BedIcon3 size={20} className="flex-none text-neutral-500" />
                  <div className="flex flex-1 flex-col">
                    <p className="text-s-regular text-neutral-500">Double</p>
                    <p className="text-m-medium text-neutral-500 max-lg:text-xs max-lg:leading-4 max-lg:font-medium">
                      {roomData?.double} Jemaah
                    </p>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="w-[1px] self-stretch bg-neutral-100 lg:hidden" />

              {/* Triple */}
              {!isEmpty(roomData?.triple) && (
                <div className="flex items-center gap-2">
                  <BedIcon2 size={20} className="flex-none text-neutral-500" />
                  <div className="flex flex-col">
                    <p className="text-s-regular text-neutral-500">Triple</p>
                    <p className="text-m-medium text-neutral-500 max-lg:text-xs max-lg:leading-4 max-lg:font-medium">
                      {roomData?.triple} Jemaah
                    </p>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="w-[1px] self-stretch bg-neutral-100 lg:hidden" />

              {/* Quad */}
              {!isEmpty(roomData?.quad) && (
                <div className="flex items-center gap-2">
                  <BedIcon2 size={20} className="flex-none text-neutral-500" />
                  <div className="flex flex-col">
                    <p className="text-s-regular text-neutral-500">Quad</p>
                    <p className="text-m-medium text-neutral-500 max-lg:text-xs max-lg:leading-4 max-lg:font-medium">
                      {roomData?.quad} Jemaah
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
