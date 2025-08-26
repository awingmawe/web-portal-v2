import { getHotelRating, getTripDuration } from '@/lib/utils'
import { DetailVariant, SelectedVariant } from '@/constant/types/CheckoutProps'
import { PreBookingResponse } from '@/constant/types/PaymentCheckout'

interface UseEventTrackerProps {
  pushEvent: (event: any) => void
  detailVariant: DetailVariant
  selectedVariant: SelectedVariant
  preBooking: PreBookingResponse
  totalQty: number
  referralCode: string
  sliderValue: number
}

export const useEventTracker = ({
  pushEvent,
  detailVariant,
  selectedVariant,
  preBooking,
  totalQty,
  referralCode,
  sliderValue,
}: UseEventTrackerProps) => {
  const handlePushEvent = (eventName: string): void => {
    pushEvent({
      name: eventName,
      topic: 'umrah',
      category: 'checkout',
      data: {
        packageId: detailVariant?.package.id,
        packageType: detailVariant?.package.packageType,
        title: detailVariant?.package.title,
        slug: detailVariant?.package.slug,
        hotelRating: getHotelRating(detailVariant?.package),
        tripDuration: getTripDuration(detailVariant.package),
        travelName: detailVariant?.package.organizationInstance.name,
        travelCity: detailVariant?.package.organizationInstance.city.name,
        travelCityId: detailVariant?.package.organizationInstance.cityId,
        travelProvinceName:
          detailVariant?.package.organizationInstance?.province?.name,
        travelProvinceId:
          detailVariant?.package.organizationInstance?.provinceId,
        lastCall: selectedVariant?.isLastCall,
        price: preBooking?.subtotalPrice,
        organizationId: detailVariant?.package?.organizationId,
        organizationInstanceId: detailVariant?.package?.organizationInstanceId,
        roomType: selectedVariant?.roomType,
        variantId: selectedVariant?.id,
        variantName: selectedVariant?.name,
        departureDate: selectedVariant?.departureDate,
        quantity: totalQty,
        referralCode,
        netAmount: sliderValue,
      },
    })
  }

  return { handlePushEvent }
}
