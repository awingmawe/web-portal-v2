'use client'

import { BuildingIcon } from '@/components/icons/building'
import { CarIcon } from '@/components/icons/car'
import { CalendarIcon } from '@/components/icons/date'
import { StarIconPrimary } from '@/components/icons/star'
import OfferButton from '@/components/pages/umrah-personal/offer/common/CardOfferUmrahPersonal/ActionButton'
import { PackagePersonalData } from '@/constant/types/UmrahPersonalProps'
import useCountdown from '@/hooks/umrah-personal/offer/useCountdown'
import { formatCurrency, getMinimumNonZeroPrice, isEmpty } from '@/lib/utils'
import Placeholder from '@/public/images/no-image-placeholder.png'
import { differenceInDays, format } from 'date-fns'
import { id } from 'date-fns/locale'
import { PlaneTakeoff, RefreshCw } from 'lucide-react'
import Image from 'next/image'
import React, { useMemo } from 'react'

type UmrahPersonalOfferProps = {
  dataOffer: PackagePersonalData
  index: number
}

const CardOfferUmrahPersonal: React.FC<UmrahPersonalOfferProps> = ({
  dataOffer,
  index,
}) => {
  const {
    id: offerId,
    expiredDate,
    isExpired,
    JourneyInformation: {
      departureDate,
      arrivalDate,
      meccaHotel,
      medinaHotel,
      departure,
      arrival,
      transportation,
    }, // umrah personal existing
    meccaHotel: { rating: ratingMecca, selectedHotel: selectedMeccaHotel },
    medinaHotel: { rating: ratingMedina, selectedHotel: selectedMedinaHotel },
    transportation: offerTransportation,
    departure: {
      airline: {
        logo: logoAirlineDeparture,
        name: nameAirlineDeparture,
        id: idAirlineDeparture,
      },
    }, // new custom umrah personal
    arrival: {
      airline: {
        logo: logoAirlineArrival,
        name: nameAirlineArrival,
        id: idAirlineArrival,
      },
    }, // new custom umrah personal
    priceQuad,
    priceDouble,
    priceTriple,
    orgName,
    orgThumbnail,
    isBooked,
  } = dataOffer

  const timeLeft = useCountdown(expiredDate)

  // Format number to always show 2 digits
  const formatTime = (time: number): string => {
    return time.toString().padStart(2, '0')
  }

  const formattedDepartureDate = useMemo(
    () => format(departureDate, 'dd MMM yyyy', { locale: id }),
    [departureDate]
  )

  const formattedArrivalDate = useMemo(
    () => format(arrivalDate, 'dd MMM yyyy', { locale: id }),
    [arrivalDate]
  )

  const numberOfDays = useMemo(
    () => differenceInDays(arrivalDate, departureDate) + 1,
    [arrivalDate, departureDate]
  )

  return (
    <div
      className={`${isExpired ? 'opacity-50' : ''} from-primary-100 to-neutral-0 col-span-1 flex flex-col justify-between gap-3 rounded-[20px] border-1 border-neutral-100 bg-gradient-to-br px-4 py-5`}
    >
      {/* Penawaran and Countdown */}
      <div className="flex items-center justify-between">
        <p className="text-l-medium">Penawaran {index + 1}</p>
        {!isExpired && timeLeft ? (
          <div className="bg-info-100 flex gap-1 rounded-xl px-4 py-2 text-white">
            <div className="flex flex-col items-center">
              <p className="text-s-semibold text-info-500">
                {formatTime(timeLeft.days)}
              </p>
              <p className="text-xs-regular text-info-500">hari</p>
            </div>
            <span className="text-s-regular self-center">:</span>
            <div className="flex flex-col items-center">
              <p className="text-s-semibold text-info-500">
                {formatTime(timeLeft.hours)}
              </p>
              <p className="text-xs-regular text-info-500">jam</p>
            </div>
            <span className="text-s-regular self-center">:</span>
            <div className="flex flex-col items-center">
              <p className="text-s-semibold text-info-500">
                {formatTime(timeLeft.minutes)}
              </p>
              <p className="text-xs-regular text-info-500">menit</p>
            </div>
            <span className="text-s-regular self-center">:</span>
            <div className="flex flex-col items-center">
              <p className="text-s-semibold text-info-500">
                {formatTime(timeLeft.seconds)}
              </p>
              <p className="text-xs-regular text-info-500">detik</p>
            </div>
          </div>
        ) : (
          <p className="text-m-medium italic">Penawaran Hangus</p>
        )}
      </div>

      {/* Travel Detail */}
      <div className="flex items-center gap-1">
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

      {/* Divider */}
      <div className="border-b border-neutral-200" />

      {/* Departure Arrival */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1">
          <CalendarIcon size={16} color="text-neutral-500" />
          <p className="text-s-regular text-neutral-500">Tanggal Berangkat</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-m-regular">
            {formattedDepartureDate} - {formattedArrivalDate}
          </p>
          <div className="bg-primary-500 inline-flex items-center justify-center gap-2.5 rounded-[100px] p-1.5">
            <p className="text-s-regular text-center text-neutral-900">
              {numberOfDays} Hari
            </p>
          </div>
        </div>
      </div>

      {/* Hotel Mecca*/}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <BuildingIcon size={16} color="text-neutral-500" />
            <p className="text-s-regular text-neutral-500">Hotel Mekkah</p>
          </div>
          {Number(ratingMecca) > 0 && (
            <div className="flex items-center">
              <p className="text-s-regular text-neutral-500">{ratingMecca}</p>
              <StarIconPrimary size={16} />
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {meccaHotel.selectedHotel.id !== selectedMeccaHotel.id ? (
            <>
              <p className="text-m-regular text-neutral-500 line-through">
                {selectedMeccaHotel.name}
              </p>
              <RefreshCw size={16} color="#30302F" />
              <p className="text-m-regular">{meccaHotel.selectedHotel.name}</p>
            </>
          ) : (
            <p className="text-m-regular">{selectedMeccaHotel.name}</p>
          )}
        </div>
      </div>

      {/* Hotel Medina*/}
      {(!isEmpty(selectedMedinaHotel) || !isEmpty(medinaHotel)) && (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1">
              <BuildingIcon size={16} color="text-neutral-500" />
              <p className="text-s-regular text-neutral-500">Hotel Madinah</p>
            </div>
            {Number(ratingMedina) > 0 && (
              <div className="flex items-center">
                <p className="text-s-regular text-neutral-500">
                  {ratingMedina}
                </p>
                <StarIconPrimary size={16} />
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            {medinaHotel?.selectedHotel?.id !== selectedMedinaHotel?.id ? (
              <>
                <p className="text-m-regular text-neutral-500 line-through">
                  {selectedMedinaHotel?.name}
                </p>
                <RefreshCw size={16} color="#30302F" />
                <p className="text-m-regular">
                  {medinaHotel?.selectedHotel?.name}
                </p>
              </>
            ) : (
              <p className="text-m-regular">{selectedMedinaHotel?.name}</p>
            )}
          </div>
        </div>
      )}

      {/* Departure Airline */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1">
          <PlaneTakeoff size={16} />
          <p className="text-s-regular text-neutral-500">Keberangkatan</p>
        </div>
        <div className="flex items-center gap-3">
          {departure.airline.id !== idAirlineDeparture ? (
            <>
              <div className="flex items-center gap-2">
                <Image
                  src={departure.airline.logo || Placeholder}
                  width={20}
                  height={20}
                  alt={`logo-${departure.airline.name}`}
                  style={{
                    aspectRatio: '1/1',
                    objectFit: 'contain',
                  }}
                />
                <p className="text-m-regular line-through">
                  {departure.airline.name}
                </p>
              </div>
              <RefreshCw size={16} color="#30302F" />
              <div className="flex items-center gap-2">
                <Image
                  src={logoAirlineDeparture || Placeholder}
                  width={20}
                  height={20}
                  alt={`logo-${nameAirlineDeparture}`}
                  style={{
                    aspectRatio: '1/1',
                    objectFit: 'contain',
                  }}
                />
                <p className="text-m-regular">{nameAirlineDeparture}</p>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Image
                src={logoAirlineDeparture || Placeholder}
                width={20}
                height={20}
                alt={`logo-${nameAirlineDeparture}`}
                style={{
                  aspectRatio: '1/1',
                  objectFit: 'contain',
                }}
              />
              <p className="text-m-regular">{nameAirlineDeparture}</p>
            </div>
          )}
        </div>
      </div>

      {/* Arrival Airline */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1">
          <PlaneTakeoff size={16} />
          <p className="text-s-regular text-neutral-500">Kedatangan</p>
        </div>
        <div className="flex items-center gap-3">
          {arrival.airline.id !== idAirlineArrival ? (
            <>
              <div className="flex items-center gap-2">
                <Image
                  src={arrival.airline.logo || Placeholder}
                  width={20}
                  height={20}
                  alt={`logo-${arrival.airline.name}`}
                  style={{
                    aspectRatio: '1/1',
                    objectFit: 'contain',
                  }}
                />
                <p className="text-m-regular line-through">
                  {arrival.airline.name}
                </p>
              </div>
              <RefreshCw size={16} color="#30302F" />
              <div className="flex items-center gap-2">
                <Image
                  src={logoAirlineArrival || Placeholder}
                  width={20}
                  height={20}
                  alt={`logo-${nameAirlineArrival}`}
                  style={{
                    aspectRatio: '1/1',
                    objectFit: 'contain',
                  }}
                />
                <p className="text-m-regular">{nameAirlineArrival}</p>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Image
                src={logoAirlineArrival || Placeholder}
                width={20}
                height={20}
                alt={`logo-${nameAirlineArrival}`}
                style={{
                  aspectRatio: '1/1',
                  objectFit: 'contain',
                }}
              />
              <p className="text-m-regular">{nameAirlineArrival}</p>
            </div>
          )}
        </div>
      </div>

      {/* Transportation */}
      {(!isEmpty(transportation) || !isEmpty(offerTransportation)) && (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <CarIcon size={16} />
            <p className="text-s-regular text-neutral-500">Transportasi</p>
          </div>

          <div className="flex items-center gap-3">
            {transportation?.vehicle?.code !==
            offerTransportation?.vehicle?.code ? (
              <>
                <p className="text-m-regular capitalize line-through">
                  1x {transportation?.vehicle?.name}
                </p>
                <RefreshCw size={16} color="#30302F" />
                <p className="text-m-regular capitalize">
                  1x {offerTransportation?.vehicle?.name}
                </p>
              </>
            ) : (
              <p className="text-m-regular capitalize">
                1x {offerTransportation?.vehicle?.name}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-b border-neutral-200" />

      {/* Price */}
      <div>
        <p className="text-s-medium text-neutral-500">Harga Mulai</p>
        <p className="heading-4-semibold">
          {formatCurrency(
            getMinimumNonZeroPrice(
              Number(priceDouble),
              Number(priceTriple),
              Number(priceQuad)
            )
          )}
        </p>
      </div>

      {/* Action Button */}
      <OfferButton
        isExpired={isExpired}
        isBook={isBooked}
        offerId={offerId}
        dataOffer={dataOffer}
        index={index}
      />
    </div>
  )
}

export default CardOfferUmrahPersonal
