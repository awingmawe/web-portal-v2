'use client'

import { MosqueIcon } from '@/components/icons/mosque'
import HotelImageCarousel from '@/components/pages/my/7-PaketPersonal/Components/ImageHotelCarousel'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { getGalleryHotel } from '@/services/general-service'
import { PlaneLanding, PlaneTakeoff, Star } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

interface TransactionDetailManifestProps {
  data: any
}

export default function TransactionDetailRincian({
  data,
}: TransactionDetailManifestProps) {
  const [selectedMeccaHotel, setSelectedMeccaHotel] = useState<any>(
    data?.meccaHotel?.selectedHotel || null
  )
  const [selectedMedinaHotel, setSelectedMedinaHotel] = useState<any>(
    data?.medinaHotel?.selectedHotel || null
  )

  const HotelCardReview = (hotel: any) => {
    const { name, hotelDestination, hotelGallery, rating } = hotel.hotel || {}

    const priorityDestinations = useMemo(
      () => hotelDestination?.filter((x: any) => x.priority === true) || [],
      [hotelDestination]
    )

    const nonPriorityDestinations = useMemo(
      () => hotelDestination?.filter((x: any) => x.priority === false) || [],
      [hotelDestination]
    )

    const formatDistance = (distance: number) => {
      if (distance < 1000) {
        return `${distance}m`
      }
      return `${(distance / 1000).toFixed(0)}km`
    }

    const renderStars = (rating: number) => {
      return Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`h-[16px] w-[16px] ${
            index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))
    }

    return (
      <div className="flex flex-col gap-3 rounded-lg bg-white p-4">
        {/* Baris atas: Gambar + Detail */}
        <div className="flex gap-4 max-lg:flex-col">
          {/* Hotel Image Carousel */}
          <HotelImageCarousel images={hotelGallery || []} />

          {/* Hotel Details */}
          <div className="flex flex-1 flex-col">
            {/* Header with title and button */}
            <div className="mb-2 flex items-start justify-between">
              <div className="flex-1">
                <h3 className="mb-1 text-[12px] font-semibold text-neutral-900">
                  {name}
                </h3>

                {/* Star Rating */}
                <div className="mb-2 flex items-center gap-1">
                  {renderStars(rating || 4)}
                </div>

                {/* Priority destination (Masjid info) */}
                {priorityDestinations.length > 0 && (
                  <div className="mb-3 flex items-center gap-2">
                    <MosqueIcon className="h-[16px] w-[16px]" />
                    <span className="text-[10px] text-neutral-500">
                      {formatDistance(priorityDestinations[0]?.distance)} ke{' '}
                      {priorityDestinations[0]?.destinationName}
                    </span>
                  </div>
                )}
              </div>

              {/* Lihat Maps Button */}
              <button className="flex items-center gap-1 text-sm text-blue-600 ">
                <span className=" text-blue-600">Lihat Maps</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Area Wisata Terdekat - full width di bawah carousel + detail */}
        {nonPriorityDestinations && nonPriorityDestinations.length > 0 && (
          <div className="mt-2">
            <p className="mb-2 text-[12px] font-medium text-neutral-900">
              Area Wisata Terdekat:
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              {nonPriorityDestinations
                .slice(0, 8)
                .map((dest: any, index: number) => (
                  <div
                    key={`${index}-${dest.destinationName}`}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div className="mb-1 h-1 w-1 rounded-full bg-gray-400"></div>
                      <span className="text-[10px] text-neutral-900">
                        {dest.destinationName}
                      </span>
                    </div>
                    <span className="ml-2 text-[12px] text-neutral-500">
                      {formatDistance(dest.distance)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    )
  }
  const fetchHotelDestinations = async () => {
    try {
      if (data?.meccaHotel?.selectedHotel?.id) {
        const res = await getGalleryHotel(
          { page: 1, size: 10 },
          data.meccaHotel.selectedHotel.id
        )
        if (res?.results) {
          setSelectedMeccaHotel((prev: any) => ({
            ...prev,
            hotelGallery: res.results,
            rating: data.meccaHotel.rating,
          }))
        }
      }

      if (data?.medinaHotel?.selectedHotel?.id) {
        const res = await getGalleryHotel(
          { page: 1, size: 10 },
          data.medinaHotel.selectedHotel.id
        )
        if (res?.results) {
          setSelectedMedinaHotel((prev: any) => ({
            ...prev,
            hotelGallery: res.results,
            rating: data.medinaHotel.rating,
          }))
        }
      }
    } catch (error) {
      console.error('Error fetching hotel destinations:', error)
    }
  }

  useEffect(() => {
    fetchHotelDestinations()
  }, [])

  return (
    <div className="mx-auto space-y-4">
      {/* Tiket Pesawat */}
      <Accordion type="single" defaultValue="1" collapsible={false}>
        <AccordionItem value={'1'} className="bg-white" noBorder>
          <AccordionTrigger
            className="relative z-50 cursor-default rounded-3xl border border-neutral-100 bg-white px-6 py-4 hover:no-underline max-lg:px-3 [&>svg]:hidden"
            noSeparator
            // disabled
          >
            <div className="flex items-center gap-3 text-left">
              <span className="text-semibold text-sm text-neutral-500 max-lg:text-xs">
                Tiket Pesawat
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent
            className="px-0 pt-0 pb-0"
            style={{
              marginTop: '-40px',
              paddingTop: '110px',
              borderRadius: '1.5rem',
              border: '1px solid #E8E8E8',
            }}
          >
            <div className="relative z-20 -mt-20 space-y-2 bg-neutral-50 p-6 max-lg:px-3">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-2 max-lg:grid-cols-1">
                <div className="flex items-start">
                  <PlaneTakeoff className="mt-2 mr-3 h-[20px] w-[20px] text-neutral-900" />
                  <div>
                    <div className="text-center text-[12px] text-neutral-500">
                      Maskapai Keberangkatan
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[12px] text-neutral-900">
                      {data?.departure?.airline?.logo && (
                        <Image
                          src={data.departure.airline.logo}
                          alt="Airline Logo"
                          width={20}
                          height={20}
                        />
                      )}
                      <span>{data?.departure?.airline?.name}</span>
                    </div>
                  </div>
                  <div className="ml-8">
                    <div className="text-center text-[12px] text-neutral-500">
                      Kelas
                    </div>
                    <div className="text-center text-[12px] text-neutral-900 capitalize">
                      {data?.departure?.flightClass}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-0 hidden w-[3px] bg-gray-200 sm:block"></div>

                  {/* Desktop Layout - Horizontal */}
                  <div className="hidden items-end sm:flex">
                    <PlaneLanding className="mr-3 mb-2 ml-5 h-[20px] w-[20px] text-neutral-900" />
                    <div>
                      <div className="text-center text-[12px] text-neutral-500">
                        Maskapai Kepulangan
                      </div>
                      <div className="flex items-center justify-center gap-2 text-[12px] text-neutral-900">
                        {data?.arrival?.airline?.logo && (
                          <Image
                            src={data.arrival.airline.logo}
                            alt="Airline Logo"
                            width={20}
                            height={20}
                          />
                        )}
                        <span> {data?.arrival?.airline?.name}</span>
                      </div>
                      {/* <div className="text-center text-[12px] text-neutral-900">
                        {data?.arrival?.airline?.name}
                      </div> */}
                    </div>
                    <div className="ml-8">
                      <div className="text-center text-[12px] text-neutral-500">
                        Kelas
                      </div>
                      <div className="text-center text-[12px] text-neutral-900 capitalize">
                        {data?.arrival?.flightClass}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Layout - Vertical Stack */}
                  <div className="block sm:hidden">
                    <div className="mb-3 flex items-start">
                      <PlaneLanding className="mt-1 mr-3 h-[20px] w-[20px] text-neutral-900" />
                      <div>
                        <div className="text-center text-[12px] text-neutral-500">
                          Maskapai Kepulangan
                        </div>
                        <div className="flex items-center justify-center gap-2 text-[12px] text-neutral-900">
                          {data?.arrival?.airline?.logo && (
                            <Image
                              src={data.arrival.airline.logo}
                              alt="Airline Logo"
                              width={20}
                              height={20}
                            />
                          )}
                          <span> {data?.arrival?.airline?.name}</span>
                        </div>
                        {/* <div className="text-center text-[12px] text-neutral-900">
                          {data?.arrival?.airline?.name}
                        </div> */}
                      </div>
                      <div className="ml-13">
                        <div className="text-center text-[12px] text-neutral-500">
                          Kelas
                        </div>
                        <div className="text-center text-[12px] text-neutral-900 capitalize">
                          {data?.arrival?.flightClass}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Penginapan Mekah */}
      {selectedMeccaHotel && (
        <Accordion type="single" defaultValue="1" collapsible={false}>
          <AccordionItem value={'1'} className="bg-white" noBorder>
            <AccordionTrigger
              className="relative z-50 cursor-default rounded-3xl border border-neutral-100 bg-white px-6 py-4 hover:no-underline max-lg:px-3 [&>svg]:hidden"
              noSeparator
              // disabled
            >
              <div className="flex items-center gap-3 text-left">
                <span className="text-semibold text-sm text-neutral-500 max-lg:text-xs">
                  Pinginapan Makkah
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent
              className="px-0 pt-0 pb-0"
              style={{
                marginTop: '-40px',
                paddingTop: '110px',
                borderRadius: '1.5rem',
                border: '1px solid #E8E8E8',
              }}
            >
              <div className="relative z-20 -mt-20 space-y-2 bg-neutral-50 p-6 max-lg:px-3">
                {/* Basic Information */}
                <div className="grid grid-cols-1 gap-2 max-lg:grid-cols-1">
                  <HotelCardReview hotel={selectedMeccaHotel} />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {/* Penginapan Madinnah */}
      {selectedMedinaHotel && (
        <Accordion type="single" defaultValue="1" collapsible={false}>
          <AccordionItem value={'1'} className="bg-white" noBorder>
            <AccordionTrigger
              className="relative z-50 cursor-default rounded-3xl border border-neutral-100 bg-white px-6 py-4 hover:no-underline max-lg:px-3 [&>svg]:hidden"
              noSeparator
              // disabled
            >
              <div className="flex items-center gap-3 text-left">
                <span className="text-semibold text-sm text-neutral-500 max-lg:text-xs">
                  Pinginapan Madinnah
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent
              className="px-0 pt-0 pb-0"
              style={{
                marginTop: '-40px',
                paddingTop: '110px',
                borderRadius: '1.5rem',
                border: '1px solid #E8E8E8',
              }}
            >
              <div className="relative z-20 -mt-20 space-y-2 bg-neutral-50 p-6 max-lg:px-3">
                {/* Basic Information */}
                <div className="grid grid-cols-1 gap-2 max-lg:grid-cols-1">
                  <HotelCardReview hotel={selectedMedinaHotel} />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  )
}
