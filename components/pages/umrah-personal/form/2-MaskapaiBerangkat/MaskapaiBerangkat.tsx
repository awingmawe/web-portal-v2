'use client'

import AirlineSelection from '@/components/pages/umrah-personal/form/2-MaskapaiBerangkat/FieldAirline'
import { FieldAirport } from '@/components/pages/umrah-personal/form/2-MaskapaiBerangkat/FieldAirport'
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
import { UseFormReturn } from 'react-hook-form'

interface DepartureFlightFormProps {
  form: UseFormReturn<UmrahPersonalFormType>
}

const DepartureFlightForm: React.FC<DepartureFlightFormProps> = ({ form }) => {
  return (
    <div className="mb-6 lg:rounded-[24px] lg:border lg:border-neutral-100">
      {/* Form Content */}
      <div className="p-8 pb-6 max-lg:p-4">
        {/* Title and Description */}
        <div className="space-y-2 pb-6">
          <p className="text-l-medium text-neutral-900">Detail Keberangkatan</p>
          <p className="text-m-regular text-neutral-500">
            Silakan pilih lokasi keberangkatan dan kedatangan serta maskapai
            yang ingin digunakan.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Airport Selection - Departure */}
          <div className="grid grid-cols-2 gap-3 max-lg:grid-cols-1">
            <FormField
              control={form.control}
              name={`${STEP_2}.departure.from.airport`}
              render={({ field }) => (
                <FormItem
                  className="gap-1"
                  id={`${STEP_2}.departure.from.airport`}
                >
                  <p className="text-s-regular text-neutral-800">
                    Bandara Keberangkatan{' '}
                    <span className="text-red-500">*</span>
                  </p>
                  <FormControl>
                    <FieldAirport
                      placeholder="Pilih bandara keberangkatan"
                      field={field}
                    />
                  </FormControl>
                  <div className="lg:min-h-4">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`${STEP_2}.departure.to.airport`}
              render={({ field }) => (
                <FormItem
                  className="gap-1"
                  id={`${STEP_2}.departure.to.airport`}
                >
                  <p className="text-s-regular text-neutral-800">
                    Bandara Kedatangan <span className="text-red-500">*</span>
                  </p>
                  <FormControl>
                    <FieldAirport
                      placeholder="Pilih bandara kedatangan"
                      field={field}
                    />
                  </FormControl>
                  <div className="lg:min-h-4">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Flight Class */}
          <FormField
            control={form.control}
            name={`${STEP_2}.departure.flightClass`}
            render={({ field }) => (
              <FormItem
                className={`gap-1 ${form.formState.errors.flightInformation?.departure?.from?.airport ? 'mt-0' : '-mt-4 max-lg:mt-0'}`}
                id={`${STEP_2}.departure.flightClass`}
              >
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

          {/* Flight Route */}
          <FormField
            control={form.control}
            name={`${STEP_2}.departure.flightRoute`}
            render={({ field }) => (
              <FormItem
                className="gap-1"
                id={`${STEP_2}.departure.flightRoute`}
              >
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

          {/* Airline Selection */}
          <FormField
            control={form.control}
            name={`${STEP_2}.departure.airline`}
            render={({ field }) => (
              <FormItem className="gap-1.5" id={`${STEP_2}.departure.airline`}>
                <p className="text-s-regular text-neutral-800">
                  Maskapai Penerbangan <span className="text-red-500">*</span>
                </p>
                {form.formState.errors.flightInformation?.departure
                  ?.airline && (
                  <div className="bg-error-100 rounded-md px-3 py-1.5">
                    <FormMessage />
                  </div>
                )}
                <FormControl>
                  <AirlineSelection field={field} showSearch={false} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default DepartureFlightForm
