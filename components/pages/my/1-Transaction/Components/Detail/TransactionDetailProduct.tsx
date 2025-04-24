import { ArrowIcon } from '@/components/icons/arrow'
import { BedIcon } from '@/components/icons/bed'
import { BriefCaseIcon } from '@/components/icons/briefcase'
import { Calendar2 } from '@/components/icons/calendar'
import { UsersIcon } from '@/components/icons/user'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface TransactionDetailProductProps {
  travelName: string
  traveSlug: string
  packageName: string
  packageSlug: string
  packageCover: string
  arrivalDate: string
  departureDate: string
  totalJemaah: string
  roomType: string
}

export default function TransactionDetailProduct({
  travelName,
  traveSlug,
  packageName,
  packageSlug,
  packageCover,
  arrivalDate,
  departureDate,
  totalJemaah,
  roomType,
}: TransactionDetailProductProps) {
  return (
    <div className="mb-6 px-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-m-semibold">Detail Produk</h3>
        <Link
          href={`/umrah/${traveSlug}/${packageSlug}`}
          className="flex items-center"
        >
          <div
            className="mr-2 rounded-md p-1"
            style={{
              background:
                'linear-gradient(134.15deg, #FFC100 17.72%, #FFA500 104.07%, #9D7A42 128.84%, #4D2B17 195.91%, #785214 236.89%)',
            }}
          >
            <BriefCaseIcon className="text-white" />
          </div>
          <span className="text-m-semibold">{travelName}</span>
          <ChevronRight className="ml-1 h-5 w-5" />
        </Link>
      </div>

      <div className="mb-4 flex w-11/12 gap-4">
        <div className="h-34 w-34 overflow-hidden rounded-lg">
          <Image
            src={packageCover || '/thumbnail.png'}
            alt={packageName}
            width={120}
            height={120}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-medium">{packageName}</h4>
          <div className="mt-2 flex items-center">
            <Calendar2 className="h-5 w-5 text-neutral-500" />
            <p className="text-m-regular ml-2 flex items-center text-neutral-500">
              {dayjs(arrivalDate).locale('id').format('DD MMMM YYYY')}{' '}
              <ArrowIcon size={18} className="mx-2 text-neutral-500" />{' '}
              {dayjs(departureDate).locale('id').format('DD MMMM YYYY')}
            </p>
          </div>
          <div className="mt-2 flex items-center">
            <UsersIcon className="h-5 w-5 text-neutral-500" />
            <p className="text-m-regular ml-2 text-neutral-500">
              {totalJemaah} Jemaah
            </p>
          </div>
          <div className="mt-2 flex items-center">
            <BedIcon className="h-5 w-5 text-neutral-500" />
            <p className="text-m-regular ml-3 text-neutral-500">
              {roomType === 'quad'
                ? 'Quad - 1 Kamar Berempat'
                : roomType === 'triple'
                  ? 'Triple - 1 Kamar Bertiga'
                  : 'Double - 1 Kamar Berdua'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
