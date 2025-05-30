import { GenericResponse } from '@/constant/types/GeneralProps'
import { CardData, Package } from '@/constant/types/PackageProps'
import { clsx, type ClassValue } from 'clsx'
import { differenceInDays, format } from 'date-fns'
import { id } from 'date-fns/locale'
import { DateRange } from 'react-day-picker'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add this utility function at the top or in a separate utils file
export const formatDateToYYYYMMDD = (date: Date): any => {
  return format(date, 'yyyy-MM-dd') // This converts to YYYY-MM-DD format
}

export const formatDateToDDMMYYYY = (date: Date): any => {
  return format(date, 'dd MMMM yyyy', { locale: id }) // This converts to YYYY-MM-DD format
}

export const formatReadTime = (time: number) => {
  const hours = Math.floor(time / 60)
  const minutes = time % 60

  if (hours > 0 && minutes > 0) {
    return `${hours} jam ${minutes} menit membaca`
  } else if (hours > 0) {
    return `${hours} jam membaca`
  } else {
    return `${minutes} menit membaca`
  }
}

export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' && value.trim() === '') return true
  if (Array.isArray(value) && value.length === 0) return true
  if (typeof value === 'object' && Object.keys(value as object).length === 0)
    return true
  return false
}

/**
 * Converts a string to proper capitalization (first letter of each word capitalized)
 * @param text - The text to capitalize
 * @returns The capitalized text
 */
export function capitalizeText(text: string): string {
  if (!text) return ''

  // Split the text by spaces and capitalize the first letter of each word
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function formatCurrency(value?: string | number): string {
  if (!value) return '-'
  let numericValue: number

  if (typeof value === 'number') {
    numericValue = value
  } else {
    numericValue = parseFloat(value?.replace(/[^0-9.-]+/g, '')) // Parse numeric part from string
  }

  if (isNaN(numericValue)) {
    return 'Rp.0' // Return a default value if parsing fails
  }

  const result = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
    .format(numericValue * (numericValue < 0 ? -1 : 1))
    .replace(/\s/g, '')

  return numericValue < 0 ? `-${result}` : result
}

export const formatNumberCurrency = (value: string) => {
  const numericValue = parseInt(value.replace(/\D/g, ''), 10)
  return isNaN(numericValue)
    ? ''
    : new Intl.NumberFormat('id-ID', {
        style: 'decimal',
        maximumFractionDigits: 0,
      }).format(numericValue)
}

export const getMinimumNonZeroPrice = (
  ...prices: (string | number | undefined)[]
): number => {
  return Math.min(...prices.map(Number).filter((price) => price > 0)) || 0
}

export const getMaximumNonZeroPrice = (
  ...prices: (string | number | undefined)[]
): number => {
  return Math.max(...prices.map(Number).filter((price) => price > 0)) || 0
}

export const formatPhoneNumber = (phone: string): string => {
  if (phone.startsWith('0')) {
    return '+62' + phone.slice(1)
  }
  return phone
}

export function formatJoinedDate(dateString: string) {
  // Parse the given date
  const joinedDate = new Date(dateString)
  const currentDate = new Date()

  // Calculate difference in milliseconds
  const diffTime = currentDate.getTime() - joinedDate.getTime()

  // Convert to days, months, years
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)

  // Format the message
  if (diffYears > 0) {
    return `Telah bergabung dari ${diffYears} Tahun yang lalu`
  } else if (diffMonths > 0) {
    return `Telah bergabung dari ${diffMonths} Bulan yang lalu`
  } else if (diffDays > 0) {
    return `Telah bergabung dari ${diffDays} Hari yang lalu`
  } else {
    return 'Telah bergabung hari ini'
  }
}

export function formatCreatedDate(dateString: Date) {
  // Parse the given date
  const createdDate = new Date(dateString)
  const currentDate = new Date()

  // Calculate difference in milliseconds
  const diffTime = currentDate.getTime() - createdDate.getTime()

  // Convert to seconds, minutes, hours, days, months, years
  const diffSeconds = Math.floor(diffTime / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)

  // Format the message
  if (diffYears > 0) {
    return `${diffYears} tahun lalu`
  } else if (diffMonths > 0) {
    return `${diffMonths} bulan lalu`
  } else if (diffDays > 0) {
    return `${diffDays} hari lalu`
  } else if (diffHours > 0) {
    return `${diffHours} jam lalu`
  } else if (diffMinutes > 0) {
    return `${diffMinutes} menit lalu`
  } else {
    return `${diffSeconds < 0 ? 0 : diffSeconds} detik lalu`
  }
}

export const handleDiscountType = (
  discountType: string,
  discount: string | number
) => {
  if (discountType === 'percentage') {
    return `${discount || 0}%`
  }
  return `${formatCurrency(discount || 0)}`
}

export const isValidImage = (fileName: any) => {
  const allowedFormats = ['jpg', 'jpeg', 'png', 'gif']
  const extension = fileName?.split('.').pop().toLowerCase()

  return allowedFormats.includes(extension)
}

export function mapProductsToCardData(
  products: GenericResponse<Package>
): CardData[] {
  return (
    products?.results?.map((product: Package) => ({
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
        ? formatCurrency(product.originalPrice)
        : 'Rp0',
      price: product.packageVariant ? formatCurrency(product.price) : 'Rp0',
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
    })) || []
  )
}

export const ellipsis = (str: string, maxLength: number) => {
  return str.length > maxLength
    ? String(str)
        .slice(0, maxLength - 3)
        .padEnd(maxLength, '...')
    : str
}

export const SimpleInterpolation = (
  from: number,
  to: number,
  value: number
): number => {
  return from * (1 - value) + to * value
}

/**
 * Formats a date to DD Month YYYY format in Indonesian
 */
export function formatDateToRangeString(date: Date): string {
  if (!date) return ''

  try {
    // Indonesian month names
    const monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ]

    const day = date.getDate()
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()

    return `${String(day).padStart(2, '0')} ${month} ${year}`
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}

/**
 * Formats a date to day and month only (DD MMM)
 */
export function formatToShortDate(date: Date): string {
  if (!date) return ''

  try {
    // Short month names
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Ags',
      'Sep',
      'Okt',
      'Nov',
      'Des',
    ]

    const day = date.getDate()
    const month = monthNames[date.getMonth()]

    return `${String(day).padStart(2, '0')} ${month}`
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}

export const formatDistance = (meters: any) => {
  if (!meters || isNaN(meters)) return '0 m'

  // Convert to absolute value for calculation
  const absoluteMeters = Math.abs(meters)

  if (absoluteMeters < 1000) {
    // Less than 1 km, show in meters
    return `${meters}m`
  } else {
    // Convert to kilometers with 2 decimal places
    const kilometers = (meters / 1000).toFixed(2)
    // Remove trailing zeros after decimal point
    const formattedKm = kilometers.replace(/\.?0+$/, '')
    return `${formattedKm}km`
  }
}

export function formatCurrencyIndonesia(
  value: number | string,
  decimalPlaces = 1
): string {
  if (value === null || value === undefined || value === '') {
    return '0'
  }

  const numValue =
    typeof value === 'string'
      ? parseFloat(value.replace(/[^\d.-]/g, ''))
      : value

  if (isNaN(numValue)) {
    return '0'
  }

  const absValue = Math.abs(numValue)

  let formattedValue: string
  let suffix: string

  if (absValue >= 1_000_000_000) {
    formattedValue = (Math.floor((numValue / 1_000_000_000) * 10) / 10).toFixed(
      decimalPlaces
    )
    suffix = 'M'
  } else if (absValue >= 1_000_000) {
    formattedValue = (Math.floor((numValue / 1_000_000) * 10) / 10).toFixed(
      decimalPlaces
    )
    suffix = 'jt'
  } else if (absValue >= 1_000) {
    formattedValue = (Math.floor((numValue / 1_000) * 10) / 10).toFixed(
      decimalPlaces
    )
    suffix = 'rb'
  } else {
    formattedValue = numValue.toFixed(decimalPlaces)
    suffix = ''
  }

  // Clean up `.0`
  formattedValue = formattedValue.replace(/\.0+$/, '')

  return `${formattedValue}${suffix}`
}

export const formatDateRangeShort = (dateRange: DateRange): string => {
  if (!dateRange.from) return ''

  if (dateRange.to) {
    // Same year - only show year once
    if (dateRange.from.getFullYear() === dateRange.to.getFullYear()) {
      // Same month - only show month once
      if (dateRange.from.getMonth() === dateRange.to.getMonth()) {
        return `${format(dateRange.from, 'd', { locale: id })}-${format(dateRange.to, 'd LLL y', { locale: id })}`
      }
      return `${format(dateRange.from, 'd LLL', { locale: id })} - ${format(dateRange.to, 'd LLL y', { locale: id })}`
    }
  }

  return format(dateRange.from, 'd LLL y', { locale: id })
}

export const getHotelRating = (product: Package) => {
  return product.meccaHotel || product.medinaHotel
    ? getMaximumNonZeroPrice(
        Number(product.meccaHotel?.rating),
        Number(product.medinaHotel?.rating)
      )
    : 'Belum ada rating'
}

export const getTripDuration = (product: Package) => {
  return (
    differenceInDays(
      product.packageVariant.arrivalDate,
      product.packageVariant.departureDate
    ) + 1
  )
}

export function isMobileUserAgent(userAgent: string): boolean {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    userAgent
  )
}

export const starOptions = [5, 4, 3, 2, 1]
