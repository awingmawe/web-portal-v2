import { AirPlane } from '@/components/icons/airplane'
import { ArrowCircleRight } from '@/components/icons/arrow-circle-right'
import { BuildingIcon } from '@/components/icons/building'
import { CalendarIcon } from '@/components/icons/date'
import { InfoIcon } from '@/components/icons/info'
import { StarIconPrimary } from '@/components/icons/star'
import BadgePromo from '@/components/shared/Badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CardData } from '@/constant/types/PackageProps'
import { useEventTracker } from '@/contexts/event-tracker/context'
import { isEmpty } from '@/lib/utils'
import { differenceInDays, format } from 'date-fns'
import { id } from 'date-fns/locale'
import { PlaneLanding, PlaneTakeoff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { memo, useEffect, useMemo, useRef } from 'react'
interface CardPackageCompactProps {
  data: CardData
  section?: string
  eventCategory?: string
}

export const CardPackageCompact = memo(function CardPackageCompact({
  data,
  section = '',
  eventCategory = 'home',
}: CardPackageCompactProps) {
  const elem = useRef<HTMLDivElement>(null)
  const { observe, pushEvent } = useEventTracker()
  const {
    discount,
    originalPrice,
    organizationName,
    title,
    location,
    locationId,
    province,
    provinceId,
    price,
    departureDate,
    arrivalDate,
    rating,
    slugOrganization,
    slugPackage,
    isPlus,
    codeCountry,
    releasedAt,
    packageType,
    id: packageId,
    isLastCall,
    meccaHotel,
    medinaHotel,
    departure,
    arrival,
  } = data

  // Memoize complex calculations
  const showDiscount = useMemo(
    () => !isEmpty(discount) && Number(discount) > 0,
    [discount]
  )

  const formattedDepartureDate = useMemo(
    () => format(departureDate, 'dd MMM yyyy', { locale: id }),
    [departureDate]
  )

  const formattedArrivalDate = useMemo(
    () => format(arrivalDate, 'dd MMM yyyy', { locale: id }),
    [arrivalDate]
  )

  const formattedReleasedAt = useMemo(
    () => format(releasedAt, 'dd MMM yyyy', { locale: id }),
    [releasedAt]
  )

  const tripDuration = useMemo(
    () => differenceInDays(arrivalDate, departureDate) + 1,
    [arrivalDate, departureDate]
  )

  // Memoize country flags rendering if needed
  const countryFlags = useMemo(() => {
    if (isEmpty(codeCountry) || !isPlus) return null

    return codeCountry?.map((value, index) => (
      <Image
        width={0}
        height={0}
        className={`aspect-square ${
          index === 0
            ? 'z-2 mt-0 h-12 w-12 rounded-tr-[18px]'
            : 'z-1 -mt-4 h-16 w-12 object-cover'
        } rounded-bl-[18px] shadow-[1px_2px_2px_0px_rgba(0,0,0,0.40)]`}
        key={`flag-${value.country.alpha2Code}`}
        alt="flag-icon"
        src={`https://kapowaz.github.io/square-flags/flags/${value.country.alpha2Code}.svg`}
      />
    ))
  }, [codeCountry, isPlus])

  useEffect(() => {
    if (elem.current) {
      observe(elem.current, () => {
        pushEvent({
          name: 'impression_package_card',
          topic: 'umrah',
          category: eventCategory,
          data: {
            packageId,
            packageType,
            title,
            slug: slugPackage,
            hotelRating: rating,
            tripDuration,
            travelName: organizationName,
            travelCity: location,
            travelCityId: locationId,
            travelProvinceName: province,
            travelProvinceId: provinceId,
            section,
            lastCall: isLastCall,
            price,
          },
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elem])

  return (
    <div className="relative" id="card-package">
      {/* Image */}
      {showDiscount && <BadgePromo title="PROMO 🎉" className="-top-5 z-30" />}
      <div
        style={{
          background: 'linear-gradient(0deg, #FFFFFF 46.42%, #FFDC71 290.1%)',
        }}
        className="relative z-10 rounded-2xl border border-neutral-100 px-5 pt-2 pb-5"
      >
        {!isEmpty(codeCountry) && isPlus && (
          <div className="absolute top-0 right-0 flex flex-col rounded-[20px]">
            {countryFlags}
          </div>
        )}

        {/* Content */}
        <div className="mt-3 flex flex-col gap-1" ref={elem}>
          {/* Title */}
          <h3 className="text-l-medium line-clamp-2 break-all text-neutral-900 uppercase max-sm:text-sm max-sm:leading-5">
            {title}
          </h3>
          {/* Price */}
          <p className="text-s-regular mt-3 text-neutral-500">
            Harga Mulai Dari
          </p>
          <div className="flex flex-col flex-wrap items-start justify-start gap-1">
            {showDiscount && (
              <span className="text-s-regular -tracking-[0.32px] text-neutral-500 line-through">
                {originalPrice}
              </span>
            )}
            <span className="heading-4-bold -tracking-[0.32px] text-neutral-900">
              {price}
            </span>
          </div>

          <Separator className="my-3" />

          {/* Hotel */}
          <div className="flex flex-col gap-1">
            <div className="flex items-start justify-between">
              <span className="text-s-regular flex gap-2 text-neutral-500">
                <BuildingIcon size={16} color="text-neutral-500" />
                Hotel Mekkah
              </span>
              <div className="flex items-center gap-1">
                <span className="text-s-regular text-neutral-500">
                  {meccaHotel.rating}
                </span>
                <StarIconPrimary size={13} />
              </div>
            </div>
            <span className="text-m-regular">{meccaHotel.name}</span>
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <div className="flex items-start justify-between">
              <span className="text-s-regular flex gap-2 text-neutral-500">
                <BuildingIcon size={16} color="text-neutral-500" />
                Hotel Madinah
              </span>
              <div className="flex items-center gap-1">
                <span className="text-s-regular text-neutral-500">
                  {medinaHotel.rating}
                </span>
                <StarIconPrimary size={13} />
              </div>
            </div>
            <span className="text-m-regular">{medinaHotel.name}</span>
          </div>

          {/* Departure and Arrival Date */}
          <div className="mt-2 flex flex-col">
            <div className="flex items-center gap-2">
              <CalendarIcon size={16} color="text-neutral-500" />
              <p className="text-s-regular text-neutral-500">
                Tanggal Berangkat
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-m-regular">
                {formattedDepartureDate} - {formattedArrivalDate}
              </p>
              <div className="bg-primary-500 inline-flex items-center justify-center gap-2.5 rounded-[100px] p-1.5">
                <p className="text-s-regular text-center text-neutral-900">
                  {tripDuration} Hari
                </p>
              </div>
            </div>
          </div>

          {/* Airline and Flight */}
          <div className="mt-2 flex flex-col">
            <div className="flex items-center gap-2">
              <AirPlane size={16} color="text-neutral-500" />
              <p className="text-s-regular text-neutral-500">
                Maskapai Penerbangan
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-m-regular">
                {departure.airline.name}
                {departure.airline.name == arrival.airline.name
                  ? ''
                  : ', ' + arrival.airline.name}
              </p>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="mt-2 flex flex-col">
              <div className="flex items-center gap-2">
                <PlaneTakeoff size={16} className="text-neutral-500" />
                <p className="text-s-regular text-neutral-500">Keberangkatan</p>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-m-regular">
                  {departure.from.airport.code} → {departure.to.airport.code}
                </p>
              </div>
            </div>
            <div className="mt-2 flex flex-col">
              <div className="flex items-center gap-2">
                <PlaneLanding size={16} className="text-neutral-500" />
                <p className="text-s-regular text-neutral-500">Kedatangan</p>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-m-regular">
                  {arrival.from.airport.code} → {arrival.to.airport.code}
                </p>
              </div>
            </div>
          </div>

          {/* Action */}
          <Link
            href={`/${packageType}/${slugOrganization}/${slugPackage}`}
            onClick={() => {
              pushEvent({
                name: 'click_package_card',
                topic: 'umrah',
                category: eventCategory,
                data: {
                  packageId,
                  packageType,
                  title,
                  slug: slugPackage,
                  hotelRating: rating,
                  tripDuration,
                  travelName: organizationName,
                  travelCity: location,
                  travelCityId: locationId,
                  travelProvinceName: province,
                  travelProvinceId: provinceId,
                  section,
                  lastCall: isLastCall,
                  price,
                },
              })
            }}
            className="relative mt-3"
            id="card-package"
          >
            <Button className="w-full">
              Beli Paket
              <ArrowCircleRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
      {differenceInDays(releasedAt, new Date()) <= 10 && (
        <div className="bg-primary-100 relative z-5 -mt-5 flex items-center justify-center gap-[5px] rounded-2xl px-5 pt-7 pb-2">
          <InfoIcon size={20} className="text-primary-700 stroke-0" />
          <p className="text-s-regular text-primary-700">
            Batas booking {formattedReleasedAt}
          </p>
        </div>
      )}
    </div>
  )
})
