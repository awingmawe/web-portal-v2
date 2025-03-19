import { BuildingIcon } from '@/components/icons/building'
import { CornerIcon } from '@/components/icons/corner'
import { CalendarIcon } from '@/components/icons/date'
import { InfoIcon } from '@/components/icons/info'
import { StarIconPrimary } from '@/components/icons/star'
import { StoreIcon } from '@/components/icons/store'
import { CardData } from '@/constant/types/PackageProps'
import {
  capitalizeText,
  cn,
  handleDiscountType,
  isEmpty,
  isValidImage,
} from '@/lib/utils'
import NoImagePlaceholder from '@/public/images/no-image-placeholder.png'
import { differenceInDays, format } from 'date-fns'
import { id } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'
import { memo, useMemo } from 'react'
interface CardPackageProps {
  data: CardData
}

export const CardPackage = memo(function CardPackage({
  data,
}: CardPackageProps) {
  const {
    src,
    discount,
    discountType,
    originalPrice,
    organizationName,
    title,
    location,
    price,
    departureDate,
    arrivalDate,
    rating,
    slugOrganization,
    slugPackage,
    isPlus,
    codeCountry,
    releasedAt,
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

  const limitBookingDate = useMemo(
    () => differenceInDays(departureDate, releasedAt) + 1,
    [departureDate, releasedAt]
  )

  // Memoize the stars rendering
  const ratingStars = useMemo(
    () =>
      [...Array(rating)].map((_, i) => (
        <StarIconPrimary size={13} key={`star-icon-${i}`} />
      )),
    [rating]
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
            ? 'z-2 mt-0 h-12 w-12'
            : 'z-1 -mt-4 h-16 w-12 object-cover'
        } rounded-bl-[18px] shadow-[1px_2px_2px_0px_rgba(0,0,0,0.40)]`}
        key={`flag-${value.country.alpha2Code}`}
        alt="flag-icon"
        src={`https://kapowaz.github.io/square-flags/flags/${value.country.alpha2Code}.svg`}
      />
    ))
  }, [codeCountry, isPlus])

  return (
    <Link
      href={`/umrah/${slugOrganization}/${slugPackage}`}
      className="relative"
      id="card-package"
    >
      {/* Image */}
      {showDiscount && (
        <div
          className={`absolute top-[4%] -left-[7px] z-10 flex h-8 items-center rounded-full rounded-bl-none bg-[#F0143E] py-1 pr-2 pl-2.5`}
        >
          <div className="text-m-regular text-neutral-0 font-bold -tracking-[0.28px]">
            PROMO 🎉
          </div>
          <CornerIcon className="absolute -bottom-[7px] left-0" />
        </div>
      )}
      <div className="relative flex flex-col gap-3 overflow-hidden rounded-[20px] shadow-md">
        <Image
          src={!isEmpty(src) && isValidImage(src) ? src : NoImagePlaceholder}
          alt={title}
          width={0}
          height={0}
          sizes="100vw"
          className={cn(
            'aspect-square h-full w-full rounded-[20px] object-cover transition-all duration-1000 ease-out hover:scale-110'
          )}
        />
        {!isEmpty(codeCountry) && isPlus && (
          <div className="absolute right-0 flex flex-col">{countryFlags}</div>
        )}
        <div className="absolute bottom-[-4%] left-1/2 inline-flex w-[95%] -translate-x-1/2 -translate-y-1/2 items-center justify-start gap-2 rounded-2xl bg-white/60 px-3 py-1.5 backdrop-blur-[5.20px]">
          <StoreIcon size={20} />
          <div className="flex flex-col gap-0.5">
            <p className="text-m-medium text-neutral-900 max-sm:text-xs max-sm:leading-4">
              {organizationName}
            </p>
            <p className="text-s-regular text-neutral-900 max-sm:text-[10px] max-sm:leading-3.5">
              {capitalizeText(location)}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-3 flex flex-col gap-1">
        {limitBookingDate <= 10 && (
          <div className="bg-primary-100 flex items-center gap-[5px] rounded-lg p-1">
            <InfoIcon size={20} className="text-primary-700 stroke-0" />
            <p className="text-s-regular text-primary-700">
              Batas booking {formattedReleasedAt}
            </p>
          </div>
        )}
        {/* Title */}
        <h3 className="text-l-regular text-neutral-900 max-sm:text-sm max-sm:leading-5">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <BuildingIcon size={16} color="text-neutral-500" />
          <div className="flex gap-1">{ratingStars}</div>
        </div>

        {/* Departure and Arrival Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon size={16} color="text-neutral-500" />
            <p className="text-s-regular text-neutral-500">
              {formattedDepartureDate} - {formattedArrivalDate}
            </p>
          </div>
          <div className="bg-primary-500 inline-flex items-center justify-center gap-2.5 rounded-[100px] p-1.5">
            <p className="text-s-regular text-center text-neutral-900">
              {tripDuration} Hari
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-row flex-wrap items-center gap-1">
          {showDiscount && (
            <span className="text-s-regular -tracking-[0.32px] text-neutral-500 line-through">
              {originalPrice}
            </span>
          )}
          <span className="text-l-semibold -tracking-[0.32px] text-neutral-900">
            {price}
          </span>
          {showDiscount && (
            <p className="text-s-regular text-error-500 font-bold -tracking-[0.32px]">
              {handleDiscountType(discountType, discount)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
})
