'use client'

import { AirPlane } from '@/components/icons/airplane'
import { ApprovedShield } from '@/components/icons/approved-shield'
import { Calendar } from '@/components/icons/calendar'
import LineMatang from '@/components/icons/line-matang'
import OrnamentBanking2 from '@/components/icons/ornament-banking2'
import { Trophy } from '@/components/icons/trophy'

export default function PreparationSection() {
  return (
    <div className="bg-primary-500 relative w-full">
      {/* Background accent pattern */}
      <OrnamentBanking2 className="absolute top-0 left-0 z-10" />

      <div className="relative z-20 container mx-auto py-25">
        {/* Hero Content */}
        <div className="mb-16 flex flex-col gap-15 px-25 md:flex-row md:items-center">
          {/* Left Column - Heading */}
          <div className="flex flex-col gap-5">
            <h1 className="text-xl-medium">
              Persiapan{' '}
              <span className="relative font-bold">
                Matang
                <LineMatang className="absolute -right-3 -bottom-7 w-70" />
              </span>
            </h1>
            <h1 className="text-xl-medium">
              Umroh Lebih{' '}
              <span className="relative font-bold">
                Tenang
                <LineMatang className="absolute -right-5 -bottom-7 w-70" />
              </span>
            </h1>
          </div>

          {/* Right Column - Description */}
          <div className="ml-auto flex flex-col gap-5">
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Feature 1 */}
          <div className="flex flex-col items-center border-r border-r-neutral-100 text-center">
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
          <div className="flex flex-col items-center border-r border-r-neutral-100 text-center">
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
          <div className="flex flex-col items-center border-r border-r-neutral-100 text-center">
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
          <div className="flex flex-col items-center text-center">
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
