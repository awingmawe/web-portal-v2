'use client'

import Step1JourneyInfo from '@/components/pages/umrah-personal/form/1-InformasiPerjalanan'
import Step2FlightInfo from '@/components/pages/umrah-personal/form/2-MaskapaiBerangkat'
import Step3MeccaHotel from '@/components/pages/umrah-personal/form/3-PenginapanHotel/Step3Mecca'
import Step4MadinahHotel from '@/components/pages/umrah-personal/form/3-PenginapanHotel/Step4Madina'
import Step5Transportation from '@/components/pages/umrah-personal/form/4-Transportasi'
import Step6Review from '@/components/pages/umrah-personal/form/5-Review'
import { Form } from '@/components/ui/form'
import { ACTIVITY_TYPES } from '@/constant/schema/umrah-personal-schema/constant'
import {
  defaultUmrahPersonalForm,
  umrahPersonalFormSchema,
  UmrahPersonalFormType,
} from '@/constant/schema/umrah-personal-schema/umrah-personal'
import { Facility } from '@/constant/types/FacilityProps'
import { RequestFormUmrahPersonal } from '@/constant/types/UmrahPersonalProps'
import { useEventTracker } from '@/contexts/event-tracker/context'
import { STEP_1 } from '@/contexts/umrah-personal/constant'
import { useUmrahPersonal } from '@/contexts/umrah-personal/context'
import { umrahPersonalRegister } from '@/services/umrah-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface UmrahPersonalFormSectionProps {
  dataEnumVehicle: Facility[]
}

const UmrahPersonalFormSection: React.FC<UmrahPersonalFormSectionProps> = ({
  dataEnumVehicle,
}) => {
  const { currentStep } = useUmrahPersonal()
  const { pushEvent } = useEventTracker()
  const router = useRouter()
  const form = useForm<UmrahPersonalFormType>({
    resolver: zodResolver(umrahPersonalFormSchema),
    defaultValues: defaultUmrahPersonalForm,
    mode: 'onChange',
  })

  // Final form submission
  const onSubmit = async (data: UmrahPersonalFormType) => {
    console.log('masuk')
    const payload: RequestFormUmrahPersonal = {
      // Journey Information
      journeyType: data.journeyInformation.journeyType,
      activity: data.journeyInformation.activity,
      createVisa: data.journeyInformation.createVisa,
      useInsurance: data.journeyInformation.useInsurance,
      departureDate: data.journeyInformation.departureDate,
      arrivalDate: data.journeyInformation.arrivalDate,
      totalManifest: data.journeyInformation.totalManifest,
      // Flight Information
      departure: {
        from: data.flightInformation.departure.from.airport.id,
        to: data.flightInformation.departure.to.airport.id,
        airline: data.flightInformation.departure.airline.id,
        flightClass: data.flightInformation.departure.flightClass,
        flightRoute: data.flightInformation.departure.flightRoute,
      },
      arrival: {
        from: data.flightInformation.arrival.from.airport.id,
        to: data.flightInformation.arrival.to.airport.id,
        airline: data.flightInformation.arrival.airline.id,
        flightClass: data.flightInformation.arrival.flightClass,
        flightRoute: data.flightInformation.arrival.flightRoute,
      },
      // Hotel and Transportation
      meccaHotel: data.hotelMecca.hotelMecca.id,
      medinaHotel: data.hotelMedina?.hotelMedina.id, // Safely access optional field
      transportation: data.transportation?.transportation.id, // Safely access optional field
    }

    try {
      const result = await umrahPersonalRegister(payload)

      if (result) {
        pushEvent({
          name: 'submit_create_umroh_personal',
          category: 'umrah-personal',
          topic: 'umrah',
          data: {
            packageType: payload.journeyType,
            activity: payload.activity,
            createVisa: payload.createVisa,
            useInsurance: payload.useInsurance,
            departureDate: payload.departureDate,
            arrivalDate: payload.arrivalDate,
            totalManifest: payload.totalManifest,
            departureAirportFrom: payload.departure.from,
            departureAirportTo: payload.departure.to,
            departureAirline: payload.departure.airline,
            departureFlightClass: payload.departure.flightClass,
            departureFlightRoute: payload.departure.flightRoute,
            arrivalAirportFrom: payload.arrival.from,
            arrivalAirportTo: payload.arrival.to,
            arrivalAirline: payload.arrival.airline,
            arrivalFlightClass: payload.arrival.flightClass,
            arrivalFlightRoute: payload.arrival.flightRoute,
            hotelMakkahStar: data.hotelMecca.hotelMecca.rating,
            hotelMakkahName: data.hotelMecca.hotelMecca.name,
            hotelMedinaStar: data.hotelMedina?.hotelMedina?.rating,
            hotelMedinaName: data.hotelMedina?.hotelMedina?.name,
            transportationName:
              data.transportation?.transportation.name ?? null,
          },
        })
        router.push(`/umrah-personal/success-offering`)
      }
    } catch (error) {
      console.warn('API Error:', error)
    }
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
        {currentStep === 2 && <Step2FlightInfo form={form} />}

        {/* Step 3: Hotel Selection Mecca*/}
        {currentStep === 3 && <Step3MeccaHotel form={form} />}

        {/* Step 4: Hotel Selection Medina*/}
        {form.getValues(`${STEP_1}.activity`) === ACTIVITY_TYPES.MECCA_MEDINA &&
          currentStep === 4 && <Step4MadinahHotel form={form} />}

        {/* Step 5: Transportation */}
        <Step5Transportation form={form} dataEnumVehicle={dataEnumVehicle} />

        {/* Step 6: Review */}
        <Step6Review form={form} />
      </form>
    </Form>
  )
}

export default UmrahPersonalFormSection
