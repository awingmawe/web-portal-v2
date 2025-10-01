'use client'

import { BuildingIcon } from '@/components/icons/building'
import { CarIcon } from '@/components/icons/car'
import { Tag2Icon } from '@/components/icons/tag-2'
import HotelPersonalDisplay from '@/components/pages/umrah-personal/offer/dialog/DialogDetailOffer/HotelPersonalDisplay'
import LayoutPerItem from '@/components/pages/umrah-personal/offer/dialog/DialogDetailOffer/LayoutDisplay'
import PriceDisplay from '@/components/pages/umrah-personal/offer/dialog/DialogDetailOffer/PriceDisplay'
import { PackagePersonalData } from '@/constant/types/UmrahPersonalProps'
import { useGetHotelGalleryByHotelId } from '@/hooks/umrah-personal/offer/useGetHotelGalleryByHotelId'
import { isEmpty } from '@/lib/utils'
import Placeholder from '@/public/images/no-image-placeholder.png'
import { PlaneLanding, PlaneTakeoff, RefreshCw } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface OfferDetailDialogContentProps {
  data: PackagePersonalData
  index?: number
  isOpen: boolean
  onCancel?: () => void
}

const OfferDetailDialogContent: React.FC<OfferDetailDialogContentProps> = ({
  data,
  isOpen,
}) => {
  const {
    id,
    orgName,
    orgThumbnail,
    priceDouble,
    priceTriple,
    priceQuad,
    meccaHotel: newMeccaHotel,
    medinaHotel: newMedinaHotel,
    transportation: newTransportation,
    departure: newDeparture, // new custom umrah personal
    arrival: newArrival, // new custom umrah personal
    note,
    JourneyInformation: {
      meccaHotel: existingMeccaHotel,
      medinaHotel: existingMedinaHotel,
      departure: existingDeparture,
      arrival: existingArrival,
      transportation: existingTransportation,
    }, // umrah personal existing
  } = data

  const {
    data: hotelGalleryMeccaExisting,
    isLoading: hotelGalleryMeccaExistingLoading,
  } = useGetHotelGalleryByHotelId(existingMeccaHotel.selectedHotel.id, isOpen, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: Infinity,
    isPaused: () => !existingMeccaHotel.selectedHotel.id, // dont hit if there's no id mecca
  })
  const { data: hotelGalleryMeccaNew, isLoading: hotelGalleryMeccaNewLoading } =
    useGetHotelGalleryByHotelId(newMeccaHotel.selectedHotel.id, isOpen, {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: Infinity,
      isPaused: () => !newMeccaHotel.selectedHotel.id, // dont hit if there's no id mecca
    })
  const {
    data: hotelGalleryMedinaNew,
    isLoading: hotelGalleryMedinaNewLoading,
  } = useGetHotelGalleryByHotelId(newMedinaHotel?.selectedHotel?.id, isOpen, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: Infinity,
    isPaused: () => !newMedinaHotel?.selectedHotel?.id, // dont hit if there's no id medina
  })
  const {
    data: hotelGalleryMedinaExisting,
    isLoading: hotelGalleryMedinaExistingLoading,
  } = useGetHotelGalleryByHotelId(
    existingMedinaHotel?.selectedHotel?.id,
    isOpen,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: Infinity,
      isPaused: () => !existingMedinaHotel?.selectedHotel?.id, // dont hit if there's no id medina
    }
  )

  const IS_AVAILABLE_TRANSPORTATION =
    existingTransportation?.vehicle?.code === newTransportation?.vehicle?.code
  const IS_AVAILABLE_HOTEL_MECCA =
    existingMeccaHotel.selectedHotel.id === newMeccaHotel.selectedHotel.id
  const IS_AVAILABLE_HOTEL_MEDINA =
    existingMedinaHotel?.selectedHotel?.id === newMedinaHotel?.selectedHotel?.id
  const IS_AVAILABLE_DEPARTURE =
    existingDeparture.airline.id === newDeparture.airline.id
  const IS_AVAILABLE_ARRIVAL =
    existingArrival.airline.id === newArrival.airline.id

  return (
    <div
      id={`dialog-detail-offer-${id}`}
      className="scrollbar-hide flex max-h-[70vh] flex-col gap-3 max-lg:gap-2 lg:overflow-y-auto"
    >
      {/* Travel */}
      <div className="flex items-center justify-center gap-1 rounded-[20px] border-1 border-neutral-200 p-4">
        <Image
          src={orgThumbnail ?? Placeholder?.src}
          alt={`Travel-${orgName}`}
          width={0}
          height={0}
          sizes="100vw"
          className="aspect-square h-8 w-8"
        />
        <p className="text-l-medium capitalize">{orgName}</p>
      </div>

      {/* Harga Paket */}
      <LayoutPerItem icon={<Tag2Icon />} titleItem="Harga Paket">
        {!isEmpty(priceDouble) && (
          <PriceDisplay price={priceDouble} roomType="double" />
        )}
        {!isEmpty(priceTriple) && (
          <PriceDisplay price={priceTriple} roomType="triple" />
        )}
        {!isEmpty(priceQuad) && (
          <PriceDisplay price={priceQuad} roomType="quad" />
        )}
      </LayoutPerItem>

      {/* Transportasi */}
      {(!isEmpty(existingTransportation) || !isEmpty(newTransportation)) && (
        <LayoutPerItem
          icon={<CarIcon size={24} color="#424242" />}
          titleItem="Transportasi"
          isAvailable={IS_AVAILABLE_TRANSPORTATION}
        >
          {IS_AVAILABLE_TRANSPORTATION ? (
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-xs-regular text-neutral-500">
                  Tipe Kendaraan
                </p>
                <p className="text-m-regular capitalize">
                  {existingTransportation.vehicle.name}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-xs-regular text-neutral-500">Jumlah</p>
                <p className="text-m-regular">1 Kendaraan</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-xs-regular text-neutral-500 line-through">
                    Tipe Kendaraan
                  </p>
                  <p className="text-m-regular text-neutral-500 capitalize line-through">
                    {existingTransportation.vehicle.name}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-xs-regular text-neutral-500 line-through">
                    Jumlah
                  </p>
                  <p className="text-m-regular text-neutral-500 line-through">
                    1 Kendaraan
                  </p>
                </div>
              </div>
              <div className="mx-auto flex items-center gap-2">
                <RefreshCw size={12} color="#2b2b2b" />
                <p className="text-xs-regular text-neutral-600">
                  Digantikan dengan
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-xs-regular text-neutral-500">
                    Tipe Kendaraan
                  </p>
                  <p className="text-m-regular capitalize">
                    {newTransportation?.vehicle?.name}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-xs-regular text-neutral-500">Jumlah</p>
                  <p className="text-m-regular">1 Kendaraan</p>
                </div>
              </div>
            </div>
          )}
        </LayoutPerItem>
      )}

      {/* Maskapai Keberangkatan */}
      <LayoutPerItem
        icon={<PlaneTakeoff size={24} color="#424242" />}
        titleItem="Maskapai Keberangkatan"
        isAvailable={IS_AVAILABLE_DEPARTURE}
      >
        {IS_AVAILABLE_DEPARTURE ? (
          <div className="flex items-center gap-2">
            <Image
              src={existingDeparture.airline.logo || Placeholder}
              width={23}
              height={23}
              alt={`logo-${existingDeparture.airline.name}`}
              style={{
                aspectRatio: '1/1',
                objectFit: 'contain',
              }}
            />
            <p className="text-m-regular capitalize">
              {existingDeparture.airline.name} • {existingDeparture.flightClass}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 opacity-50">
              <Image
                src={existingDeparture.airline.logo || Placeholder}
                width={23}
                height={23}
                alt={`logo-${existingDeparture.airline.name}`}
                style={{
                  aspectRatio: '1/1',
                  objectFit: 'contain',
                }}
              />
              <p className="text-m-regular capitalize line-through">
                {existingDeparture.airline.name} •{' '}
                {existingDeparture.flightClass}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw size={12} color="#2b2b2b" />
              <p className="text-xs-regular text-neutral-600">
                Digantikan dengan
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={newDeparture.airline.logo || Placeholder}
                width={23}
                height={23}
                alt={`logo-${newDeparture.airline.name}`}
                style={{
                  aspectRatio: '1/1',
                  objectFit: 'contain',
                }}
              />
              <p className="text-m-regular capitalize">
                {newDeparture.airline.name} • {newDeparture.flightClass}
              </p>
            </div>
          </div>
        )}
      </LayoutPerItem>

      {/* Maskapai Kepulangan */}
      <LayoutPerItem
        icon={<PlaneLanding size={24} color="#424242" />}
        titleItem="Maskapai Kepulangan"
        isAvailable={IS_AVAILABLE_ARRIVAL}
      >
        {IS_AVAILABLE_ARRIVAL ? (
          <div className="flex items-center gap-2">
            <Image
              src={existingArrival.airline.logo || Placeholder}
              width={23}
              height={23}
              alt={`logo-${existingArrival.airline.name}`}
              style={{
                aspectRatio: '1/1',
                objectFit: 'contain',
              }}
            />
            <p className="text-m-regular capitalize">
              {existingArrival.airline.name} • {existingArrival.flightClass}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 opacity-50">
              <Image
                src={existingArrival.airline.logo || Placeholder}
                width={23}
                height={23}
                alt={`logo-${existingArrival.airline.name}`}
                style={{
                  aspectRatio: '1/1',
                  objectFit: 'contain',
                }}
              />
              <p className="text-m-regular capitalize line-through">
                {existingArrival.airline.name} • {existingArrival.flightClass}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw size={12} color="#2b2b2b" />
              <p className="text-xs-regular text-neutral-600">
                Digantikan dengan
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={newArrival.airline.logo || Placeholder}
                width={23}
                height={23}
                alt={`logo-${newArrival.airline.name}`}
                style={{
                  aspectRatio: '1/1',
                  objectFit: 'contain',
                }}
              />
              <p className="text-m-regular capitalize">
                {newArrival.airline.name} • {newArrival.flightClass}
              </p>
            </div>
          </div>
        )}
      </LayoutPerItem>

      {/* Penginapan Makkah */}
      <LayoutPerItem
        icon={<BuildingIcon size={24} color="text-neutral-500" />}
        titleItem="Penginapan Makkah"
        isAvailable={IS_AVAILABLE_HOTEL_MECCA}
      >
        {IS_AVAILABLE_HOTEL_MECCA ? (
          <HotelPersonalDisplay
            hotelGallery={hotelGalleryMeccaExisting || []}
            hotelData={existingMeccaHotel}
            loading={hotelGalleryMeccaExistingLoading}
          />
        ) : (
          <div className="flex flex-col gap-3">
            <div className="relative">
              <div className="pointer-events-none opacity-50 blur-xs">
                <HotelPersonalDisplay
                  hotelGallery={hotelGalleryMeccaExisting || []}
                  loading={hotelGalleryMeccaExistingLoading}
                  hotelData={existingMeccaHotel}
                />
              </div>
              <p className="text-m-medium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Hotel yang dipilih tidak tersedia
              </p>
            </div>
            <div className="h-[1px] w-full bg-neutral-200" />
            <HotelPersonalDisplay
              hotelGallery={hotelGalleryMeccaNew || []}
              loading={hotelGalleryMeccaNewLoading}
              hotelData={newMeccaHotel}
            />
          </div>
        )}
      </LayoutPerItem>

      {/* Penginapan Madinah */}
      {(!isEmpty(existingMedinaHotel) || !isEmpty(newMedinaHotel)) && (
        <LayoutPerItem
          icon={<BuildingIcon size={24} color="text-neutral-500" />}
          titleItem="Penginapan Madinah"
          isAvailable={IS_AVAILABLE_HOTEL_MEDINA}
        >
          {IS_AVAILABLE_HOTEL_MEDINA ? (
            <HotelPersonalDisplay
              hotelGallery={hotelGalleryMedinaExisting || []}
              hotelData={existingMedinaHotel}
              loading={hotelGalleryMedinaExistingLoading}
            />
          ) : (
            <div className="flex flex-col gap-3">
              <div className="relative">
                <div className="pointer-events-none opacity-50 blur-xs">
                  <HotelPersonalDisplay
                    hotelGallery={hotelGalleryMedinaExisting || []}
                    loading={hotelGalleryMedinaExistingLoading}
                    hotelData={existingMedinaHotel}
                  />
                </div>
                <p className="text-m-medium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  Hotel yang dipilih tidak tersedia
                </p>
              </div>
              <div className="h-[1px] w-full bg-neutral-200" />
              <HotelPersonalDisplay
                hotelGallery={hotelGalleryMedinaNew || []}
                loading={hotelGalleryMedinaNewLoading}
                hotelData={newMedinaHotel}
              />
            </div>
          )}
        </LayoutPerItem>
      )}

      {/* Catatan */}
      {note && (
        <LayoutPerItem titleItem="Catatan">
          <p className="text-m-regular">{note}</p>
        </LayoutPerItem>
      )}
    </div>
  )
}

export default OfferDetailDialogContent
