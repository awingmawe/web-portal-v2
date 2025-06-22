'use client'

import Step1JourneyInfo from '@/components/pages/umrah-personal/form/1-InformasiPerjalanan'
import Step2FlightInfo from '@/components/pages/umrah-personal/form/2-MaskapaiBerangkat'
import { Form } from '@/components/ui/form'
import {
  defaultUmrahPersonalForm,
  umrahPersonalFormSchema,
  UmrahPersonalFormType,
} from '@/constant/schema/umrah-personal-schema/umrah-personal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
// Import other step components here when created
// import Step2FlightInfo from './Step2FlightInfo'
// import Step3HotelSelection from './Step3HotelSelection'
// import Step4Transportation from './Step4Transportation'
// import Step5Review from './Step5Review'

const UmrahPersonalFormSection: React.FC = () => {
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

        {/* Step 3: Hotel Selection */}

        {/* Step 4: Transportation */}

        {/* Step 5: Review */}
      </form>
    </Form>
  )
}

export default UmrahPersonalFormSection
