import { ArrowIcon } from '@/components/icons/arrow'
import { Calendar2 } from '@/components/icons/calendar'
import { PeopleIcon } from '@/components/icons/people'
import { CardTransactionBankingActions } from '@/components/pages/my/5-Banking/list/common/CardTransactionBankingAction'
import { CardTransactionBankingStatus } from '@/components/pages/my/5-Banking/list/common/CardTransactionTagStatus'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SubmissionCredit } from '@/constant/types/SubmissionPembiayaan'
import { formatCurrency, formatDateToDDMMYYYY } from '@/lib/utils'
import Placeholder from '@/public/images/no-image-placeholder.png'
import { formatInTimeZone } from 'date-fns-tz'
import { id } from 'date-fns/locale'
import Image from 'next/image'
import React, { useMemo } from 'react'
interface CardTransactionBankingProps {
  data: SubmissionCredit
}

const ProviderWrapper = ({ logo, name }: { logo: string; name: string }) => {
  return (
    <div className="flex items-center gap-2 max-lg:gap-1">
      <Image
        src={logo}
        alt={name}
        width={24}
        height={24}
        className="max-lg:!h-4 max-lg:!w-4 "
      />
      <p className="text-m-semibold max-lg:text-[10px] max-lg:leading-3.5 max-lg:font-bold">
        {name}
      </p>
    </div>
  )
}

const TotalPrice = ({ total_price }: { total_price: number }) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-m-medium text-neutral-500 max-lg:text-xs max-lg:leading-4 max-lg:font-normal">
        Jumlah Pembiayaan Dipilih
      </p>
      <p className="text-l-semibold max-lg:text-xs max-lg:leading-4 max-lg:font-semibold">
        {formatCurrency(total_price)}
      </p>
    </div>
  )
}

function CardTransactionBankingComponent({
  data,
}: CardTransactionBankingProps) {
  // Menggunakan useMemo untuk mencegah kalkulasi ulang yang tidak perlu
  const {
    idSubmission,
    packageBase,
    departureDate,
    arrivalDate,
    createdAt,
    createdAtWithHours,
  } = useMemo(() => {
    const packageVariant = data.packageSnapshots[0].snapshot.package_variant
    return {
      idSubmission: `ID: ${data.submission_id}`,
      packageBase: packageVariant.package,
      packageVariantBase: packageVariant,
      departureDate: formatDateToDDMMYYYY(
        new Date(packageVariant.departureDate)
      ),
      arrivalDate: formatDateToDDMMYYYY(new Date(packageVariant.arrivalDate)),
      createdAt: formatDateToDDMMYYYY(new Date(data.createdAt)),
      createdAtWithHours: formatInTimeZone(
        new Date(data.createdAt),
        'Asia/Jakarta',
        'dd MMMM yyyy, HH:mm',
        { locale: id }
      ),
    }
  }, [data])

  return (
    <Card className="w-full gap-4 overflow-hidden rounded-[20px] border-1 border-neutral-200 py-0 shadow-none">
      {/* HEADER: Nama Travel & Nama Paket */}
      <CardHeader className="flex justify-between border-b-1 border-neutral-200 px-4 py-3 lg:items-center">
        <div className="flex items-center gap-1.5 max-lg:flex-col max-lg:items-start max-lg:gap-0">
          <p className="text-m-semibold capitalize max-lg:text-xs max-lg:leading-4 max-lg:font-medium">
            {packageBase.packageType}
          </p>
          <p className="text-m-medium max-lg:hidden">/</p>
          <p className="text-m-medium max-lg:hidden">{idSubmission}</p>
          <p className="text-s-regular text-neutral-500 lg:hidden">
            {createdAt}
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-3">
          <div className="max-lg:hidden">
            <ProviderWrapper
              logo={data.applications[0].provider.logo || Placeholder.src}
              name={data.applications[0].provider.name}
            />
          </div>
          <CardTransactionBankingStatus status={data.view_status} />
        </div>
      </CardHeader>

      {/* CONTENT: Detail Jemaah, Harga, Tenor */}
      <CardContent className="flex items-center gap-3 px-4 max-lg:flex-col max-lg:items-start max-lg:gap-1 max-lg:pb-4">
        <div className="flex w-full items-center justify-between lg:hidden">
          <p className="text-s-regular text-neutral-500">{idSubmission}</p>
          <div className="lg:hidden">
            <ProviderWrapper
              logo={data.applications[0].provider.logo || Placeholder.src}
              name={data.applications[0].provider.name}
            />
          </div>
        </div>
        <div className="flex gap-3 max-lg:flex-col">
          {/* Package Thumbnail */}
          <div className="flex items-center gap-3">
            <Image
              src={packageBase.thumbnail}
              alt={data.package_name}
              width={120}
              height={120}
              className="rounded-xl max-lg:h-15 max-lg:w-15"
            />
            {/* Package Name Mobile*/}
            <p className="text-s-medium lg:hidden">{data.package_name}</p>
          </div>

          {/* Package Description */}
          <div className="flex flex-col gap-2">
            {/* Package Name Desktop*/}
            <p className="text-m-semibold max-lg:hidden">{data.package_name}</p>

            {/* Date Departure and Arrival */}
            <div className="flex items-center gap-2 max-lg:gap-1">
              <Calendar2
                size={20}
                className="text-neutral-500 max-lg:!h-4 max-lg:!w-4"
              />
              <div className="flex items-center gap-1">
                <p className="text-m-regular text-neutral-500 max-lg:text-xs max-lg:leading-4 max-lg:font-normal">
                  {departureDate}
                </p>
                <ArrowIcon
                  size={18}
                  className="inline-flex text-neutral-500 "
                />
                <p className="text-m-regular text-neutral-500 max-lg:text-xs max-lg:leading-4 max-lg:font-normal">
                  {arrivalDate}
                </p>
              </div>
            </div>

            {/* Quantity Jemaah */}
            <div className="flex items-center gap-2 max-lg:hidden">
              <PeopleIcon size={20} className="text-neutral-500" />
              <p className="text-m-regular text-neutral-500">
                {data.jumlah_jemaah} Jemaah
              </p>
            </div>

            {/* Total Price Mobile*/}
            <div className="lg:hidden">
              <TotalPrice total_price={data.total_price} />
            </div>
          </div>

          {/* Divider Desktop */}
          <div className="w-px self-stretch bg-neutral-100 max-lg:hidden" />

          {/* Total Price Desktop */}
          <div className="max-lg:hidden">
            <TotalPrice total_price={data.total_price} />
          </div>
        </div>
      </CardContent>

      {/* FOOTER: Status & Tombol Aksi */}
      <CardTransactionBankingActions
        cta={data.view_cta}
        submissionId={data.id}
        packageId={data.package_id}
        organizationSlug={
          data.packageSnapshots[0]?.snapshot.package_variant.package
            .organizationInstance.slug
        }
        createdAtWithHours={createdAtWithHours}
      />
    </Card>
  )
}

// Bungkus komponen dengan React.memo untuk mencegah re-render yang tidak perlu
export const CardTransactionBanking = React.memo(
  CardTransactionBankingComponent
)
