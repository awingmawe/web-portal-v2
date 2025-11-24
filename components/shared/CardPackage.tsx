import { BuildingIcon } from '@/components/icons/building'
import { CalendarIcon } from '@/components/icons/date'
import { InfoIcon } from '@/components/icons/info'
import { StarIconPrimary } from '@/components/icons/star'
import { StoreIcon } from '@/components/icons/store'
import BadgePromo from '@/components/shared/Badge'
import { PACKAGE_TYPE } from '@/constant/env'
import { CardData } from '@/constant/types/PackageProps'
import { Provider } from '@/constant/types/Providers'
import { useEventTracker } from '@/contexts/event-tracker/context'
import {
  capitalizeText,
  cn,
  formatDateByPackageType,
  isEmpty,
  isValidImage,
} from '@/lib/utils'
import NoImagePlaceholder from '@/public/images/no-image-placeholder.png'
import { differenceInDays, format } from 'date-fns'
import { id } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'
import { memo, useEffect, useMemo, useRef } from 'react'
interface CardPackageProps {
  data: CardData
  section?: string
  eventCategory?: string
  dataProviders?: Provider[] // khusus untuk flow pembiayaan saja
  isPembiayaan?: string | 'package' | 'change_package' | null
}

export const CardPackage = memo(function CardPackage({
  data,
  section = '',
  eventCategory = 'home',
  dataProviders,
  isPembiayaan,
}: CardPackageProps) {
  const elem = useRef<HTMLDivElement>(null)

  const { observe, pushEvent } = useEventTracker()
  const {
    src,
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
    tripDuration,
    isLastCall,
    variantType,
    waitingPeriod,
    organizationId,
    organizationInstanceId,
  } = data

  // Memoize complex calculations
  const showDiscount = useMemo(
    () => !isEmpty(discount) && Number(discount) > 0,
    [discount]
  )
  const { formattedDepartureDate, formattedArrivalDate } = useMemo(() => {
    return formatDateByPackageType({
      departureDate,
      arrivalDate: arrivalDate ?? '',
      packageType: packageType,
      variantType: variantType,
      waitingPeriod: waitingPeriod,
    })
  }, [departureDate, arrivalDate, packageType, variantType, waitingPeriod])

  const formattedReleasedAt = useMemo(() => {
    try {
      return format(releasedAt, 'dd MMM yyyy', { locale: id })
    } catch (error) {
      console.error('Error formatting releasedAt:', error)
      return ''
    }
  }, [releasedAt])

  const numberOfDays = useMemo(() => {
    try {
      if (packageType === PACKAGE_TYPE.HAJJ) {
        return tripDuration
      } else {
        return (
          arrivalDate &&
          departureDate &&
          differenceInDays(arrivalDate, departureDate) + 1
        )
      }
    } catch (error) {
      console.error('Error calculating numberOfDays:', error)
      return 0
    }
  }, [arrivalDate, departureDate, packageType, tripDuration])

  // Memoize the stars rendering
  const ratingStars = useMemo(
    () =>
      Number(rating) > 0 &&
      [...Array(Number(rating))].map((_, i) => (
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
        key={`flag-${value.country.alpha2Code}-${index}`}
        alt="flag-icon"
        src={`https://kapowaz.github.io/square-flags/flags/${value.country.alpha2Code}.svg`}
      />
    ))
  }, [codeCountry, isPlus])

  // Memoize the matched providers
  const matchedProviders = useMemo(() => {
    if (!dataProviders || !organizationInstanceId) return []

    return dataProviders.filter(
      (provider) =>
        provider.specific_travel &&
        provider.supported_organizations.includes(
          organizationInstanceId.toString()
        )
    )
  }, [dataProviders, organizationInstanceId])

  const redirect = !isEmpty(isPembiayaan)
    ? `/${packageType}/${slugOrganization}/${slugPackage}?package=${isPembiayaan}`
    : `/${packageType}/${slugOrganization}/${slugPackage}`

  useEffect(() => {
    if (elem.current) {
      observe(elem.current, () => {
        pushEvent({
          name: 'impression_package_card',
          topic: packageType,
          category: eventCategory,
          data: {
            packageId,
            packageType,
            title,
            slug: slugPackage,
            hotelRating: rating,
            tripDuration: tripDuration ? tripDuration : numberOfDays,
            travelName: organizationName,
            travelCity: location,
            travelCityId: locationId,
            travelProvinceName: province,
            travelProvinceId: provinceId,
            section,
            lastCall: isLastCall,
            price,
            organizationId,
            organizationInstanceId,
          },
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elem])

  return (
    <Link
      href={redirect}
      onClick={() => {
        pushEvent({
          name: 'click_package_card',
          topic: packageType,
          category: eventCategory,
          data: {
            packageId,
            packageType,
            title,
            slug: slugPackage,
            hotelRating: rating,
            tripDuration: tripDuration ? tripDuration : numberOfDays,
            travelName: organizationName,
            travelCity: location,
            travelCityId: locationId,
            travelProvinceName: province,
            travelProvinceId: provinceId,
            section,
            lastCall: isLastCall,
            price,
            organizationId,
            organizationInstanceId,
          },
        })
      }}
      className={`relative ${section === 'search-topbar' ? 'flex flex-row items-center gap-3' : 'flex flex-col'}`}
      id="card-package"
    >
      {/* Badge Promo */}
      {(showDiscount || variantType) && (
        <BadgePromo variantType={variantType} showDiscount={showDiscount} />
      )}

      {/* Image */}
      <div
        className={`relative flex flex-col gap-3 overflow-hidden rounded-[20px] shadow-md ${section === 'search-topbar' ? 'w-[200px]' : ''}`}
      >
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
        <div
          className={cn(
            'absolute bottom-[-4%] left-1/2 inline-flex w-[95%] -translate-x-1/2 -translate-y-1/2 items-center justify-start gap-2 rounded-2xl bg-white/60 px-3 py-1.5 backdrop-blur-[5.20px]',
            section === 'search-topbar' && 'bottom-[-15%]'
          )}
        >
          <StoreIcon size={20} />
          <div className="flex flex-col gap-0.5">
            <p className="text-m-medium break-after-all text-neutral-900 uppercase max-sm:text-xs max-sm:leading-4">
              {organizationName}
            </p>
            <p className="text-s-regular text-neutral-900 max-sm:text-[10px] max-sm:leading-3.5">
              {capitalizeText(location)}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-3 flex flex-1 flex-col gap-1" ref={elem}>
        {differenceInDays(releasedAt, new Date()) <= 10 && (
          <div className="bg-primary-100 flex items-center gap-[5px] rounded-lg p-1">
            <InfoIcon size={20} className="text-primary-700 stroke-0" />
            <p className="text-s-regular text-primary-700">
              Batas booking {formattedReleasedAt}
            </p>
          </div>
        )}

        {/* Providers */}
        {matchedProviders.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {matchedProviders.slice(0, 2).map((provider) => (
              <div
                key={provider.id}
                className="bg-primary-100 inline-flex items-center gap-1 rounded-full px-2.5 py-1"
              >
                {provider.logo && (
                  <Image
                    src={provider.logo}
                    alt={provider.name}
                    width={16}
                    height={16}
                    className="rounded"
                  />
                )}
                <span className="text-s-semibold">{provider.name}</span>
              </div>
            ))}

            {matchedProviders.length > 2 && (
              <span className="text-s-semibold bg-primary-100 inline-flex items-center rounded-full px-2.5 py-1">
                +{matchedProviders.length - 2}
              </span>
            )}
          </div>
        )}
        {/* Title */}
        <h3 className="text-l-regular line-clamp-2 break-words text-neutral-900 uppercase max-sm:text-sm max-sm:leading-5">
          {title}
        </h3>

        {/* Rating */}
        {Number(rating) > 0 && (
          <div className="flex items-center gap-2">
            <BuildingIcon size={16} color="text-neutral-500" />
            <div className="flex gap-1">{ratingStars}</div>
          </div>
        )}

        {/* Departure and Arrival Date */}
        <div className="flex flex-wrap items-center justify-between">
          {(formattedDepartureDate || formattedArrivalDate) && (
            <div className="flex items-center gap-2">
              <CalendarIcon size={16} color="text-neutral-500" />
              <p className="text-s-regular text-neutral-500">
                {formattedDepartureDate} {formattedArrivalDate}
              </p>
            </div>
          )}

          {(tripDuration !== 0 || numberOfDays !== 0) && (
            <div className="bg-primary-500 inline-flex items-center justify-center gap-2.5 rounded-[100px] p-1.5">
              <p className="text-s-regular text-center text-neutral-900">
                {tripDuration ? tripDuration : numberOfDays} Hari
              </p>
            </div>
          )}
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
        </div>
      </div>
    </Link>
  )
})
