'use client'

import { DetailTransactionBankingActions } from '@/components/pages/my/5-Banking/detail/common/ActionButtonDetail'
import CountdownExpired from '@/components/pages/my/5-Banking/detail/common/CountdownExpired'
import DetailManifestPembiayaan from '@/components/pages/my/5-Banking/detail/common/DataManifest'
import DetailDataProvider from '@/components/pages/my/5-Banking/detail/common/DataProvider'
import DetailDataPemohon from '@/components/pages/my/5-Banking/detail/common/DataSubmission'
import ProductDescriptionPembiayaan from '@/components/pages/my/5-Banking/detail/common/ProductDescription'
import ProductDetailPembiayaan from '@/components/pages/my/5-Banking/detail/common/ProductDetail'
import WarningTextDetail from '@/components/pages/my/5-Banking/detail/common/WarningText'
import { CardTransactionBankingStatus } from '@/components/pages/my/5-Banking/list/common/CardTransactionTagStatus'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import { MIDTRANS_CLIENT_KEY, SNAP_URL } from '@/constant/env'
import { SubmissionCredit } from '@/constant/types/SubmissionPembiayaan'
import { formatDateToDDMMYYYY } from '@/lib/utils'
import { isPast } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { Fragment } from 'react'

export function LayoutDetailPembiayaan({
  detail,
}: {
  detail: SubmissionCredit
}) {
  const router = useRouter()
  const expiredDate = detail.applications[0]?.approved_expired_at
  const expiredDateFormatted = expiredDate
    ? formatDateToDDMMYYYY(new Date(expiredDate))
    : null
  const packageData =
    detail.packageSnapshots[0].snapshot.package_variant.package
  const isExpired = isPast(new Date(expiredDate || ''))
  return (
    <Fragment>
      <MobileTopbar
        showBackButton
        variant="transactionTopbar"
        title="Detail Pembiayaan"
        onBackClick={() => {
          router.push('/my/banking')
        }}
        showCallCenter
      />
      <div className="relative grid grid-cols-3 max-lg:mb-20 max-lg:grid-cols-1">
        <p className="heading-4-semibold col-span-3 border-b border-neutral-100 px-8 py-4 max-lg:hidden">
          Detail Pengajuan Pembiayaan
        </p>
        <div className="col-span-2 flex flex-col gap-5 max-lg:order-2 max-lg:gap-3">
          <ProductDetailPembiayaan
            packageType={packageData.packageType}
            submissionId={detail.submission_id}
            createdAt={detail.createdAt}
            status={detail.view_status}
          />
          <div className="h-2 w-full self-stretch bg-neutral-100" />
          <ProductDescriptionPembiayaan submission={detail} />
          <div className="h-2 w-full self-stretch bg-neutral-100" />
          <DetailDataPemohon submission={detail} />
          <div className="h-2 w-full self-stretch bg-neutral-100" />
          <DetailDataProvider submission={detail} isExpired={isExpired} />
          <div className="h-2 w-full self-stretch bg-neutral-100" />
          <DetailManifestPembiayaan members={detail.manifests} />
        </div>
        <div className="relative col-span-1 flex flex-col justify-between px-8 py-5 max-lg:order-1 max-lg:p-4 lg:border-l lg:border-neutral-100">
          <div className="z-15 flex flex-col gap-3 bg-white lg:sticky lg:top-30">
            <div className="lg:hidden">
              <CardTransactionBankingStatus status={detail.view_status} />
            </div>
            {expiredDate && (
              <CountdownExpired
                expiredDate={expiredDate}
                status={detail.view_cta}
              />
            )}
            <WarningTextDetail
              status={detail.view_status}
              expiredDate={expiredDateFormatted || null}
              isExpired={isExpired}
            />
            <DetailTransactionBankingActions
              cta={detail.view_cta}
              booking_id={detail.booking_id}
              application={detail.applications}
              submissionId={detail.id}
              submission={detail}
            />
          </div>

          {/* Wrapper untuk membuat gambar ilustrasi sticky di bawah */}
          <div className="bottom-0 mt-auto w-full bg-white pt-3 max-lg:hidden">
            <div className="relative block">
              <Image
                src="/images/image-bangking.svg"
                alt="Banking Illustration"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
        <Script
          src={SNAP_URL}
          data-client-key={MIDTRANS_CLIENT_KEY}
          strategy="lazyOnload"
          onError={() => {}}
        />
      </div>
    </Fragment>
  )
}
