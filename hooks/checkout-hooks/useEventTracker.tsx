import { DetailVariant, SelectedVariant } from '@/constant/types/CheckoutProps'
import { Package } from '@/constant/types/PackageProps'
import { PreBookingResponse } from '@/constant/types/PaymentCheckout'
import { getHotelRating, getTripDuration } from '@/lib/utils'

interface UseEventTrackerProps {
  pushEvent: (event: any) => void
  detailVariant: DetailVariant
  selectedVariant: SelectedVariant
  preBooking: PreBookingResponse
  totalQty: number
  referralCode: string
  sliderValue: number
}

export const useEventTrackerCheckout = ({
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
      topic: detailVariant?.package.packageType,
      category: 'checkout',
      data: {
        packageId: detailVariant?.package.id,
        departureDate: detailVariant?.departureDate,
        arrivalDate: detailVariant?.arrivalDate,
        packageType: detailVariant?.package.packageType,
        title: detailVariant?.package.title,
        slug: detailVariant?.package.slug,
        hotelRating: getHotelRating(detailVariant?.package),
        tripDuration: getTripDuration({
          packageVariant: detailVariant,
        } as unknown as Package), // because the type is not full filled, temporarily we add uknown as type
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
        quantity: totalQty,
        referralCode,
        netAmount: sliderValue,
      },
    })
  }

  return { handlePushEvent }
}
