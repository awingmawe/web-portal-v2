import { Calendar2 } from '@/components/icons/calendar'
import { PeopleWalk } from '@/components/icons/people-walk'
import { UsersIcon } from '@/components/icons/user'
import {
  ArrowRight,
  Building2,
  CalendarFold,
  Car,
  IdCard,
  PlaneLanding,
  PlaneTakeoff,
  ShieldCheck,
} from 'lucide-react'

interface TransactionDetailProductProps {
  packageName?: string
  arrivalDate?: string
  departureDate?: string
  totalJemaah?: string
  aktifitas?: any
  createVisa?: any
  journeyType?: any
  useInsurance?: any
  arrival?: any
  departure?: any
  hotelMakkah?: string
  hotelMadinah?: string
  transportation?: any
}

export default function TransactionDetailProduct({
  packageName,
  arrivalDate,
  departureDate,
  totalJemaah,
  aktifitas,
  createVisa,
  journeyType,
  useInsurance,
  arrival,
  departure,
  hotelMakkah,
  hotelMadinah,
  transportation,
}: TransactionDetailProductProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-gray-800">
        Detail Produk
      </h3>

      <h4 className="mb-4 text-base font-semibold text-gray-900">
        {packageName}
      </h4>

      {/* Desktop Layout */}
      <div className="hidden grid-cols-2 gap-2 lg:grid">
        {/* Kolom Kiri */}
        <div className="space-y-3">
          <div className="flex items-start">
            <PeopleWalk className="mt-2 mr-3 h-[20px] w-[20px] text-neutral-900" />
            <div>
              <div className="text-[12px] text-neutral-500">
                Jenis Perjalanan
              </div>
              <div className="text-[12px] text-neutral-900">
                {journeyType
                  .replace(/-/g, ' ')
                  .split(' ')
                  .map(
                    (word: any) => word.charAt(0).toUpperCase() + word.slice(1)
                  )
                  .join(' ')}
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <PlaneTakeoff className="mt-2 mr-3 h-[20px] w-[20px] text-neutral-900" />
            <div>
              <div className="text-[12px] text-neutral-500">Keberangkatan</div>
              <div className="text-[12px] text-neutral-900">
                {arrival?.from?.code} → {arrival?.to?.code}
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <UsersIcon className="mt-2 mr-3 h-[20px] w-[20px] text-neutral-900" />
            <div>
              <div className="text-[12px] text-neutral-500">Jumlah Jemaah</div>
              <div className="text-[12px] text-neutral-900">
                {totalJemaah} Jemaah
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <ShieldCheck className="mt-2 mr-3 h-[20px] w-[20px] text-neutral-900" />
            <div>
              <div className="text-[12px] text-neutral-500">
                Asuransi Perjalanan
              </div>
              <div className="text-[12px] text-neutral-900">
                {useInsurance === true
                  ? 'Dengan Asuransi Perjalanan'
                  : 'Tidak Dengan Asuransi Perjalanan'}
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <Building2 className="mt-2 mr-3 h-[20px] w-[20px] text-neutral-900" />
            <div>
              <div className="text-[12px] text-neutral-500">Hotel Makkah</div>
              <div className="text-[12px] text-neutral-900">{hotelMakkah}</div>
            </div>
          </div>

          <div className="flex items-start">
            <Car className="mt-2 mr-3 h-[20px] w-[20px] text-neutral-900" />
            <div>
              <div className="text-[12px] text-neutral-500">Transportasi</div>
              <div className="text-[12px] text-neutral-900">
                {transportation?.name}
              </div>
            </div>
          </div>
        </div>

        {/* Separator Vertikal */}
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-200"></div>

          {/* Kolom Kanan */}
          <div className="space-y-3 pl-8">
            <div className="flex items-start">
              <CalendarFold className="mt-2 mr-3 h-[20px] w-[20px] text-neutral-900" />
              <div>
                <div className="text-[12px] text-neutral-500">
                  Kegiatan Umroh
                </div>
                <div className="text-[12px] text-neutral-900 capitalize">
                  {aktifitas}
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <PlaneLanding className="mt-2 mr-3 h-[20px] w-[20px] text-neutral-900" />
              <div>
                <div className="text-[12px] text-neutral-500">Kepulangan</div>
                <div className="text-[12px] text-neutral-900">
                  {departure?.from?.code} → {departure?.to?.code}
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <IdCard className="mt-2 mr-3 h-[20px] w-[20px] text-neutral-900" />
              <div>
                <div className="text-[12px] text-neutral-500">Visa</div>
                <div className="text-[12px] text-neutral-900">
                  {createVisa === false ? 'Dengan Visa' : 'Tidak Dengan Visa'}
                </div>
              </div>
            </div>
            {hotelMadinah !== null ||
              (hotelMadinah !== undefined && (
                <div className="flex items-start">
                  <Building2 className="mt-2 mr-3 h-[20px] w-[20px] text-neutral-900" />
                  <div>
                    <div className="text-[12px] text-neutral-500">
                      Hotel Madinah
                    </div>
                    <div className="text-[12px] text-neutral-900">
                      {hotelMadinah}
                    </div>
                  </div>
                </div>
              ))}

            <div className="flex items-start">
              <Calendar2 className="mt-2 mr-3 h-[20px] w-[20px] text-neutral-900" />
              <div>
                <div className="text-[12px] text-neutral-500">
                  Tanggal Keberangkatan dan Kepulangan
                </div>
                <div className="flex items-center text-[12px] text-neutral-900">
                  {departureDate ? formatDate(departureDate) : ''}
                  <ArrowRight className="mx-2 h-[20px] w-[20px] text-neutral-900" />
                  {arrivalDate ? formatDate(arrivalDate) : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - New Organized Layout */}
      <div className="space-y-3 lg:hidden">
        {/* 1. Tanggal Keberangkatan dan Kepulangan - Full Width */}
        <div className="flex items-start">
          <Calendar2 className="mt-1 mr-3 h-[16px] w-[16px] text-neutral-900" />
          <div>
            <div className="text-[12px] text-neutral-500">
              Tanggal Keberangkatan dan Kepulangan
            </div>
            <div className="flex items-center text-[12px] text-neutral-900">
              {departureDate ? formatDate(departureDate) : ''}
              <ArrowRight className="mx-2 h-[16px] w-[16px] text-neutral-900" />
              {arrivalDate ? formatDate(arrivalDate) : ''}
            </div>
          </div>
        </div>

        {/* 2. Jenis Perjalanan dan Kegiatan Umroh - Side by Side */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-start">
            <PeopleWalk className="mt-1 mr-2 h-[16px] w-[16px] text-neutral-900" />
            <div>
              <div className="text-[12px] text-neutral-500">
                Jenis Perjalanan
              </div>
              <div className="text-[12px] text-neutral-900">
                {journeyType
                  .replace(/-/g, ' ')
                  .split(' ')
                  .map(
                    (word: any) => word.charAt(0).toUpperCase() + word.slice(1)
                  )
                  .join(' ')}
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <CalendarFold className="mt-1 mr-2 h-[16px] w-[16px] text-neutral-900" />
            <div>
              <div className="text-[12px] text-neutral-500">Kegiatan Umroh</div>
              <div className="text-[12px] text-neutral-900 capitalize">
                {aktifitas}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Jumlah Jemaah dan Visa - Side by Side */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-start">
            <UsersIcon className="mt-1 mr-2 h-[16px] w-[16px] text-neutral-900" />
            <div>
              <div className="text-[12px] text-neutral-500">Jumlah Jemaah</div>
              <div className="text-[12px] text-neutral-900">
                {totalJemaah} Jemaah
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <IdCard className="mt-1 mr-2 h-[16px] w-[16px] text-neutral-900" />
            <div>
              <div className="text-[12px] text-neutral-500">Visa</div>
              <div className="text-[12px] text-neutral-900">
                {createVisa === false ? 'Dengan Visa' : 'Tidak Dengan Visa'}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Asuransi Perjalanan - Full Width */}
        <div className="flex items-start">
          <ShieldCheck className="mt-1 mr-3 h-[16px] w-[16px] text-neutral-900" />
          <div>
            <div className="text-[12px] text-neutral-500">
              Asuransi Perjalanan
            </div>
            <div className="text-[12px] text-neutral-900">
              {useInsurance === true
                ? 'Dengan Asuransi Perjalanan'
                : 'Tidak Dengan Asuransi Perjalanan'}
            </div>
          </div>
        </div>

        {/* 5. Hotel Makkah dan Madinah - Side by Side */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-start">
            <Building2 className="mt-1 mr-2 h-[16px] w-[16px] text-neutral-900" />
            <div>
              <div className="text-[12px] text-neutral-500">Hotel Makkah</div>
              <div className="text-[12px] text-neutral-900">{hotelMakkah}</div>
            </div>
          </div>
          {hotelMadinah !== null ||
            (hotelMadinah !== undefined && (
              <div className="flex items-start">
                <Building2 className="mt-1 mr-2 h-[16px] w-[16px] text-neutral-900" />
                <div>
                  <div className="text-[12px] text-neutral-500">
                    Hotel Madinah
                  </div>
                  <div className="text-[12px] text-neutral-900">
                    {hotelMadinah}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* 6. Transportasi - Full Width */}
        <div className="flex items-start">
          <Car className="mt-1 mr-3 h-[16px] w-[16px] text-neutral-900" />
          <div>
            <div className="text-[12px] text-neutral-500">Transportasi</div>
            <div className="text-[12px] text-neutral-900">
              {' '}
              {transportation?.name}
            </div>
          </div>
        </div>

        {/* 7. Keberangkatan dan Kepulangan - Side by Side */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-start">
            <PlaneTakeoff className="mt-1 mr-2 h-[16px] w-[16px] text-neutral-900" />
            <div>
              <div className="text-[12px] text-neutral-500">Keberangkatan</div>
              <div className="text-[12px] text-neutral-900">
                {arrival?.from?.code} → {arrival?.to?.code}
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <PlaneLanding className="mt-1 mr-2 h-[16px] w-[16px] text-neutral-900" />
            <div>
              <div className="text-[12px] text-neutral-500">Kepulangan</div>
              <div className="text-[12px] text-neutral-900">
                {departure?.from?.code} → {departure?.to?.code}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
