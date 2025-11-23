import { GenericResponseV2 } from '@/constant/types/GeneralProps'
import {
  CardData,
  Package,
  PackageVariant,
} from '@/constant/types/PackageProps'
import { SelectedPackage } from '@/constant/types/Pembiayaan'
import {
  formatCurrency,
  formatDateToDDMMYYYY,
  getHotelRating,
} from '@/lib/utils'
import Placeholder from '@/public/images/no-image-placeholder.png'

export function mapProductsToCardData(
  products: GenericResponseV2<Package>
): CardData[] {
  return (
    products?.responseObject?.map((product: Package) => ({
      id: product?.id ?? 0,
      src: product.thumbnail || '',
      discount: product.packageVariant?.discountAmount ?? '0',
      discountType: product.packageVariant?.discountType,
      title: product.title || 'No Title',
      location: product.organizationInstance?.city?.name || 'Unknown',
      locationId: product.organizationInstance.cityId,
      district: product.organizationInstance?.city?.name || 'Unknown',
      province: product.organizationInstance?.province.name || 'Unknown',
      provinceId: product.organizationInstance?.provinceId,
      organizationName: product.organizationInstance?.name || 'Unknown',
      variant: product.packageVariant || [],
      originalPrice: product.packageVariant
        ? formatCurrency(product.originalPrice, product.currency || 'IDR')
        : formatCurrency(0, product.currency || 'IDR'),
      price: product.packageVariant
        ? formatCurrency(product.price, product.currency || 'IDR')
        : formatCurrency(0, product.currency || 'IDR'),
      rating: getHotelRating(product),
      slugOrganization: product.organizationInstance?.slug || '',
      slugPackage: product.slug || '',
      isLastCall: product.packageVariant?.isLastCall,
      isPlus: product.isPlus,
      codeCountry: product?.additionalCountry ?? undefined,
      departureDate: product?.packageVariant?.departureDate,
      arrivalDate: product?.packageVariant?.arrivalDate,
      releasedAt: product?.packageVariant?.releasedAt,
      packageType: product?.packageType || 'umrah',
      meccaHotel: product?.meccaHotel,
      medinaHotel: product?.medinaHotel,
      departure: product?.departure,
      arrival: product?.arrival,
      currency: product?.currency,
      variantType: product?.variantType,
      tripDuration: product?.packageVariant?.tripDuration,
      waitingPeriod: product?.packageVariant?.waitingPeriod || null,
      organizationId: product?.organizationId,
      organizationInstanceId: product?.organizationInstanceId,
    })) || []
  )
}

export function mapSelectedPackagePembiayaan(
  data: PackageVariant
): SelectedPackage {
  const meccaRating = data?.package?.meccaHotel?.rating || 0
  const medinaRating = data?.package?.medinaHotel?.rating || 0
  const hotelRating = Math.max(meccaRating, medinaRating)

  return {
    // Organization Info
    organizationId: data?.package?.organizationInstanceId || 0,
    organizationName: data?.package?.organizationInstanceName || '-',
    organizationCity: data?.package?.organizationInstance?.city?.name || '-',
    organizationCityId: data?.package?.organizationInstance?.cityId,
    organizationProvince:
      data?.package?.organizationInstance?.province?.name || '-',
    organizationProvinceId: data?.package?.organizationInstance?.provinceId,
    organizationLocation:
      data?.package?.organizationInstance?.city &&
      data?.package?.organizationInstance?.province
        ? `${data.package.organizationInstance.city.name}, ${data.package.organizationInstance.province.name}`
        : '-',
    organizationThumbnail:
      data?.package?.organizationInstance?.thumbnail ||
      '/images/logo-koper.svg',

    // Package Info
    packageId: data?.package?.id || 0,
    packageVariantId: data?.id || 0,
    packageName: data?.package?.title || '-',
    packageSlug: data?.package?.slug,
    packageThumbnail: data?.package?.thumbnail || Placeholder.src,
    isLastCall: data?.isLastCall,
    tripDuration: data?.tripDuration,
    section: data?.package?.tag,

    // Schedule Info
    departureDate: formatDateToDDMMYYYY(new Date(data?.departureDate)),
    arrivalDate: formatDateToDDMMYYYY(new Date(data?.arrivalDate)),

    // Departure Airport Info
    departureAirportName: data?.package?.departure?.from?.airport?.name || '-',
    destinationAirportName: data?.package?.departure?.to?.airport?.name || '-',
    departureAirpotCode: data?.package?.departure?.from?.airport?.code || '-',
    departureDestinationAirportCode:
      data?.package?.departure?.to?.airport?.code || '-',

    // Arrival Airport Info
    arrivalOriginAirportName:
      data?.package?.arrival?.from?.airport?.name || '-',
    arrivalDestinationAirportName:
      data?.package?.arrival?.to?.airport?.name || '-',
    arrivalOriginAirportCode:
      data?.package?.arrival?.from?.airport?.code || '-',
    arrivalDestinationAirportCode:
      data?.package?.arrival?.to?.airport?.code || '-',

    // Airline Info
    departureAirlineName: data?.package?.departure?.airline?.name || '-',
    departureAirlineThumbnail:
      data?.package?.departure?.airline?.logo || Placeholder.src,
    arrivalAirlineName: data?.package?.arrival?.airline?.name || '-',
    arrivalAirlineThumbnail:
      data?.package?.arrival?.airline?.logo || Placeholder.src,

    // Hotel Info - Mecca
    meccaHotelName: data?.package?.meccaHotel?.name || '-',
    meccaHotelCity: data?.package?.meccaHotel?.cityName || '-',
    meccaHotelLocation:
      data?.package?.meccaHotel?.name && data?.package?.meccaHotel?.cityName
        ? `${data.package.meccaHotel.name}, ${data.package.meccaHotel.cityName}`
        : '-',
    meccaHotelRating: data?.package?.meccaHotel?.rating,

    // Hotel Info - Medina
    medinaHotelName: data?.package?.medinaHotel?.name || '-',
    medinaHotelCity: data?.package?.medinaHotel?.cityName || '-',
    medinaHotelLocation:
      data?.package?.medinaHotel?.name && data?.package?.medinaHotel?.cityName
        ? `${data.package.medinaHotel.name}, ${data.package.medinaHotel.cityName}`
        : '-',
    medinaHotelRating: data?.package?.medinaHotel?.rating,

    // Hotel Rating (highest between Mecca and Medina)
    hotelRating: hotelRating,
  }
}
