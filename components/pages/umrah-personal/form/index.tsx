'use client'

import Step1JourneyInfo from '@/components/pages/umrah-personal/form/1-InformasiPerjalanan'
import Step2FlightInfo from '@/components/pages/umrah-personal/form/2-MaskapaiBerangkat'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import {
  defaultUmrahPersonalForm,
  umrahPersonalFormSchema,
  UmrahPersonalFormType,
} from '@/constant/schema/umrah-personal-schema/umrah-personal'
import { useUmrahPersonal } from '@/contexts/umrah-personal/context'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
// Import other step components here when created
// import Step2FlightInfo from './Step2FlightInfo'
// import Step3HotelSelection from './Step3HotelSelection'
// import Step4Transportation from './Step4Transportation'
// import Step5Review from './Step5Review'

const UmrahPersonalFormSection: React.FC = () => {
  const { handleNext, handlePrevious } = useUmrahPersonal()

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

  const handleNextStep = async () => {
    if (handleNext) {
      handleNext(form.trigger, form)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-lg:mt-[54px] lg:pb-[100px]"
      >
        {/* Step 1: Journey Information */}
        <Step1JourneyInfo form={form} onNext={handleNextStep} />

        {/* Step 2: Flight Information */}
        <Step2FlightInfo form={form} onNext={handleNextStep} />

        {/* Step 3: Hotel Selection */}
        <div id="umrah-personal-step-3">
          <div className="mx-auto max-w-4xl py-8">
            <div className="rounded-[20px] border border-neutral-200 bg-white p-8 shadow-sm">
              <h3 className="text-l-semibold mb-4 text-neutral-900">
                Penginapan
              </h3>
              <p className="text-m-regular mb-8 text-neutral-500">
                Pilih penginapan Anda saat berada di Makkah dan Madinah.
              </p>

              {/* This will be replaced with Step3HotelSelection component */}
              <div className="py-20 text-center">
                <p className="text-neutral-500">
                  Step 3 Component akan ditambahkan di sini
                </p>
              </div>

              <div className="mt-8 flex justify-between border-t border-neutral-200 pt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handlePrevious}
                  className="text-s-regular text-neutral-500 hover:text-neutral-900"
                >
                  Kembali
                </Button>
                <Button type="button" onClick={handleNextStep} className="px-8">
                  Lanjut
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Transportation */}
        <div id="umrah-personal-step-4">
          <div className="mx-auto max-w-4xl py-8">
            <div className="rounded-[20px] border border-neutral-200 bg-white p-8 shadow-sm">
              <h3 className="text-l-semibold mb-4 text-neutral-900">
                Transportasi (opsional)
              </h3>
              <p className="text-m-regular mb-8 text-neutral-500">
                Pilih transportasi yang ingin Anda gunakan dalam perjalanan
                Umroh Anda.
              </p>

              {/* This will be replaced with Step4Transportation component */}
              <div className="py-20 text-center">
                <p className="text-neutral-500">
                  Step 4 Component akan ditambahkan di sini
                </p>
              </div>

              <div className="mt-8 flex justify-between border-t border-neutral-200 pt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handlePrevious}
                  className="text-s-regular text-neutral-500 hover:text-neutral-900"
                >
                  Kembali
                </Button>
                <Button type="button" onClick={handleNextStep} className="px-8">
                  Lanjut
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 5: Review */}
        <div id="umrah-personal-step-5">
          <div className="mx-auto max-w-4xl py-8">
            <div className="rounded-[20px] border border-neutral-200 bg-white p-8 shadow-sm">
              <h3 className="text-l-semibold mb-4 text-neutral-900">
                Review Pilihan
              </h3>
              <p className="text-m-regular mb-8 text-neutral-500">
                Silahkan lihat dan baca kembali pilihan-pilihan anda sebelum
                melakukan pengajuan paket ini.
              </p>

              {/* This will be replaced with Step5Review component */}
              <div className="py-20 text-center">
                <p className="text-neutral-500">
                  Step 5 Component akan ditambahkan di sini
                </p>
              </div>

              <div className="mt-8 flex justify-between border-t border-neutral-200 pt-6">
                <span className="text-s-regular text-neutral-500">
                  Batalkan Pembuatan Paket
                </span>
                <Button type="submit" className="px-8">
                  Kirim Pengajuan Paket Umrah
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default UmrahPersonalFormSection
