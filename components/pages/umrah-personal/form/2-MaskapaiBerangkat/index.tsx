'use client'

import DepartureFlightForm from '@/components/pages/umrah-personal/form/2-MaskapaiBerangkat/MaskapaiBerangkat'
import ArrivalFlightForm from '@/components/pages/umrah-personal/form/2-MaskapaiBerangkat/MaskapaiPulang'
import { Button } from '@/components/ui/button'
import { UmrahPersonalFormType } from '@/constant/schema/umrah-personal-schema/umrah-personal'
import { STEP_2 } from '@/contexts/umrah-personal/constant'
import { useUmrahPersonal } from '@/contexts/umrah-personal/context'
import { isEmpty } from '@/lib/utils'
import { ChevronRightCircle } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

interface Step2FlightInfoProps {
  form: UseFormReturn<UmrahPersonalFormType>
}

const Step2FlightInfo: React.FC<Step2FlightInfoProps> = ({ form }) => {
  const { handleNext } = useUmrahPersonal()

  const checkStep2Validity = () => {
    const values = form.getValues(STEP_2)
    return (
      !isEmpty(values.departure.from.airport) &&
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

  const onNext = async () => {
    if (handleNext) {
      handleNext(form.trigger, form)
    }
  }
  return (
    <div
      className="scrollbar-hide mx-auto hidden w-full max-w-5xl max-xl:max-w-3xl"
      id="umrah-personal-step-2"
    >
      {/* Departure Flight Form */}
      <DepartureFlightForm form={form} />

      {/* Arrival Flight Form */}
      <ArrivalFlightForm form={form}>
        {/* Action Buttons */}
        <div
          className={`flex items-center justify-between border-t border-neutral-100 px-8 py-3 ${isStep2Valid && 'max-lg:sticky max-lg:bottom-0 max-lg:z-99 max-lg:bg-white'} max-lg:px-4`}
        >
          <p className="text-s-regular cursor-pointer text-neutral-900 max-lg:hidden">
            Batalkan Pembuatan Paket
          </p>
          <Button
            type="button"
            onClick={onNext}
            className="flex items-center gap-1.5 px-8 py-4 max-lg:w-full"
            id="lanjut-step-2"
          >
            Lanjut
            <ChevronRightCircle size={14} />
          </Button>
        </div>
      </ArrivalFlightForm>
    </div>
  )
}

export default Step2FlightInfo
