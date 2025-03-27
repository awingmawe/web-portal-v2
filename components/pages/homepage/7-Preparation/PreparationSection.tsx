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
    <div className="bg-primary-500 relative w-full">
      {/* Background accent pattern */}
      <OrnamentBanking2 className="absolute top-0 left-0 z-10 hidden lg:block" />
      <OrnamentBanking2Mobile className="absolute -top-30 left-0 z-10 block lg:hidden" />
      <div className="relative z-20 container mx-auto py-10 max-lg:px-4 lg:py-25 lg:max-lg:px-0">
        {/* Hero Content */}
        <div className="mb-16 flex flex-col gap-5 px-5 md:flex-row md:items-center lg:gap-15 lg:px-25">
          {/* Left Column - Heading */}
          <div className="flex flex-col gap-2 lg:gap-10">
            <h1 className="text-3xl font-medium lg:text-6xl">
              Persiapan{' '}
              <span className="relative font-bold">
                Matang
                <LineMatang className="absolute -right-3 -bottom-7 w-40 lg:w-70" />
              </span>
            </h1>
            <h1 className="text-3xl font-medium lg:text-6xl">
              Umroh Lebih{' '}
              <span className="relative font-bold">
                Tenang
                <LineMatang className="absolute -right-5 -bottom-7 w-40 lg:w-70" />
              </span>
            </h1>
          </div>

          {/* Right Column - Description */}
          <div className="ml-0 flex flex-col gap-5 lg:ml-auto">
            <p className="text-l-regular">
              Dengan berbagai pilihan paket dari mitra <br />
              travel tepercaya, Anda bisa merencanakan <br />
              Umroh dengan lebih mudah. Kami siap <br />
              mendukung kelancaran prosesnya hingga <br />
              Anda bisa berangkat untuk Umroh.
            </p>
          </div>
        </div>

        {/* Feature Boxes */}
        <div className="grid grid-cols-2 gap-0 md:grid-cols-4 md:gap-4">
          {/* Feature 1 */}
          <div className="flex flex-col items-center border-r border-r-neutral-100 pb-5 text-center lg:pb-0">
            <div className="mb-4 flex items-center justify-center rounded-lg border border-white p-3">
              <Trophy className="h-12 w-12 text-white" />
            </div>
            <p className="tex-l-medium mb-2">Tepercaya</p>
            <p className="text-xs-regular text-primary-700">
              Telah dipercaya oleh ribuan <br />
              jamaah Umroh
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center pb-5 pl-5 text-center lg:border-r lg:border-r-neutral-100 lg:pb-0 lg:pl-0">
            <div className="mb-4 flex items-center justify-center rounded-lg border border-white p-3">
              <Calendar className="h-12 w-12 text-white" />
            </div>
            <p className="tex-l-medium mb-2">Tanggal Booking Fleksibel</p>
            <p className="text-xs-regular text-primary-700">
              Cari tanggal terbaik untuk Anda <br />
              berangkat Umroh
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center border-t border-r border-t-neutral-100 border-r-neutral-100 pt-5 text-center lg:border-t-0 lg:pt-0">
            <div className="mb-4 flex items-center justify-center rounded-lg border border-white p-3">
              <ApprovedShield className="h-12 w-12 text-white" />
            </div>
            <p className="tex-l-medium mb-2">Dukungan Hingga Keberangkatan</p>
            <p className="text-xs-regular text-primary-700">
              Kami memastikan <br />
              keberangkatan Umroh Anda
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center border-t  border-t-neutral-100  pt-5 pl-5 text-center lg:border-t-0 lg:pt-0 lg:pl-0">
            <div className="mb-4 flex items-center justify-center rounded-lg border border-white p-3">
              <AirPlane className="h-12 w-12 text-white" />
            </div>
            <p className="tex-l-medium mb-2">Perjalanan Nyaman</p>
            <p className="text-xs-regular text-primary-700">
              Nikmati perjalanan yang <br />
              nyaman dan aman
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
