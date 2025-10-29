'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { useCustomNavigation } from '@/hooks/common/useCustomNavigation'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const STEP_1_ID = 'step-1'
const STEP_2_ID = 'step-2'

const TopbarMobilePembiayaan = () => {
  const { goBack } = useCustomNavigation()

  const pathname = usePathname()
  // Ambil step dari URL (contoh: /bank/credit/form/step-1 -> step-1)
  const currentStep = pathname.split('/').pop() || 'step-1'

  const steps = [
    { id: STEP_1_ID, number: 1, label: 'Isi Data Diri' },
    { id: STEP_2_ID, number: 2, label: 'Pilih Mitra Pembiayaan' },
  ]

  // Cari index dari step yang sedang aktif
  const currentStepIndex = steps.findIndex((s) => s.id === currentStep)

  return (
    <div className="bg-primary-500 absolute -top-[22px] h-[125px] w-full lg:hidden">
      <Image
        src="/images/circle-1.svg"
        alt="bg-search"
        width={0}
        height={0}
        sizes="100vw"
        priority
        className={`absolute right-0 bottom-0 z-9 h-auto w-1/4`}
      />
      <Image
        src="/images/circle-2.svg"
        alt="bg-search"
        width={0}
        height={0}
        sizes="100vw"
        priority
        className={`absolute top-0 left-0 z-9 h-auto w-1/2`}
      />
      <div className="relative z-99 h-full">
        <div className="absolute flex h-full w-full flex-col items-center justify-center gap-3.5">
          <div className="flex w-full items-center justify-between px-4">
            <ArrowIcon
              size={20}
              className="rotate-180"
              onClick={() => goBack()}
            />

            <p className="text-l-semibold">Pembiayaan Umroh</p>

            {/* Ini hanya untuk mentrigger supaya textnya tetap center */}
            <ArrowIcon size={20} className="invisible" />
          </div>

          {/* --- AWAL BLOK STEPPER --- */}
          {/* Stepper indicator */}
          <div className="flex w-full items-center justify-center">
            {steps.map((step, index) => {
              const stepIndex = steps.findIndex((s) => s.id === step.id)

              // Tentukan status setiap step
              const isActive = step.id === currentStep
              const isDone = stepIndex < currentStepIndex

              return (
                <div key={step.id} className="flex items-center">
                  {/* Kontainer untuk Lingkaran + Label */}
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    {/* Lingkaran (Hanya tampil jika BELUM selesai) */}
                    <div
                      className={`
                        text-s-semibold flex h-5 w-5 flex-shrink-0 items-center justify-center
                        rounded-full
                        ${isActive ? 'text-primary-500 bg-black' : 'border border-black bg-transparent text-black'}
                      `}
                    >
                      {isDone && step.id === STEP_1_ID ? (
                        <Check size={12} color="black" />
                      ) : (
                        step.number
                      )}
                    </div>

                    {/* Label Step */}
                    <p
                      className={`
                        text-black
                      ${isActive ? 'text-s-medium ' : 'text-s-regular'}
                    `}
                    >
                      {/* Ini logika khusus untuk mengubah "Isi Data Diri" menjadi "Data Diri" 
                      saat step 1 sudah selesai (isDone), sesuai gambar Anda.
                    */}
                      {isDone && step.id === STEP_1_ID
                        ? 'Data Diri'
                        : step.label}
                    </p>
                  </div>

                  {/* Garis Penghubung (Tidak tampil di step terakhir) */}
                  {index < steps.length - 1 && (
                    <div className="mx-2.5 h-[1px] w-10 flex-shrink-0 bg-black" />
                  )}
                </div>
              )
            })}
          </div>
          {/* --- AKHIR BLOK STEPPER --- */}
        </div>
      </div>
    </div>
  )
}

export default TopbarMobilePembiayaan
