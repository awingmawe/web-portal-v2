'use client'

import AirportFilter from '@/components/pages/homepage/1-Banner/SearchFilter/AirportFilter'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  FLIGHT_CLASS_LABELS,
  FLIGHT_CLASSES,
  FLIGHT_ROUTE_LABELS,
  FLIGHT_ROUTES,
} from '@/constant/schema/umrah-personal-schema/constant'
import { UmrahPersonalFormType } from '@/constant/schema/umrah-personal-schema/umrah-personal'
import { STEP_2 } from '@/contexts/umrah-personal/constant'
import { cn } from '@/lib/utils'
import { ChevronRightCircle } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

interface ArrivalFlightFormProps {
  form: UseFormReturn<UmrahPersonalFormType>
  onNext: () => void
  onPrevious?: () => void
}

const ArrivalFlightForm: React.FC<ArrivalFlightFormProps> = ({
  form,
  onNext,
  onPrevious,
}) => {
  const checkStep2Validity = () => {
    const values = form.getValues(STEP_2)
    return (
      values.departure.from.airport.id > 0 &&
      values.departure.to.airport.id > 0 &&
      values.departure.airline.id > 0 &&
      values.departure.flightClass &&
      values.departure.flightRoute &&
      values.arrival.from.airport.id > 0 &&
      values.arrival.to.airport.id > 0 &&
      values.arrival.airline.id > 0 &&
      values.arrival.flightClass &&
      values.arrival.flightRoute
    )
  }

  const isStep2Valid = checkStep2Validity()

  return (
    <div className="lg:rounded-[24px] lg:border lg:border-neutral-100">
      {/* Form Content */}
      <div className="p-8 pb-6 max-lg:p-4">
        {/* Title and Description */}
        <div className="space-y-2 pb-6">
          <p className="text-l-medium text-neutral-900">Maskapai Kepulangan</p>
          <p className="text-m-regular text-neutral-500">
            Pilih maskapai penerbangan kepulangan untuk perjalanan Anda.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Airport Selection - Return */}
          <div className="grid grid-cols-2 gap-3 max-lg:grid-cols-1">
            <FormField
              control={form.control}
              name={`${STEP_2}.arrival.from.airport`}
              render={({ field }) => (
                <FormItem className="gap-1">
                  <p className="text-s-regular text-neutral-800">
                    Bandara Keberangkatan{' '}
                    <span className="text-red-500">*</span>
                  </p>
                  <FormControl>
                    <div className="rounded-full border border-neutral-200 p-3">
                      <AirportFilter
                        whatPage="umrah-form"
                        colorIcon="primary-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`${STEP_2}.arrival.to.airport`}
              render={({ field }) => (
                <FormItem className="gap-1">
                  <p className="text-s-regular text-neutral-800">
                    Bandara Kedatangan <span className="text-red-500">*</span>
                  </p>
                  <FormControl>
                    <div className="rounded-full border border-neutral-200 p-3">
                      <AirportFilter
                        whatPage="umrah-form"
                        colorIcon="primary-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Flight Class - Return */}
          <FormField
            control={form.control}
            name={`${STEP_2}.arrival.flightClass`}
            render={({ field }) => (
              <FormItem className="gap-1">
                <p className="text-s-regular text-neutral-800">
                  Kelas Maskapai Keberangkatan{' '}
                  <span className="text-red-500">*</span>
                </p>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex gap-3 max-lg:flex-col"
                  >
                    <label
                      className={cn(
                        'flex flex-1 cursor-pointer items-center gap-2 rounded-full border-1 px-4 py-2.5',
                        field.value === FLIGHT_CLASSES.ECONOMIC
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      )}
                    >
                      <RadioGroupItem value={FLIGHT_CLASSES.ECONOMIC} />
                      <p className="text-s-regular">
                        {FLIGHT_CLASS_LABELS[FLIGHT_CLASSES.ECONOMIC]}
                      </p>
                    </label>
                    <label
                      className={cn(
                        'flex flex-1 cursor-pointer items-center gap-2 rounded-full border-1 px-4 py-2.5',
                        field.value === FLIGHT_CLASSES.BUSINESS
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      )}
                    >
                      <RadioGroupItem value={FLIGHT_CLASSES.BUSINESS} />
                      <p className="text-s-regular">
                        {FLIGHT_CLASS_LABELS[FLIGHT_CLASSES.BUSINESS]}
                      </p>
                    </label>
                    <label
                      className={cn(
                        'flex flex-1 cursor-pointer items-center gap-2 rounded-full border-1 px-4 py-2.5',
                        field.value === FLIGHT_CLASSES.FIRST_CLASS
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      )}
                    >
                      <RadioGroupItem value={FLIGHT_CLASSES.FIRST_CLASS} />
                      <p className="text-s-regular">
                        {FLIGHT_CLASS_LABELS[FLIGHT_CLASSES.FIRST_CLASS]}
                      </p>
                    </label>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Flight Route - Return */}
          <FormField
            control={form.control}
            name={`${STEP_2}.arrival.flightRoute`}
            render={({ field }) => (
              <FormItem className="gap-1">
                <p className="text-s-regular text-neutral-800">
                  Rute Penerbangan <span className="text-red-500">*</span>
                </p>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex gap-3 max-lg:flex-col"
                  >
                    <label
                      className={cn(
                        'flex flex-1 cursor-pointer items-center gap-2 rounded-full border-1 px-4 py-2.5',
                        field.value === FLIGHT_ROUTES.DIRECT
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      )}
                    >
                      <RadioGroupItem value={FLIGHT_ROUTES.DIRECT} />
                      <p className="text-s-regular">
                        {FLIGHT_ROUTE_LABELS[FLIGHT_ROUTES.DIRECT]}
                      </p>
                    </label>
                    <label
                      className={cn(
                        'flex flex-1 cursor-pointer items-center gap-2 rounded-full border-1 px-4 py-2.5',
                        field.value === FLIGHT_ROUTES.TRANSIT
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      )}
                    >
                      <RadioGroupItem value={FLIGHT_ROUTES.TRANSIT} />
                      <p className="text-s-regular">
                        {FLIGHT_ROUTE_LABELS[FLIGHT_ROUTES.TRANSIT]}
                      </p>
                    </label>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Airline Selection - Return */}
          <FormField
            control={form.control}
            name={`${STEP_2}.arrival.airline`}
            render={({ field }) => (
              <FormItem className="gap-1">
                <p className="text-s-regular text-neutral-800">
                  Maskapai Penerbangan <span className="text-red-500">*</span>
                </p>
                <FormControl>
                  <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
                    {/* Air Asia */}
                    <label
                      className={cn(
                        'flex cursor-pointer flex-col items-center gap-2 rounded-lg border-1 p-4',
                        field.value?.name === 'Air Asia'
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      )}
                      onClick={() =>
                        field.onChange({
                          id: 1,
                          code: 'AK',
                          name: 'Air Asia',
                          countryName: 'Malaysia',
                        })
                      }
                    >
                      <div className="flex h-12 w-16 items-center justify-center">
                        <img
                          src="/api/placeholder/64/48"
                          alt="Air Asia"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <p className="text-center text-xs">Air Asia</p>
                    </label>

                    {/* Saudia */}
                    <label
                      className={cn(
                        'flex cursor-pointer flex-col items-center gap-2 rounded-lg border-1 p-4',
                        field.value?.name === 'Saudia'
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      )}
                      onClick={() =>
                        field.onChange({
                          id: 2,
                          code: 'SV',
                          name: 'Saudia',
                          countryName: 'Saudi Arabia',
                        })
                      }
                    >
                      <div className="flex h-12 w-16 items-center justify-center">
                        <img
                          src="/api/placeholder/64/48"
                          alt="Saudia"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <p className="text-center text-xs">Saudia</p>
                    </label>

                    {/* Garuda Indonesia */}
                    <label
                      className={cn(
                        'flex cursor-pointer flex-col items-center gap-2 rounded-lg border-1 p-4',
                        field.value?.name === 'Garuda Indonesia'
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      )}
                      onClick={() =>
                        field.onChange({
                          id: 3,
                          code: 'GA',
                          name: 'Garuda Indonesia',
                          countryName: 'Indonesia',
                        })
                      }
                    >
                      <div className="flex h-12 w-16 items-center justify-center">
                        <img
                          src="/api/placeholder/64/48"
                          alt="Garuda Indonesia"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <p className="text-center text-xs">Garuda Indonesia</p>
                    </label>

                    {/* Singapore Airlines */}
                    <label
                      className={cn(
                        'flex cursor-pointer flex-col items-center gap-2 rounded-lg border-1 p-4',
                        field.value?.name === 'Singapore Airlines'
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      )}
                      onClick={() =>
                        field.onChange({
                          id: 4,
                          code: 'SQ',
                          name: 'Singapore Airlines',
                          countryName: 'Singapore',
                        })
                      }
                    >
                      <div className="flex h-12 w-16 items-center justify-center">
                        <img
                          src="/api/placeholder/64/48"
                          alt="Singapore Airlines"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <p className="text-center text-xs">Singapore Airlines</p>
                    </label>

                    {/* Qatar */}
                    <label
                      className={cn(
                        'flex cursor-pointer flex-col items-center gap-2 rounded-lg border-1 p-4',
                        field.value?.name === 'Qatar Airways'
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      )}
                      onClick={() =>
                        field.onChange({
                          id: 5,
                          code: 'QR',
                          name: 'Qatar Airways',
                          countryName: 'Qatar',
                        })
                      }
                    >
                      <div className="flex h-12 w-16 items-center justify-center">
                        <img
                          src="/api/placeholder/64/48"
                          alt="Qatar Airways"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <p className="text-center text-xs">Qatar</p>
                    </label>

                    {/* Emirates */}
                    <label
                      className={cn(
                        'flex cursor-pointer flex-col items-center gap-2 rounded-lg border-1 p-4',
                        field.value?.name === 'Emirates'
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      )}
                      onClick={() =>
                        field.onChange({
                          id: 6,
                          code: 'EK',
                          name: 'Emirates',
                          countryName: 'UAE',
                        })
                      }
                    >
                      <div className="flex h-12 w-16 items-center justify-center">
                        <img
                          src="/api/placeholder/64/48"
                          alt="Emirates"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <p className="text-center text-xs">Emirates</p>
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div
        className={`flex items-center justify-between border-t border-neutral-100 px-8 py-3 ${isStep2Valid && 'max-lg:sticky max-lg:bottom-0 max-lg:z-99 max-lg:bg-white'} max-lg:px-4`}
      >
        <p
          className="text-s-regular cursor-pointer text-neutral-900 max-lg:hidden"
          onClick={onPrevious}
        >
          Batalkan Pembuatan Paket
        </p>
        <Button
          onClick={onNext}
          disabled={!isStep2Valid}
          className="flex items-center gap-1.5 px-8 py-4 max-lg:w-full"
          id="lanjut-step-2"
        >
          Lanjut
          <ChevronRightCircle size={14} />
        </Button>
      </div>
    </div>
  )
}

export default ArrivalFlightForm
