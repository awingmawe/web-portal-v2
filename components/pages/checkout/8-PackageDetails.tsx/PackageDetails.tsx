'use client'

import FlightDetails from '@/components/pages/checkout/2-FlightDetails/FlightDetails'
import PriceBreakdown from '@/components/pages/checkout/component/PriceBreakdown'
import { PACKAGE_TYPE } from '@/constant/env'
import {
  DetailVariant,
  PaymentDetails,
  SelectedVariant,
} from '@/constant/types/CheckoutProps'
import { isEmpty } from '@/lib/utils'
import { addYears, format } from 'date-fns'
import { id } from 'date-fns/locale'
import Image from 'next/image'

interface PackageDetailsProps {
  detailVariant: DetailVariant
  selectedVariant: SelectedVariant
  paymentDetails: PaymentDetails[]
  globalCurrencyRate: number
  isLinkAja: boolean
}

const PackageDetails = ({
  detailVariant,
  selectedVariant,
  paymentDetails,
  globalCurrencyRate,
  isLinkAja,
}: PackageDetailsProps) => {
  const Placeholder = '/images/no-image-placeholder.png'

  const waitingPeriod =
    !isEmpty(detailVariant?.waitingPeriod) &&
    `- ${format(
      detailVariant?.departureDate
        ? addYears(
            detailVariant.departureDate,
            Number(detailVariant.waitingPeriod)
          )
        : new Date(),
      'yyyy',
      { locale: id }
    )}`
  return (
    <div className="w-full max-lg:order-1 max-lg:px-4 lg:w-1/3">
      <div className="flex flex-col gap-4 rounded-2xl border border-neutral-100 p-4 max-lg:gap-2.5 max-lg:p-3 lg:sticky lg:top-25">
        <p className="text-m-semibold lg:hidden">Detail Pembelian</p>
        <div className="flex gap-4 max-lg:gap-3">
          {/* Kiri: Gambar dan info bawahnya */}
          <Image
            src={detailVariant?.package?.thumbnail || Placeholder}
            alt="Umrah Package"
            width={100}
            height={100}
            style={{
              borderRadius: '16px',
              objectFit: 'cover',
            }}
          />

          {/* Kanan: Judul dan organisasi */}
          <div className="flex flex-col justify-center gap-1">
            <p className="text-l-semibold max-lg:text-xs">
              {detailVariant?.package?.title}
            </p>
            <div className="flex items-center gap-2">
              <Image
                src={
                  detailVariant?.package?.organizationInstance?.thumbnail ||
                  Placeholder
                }
                alt="Organization"
                width={30}
                height={30}
                style={{
                  borderRadius: '20px',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  e.currentTarget.src = String(Placeholder)
                }}
              />
              <div className="flex flex-col">
                <span className="text-s-medium">
                  {detailVariant?.package?.organizationInstanceName}
                </span>
                <p className="text-xs-regular text-neutral-500">
                  {detailVariant?.package?.organizationInstance?.city?.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Varian & Tipe Kamar di bawah gambar */}
        {detailVariant?.package?.packageType === PACKAGE_TYPE.UMRAH && (
          <>
            <div className="w-full text-left">
              <p className="text-s-regular text-neutral-500">Varian</p>
              <p className="text-s-regular">{selectedVariant?.name}</p>
            </div>
            <div className="mt-2.5 h-px bg-neutral-100"></div>
          </>
        )}

        {detailVariant?.package?.packageType === PACKAGE_TYPE.HAJJ && (
          <div className="w-full text-left">
            <p className="text-s-regular text-neutral-500">
              Perkiraan Tahun Keberangkatan
            </p>
            <p className="text-s-regular">
              {detailVariant?.package?.variantType === PACKAGE_TYPE.HAJJ_SPECIAL
                ? `${format(detailVariant.departureDate, 'yyyy', { locale: id })} ${waitingPeriod}`
                : `${format(detailVariant.departureDate, 'MMM yyyy', { locale: id })}`}
            </p>
            <div className="mt-2.5 h-px bg-neutral-100"></div>
          </div>
        )}

        {detailVariant?.package?.packageType === PACKAGE_TYPE.UMRAH && (
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5 lg:hidden">
            <div>
              <p className="text-s-medium mb-1 text-neutral-500">
                Tanggal Berangkat
              </p>
              <p className="text-s-medium">
                {detailVariant?.departureDate &&
                  new Date(detailVariant.departureDate).toLocaleDateString(
                    'id-ID',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
              </p>
            </div>

            <div className="flex flex-col items-center px-4">
              <div className="text-s-medium mb-1">
                {detailVariant?.departureDate &&
                  detailVariant?.arrivalDate &&
                  Math.ceil(
                    (new Date(detailVariant.arrivalDate).getTime() -
                      new Date(detailVariant.departureDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) + ' Hari'}
                {(!detailVariant?.departureDate ||
                  !detailVariant?.arrivalDate) &&
                  '7 Hari'}
              </div>
              <div>
                <Image
                  src={'/images/arrow-right.svg'}
                  width={60}
                  height={24}
                  alt="arrow"
                />
              </div>
            </div>

            <div>
              <p className="text-s-medium mb-1 text-neutral-500">
                Tanggal Pulang
              </p>
              <p className="text-s-medium">
                {detailVariant?.arrivalDate &&
                  new Date(detailVariant.arrivalDate).toLocaleDateString(
                    'id-ID',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
              </p>
            </div>
          </div>
        )}

        <div className="lg:hidden">
          <FlightDetails detailVariant={detailVariant} />
        </div>

        <div className="max-lg:hidden">
          <PriceBreakdown
            isLinkAja={isLinkAja}
            detailVariant={detailVariant}
            paymentDetails={paymentDetails}
            globalCurrencyRate={globalCurrencyRate}
          />
        </div>
      </div>
    </div>
  )
}

export default PackageDetails
