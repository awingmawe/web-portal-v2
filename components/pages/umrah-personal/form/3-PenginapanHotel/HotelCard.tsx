import { MosqueIcon } from '@/components/icons/mosque'
import HotelImageCarousel from '@/components/pages/umrah-personal/form/3-PenginapanHotel/ImageHotelCarousel'
import { Button } from '@/components/ui/button'
import { UmrahPersonalFormType } from '@/constant/schema/umrah-personal-schema/umrah-personal'
import { Hotel, HotelDestination } from '@/constant/types/HotelProps'
import { STEP_3, STEP_4 } from '@/contexts/umrah-personal/constant'
import { useUmrahPersonal } from '@/contexts/umrah-personal/context'
import { formatDistance, isEmpty } from '@/lib/utils'
import { useMemo } from 'react'
import { UseFormReturn } from 'react-hook-form'

export const HotelCard = ({
  hotel,
  onSelect,
  form,
}: {
  hotel: Hotel
  onSelect: () => void
  form: UseFormReturn<UmrahPersonalFormType>
}) => {
  const { currentStep } = useUmrahPersonal()
  const { name, hotelDestination, hotelGallery } = hotel || {}

  const priorityDestinations = useMemo(
    () => hotelDestination?.filter((x: any) => x.priority === true) || [],
    [hotelDestination]
  )

  const nonPriorityDestinations = useMemo(
    () => hotelDestination?.filter((x: any) => x.priority === false) || [],
    [hotelDestination]
  )
  const checkIsDataExist = useMemo(() => {
    if (currentStep === 3) {
      return form.watch(`${STEP_3}.hotelMecca`)
    } else if (currentStep === 4) {
      return form.watch(`${STEP_4}.hotelMedina`)
    }
  }, [form, currentStep])

  return (
    <div
      className={`flex justify-between gap-2.5 rounded-lg border ${checkIsDataExist === hotel?.id ? 'border-primary-500' : 'border-neutral-200'} p-4 max-lg:flex-col`}
    >
      {/* Hotel Image Carousel */}
      <HotelImageCarousel images={hotelGallery || []} />

      <div className="flex w-full flex-col justify-between">
        <div className="flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between max-lg:flex-col max-lg:items-start max-lg:gap-1">
            <h3 className="text-l-semibold">{name}</h3>
            {/* Distance information */}
            {priorityDestinations.length > 0 && (
              <div className="flex items-center gap-[9px]">
                <MosqueIcon size={20} />
                <p className="text-m-regular text-neutral-500">
                  {hotel && !isEmpty(hotelDestination)
                    ? `${formatDistance(priorityDestinations[0]?.distance)}
                          ke
                          ${priorityDestinations[0]?.destinationName}`
                    : ''}
                </p>
              </div>
            )}
          </div>
          <div className="h-px w-full bg-neutral-200" />
          <div className="flex flex-col gap-2">
            {nonPriorityDestinations && nonPriorityDestinations.length > 0 && (
              <p className="text-m-regular">Area Wisata Terdekat:</p>
            )}
            <div className="grid grid-cols-2 gap-x-3 gap-y-3 max-lg:gap-y-2">
              {nonPriorityDestinations.map(
                (dest: HotelDestination, index: number) => (
                  <div
                    className="col-span-1 flex items-center justify-between max-lg:col-span-12"
                    key={`${index}-${dest.destinationName}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-1 flex-shrink-0 rounded-full bg-neutral-900"></div>
                      <p className="text-m-regular text-neutral-900">
                        {dest.destinationName}
                      </p>
                    </div>
                    <p className="text-m-regular text-neutral-500">
                      {formatDistance(dest.distance)}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end max-lg:mt-2.5">
          <Button
            type="button"
            onClick={onSelect}
            className="rounded-full px-10 py-3 max-lg:w-full"
          >
            Pilih Hotel
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HotelCard
