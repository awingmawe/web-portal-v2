'use client'

import DepartureFlightForm from '@/components/pages/umrah-personal/form/2-MaskapaiBerangkat/MaskapaiBerangkat'
import ArrivalFlightForm from '@/components/pages/umrah-personal/form/2-MaskapaiBerangkat/MaskapaiPulang'
import { UmrahPersonalFormType } from '@/constant/schema/umrah-personal-schema/umrah-personal'
import { UseFormReturn } from 'react-hook-form'

interface Step2FlightInfoProps {
  form: UseFormReturn<UmrahPersonalFormType>
  onNext: () => void
  onPrevious?: () => void
}

const Step2FlightInfo: React.FC<Step2FlightInfoProps> = ({ form, onNext }) => {
  return (
    <div
      className="scrollbar-hide mx-auto hidden w-full max-w-5xl max-xl:max-w-3xl"
      id="umrah-personal-step-2"
    >
      {/* Departure Flight Form */}
      <DepartureFlightForm form={form} />

      {/* Arrival Flight Form */}
      <ArrivalFlightForm form={form} onNext={onNext} />
    </div>
  )
}

export default Step2FlightInfo
