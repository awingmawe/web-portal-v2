'use client'

import Step1JourneyInfo from '@/components/pages/umrah-personal/form/1-InformasiPerjalanan'
import Step2FlightInfo from '@/components/pages/umrah-personal/form/2-MaskapaiBerangkat'
import Step3MeccaHotel from '@/components/pages/umrah-personal/form/3-PenginapanHotel/Step3Mecca'
import Step4MadinahHotel from '@/components/pages/umrah-personal/form/3-PenginapanHotel/Step4Madina'
import Step5Transportation from '@/components/pages/umrah-personal/form/4-Transportasi'
import { Form } from '@/components/ui/form'
import {
  defaultUmrahPersonalForm,
  umrahPersonalFormSchema,
  UmrahPersonalFormType,
} from '@/constant/schema/umrah-personal-schema/umrah-personal'
import { Facility } from '@/constant/types/FacilityProps'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
// Import other step components here when created
// import Step2FlightInfo from './Step2FlightInfo'
// import Step3HotelSelection from './Step3HotelSelection'
// import Step4Transportation from './Step4Transportation'
// import Step5Review from './Step5Review'

interface UmrahPersonalFormSectionProps {
  dataEnumVehicle: Facility[]
}

const UmrahPersonalFormSection: React.FC<UmrahPersonalFormSectionProps> = ({
  dataEnumVehicle,
}) => {
  const form = useForm<UmrahPersonalFormType>({
    resolver: zodResolver(umrahPersonalFormSchema),
    defaultValues: defaultUmrahPersonalForm,
    mode: 'onChange',
  })

  // Final form submission
  const onSubmit = (data: UmrahPersonalFormType) => {
    console.log('Form submitted:', data)
    // Handle form submission here
    // e.g., send to API, show success message, etc.
  }

  // it should be implement here
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-lg:mt-[54px] lg:pb-[100px]"
      >
        {/* Step 1: Journey Information */}
        <Step1JourneyInfo form={form} />

        {/* Step 2: Flight Information */}
        <Step2FlightInfo form={form} />

        {/* Step 3: Hotel Selection Mecca*/}
        <Step3MeccaHotel form={form} />

        {/* Step 4: Hotel Selection Medina*/}
        <Step4MadinahHotel form={form} />

        {/* Step 5: Transportation */}
        <Step5Transportation form={form} dataEnumVehicle={dataEnumVehicle} />

        {/* Step 6: Review */}
      </form>
    </Form>
  )
}

export default UmrahPersonalFormSection
