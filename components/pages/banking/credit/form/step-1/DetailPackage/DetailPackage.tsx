import { ArrowIcon } from '@/components/icons/arrow'
import { BuildingIcon } from '@/components/icons/building'
import { Calendar2 } from '@/components/icons/calendar'
import { Edit2Icon, Edit3Icon } from '@/components/icons/edit'
import { ChangePembiayaanContent } from '@/components/pages/banking/common/ChangePembiayaan'
import ItemsInformation from '@/components/pages/banking/credit/form/step-1/DetailPackage/ItemsInformation'
import DetailPackagePembiayaanSkeleton from '@/components/pages/banking/credit/form/step-1/DetailPackage/SkeletonDetailPackage'
import RincianHarga from '@/components/pages/banking/credit/form/step-1/RincianHarga/RincianHarga'
import LayoutDrawerDialog from '@/components/shared/LayoutDrawerDialog'
import { Button } from '@/components/ui/button'
import { Facility } from '@/constant/types/FacilityProps'
import { PembiayaanDataLocalStorage } from '@/constant/types/Pembiayaan'
import { isEmpty } from '@/lib/utils'
import Placeholder from '@/public/images/no-image-placeholder.png'
import { PlaneLanding, PlaneTakeoff } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DetailPackagePembiayaan = ({
  isLoading,
  dataPembiayaan,
  dataTenor,
}: {
  isLoading: boolean
  dataPembiayaan?: PembiayaanDataLocalStorage | null
  dataTenor: Facility[]
}) => {
  const [open, setIsOpen] = useState(false)
  const router = useRouter()

  const getDepartureArrivalText = (type: string | 'departure' | 'arrival') => {
    return type === 'departure' ? (
      <div className="flex items-center gap-1">
        <p className="text-m-regular">
          {dataPembiayaan?.selectedPackage?.departureAirpotCode}
        </p>
        <ArrowIcon size={18} className="inline-flex" />
        <p className="text-m-regular">
          {dataPembiayaan?.selectedPackage?.departureDestinationAirportCode}
        </p>
        <p className="text-m-regular text-neutral-500">•</p>
        <div className="flex items-center gap-2">
          <Image
            src={
              dataPembiayaan?.selectedPackage?.departureAirlineThumbnail ||
              Placeholder
            }
            alt="airplane-departure"
            width={20}
            height={20}
          />
          <p className="text-m-regular">
            {dataPembiayaan?.selectedPackage?.departureAirlineName}
          </p>
        </div>
      </div>
    ) : (
      <div className="flex items-center gap-1">
        <p className="text-m-regular">
          {dataPembiayaan?.selectedPackage?.arrivalOriginAirportCode}
        </p>
        <ArrowIcon size={18} className="inline-flex" />
        <p className="text-m-regular">
          {dataPembiayaan?.selectedPackage?.arrivalDestinationAirportCode}
        </p>
        <p className="text-m-regular text-neutral-500">•</p>
        <div className="flex items-center gap-2">
          <Image
            src={
              dataPembiayaan?.selectedPackage?.arrivalAirlineThumbnail ||
              Placeholder
            }
            alt="airplane-arrival"
            width={20}
            height={20}
          />
          <p className="text-m-regular">
            {dataPembiayaan?.selectedPackage?.arrivalAirlineName}
          </p>
        </div>
      </div>
    )
  }

  if (isLoading && isEmpty(dataPembiayaan?.selectedPackage))
    return <DetailPackagePembiayaanSkeleton />

  return (
    <div className="container mx-auto flex flex-col gap-4 max-lg:px-4">
      <p className="heading-4-semibold max-lg:hidden">Paket Pilihan</p>
      <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 px-6 py-4 max-lg:gap-2 max-lg:border-none max-lg:p-0">
        {/* Ubah and Title Rincian Paket */}
        <div className="flex items-center justify-between lg:hidden">
          <p className="text-m-semibold">Rincian Paket</p>
          <p
            className="text-s-medium flex items-center gap-1.5 underline"
            onClick={() => router.push('/search?package=pembiayaan')}
          >
            <Edit3Icon size={20} />
            Ubah Paket
          </p>
        </div>

        {/* Package Description, Organization, Image and Action Button*/}
        <div className="flex items-center gap-3">
          {/* Image Package */}
          <Image
            src={
              dataPembiayaan?.selectedPackage?.packageThumbnail ||
              Placeholder.src
            }
            alt={dataPembiayaan?.selectedPackage?.packageName || ''}
            width={120}
            height={120}
            className="rounded-lg max-lg:h-15! max-lg:w-15!"
          />

          <div className="flex w-full flex-row gap-3 max-lg:flex-col lg:items-center lg:justify-between">
            {/* Package and Organization Description */}
            <div className="flex flex-2 flex-col gap-3 max-lg:gap-2">
              {/* Package Name */}
              <p className="text-s-medium lg:text-base lg:leading-6 lg:font-semibold">
                {dataPembiayaan?.selectedPackage?.packageName}
              </p>

              {/* Organization Description (Desktop Only) */}
              <div className="flex items-center gap-1 max-lg:hidden">
                <div className="rounded-full border border-neutral-100 p-2">
                  <Image
                    src={
                      dataPembiayaan?.selectedPackage?.organizationThumbnail ||
                      Placeholder.src
                    }
                    alt={
                      dataPembiayaan?.selectedPackage?.organizationName || ''
                    }
                    width={14}
                    height={14}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-s-medium">
                    {dataPembiayaan?.selectedPackage?.organizationName}
                  </p>
                  <p className="text-xs-regular text-neutral-500">
                    {dataPembiayaan?.selectedPackage?.organizationCity}
                  </p>
                </div>
              </div>

              {/* Date Departure and Arrival (Desktop)*/}
              <div className="flex items-center gap-2 max-lg:hidden">
                <Calendar2 size={20} />
                <div className="flex items-center gap-1">
                  <p className="text-m-regular ">
                    {dataPembiayaan?.selectedPackage?.departureDate}
                  </p>
                  <ArrowIcon size={18} className="inline-flex" />
                  <p className="text-m-regular">
                    {dataPembiayaan?.selectedPackage?.arrivalDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button (Desktop) */}
            <div className="flex gap-3">
              <LayoutDrawerDialog
                isOpen={open}
                sizeDialog="wide"
                setIsOpen={setIsOpen}
                title={
                  <p className="text-m-semibold p-4">Kalkulasi Pembiayaan</p>
                }
                trigger={
                  <Button
                    size="sm"
                    className="lg:border-primary-500 flex items-center gap-1.5 max-lg:border-none max-lg:p-0 lg:border-2 lg:px-10"
                    variant="outline"
                  >
                    <Edit2Icon size={14} className="max-lg:hidden" />
                    <Edit3Icon size={20} className="lg:hidden" />

                    <p className="text-s-regular max-lg:font-medium max-lg:underline">
                      Ubah Kamar
                    </p>
                  </Button>
                }
                content={
                  <ChangePembiayaanContent
                    setOpen={setIsOpen}
                    dataTenor={dataTenor}
                    dataPembiayaan={dataPembiayaan}
                  />
                }
              />
              <Button
                size="sm"
                className="flex items-center gap-1.5 px-10 max-lg:hidden"
                variant="default"
                onClick={() => router.push('/search?package=pembiayaan')}
              >
                <Edit2Icon size={14} />
                <p className="text-s-regular">Ubah Paket</p>
              </Button>
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="h-px w-full bg-neutral-200 max-lg:hidden" />
        <div className="flex gap-8">
          {/* Deskripsi Paket */}
          <div className="grid w-full grid-cols-1 gap-4 max-lg:gap-2">
            <div className="col-span-1 flex items-center gap-2 lg:hidden">
              <Calendar2 size={20} />
              <div className="flex items-center gap-1">
                <p className="text-m-regular ">
                  {dataPembiayaan?.selectedPackage?.departureDate}
                </p>
                <ArrowIcon size={18} className="inline-flex" />
                <p className="text-m-regular">
                  {dataPembiayaan?.selectedPackage?.arrivalDate}
                </p>
              </div>
            </div>
            <ItemsInformation
              icon={
                <PlaneTakeoff size={20} className="max-lg:h-4! max-lg:w-4!" />
              }
              value={getDepartureArrivalText('departure')}
              title="Keberangkatan"
            />
            <ItemsInformation
              icon={
                <PlaneLanding size={20} className="max-lg:h-4! max-lg:w-4!" />
              }
              value={getDepartureArrivalText('arrival')}
              title="Kepulangan"
            />
            <ItemsInformation
              icon={
                <BuildingIcon size={20} className="max-lg:h-4! max-lg:w-4!" />
              }
              value={dataPembiayaan?.selectedPackage?.meccaHotelName}
              title="Hotel Makkah"
            />
            <ItemsInformation
              icon={
                <BuildingIcon size={20} className="max-lg:h-4! max-lg:w-4!" />
              }
              value={dataPembiayaan?.selectedPackage?.medinaHotelName}
              title="Hotel Madinah"
            />
          </div>
          {/* Divider Vertical */}
          <div className="w-px self-stretch bg-neutral-200 max-lg:hidden" />
          <div className="w-full max-lg:hidden">
            <RincianHarga
              selectedPackage={dataPembiayaan?.selectedPackage}
              selectedRoomType={dataPembiayaan?.selectedRoomType}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPackagePembiayaan
