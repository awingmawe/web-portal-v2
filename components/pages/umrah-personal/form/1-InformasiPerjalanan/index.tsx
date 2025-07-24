'use client'

import { Calendar3 } from '@/components/icons/calendar'
import LayoutDrawerPopup from '@/components/pages/umrah-personal/form/LayoutDrawerPopover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  ACTIVITY_TYPE_LABELS,
  ACTIVITY_TYPES,
  JOURNEY_TYPE_LABELS,
  JOURNEY_TYPES,
} from '@/constant/schema/umrah-personal-schema/constant'
import { UmrahPersonalFormType } from '@/constant/schema/umrah-personal-schema/umrah-personal'
import { STEP_1, STEP_4, TOTAL_STEPS } from '@/contexts/umrah-personal/constant'
import { useUmrahPersonal } from '@/contexts/umrah-personal/context'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { ChevronRightCircle } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

interface Step1JourneyInfoProps {
  form: UseFormReturn<UmrahPersonalFormType>
}

const Step1JourneyInfo: React.FC<Step1JourneyInfoProps> = ({ form }) => {
  const { currentStep, handleNext, setTotalSteps, setOpenDialogDrawerEndForm } =
    useUmrahPersonal()
  const checkStep1Validity = () => {
    const values = form.getValues(STEP_1)
    return (
      values.journeyType &&
      values.activity &&
      values.createVisa !== undefined &&
      values.useInsurance !== undefined &&
      values.departureDate &&
      values.arrivalDate &&
      values.totalManifest > 0
    )
  }

  const isStep1Valid = checkStep1Validity()

  const onNext = async () => {
    if (handleNext) {
      handleNext(form.trigger, form)
    }
  }

  return (
    <div
      className={`scrollbar-hide mx-auto w-full max-w-5xl max-xl:max-w-3xl`}
      id="umrah-personal-step-1"
    >
      <div className="lg:rounded-[24px] lg:border lg:border-neutral-100">
        {/* Form Content */}
        <div className="p-8 pb-6 max-lg:p-4">
          {/* Title and Description Journey Information Form */}
          <div className="space-y-2 pb-6">
            <p className="text-l-medium text-neutral-900">
              Informasi Perjalanan
            </p>
            <p className="text-m-regular text-neutral-500">
              Lengkapi data informasi perjalanan berikut sesuai dengan rencana
              Umrah yang Anda inginkan
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Journey Type */}
            <FormField
              control={form.control}
              name={`${STEP_1}.journeyType`}
              render={({ field }) => (
                <FormItem className="gap-1" id={`${STEP_1}.journeyType`}>
                  <p className="text-s-regular text-neutral-800">
                    Jenis Perjalanan <span className="text-red-500">*</span>
                  </p>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex gap-3 max-lg:flex-col"
                    >
                      <label
                        className={cn(
                          'flex flex-1 cursor-pointer items-center gap-2 rounded-full border-1 px-2 py-2.5',
                          field.value === JOURNEY_TYPES.UMRAH_REGULAR
                            ? 'border-primary-500'
                            : 'border-neutral-200 bg-white hover:border-neutral-300'
                        )}
                        onClick={() =>
                          field.onChange(JOURNEY_TYPES.UMRAH_REGULAR)
                        }
                      >
                        <RadioGroupItem value={JOURNEY_TYPES.UMRAH_REGULAR} />
                        <p className="text-s-regular">
                          {JOURNEY_TYPE_LABELS[JOURNEY_TYPES.UMRAH_REGULAR]}
                        </p>
                      </label>
                      <label
                        className={cn(
                          'relative flex flex-1 cursor-not-allowed items-center gap-2 rounded-full border-1 px-2 py-2.5 max-lg:mt-3',
                          field.value === JOURNEY_TYPES.UMRAH_PLUS_TRIP
                            ? 'border-primary-500'
                            : 'border-[#D2D2D150] bg-white'
                        )}
                      >
                        <p className="bg-error-500 text-xs-regular absolute -top-4.5 left-5 flex w-[88px] justify-center rounded-tl-lg rounded-tr-lg px-1 py-[2px] text-white shadow-[inset_0px_-3px_4px_0px_rgba(0,0,0,0.25)]">
                          Segera Hadir!
                        </p>
                        <RadioGroupItem
                          value={JOURNEY_TYPES.UMRAH_PLUS_TRIP}
                          disabled={true}
                        />
                        <p className="text-s-regular text-[#30302F50]">
                          {JOURNEY_TYPE_LABELS[JOURNEY_TYPES.UMRAH_PLUS_TRIP]}
                        </p>
                      </label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Activity */}
            <FormField
              control={form.control}
              name={`${STEP_1}.activity`}
              render={({ field }) => (
                <FormItem className="gap-1" id={`${STEP_1}.activity`}>
                  <p className="text-s-regular text-neutral-800">
                    Kegiatan Umrah <span className="text-red-500">*</span>
                  </p>
                  <FormControl>
                    <RadioGroup
                      className="flex gap-3 max-lg:flex-col"
                      onValueChange={(value) => {
                        field.onChange(value)
                        if (value === ACTIVITY_TYPES.MECCA) {
                          setTotalSteps(TOTAL_STEPS)
                          form.setValue(`${STEP_4}.hotelMedina`, {
                            id: 0,
                            name: '',
                            hotelDestination: [],
                            hotelGallery: [],
                          })
                        } else if (value === ACTIVITY_TYPES.MECCA_MEDINA) {
                          setTotalSteps(6)
                        }
                      }}
                      value={field.value}
                    >
                      {/* Use labels instead of FormItems for better radio group behavior */}
                      <label
                        className={cn(
                          'flex flex-1 cursor-pointer items-center gap-2 rounded-full border-1 px-2 py-2.5',
                          field.value === ACTIVITY_TYPES.MECCA
                            ? 'border-primary-500'
                            : 'border-neutral-200 bg-white hover:border-neutral-300'
                        )}
                      >
                        <RadioGroupItem value={ACTIVITY_TYPES.MECCA} />
                        <p className="text-s-regular">
                          {ACTIVITY_TYPE_LABELS[ACTIVITY_TYPES.MECCA]}
                        </p>
                      </label>
                      <label
                        className={cn(
                          'flex flex-1 cursor-pointer items-center gap-2 rounded-full border-1 px-2 py-2.5',
                          field.value === ACTIVITY_TYPES.MECCA_MEDINA
                            ? 'border-primary-500'
                            : 'border-neutral-200 bg-white hover:border-neutral-300'
                        )}
                      >
                        <RadioGroupItem value={ACTIVITY_TYPES.MECCA_MEDINA} />
                        <p className="text-s-regular">
                          {ACTIVITY_TYPE_LABELS[ACTIVITY_TYPES.MECCA_MEDINA]}
                        </p>
                      </label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Visa */}
            <FormField
              control={form.control}
              name={`${STEP_1}.createVisa`}
              render={({ field }) => (
                <FormItem className="gap-1" id={`${STEP_1}.createVisa`}>
                  <p className="text-s-regular text-neutral-800">
                    Visa <span className="text-red-500">*</span>
                  </p>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === 'true')
                      }
                      value={field.value ? 'true' : 'false'}
                      className="flex gap-3 max-lg:flex-col"
                    >
                      <label
                        className={cn(
                          'flex flex-1 cursor-pointer items-center gap-2 rounded-full border-1 px-2 py-2.5',
                          field.value
                            ? 'border-primary-500'
                            : 'border-neutral-200 bg-white hover:border-neutral-300'
                        )}
                      >
                        <RadioGroupItem value="true" />
                        <p className="text-s-regular">Perlu Pembuatan Visa</p>
                      </label>
                      <label
                        className={cn(
                          'flex flex-1 cursor-not-allowed items-center gap-2 rounded-full border-1 px-2 py-2.5 ',
                          !field.value
                            ? 'border-primary-500'
                            : 'border-[#D2D2D150] bg-white'
                        )}
                      >
                        <RadioGroupItem value="false" disabled={true} />
                        <p className="text-s-regular text-[#30302F50]">
                          Tidak Perlu Visa
                        </p>
                      </label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Insurance */}
            <FormField
              control={form.control}
              name={`${STEP_1}.useInsurance`}
              render={({ field }) => (
                <FormItem className="gap-1" id={`${STEP_1}.useInsurance`}>
                  <p className="text-s-regular text-neutral-800">
                    Asuransi Perjalanan <span className="text-red-500">*</span>
                  </p>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === 'true')
                      }
                      value={field.value ? 'true' : 'false'}
                      className="flex gap-3 max-lg:flex-col"
                    >
                      <label
                        className={cn(
                          'flex flex-1 cursor-pointer items-center gap-2 rounded-full border-1 px-2 py-2.5',
                          field.value
                            ? 'border-primary-500'
                            : 'border-neutral-200 bg-white hover:border-neutral-300'
                        )}
                      >
                        <RadioGroupItem value="true" />
                        <p className="text-s-regular">
                          Gunakan proteksi asuransi perjalanan
                        </p>
                      </label>
                      <label
                        className={cn(
                          'flex flex-1 cursor-pointer items-center gap-2 rounded-full border-1 px-2 py-2.5',
                          !field.value
                            ? 'border-primary-500'
                            : 'border-neutral-200 bg-white hover:border-neutral-300'
                        )}
                      >
                        <RadioGroupItem value="false" />
                        <p className="text-s-regular">
                          Tidak perlu menggunakan proteksi asuransi perjalanan
                        </p>
                      </label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name={`${STEP_1}.departureDate`}
                render={({ field }) => (
                  <FormItem
                    className="gap-1 max-lg:col-span-2"
                    id={`${STEP_1}.departureDate`}
                  >
                    <p className="text-s-regular text-neutral-800">
                      Tanggal Keberangkatan{' '}
                      <span className="text-red-500">*</span>
                    </p>
                    <LayoutDrawerPopup
                      classNameContentDrawer="w-full"
                      field={field}
                      drawerCancel={() =>
                        form.setValue(`${STEP_1}.departureDate`, '')
                      }
                      triggerPopup={
                        <p
                          className={`text-s-regular ${field.value ? 'text-neutral-800' : 'text-neutral-300'} flex justify-between`}
                        >
                          {field.value
                            ? format(new Date(field.value), 'dd MMM yyyy', {
                                locale: id,
                              })
                            : 'Pilih tanggal berangkat'}
                          {!field.value && (
                            <Calendar3 size={16} color="#8E8E8B" />
                          )}
                        </p>
                      }
                      content={
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(
                              date ? format(date, 'yyyy-MM-dd') : ''
                            )
                          }
                          fromDate={new Date()}
                          initialFocus
                          cellClassName={{
                            cell: 'max-lg:w-full',
                            head_cell: 'max-lg:w-full max-lg:h-full',
                            month: 'max-lg:p-0 max-lg:flex-1',
                            day: 'max-lg:w-full',
                          }}
                        />
                      }
                    />
                    <div className="lg:min-h-4">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${STEP_1}.arrivalDate`}
                render={({ field }) => {
                  // Get the departure date value from the form
                  const departureDate = form.watch(`${STEP_1}.departureDate`)

                  // Calculate the minimum date for arrival (departure date + 1 day, or today if no departure date)
                  const minArrivalDate = departureDate
                    ? new Date(
                        new Date(departureDate).getTime() + 24 * 60 * 60 * 1000
                      ) // Add 1 day
                    : new Date()

                  return (
                    <FormItem
                      className="gap-1 max-lg:col-span-2"
                      id={`${STEP_1}.arrivalDate`}
                    >
                      <p className="text-s-regular text-neutral-800">
                        Tanggal Kepulangan{' '}
                        <span className="text-red-500">*</span>
                      </p>
                      <LayoutDrawerPopup
                        classNameContentDrawer="w-full"
                        field={field}
                        drawerCancel={() =>
                          form.setValue(`${STEP_1}.arrivalDate`, '')
                        }
                        triggerPopup={
                          <p
                            className={`text-s-regular flex justify-between ${field.value ? 'text-neutral-800' : 'text-neutral-300'}`}
                          >
                            {field.value
                              ? format(new Date(field.value), 'dd MMM yyyy', {
                                  locale: id,
                                })
                              : 'Pilih tanggal pulang'}
                            {!field.value && (
                              <Calendar3 size={16} color="#8E8E8B" />
                            )}
                          </p>
                        }
                        content={
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(
                                date ? format(date, 'yyyy-MM-dd') : ''
                              )
                            }
                            fromDate={minArrivalDate}
                            cellClassName={{
                              cell: 'max-lg:w-full',
                              head_cell: 'max-lg:w-full max-lg:h-full',
                              month: 'max-lg:p-0 max-lg:flex-1',
                              day: 'max-lg:w-full',
                            }}
                            initialFocus
                          />
                        }
                      />
                      <div className="lg:min-h-4">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )
                }}
              />
            </div>

            {/* Total Manifest */}
            <FormField
              control={form.control}
              name={`${STEP_1}.totalManifest`}
              render={({ field }) => (
                <FormItem
                  className={`${form.formState.errors.journeyInformation?.departureDate ? 'mt-0' : '-mt-4 max-lg:mt-0'} `}
                  id={`${STEP_1}.totalManifest`}
                >
                  <p className="text-s-regular text-neutral-800">
                    Jumlah Jamaah <span className="text-red-500">*</span>
                  </p>
                  <FormControl>
                    <Input
                      model="compact"
                      type="text"
                      placeholder="Masukkan jumlah Jamaah"
                      value={field.value || ''}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '')
                        field.onChange(parseInt(value) || 0)
                      }}
                      className={`w-full ${field.value ? 'border-primary-500' : 'border-neutral-200'}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* Action Buttons */}
        <div
          className={`flex items-center justify-between border-t border-neutral-100 px-8 py-3 ${isStep1Valid && currentStep === 1 && 'max-lg:sticky max-lg:bottom-0 max-lg:z-49 max-lg:bg-white'}  max-lg:px-4`}
        >
          <p
            className="text-s-regular cursor-pointer text-neutral-900 max-lg:hidden"
            onClick={() => setOpenDialogDrawerEndForm(true)}
          >
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

export default Step1JourneyInfo
