'use client'

import { AirPlane } from '@/components/icons/airplane'
import { ApprovedShield } from '@/components/icons/approved-shield'
import { Calendar } from '@/components/icons/calendar'
import LineMatang from '@/components/icons/line-matang'
import OrnamentBanking2 from '@/components/icons/ornament-banking2'
import { OrnamentBanking2Mobile } from '@/components/icons/ornament-banking2-mobile'
import { Trophy } from '@/components/icons/trophy'

export default function PreparationSection() {
  return (
    <div className="bg-primary-500 relative z-5 w-full">
      {/* Background accent pattern */}
      <OrnamentBanking2 className="absolute top-0 left-0 z-10 hidden lg:block" />
      <OrnamentBanking2Mobile className="absolute -top-8 left-0 z-10 block lg:hidden" />

      <div className="relative z-20 container mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
        {/* Hero Content */}
        <div className="mb-8 flex flex-col gap-5 lg:mb-16 lg:flex-row lg:items-start lg:gap-10 xl:gap-16">
          {/* Left Column - Heading */}
          <div className="flex flex-col gap-2 sm:gap-4 lg:gap-6">
            <h1 className="text-2xl font-medium sm:text-3xl lg:text-5xl xl:text-6xl">
              Persiapan{' '}
              <span className="relative font-bold">
                Matang
                <LineMatang className="absolute -right-2 -bottom-3 w-24 sm:-right-3 sm:-bottom-4 sm:w-32 lg:-right-3 lg:-bottom-6 lg:w-40 xl:-bottom-7 xl:w-60" />
              </span>
            </h1>
            <h1 className="text-2xl font-medium sm:text-3xl lg:text-5xl xl:text-6xl">
              Umroh Lebih{' '}
              <span className="relative font-bold">
                Tenang
                <LineMatang className="absolute -right-2 -bottom-3 w-24 sm:-right-3 sm:-bottom-4 sm:w-32 lg:-right-3 lg:-bottom-6 lg:w-40 xl:-bottom-7 xl:w-60" />
              </span>
            </h1>
          </div>

          {/* Right Column - Description */}
          <div className="mt-6 flex flex-col gap-4 lg:mt-0 lg:ml-auto">
            <p className="text-m-regular sm:text-l-regular max-w-md">
              Dengan berbagai pilihan paket dari mitra travel tepercaya, Anda
              bisa merencanakan Umroh dengan lebih mudah. Kami siap mendukung
              kelancaran prosesnya hingga Anda bisa berangkat untuk Umroh.
            </p>
          </div>
        </div>

        {/* Feature Boxes */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg border border-white p-3">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <p className="mb-2 text-base font-medium sm:text-lg">Tepercaya</p>
            <p className="text-primary-700 text-xs sm:text-sm">
              Telah dipercaya oleh ribuan jamaah Umroh
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg border border-white p-3">
              <Calendar className="h-10 w-10 text-white" />
            </div>
            <p className="mb-2 text-base font-medium sm:text-lg">
              Tanggal Booking Fleksibel
            </p>
            <p className="text-primary-700 text-xs sm:text-sm">
              Cari tanggal terbaik untuk Anda berangkat Umroh
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg border border-white p-3">
              <ApprovedShield className="h-10 w-10 text-white" />
            </div>
            <p className="mb-2 text-base font-medium sm:text-lg">
              Dukungan Hingga Keberangkatan
            </p>
            <p className="text-primary-700 text-xs sm:text-sm">
              Kami memastikan keberangkatan Umroh Anda
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg border border-white p-3">
              <AirPlane className="h-10 w-10 text-white" />
            </div>
            <p className="mb-2 text-base font-medium sm:text-lg">
              Perjalanan Nyaman
            </p>
            <p className="text-primary-700 text-xs sm:text-sm">
              Nikmati perjalanan yang nyaman dan aman
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
