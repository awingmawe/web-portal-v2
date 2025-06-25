'use client'

import { InfoCircleIcon } from '@/components/icons/info-circle'
import { PeopleIcon } from '@/components/icons/people'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { UmrahPersonalFormType } from '@/constant/schema/umrah-personal-schema/umrah-personal'
import { Facility } from '@/constant/types/FacilityProps'
import { STEP_1, STEP_5 } from '@/contexts/umrah-personal/constant'
import { useUmrahPersonal } from '@/contexts/umrah-personal/context'
import { cn } from '@/lib/utils'
import { ChevronRightCircle } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

interface Step5TransportationProps {
  form: UseFormReturn<UmrahPersonalFormType>
  dataEnumVehicle: Facility[]
}

const getRecommendedVehicle = (
  totalJemaah: number,
  vehicles: Facility[]
): number | null => {
  if (!totalJemaah || totalJemaah <= 0) return null

  // Extract capacity from each vehicle and create array with vehicle info
  const vehiclesWithCapacity = vehicles
    .map((vehicle) => ({
      ...vehicle,
      capacity: parseInt(vehicle.code.split('-').pop() || '0'),
    }))
    .filter((vehicle) => vehicle.capacity > 0)

  // Find vehicles that can accommodate all jemaah in single trip
  const suitableVehicles = vehiclesWithCapacity.filter(
    (vehicle) => vehicle.capacity >= totalJemaah
  )

  if (suitableVehicles.length > 0) {
    // If there are vehicles that can fit all jemaah, choose the one with smallest capacity
    // (most efficient - least wasted seats)
    const recommended = suitableVehicles.reduce((best, current) =>
      current.capacity < best.capacity ? current : best
    )
    return recommended.id
  } else {
    // If no single vehicle can fit all jemaah, find the one that requires minimum trips
    // Calculate required trips for each vehicle
    const vehicleTrips = vehiclesWithCapacity.map((vehicle) => ({
      ...vehicle,
      requiredTrips: Math.ceil(totalJemaah / vehicle.capacity),
      totalCapacity:
        Math.ceil(totalJemaah / vehicle.capacity) * vehicle.capacity,
      wastedSeats:
        Math.ceil(totalJemaah / vehicle.capacity) * vehicle.capacity -
        totalJemaah,
    }))

    // Sort by: 1) minimum trips, 2) minimum wasted seats, 3) larger capacity (more comfortable)
    const recommended = vehicleTrips.sort((a, b) => {
      if (a.requiredTrips !== b.requiredTrips) {
        return a.requiredTrips - b.requiredTrips
      }
      if (a.wastedSeats !== b.wastedSeats) {
        return a.wastedSeats - b.wastedSeats
      }
      return b.capacity - a.capacity // Prefer larger capacity if same efficiency
    })[0]

    return recommended?.id || null
  }
}

const Step5Transportation: React.FC<Step5TransportationProps> = ({
  form,
  dataEnumVehicle,
}) => {
  const { currentStep, handleNext } = useUmrahPersonal()

  const totalJemaah = form.getValues(`${STEP_1}.totalManifest`) || 0

  const recommendedVehicleId = getRecommendedVehicle(
    totalJemaah,
    dataEnumVehicle
  )
  const onNext = async () => {
    if (handleNext) {
      handleNext(form.trigger, form)
    }
  }

  return (
    <div
      className={`scrollbar-hide mx-auto w-full max-w-5xl max-xl:max-w-3xl lg:grid lg:h-[80vh] lg:place-content-center lg:overflow-y-auto`}
      id="umrah-personal-step-5"
    >
      <div className="lg:rounded-[24px] lg:border lg:border-neutral-100">
        {/* Form Content */}
        <div className="p-8 pb-6 max-lg:p-4">
          {/* Title and Description Journey Information Form */}
          <div className="space-y-2 pb-6">
            <p className="text-l-medium text-neutral-900">
              Transportasi (opsional)
            </p>
            <p className="text-m-regular text-neutral-500">
              Pilih transportasi yang ingin Anda gunakan dalam perjalanan Umorh
              Anda.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Information Jumlah Jemaah */}
            <div className="flex justify-between gap-2 rounded-full border border-neutral-200 p-2 max-lg:flex-col max-lg:rounded-xl lg:items-center">
              <div className="flex items-center gap-2">
                <PeopleIcon />
                <p className="text-m-regular">
                  Jumlah Jemaah berangkat: {totalJemaah} Jemaah
                </p>
              </div>
              <div className="bg-warning-100 flex items-center gap-2 rounded-full px-2 py-1 max-lg:items-start max-lg:rounded-xl max-lg:py-2">
                <InfoCircleIcon className="text-warning-700" size={24} />
                <p className="text-m-regular text-warning-700">
                  Jumlah kendaraan akan disesuaikan dengan jumlah jamaah dan
                  kapasistas kendaraan
                </p>
              </div>
            </div>

            {/* Vehicle Selection */}
            <FormField
              control={form.control}
              name={`${STEP_5}.transportation`}
              render={({ field }) => (
                <FormItem className="gap-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-s-regular text-neutral-800">Kendaraan</p>
                    <p
                      className="text-s-regular text-error-500 cursor-pointer"
                      onClick={() => field.onChange('')}
                    >
                      Reset
                    </p>
                  </div>
                  <FormControl>
                    <div
                      className={
                        'space-y-4 overflow-y-auto lg:h-[240px] lg:px-2 lg:pt-3'
                      }
                    >
                      <RadioGroup
                        onValueChange={(value: string) => {
                          const selectedAirline = dataEnumVehicle.find(
                            (airline) => airline.id.toString() === value
                          )
                          if (selectedAirline) {
                            field.onChange(selectedAirline.id)
                          }
                        }}
                        value={field.value?.toString()}
                        className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-lg:gap-3 max-sm:grid-cols-1"
                      >
                        {dataEnumVehicle.map((vehicle: Facility) => {
                          const isRecommended =
                            recommendedVehicleId === vehicle.id
                          return (
                            <label
                              key={vehicle.id}
                              className={cn(
                                'relative flex cursor-pointer flex-col rounded-lg border-1 px-8 py-2 transition-colors max-lg:p-2 lg:h-[120px] lg:items-center lg:justify-center lg:gap-2',
                                field.value === vehicle.id
                                  ? 'border-primary-500 bg-primary-50'
                                  : 'border-neutral-200 bg-white hover:border-neutral-300',
                                isRecommended && 'max-lg:mt-2'
                              )}
                            >
                              {isRecommended && (
                                <div className="bg-primary-500 text-s-regular absolute -top-3 left-1/2 -translate-x-1/2 transform rounded-full px-2 py-1 whitespace-nowrap text-neutral-900">
                                  Direkomendasikan
                                </div>
                              )}
                              <div className="absolute top-2 left-2 max-lg:top-3">
                                <RadioGroupItem
                                  value={vehicle.id.toString()}
                                  className="h-4 w-4"
                                />
                              </div>

                              <p className="text-l-medium max-lg:pl-7 lg:text-center">
                                {vehicle.name}
                              </p>
                              <p className="text-m-regular text-neutral-500 max-lg:pl-7 lg:text-center">
                                Kapasitas Maksimal{' '}
                                {vehicle?.code.split('-').pop()} Orang
                              </p>
                            </label>
                          )
                        })}
                      </RadioGroup>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* Action Buttons */}
        <div
          className={`flex items-center justify-between border-t border-neutral-100 px-8 py-3 ${currentStep === 5 && 'max-lg:sticky max-lg:bottom-0 max-lg:z-50 max-lg:bg-white'} max-lg:px-4`}
        >
          <p className="text-s-regular cursor-pointer text-neutral-900 max-lg:hidden">
            Batalkan Pembuatan Paket
          </p>
          <Button
            type="button"
            onClick={onNext}
            className="flex items-center gap-1.5 px-8 py-4 max-lg:w-full"
            id="lanjut-step-1"
          >
            Lanjut
            <ChevronRightCircle size={14} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Step5Transportation
