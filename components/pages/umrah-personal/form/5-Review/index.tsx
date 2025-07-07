'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { Calendar2 } from '@/components/icons/calendar'
import { CarIcon } from '@/components/icons/car'
import { Edit2Icon } from '@/components/icons/edit'
import { MosqueIcon } from '@/components/icons/mosque'
import { NotesIcon } from '@/components/icons/notes'
import { PeopleIcon } from '@/components/icons/people'
import { WalkinggIcon } from '@/components/icons/walking'
import HotelImageCarousel from '@/components/pages/umrah-personal/form/3-PenginapanHotel/ImageHotelCarousel'
import { Button } from '@/components/ui/button'
import {
  ACTIVITY_TYPE_LABELS,
  ACTIVITY_TYPES,
  FLIGHT_CLASS_LABELS,
  JOURNEY_TYPE_LABELS,
} from '@/constant/schema/umrah-personal-schema/constant'
import { UmrahPersonalFormType } from '@/constant/schema/umrah-personal-schema/umrah-personal'
import { HotelDestination } from '@/constant/types/HotelProps'
import {
  STEP_1,
  STEP_2,
  STEP_3,
  STEP_4,
  STEP_5,
} from '@/contexts/umrah-personal/constant'
import { useUmrahPersonal } from '@/contexts/umrah-personal/context'
import { cn, formatDateRangeShort, formatDistance, isEmpty } from '@/lib/utils'
import { ChevronRightCircle, PlaneLanding, PlaneTakeoff } from 'lucide-react'
import Image from 'next/image'
import { useMemo } from 'react'
import { UseFormReturn } from 'react-hook-form'

interface Step6ReviewProps {
  form: UseFormReturn<UmrahPersonalFormType>
}

const HotelCardReview = (hotel: any) => {
  const { name, hotelDestination, hotelGallery } = hotel.hotel || {}

  const priorityDestinations = useMemo(
    () => hotelDestination?.filter((x: any) => x.priority === true) || [],
    [hotelDestination]
  )

  const nonPriorityDestinations = useMemo(
    () => hotelDestination?.filter((x: any) => x.priority === false) || [],
    [hotelDestination]
  )

  return (
    <div className={`flex justify-between gap-2.5 max-lg:flex-col`}>
      {/* Hotel Image Carousel */}
      <HotelImageCarousel images={hotelGallery || []} />

      <div className="flex w-full flex-col justify-between">
        <div className="flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between max-lg:flex-col max-lg:items-start max-lg:gap-1">
            <h3 className="text-l-semibold">{name}</h3>
            {/* Distance information */}
            {priorityDestinations.length > 0 && (
              <div className="flex items-center gap-[9px]">
                <MosqueIcon size={20} />
                <p className="text-m-regular text-neutral-500">
                  {hotel && !isEmpty(hotelDestination)
                    ? `${formatDistance(priorityDestinations[0]?.distance)}
                          ke
                          ${priorityDestinations[0]?.destinationName}`
                    : ''}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {nonPriorityDestinations && nonPriorityDestinations.length > 0 && (
              <p className="text-m-regular">Area Wisata Terdekat:</p>
            )}
            <div className="grid grid-cols-2 gap-x-3 gap-y-3 max-lg:gap-y-2">
              {nonPriorityDestinations.map(
                (dest: HotelDestination, index: number) => (
                  <div
                    className="col-span-1 flex items-center justify-between max-lg:col-span-12"
                    key={`${index}-${dest.destinationName}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-1 flex-shrink-0 rounded-full bg-neutral-900"></div>
                      <p className="text-m-regular text-neutral-900">
                        {dest.destinationName}
                      </p>
                    </div>
                    <p className="text-m-regular text-neutral-500">
                      {formatDistance(dest.distance)}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ItemsInformation = ({
  icon,
  title,
  value,
  colspan,
  align,
}: {
  icon?: React.ReactNode
  title: string
  value: string | React.ReactNode
  colspan?: string
  align?: string
}) => {
  return (
    <div
      className={cn(
        'm-0 flex items-center gap-3 max-sm:col-span-12',
        colspan,
        align
      )}
    >
      {icon}
      <div className="flex flex-col">
        <p className="text-s-medium text-neutral-500">{title}</p>
        {typeof value === 'string' ? (
          <p className="text-l-regular ">{value}</p>
        ) : (
          <>{value}</>
        )}
      </div>
    </div>
  )
}
const Step6Review: React.FC<Step6ReviewProps> = ({ form }) => {
  const { currentStep, setCurrentStep } = useUmrahPersonal()

  if (currentStep !== 6) {
    return null
  }

  const departureAirport = form.getValues(
    `${STEP_2}.departure.from.airport.code`
  )
  const arrivalAirport = form.getValues(`${STEP_2}.departure.to.airport.code`)
  const getDepartureArrivalText = () => {
    return (
      <div className="flex items-center gap-1">
        <p className="text-l-regular">{departureAirport}</p>
        <ArrowIcon size={18} className="inline-flex" />
        <p className="text-l-regular">{arrivalAirport}</p>
      </div>
    )
  }

  const departureAirlineLogo = form.getValues(
    `${STEP_2}.departure.airline.logo`
  )
  const departureAirlineName = form.getValues(
    `${STEP_2}.departure.airline.name`
  )
  const arrivalAirlineLogo = form.getValues(`${STEP_2}.arrival.airline.logo`)
  const arrivalAirlineName = form.getValues(`${STEP_2}.arrival.airline.name`)
  const getAirlineText = (logo: string, name: string) => {
    return (
      <div className="flex items-center gap-1">
        {!isEmpty(logo) && (
          <Image
            src={logo || ''}
            width={24}
            height={24}
            alt={`logo-airline`}
            style={{
              aspectRatio: '1/1',
              objectFit: 'contain',
            }}
          />
        )}
        <p className="text-l-regular">{name}</p>
      </div>
    )
  }
  const dateRange = {
    from: new Date(form.getValues(`${STEP_1}.departureDate`)),
    to: new Date(form.getValues(`${STEP_1}.arrivalDate`)),
  }

  const transportation = form.getValues(`${STEP_5}.transportation`)

  return (
    <div
      className={`scrollbar-hide mx-auto hidden w-full max-w-5xl max-xl:max-w-3xl`}
      id={`umrah-personal-step-${form.getValues(`${STEP_1}.activity`) === ACTIVITY_TYPES.MECCA ? 5 : 6}`}
    >
      <div className="lg:rounded-[24px] lg:border lg:border-neutral-100">
        {/* Form Content */}
        <div className="p-8 pb-6 max-lg:p-4">
          {/* Title and Description Journey Information Form */}
          <div className="space-y-2 pb-6">
            <p className="text-l-medium text-neutral-900">Review Pilihan</p>
            <p className="text-m-regular text-neutral-500">
              Silahkan lihat dan baca kembali pilihan-pilihan anda sebelum
              melakukan pengajuan paket ini.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Informasi Perjalanan */}
            <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 px-3 py-4">
              <div className="flex items-center justify-between">
                <p className="text-l-medium">A. Informasi Perjalanan</p>
                <div
                  className="flex cursor-pointer items-center gap-1.5"
                  onClick={() => setCurrentStep(1)}
                >
                  <Edit2Icon />
                  <p className="text-s-regular text-nowrap">Ubah Pilihan</p>
                </div>
              </div>
              <div className="h-px w-full bg-neutral-200" />
              <div className="grid grid-cols-2 gap-x-9 gap-y-4">
                <ItemsInformation
                  icon={<WalkinggIcon />}
                  title="Jenis Perjalanan"
                  value={
                    JOURNEY_TYPE_LABELS[form.getValues(`${STEP_1}.journeyType`)]
                  }
                />
                <ItemsInformation
                  icon={<NotesIcon />}
                  title="Kegiatan Umroh"
                  value={
                    ACTIVITY_TYPE_LABELS[form.getValues(`${STEP_1}.activity`)]
                  }
                />
                <ItemsInformation
                  icon={<PeopleIcon />}
                  title="Jumlah Jemaah"
                  value={`${form.getValues(`${STEP_1}.totalManifest`)} Jemaah`}
                />
                <ItemsInformation
                  icon={<Calendar2 size={24} />}
                  title="Tanggal Keberangkatan dan Kepulangan"
                  value={formatDateRangeShort(dateRange)}
                />
                <ItemsInformation
                  icon={<PlaneTakeoff size={24} />}
                  title="Keberangkatan"
                  value={getDepartureArrivalText()}
                />
                <ItemsInformation
                  icon={<PlaneLanding size={24} />}
                  title="Kepulangan"
                  value={getDepartureArrivalText()}
                />
              </div>
            </div>

            {/* Maskapai Penerbangan */}
            <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 px-3 py-4">
              <div className="flex items-center justify-between">
                <p className="text-l-medium">B. Maskapai Penerbangan</p>
                <div
                  className="flex cursor-pointer items-center gap-1.5"
                  onClick={() => setCurrentStep(2)}
                >
                  <Edit2Icon />
                  <p className="text-s-regular text-nowrap">Ubah Pilihan</p>
                </div>
              </div>
              <div className="h-px w-full bg-neutral-200" />

              {/* Desktop Layout - Original Grid */}
              <div className="grid grid-cols-4 gap-x-9 gap-y-4 max-sm:hidden">
                <ItemsInformation
                  icon={<PlaneTakeoff />}
                  title="Maskapai Keberangkatan"
                  value={getAirlineText(
                    departureAirlineLogo ?? '/images/no-image-placeholder.png',
                    departureAirlineName
                  )}
                  colspan="col-span-2 max-sm:col-span-12"
                />
                <ItemsInformation
                  title="Tipe Kelas"
                  value={
                    <p className="text-l-regular text-right">
                      {
                        FLIGHT_CLASS_LABELS[
                          `${form.getValues(`${STEP_2}.departure.flightClass`)}`
                        ]
                      }
                    </p>
                  }
                  colspan="col-span-1 max-sm:col-span-12"
                  align="lg:justify-end"
                />
                <ItemsInformation
                  title="Total Jemaah"
                  value={
                    <p className="text-l-regular text-right">
                      {form.getValues(`${STEP_1}.totalManifest`)}
                    </p>
                  }
                  colspan="col-span-1 max-sm:col-span-12"
                  align="lg:justify-end"
                />
                <ItemsInformation
                  icon={<PlaneLanding />}
                  title="Maskapai Kepulangan"
                  value={getAirlineText(
                    arrivalAirlineLogo ?? '/images/no-image-placeholder.png',
                    arrivalAirlineName
                  )}
                  colspan="col-span-2 max-sm:col-span-12"
                />
                <ItemsInformation
                  title="Tipe Kelas"
                  value={
                    <p className="text-l-regular text-right">
                      {
                        FLIGHT_CLASS_LABELS[
                          `${form.getValues(`${STEP_2}.arrival.flightClass`)}`
                        ]
                      }
                    </p>
                  }
                  colspan="col-span-1 max-sm:col-span-12"
                  align="lg:justify-end"
                />
                <ItemsInformation
                  title="Total Jemaah"
                  value={
                    <p className="text-l-regular text-right">
                      {form.getValues(`${STEP_1}.totalManifest`)}
                    </p>
                  }
                  colspan="col-span-1 max-sm:col-span-12"
                  align="lg:justify-end"
                />
              </div>

              {/* Mobile Layout - Card Style */}
              <div className="sm:hidden">
                {/* Departure Airline Card */}
                <div className="mb-4 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <PlaneTakeoff size={24} />
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <p className="text-s-medium text-neutral-500">
                          Maskapai Keberangkatan
                        </p>
                        <div className="flex items-center gap-3">
                          {!isEmpty(departureAirlineLogo) && (
                            <Image
                              src={departureAirlineLogo || ''}
                              width={32}
                              height={32}
                              alt={`logo-airline`}
                              style={{
                                aspectRatio: '1/1',
                                objectFit: 'contain',
                              }}
                            />
                          )}
                          <p className="text-m-regular">
                            {departureAirlineName}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex flex-col">
                          <p className="text-s-medium text-neutral-500">
                            Total Jemaah
                          </p>
                          <p className="text-m-regular">
                            {form.getValues(`${STEP_1}.totalManifest`)}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-s-medium text-neutral-500">
                            Tipe Kelas
                          </p>
                          <p className="text-m-regular">
                            {
                              FLIGHT_CLASS_LABELS[
                                `${form.getValues(`${STEP_2}.departure.flightClass`)}`
                              ]
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Return Airline Card */}
                <div className="mb-4 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <PlaneLanding size={24} />
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <p className="text-s-medium text-neutral-500">
                          Maskapai Kepulangan
                        </p>
                        <div className="flex items-center gap-3">
                          {!isEmpty(arrivalAirlineLogo) && (
                            <Image
                              src={arrivalAirlineLogo || ''}
                              width={32}
                              height={32}
                              alt={`logo-airline`}
                              style={{
                                aspectRatio: '1/1',
                                objectFit: 'contain',
                              }}
                            />
                          )}
                          <p className="text-m-regular">{arrivalAirlineName}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex flex-col">
                          <p className="text-s-medium text-neutral-500">
                            Total Jemaah
                          </p>
                          <p className="text-m-regular">
                            {form.getValues(`${STEP_1}.totalManifest`)}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-s-medium text-neutral-500">
                            Tipe Kelas
                          </p>
                          <p className="text-m-regular">
                            {
                              FLIGHT_CLASS_LABELS[
                                `${form.getValues(`${STEP_2}.arrival.flightClass`)}`
                              ]
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Penginapan Makkah */}
            <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 px-3 py-4">
              <div className="flex items-center justify-between">
                <p className="text-l-medium">C. Penginapan Makkah</p>
                <div
                  className="flex cursor-pointer items-center gap-1.5"
                  onClick={() => setCurrentStep(3)}
                >
                  <Edit2Icon />
                  <p className="text-s-regular text-nowrap">Ubah Pilihan</p>
                </div>
              </div>
              <div className="h-px w-full bg-neutral-200" />
              <HotelCardReview hotel={form.getValues(`${STEP_3}.hotelMecca`)} />
            </div>
            {/* Penginapan Madinah */}
            <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 px-3 py-4">
              <div className="flex items-center justify-between">
                <p className="text-l-medium">D. Penginapan Madinah</p>
                <div
                  className="flex cursor-pointer items-center gap-1.5"
                  onClick={() => setCurrentStep(4)}
                >
                  <Edit2Icon />
                  <p className="text-s-regular text-nowrap">Ubah Pilihan</p>
                </div>
              </div>
              <div className="h-px w-full bg-neutral-200" />
              <HotelCardReview
                hotel={form.getValues(`${STEP_4}.hotelMedina`)}
              />
            </div>

            {/* Kendaraan */}
            <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 px-3 py-4">
              <div className="flex items-center justify-between">
                <p className="text-l-medium">E. Kendaraan</p>
                <div
                  className="flex cursor-pointer items-center gap-1.5"
                  onClick={() => setCurrentStep(5)}
                >
                  <Edit2Icon />
                  <p className="text-s-regular text-nowrap">Ubah Pilihan</p>
                </div>
              </div>
              <div className="h-px w-full bg-neutral-200" />
              {isEmpty(transportation) ? (
                <p className="text-s-regular text-neutral-500">
                  Tidak ada kendaraan yang dipilih
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-x-9 gap-y-4">
                  <ItemsInformation
                    icon={<CarIcon />}
                    title="Tipe Kendaraan"
                    value={transportation.name}
                  />
                  <ItemsInformation
                    icon={<PeopleIcon />}
                    title="Kapasitas Maksimal Kendaraan "
                    value={`${transportation.code.split('-').pop()} Orang`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div
          className={`flex items-center justify-between border-t border-neutral-100 px-8 py-3 max-lg:sticky max-lg:bottom-0 max-lg:z-49 max-lg:bg-white max-lg:px-4`}
        >
          <p className="text-s-regular cursor-pointer text-neutral-900 max-lg:hidden">
            Batalkan Pembuatan Paket
          </p>
          <Button
            type="submit"
            className="flex items-center gap-1.5 px-8 py-4 max-lg:w-full"
            id="submit-form"
          >
            Kirim Pengajuan Paket Umroh
            <ChevronRightCircle size={14} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Step6Review
