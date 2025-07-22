import { ArrowIcon } from '@/components/icons/arrow'
import { BuildingIcon } from '@/components/icons/building'
import { Calendar2 } from '@/components/icons/calendar'
import { CarIcon } from '@/components/icons/car'
import { InfoCircleIcon } from '@/components/icons/info-circle'
import { NotesIcon } from '@/components/icons/notes'
import { PeopleIcon } from '@/components/icons/people'
import { PersonalCardIcon } from '@/components/icons/personal-card'
import { WalkinggIcon } from '@/components/icons/walking'
import {
  ACTIVITY_TYPE_LABELS,
  JOURNEY_TYPE_LABELS,
} from '@/constant/schema/umrah-personal-schema/constant'
import { JourneyInformation } from '@/constant/types/UmrahPersonalProps'
import { cn, formatDateRangeShort, isEmpty } from '@/lib/utils'
import Placeholder from '@/public/images/no-image-placeholder.png'
import { format, isAfter } from 'date-fns'
import { id } from 'date-fns/locale'
import { PlaneLanding, PlaneTakeoff, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import React, { useMemo } from 'react'

const UmrahPersonalDetailCard = ({
  dataOffer,
  totalOffer,
}: {
  dataOffer: JourneyInformation
  totalOffer: number
}) => {
  const {
    approvedAt,
    expiresAt,
    name,
    departureDate,
    arrivalDate,
    journeyType,
    activity,
    totalManifest,
    createVisa,
    useInsurance,
    departure,
    arrival,
    meccaHotel,
    medinaHotel,
    transportation,
  } = dataOffer
  const countDownString = useMemo(() => {
    if (!expiresAt) return ''
    return format(expiresAt, 'dd MMM yyyy, HH:mm', {
      locale: id,
    })
  }, [expiresAt])

  const isExpired =
    approvedAt && expiresAt
      ? isAfter(new Date(approvedAt), new Date(expiresAt))
      : false

  const dateRange = {
    from: new Date(departureDate),
    to: new Date(arrivalDate),
  }

  const LayoutPerItem = ({
    icon,
    titleItem,
    children,
    order,
    colSpan,
  }: {
    icon: React.ReactNode
    titleItem: string
    children: React.ReactNode
    order?: string
    colSpan?: string
  }) => {
    return (
      <div className={cn('flex items-center gap-2', order, colSpan)}>
        {icon}
        <div className="flex flex-col">
          <p className="text-s-medium text-neutral-500">{titleItem}</p>
          {children}
        </div>
      </div>
    )
  }

  const getDepartureArrivalText = (type: string | 'departure' | 'arrival') => {
    return type === 'departure' ? (
      <div className="flex items-center gap-1">
        <p className="text-m-regular">{departure.from.code}</p>
        <ArrowIcon size={18} className="inline-flex" />
        <p className="text-m-regular">{departure.to.code}</p>
        <p className="text-m-regular text-neutral-500">•</p>
        {!isEmpty(departure.airline.logo) && (
          <Image
            src={departure.airline.logo || Placeholder}
            width={20}
            height={20}
            alt={`logo-airline-departure`}
            style={{
              aspectRatio: '1/1',
              objectFit: 'contain',
            }}
          />
        )}
        <p className="text-m-regular">{departure.airline.name}</p>
      </div>
    ) : (
      <div className="flex items-center gap-1">
        <p className="text-m-regular">{arrival.from.code}</p>
        <ArrowIcon size={18} className="inline-flex" />
        <p className="text-m-regular">{arrival.to.code}</p>
        <p className="text-m-regular text-neutral-500">•</p>
        {!isEmpty(arrival.airline.logo) && (
          <Image
            src={arrival.airline.logo || Placeholder}
            width={20}
            height={20}
            alt={`logo-airline-arrival`}
            style={{
              aspectRatio: '1/1',
              objectFit: 'contain',
            }}
          />
        )}
        <p className="text-m-regular">{arrival.airline.name}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 rounded-[20px] max-lg:gap-3 max-lg:py-4 lg:my-6 lg:border lg:border-neutral-200">
      {/* Header */}
      <div className="flex items-center justify-between lg:border-b lg:border-neutral-200 lg:px-4 lg:py-3">
        <p className="text-m-semibold max-lg:hidden">Detail Permintaan</p>
        <div className="flex items-center gap-4 max-lg:w-full max-lg:flex-col-reverse max-lg:gap-3">
          {isExpired ? (
            <div className="bg-error-100 flex items-center gap-2 rounded-[20px] px-2 py-1 max-lg:w-full">
              <InfoCircleIcon className="text-error-700" size={16} />
              <p className="text-s-regular text-error-700">
                Sudah tidak menerima tawaran
              </p>
            </div>
          ) : (
            <div className="bg-warning-100 flex items-center gap-2 rounded-[20px] px-2 py-1 max-lg:w-full">
              <InfoCircleIcon className="text-warning-700" size={16} />
              <p className="text-s-regular text-warning-700">
                Berhenti menerima penawaran pada {countDownString}
              </p>
            </div>
          )}
          <p className="bg-info-100 text-info-700 text-m-medium rounded-full px-4 py-1.5 text-center max-lg:w-full">
            {totalOffer} Penawaran Tersedia
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b-6 border-neutral-100 opacity-50 lg:hidden" />

      {/* Main Content */}
      <div className="flex flex-col gap-4 max-lg:gap-2 lg:px-6 lg:pb-4">
        <p className="text-s-medium lg:hidden">Detail Produk</p>
        <p className="text-l-semibold">{name}</p>

        {/* Grid Layout */}
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2">
          <LayoutPerItem
            icon={<Calendar2 size={20} />}
            titleItem="Tanggal Keberangkatan dan Kepulangan"
            colSpan="max-lg:col-span-2"
          >
            <p className="text-m-regular">{formatDateRangeShort(dateRange)}</p>
          </LayoutPerItem>
          <LayoutPerItem
            icon={<WalkinggIcon size={20} />}
            titleItem="Jenis Perjalanan"
            colSpan="max-lg:col-span-1"
          >
            <p className="text-m-regular">{JOURNEY_TYPE_LABELS[journeyType]}</p>
          </LayoutPerItem>
          <LayoutPerItem
            icon={<NotesIcon size={20} />}
            titleItem="Kegiatan Umroh"
            colSpan="max-lg:col-span-1"
          >
            <p className="text-m-regular">{ACTIVITY_TYPE_LABELS[activity]}</p>
          </LayoutPerItem>
          <LayoutPerItem
            icon={<PeopleIcon size={20} />}
            titleItem="Jumlah Jemaah"
            colSpan="max-lg:col-span-1"
          >
            <p className="text-m-regular">{totalManifest} Jemaah</p>
          </LayoutPerItem>
          <LayoutPerItem
            icon={<PersonalCardIcon size={20} />}
            titleItem="Visa"
            colSpan="max-lg:col-span-1"
          >
            <p className="text-m-regular">
              {createVisa === false ? 'Dengan Visa' : 'Tidak Dengan Visa'}
            </p>
          </LayoutPerItem>
          <LayoutPerItem
            icon={<ShieldCheck size={20} />}
            titleItem="Asuransi Perjalanan"
            colSpan="max-lg:col-span-2"
          >
            <p className="text-m-regular">
              {useInsurance === true
                ? 'Dengan Asuransi Perjalanan'
                : 'Tidak Dengan Asuransi Perjalanan'}
            </p>
          </LayoutPerItem>
          <LayoutPerItem
            icon={<PlaneTakeoff size={20} />}
            titleItem="Keberangkatan"
            colSpan="max-lg:col-span-2"
            order="max-lg:order-10"
          >
            {getDepartureArrivalText('departure')}
          </LayoutPerItem>
          <LayoutPerItem
            icon={<PlaneLanding size={20} />}
            titleItem="Kepulangan"
            colSpan="max-lg:col-span-2"
            order="max-lg:order-11"
          >
            {getDepartureArrivalText('arrival')}
          </LayoutPerItem>
          <LayoutPerItem
            icon={<BuildingIcon size={20} color="neutral-900" />}
            titleItem="Hotel Makkah"
            colSpan="max-lg:col-span-1"
          >
            <p className="text-m-regular">{meccaHotel.selectedHotel.name}</p>
          </LayoutPerItem>
          {!isEmpty(medinaHotel) && (
            <LayoutPerItem
              icon={<BuildingIcon size={20} color="neutral-900" />}
              titleItem="Hotel Madinah"
              colSpan="max-lg:col-span-1"
            >
              <p className="text-m-regular">{medinaHotel.selectedHotel.name}</p>
            </LayoutPerItem>
          )}
          {!isEmpty(transportation) && (
            <LayoutPerItem
              icon={<CarIcon size={20} />}
              titleItem="Transportasi"
              colSpan="max-lg:col-span-1"
            >
              <p className="text-m-regular">{transportation.vehicle.name}</p>
            </LayoutPerItem>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-b-6 border-neutral-100 opacity-50 lg:hidden" />
    </div>
  )
}

export default UmrahPersonalDetailCard
