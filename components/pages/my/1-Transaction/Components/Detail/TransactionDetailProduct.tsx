import { BriefCaseIcon } from '@/components/icons/briefcase'
import { Calendar2 } from '@/components/icons/calendar'
import { UsersIcon } from '@/components/icons/user'
import { formatDateByPackageType } from '@/lib/utils'
import 'dayjs/locale/id'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'

interface TransactionDetailProductProps {
  travelName: string
  traveSlug: string
  packageName: string
  packageSlug: string
  packageCover: string
  arrivalDate: string
  departureDate: string
  totalJemaah: string
  variantType: string
  packageType: string
  waitingPeriod: string | null
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
  variantType,
  packageType,
  waitingPeriod,
}: TransactionDetailProductProps) {
  const { formattedDepartureDate, formattedArrivalDate } = useMemo(() => {
    return formatDateByPackageType({
      departureDate,
      arrivalDate,
      packageType,
      variantType,
      waitingPeriod,
    })
  }, [departureDate, arrivalDate, packageType, variantType, waitingPeriod])

  console.log('dialog: ', variantType)

  return (
    <div className="mb-6 px-6 max-lg:mb-3 max-lg:px-3">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="max-lg:text-regular text-sm font-semibold max-lg:text-xs max-lg:font-medium">
          Detail Produk
        </h3>
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
          <span className="max-lg:text-regular text-sm font-semibold max-lg:text-xs max-lg:font-medium">
            {travelName}
          </span>
          <ChevronRight className="ml-1 h-5 w-5" />
        </Link>
      </div>

      <div className="mb-4 flex w-11/12 gap-4 max-lg:flex-col max-lg:gap-1">
        <div className="flex items-center gap-3 max-lg:items-start">
          <div className="h-34 w-34 overflow-hidden rounded-lg max-lg:h-20 max-lg:w-20">
            <Image
              src={packageCover || '/thumbnail.png'}
              alt={packageName}
              width={120}
              height={120}
              className="h-full w-full object-cover"
            />
          </div>
          <h4 className="max-lg:text-regular hidden flex-1 text-sm font-semibold max-lg:block max-lg:text-xs max-lg:font-medium">
            {packageName}
          </h4>
        </div>

        <div className="flex-1">
          <h4 className="font-medium max-lg:hidden">{packageName}</h4>
          <div className="mt-2 flex items-center">
            <Calendar2 className="h-5 w-5 text-neutral-500" />
            <p className="ml-2 flex items-center text-sm text-neutral-500 max-lg:text-xs">
              {formattedDepartureDate}
              {formattedArrivalDate}
            </p>
          </div>
          <div className="mt-2 flex items-center">
            <UsersIcon className="h-5 w-5 text-neutral-500" />
            <p className="ml-2 text-sm text-neutral-500 max-lg:text-xs">
              {totalJemaah} Jemaah
            </p>
          </div>
          {/* <div className="mt-2 flex items-center">
            <BedIcon className="h-5 w-5 text-neutral-500" />
            <p className="ml-3 text-sm text-neutral-500 max-lg:text-xs">
              {roomType === 'quad'
                ? 'Quad - 1 Kamar Berempat'
                : roomType === 'triple'
                  ? 'Triple - 1 Kamar Bertiga'
                  : 'Double - 1 Kamar Berdua'}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  )
}
