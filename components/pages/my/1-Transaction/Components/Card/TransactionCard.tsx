'use client'

import { Calendar, Calendar2 } from '@/components/icons/calendar'
import { ChecklistCircleActive } from '@/components/icons/checkbox'
import { InfoCircleIcon } from '@/components/icons/info-circle'
import { TimerIcon } from '@/components/icons/timer'
import { UsersIcon } from '@/components/icons/user'
import TransactionCardFooter from '@/components/pages/my/1-Transaction/Components/Card/TransactionCardFooter'
import TransactionCardHeader from '@/components/pages/my/1-Transaction/Components/Card/TransactionCardHeader'
import TransactionCardPayment from '@/components/pages/my/1-Transaction/Components/Card/TransactionCardPayment'
import DrawerBatalkan from '@/components/pages/my/1-Transaction/Components/Drawer/DrawerBatalkan'
import { Skeleton } from '@/components/ui/skeleton'
import { PACKAGE_TYPE, STATUS_BOOKING } from '@/constant/env'
import { Transaction } from '@/constant/types/Transaction'
import { CanceledProvider } from '@/contexts/canceled-package-context'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { formatDateByPackageType, getSlugByVariantPackage } from '@/lib/utils'
import { getOrderPayment } from '@/services/umrah-service'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { MoreVertical } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'

// ========================= TYPES =========================
export interface TransactionCardProps {
  detailOnly?: boolean
  transaction: Transaction
  statusTahapan?: string
  statusTahapanDetail?: string
  noHeader?: boolean
  noAmountLeft?: boolean
  noLabelNotif?: boolean
  showDpButton?: boolean
  fetchTransactions?: any
  type?: string
}

interface TransactionData {
  status: string
  id: string
  bookingId: string
  packageName: string
  thumbnail: string
  startDate: string
  endDate: string
  createdDate: string
  modifiedAt: string
  jemaah: number
  isCompletedManifest: boolean
  isManifestCommitted: boolean
  isPaidOff: boolean
  organizationInstanceId: string
  waitingPeriod: string
  packageType: string
  variantType: string
  currency: string
  remainingHajjPayment: number
  noFooter: boolean
}

// ========================= UTILITY FUNCTIONS =========================
const getStatusColor = (status: string): string => {
  const statusColorMap: Record<string, string> = {
    'Akan Datang': 'bg-info-100 text-info-700',
    Selesai: 'bg-success-100 text-success-700',
    'Dibatalkan Jemaah': 'bg-error-100 text-error-700',
    'Dibatalkan Travel': 'bg-error-100 text-error-700',
    'Dibatalkan Sistem': 'bg-error-100 text-error-700',
    'Dalam Proses Pembatalan': 'bg-error-100 text-error-700',
    Waiting: 'bg-warning-100 text-warning-700',
  }

  return statusColorMap[status] || 'bg-neutral-100 text-neutral-700'
}

const formatPaymentDeadline = (
  createdDate: string,
  isDesktop: boolean
): string => {
  const deadline = dayjs(createdDate).add(1, 'day').locale('id')
  return isDesktop
    ? deadline.format('DD MMM YYYY HH:mm')
    : deadline.format('DD MMMM YYYY HH:mm')
}

const shouldShowCancelButton = (
  status: string,
  isPaidOff: boolean
): boolean => {
  if (isPaidOff) return false

  const cancellableStatuses = [
    'approved',
    'waiting-approval',
    'waiting-down-payment',
    STATUS_BOOKING.WAITING_DOWN_PAYMENT_HAJJ,
  ]

  return cancellableStatuses.includes(status)
}

// ========================= SUB-COMPONENTS =========================
const ManifestStatusBadge = ({
  isCompletedManifest,
  createdDate,
}: {
  isCompletedManifest: boolean
  createdDate: string
}) => {
  if (isCompletedManifest) {
    return (
      <div className="bg-success-100 rounded-full px-3 py-1">
        <div className="flex items-center gap-1">
          <ChecklistCircleActive />
          <p className="text-s-regular text-success-700">Data Lengkap</p>
        </div>
      </div>
    )
  }

  const deadline = dayjs(createdDate).add(3, 'day').locale('id')
  const isOverdue = deadline <= dayjs().locale('id')
  const bgColor = isOverdue ? 'bg-error-100' : 'bg-warning-100'
  const textColor = isOverdue ? 'text-error-700' : 'text-warning-700'

  return (
    <div className={`${bgColor} rounded-full px-3 py-1`}>
      <div className={`${textColor} flex items-center gap-1`}>
        <InfoCircleIcon />
        <p className="text-s-regular text-current">
          {isOverdue ? (
            <span>Segera lengkapi manifest</span>
          ) : (
            <span>Lengkapi sebelum {deadline.format('DD MMM YYYY')}</span>
          )}
        </p>
      </div>
    </div>
  )
}

const StatusBadge = ({
  statusTahapan,
  createdDate,
  isDesktop,
}: {
  statusTahapan: string
  createdDate: string
  isDesktop: boolean
}) => {
  const baseClasses = `text-m-medium rounded-full px-6 py-2 max-lg:py-1 max-lg:text-xs`
  const statusClasses = getStatusColor(statusTahapan)
  const paddingClasses =
    statusTahapan === 'Waiting' ? 'max-lg:px-0' : 'max-lg:px-2'

  if (statusTahapan === 'Waiting') {
    if (isDesktop) {
      return (
        <div className={`${baseClasses} ${paddingClasses}`}>
          <span className="text-xs-medium block text-right text-neutral-500">
            Bayar Sebelum
          </span>
          <span className="text-warning-600 flex items-center">
            <TimerIcon className="mr-1" size={17} />
            {formatPaymentDeadline(createdDate, true)}
          </span>
        </div>
      )
    } else {
      return (
        <p className={`${baseClasses} ${statusClasses} ${paddingClasses}`}>
          <span className="text-warning-700 flex">
            <TimerIcon className="mr-2" />
            Harap bayar uang muka sebelum{' '}
            {formatPaymentDeadline(createdDate, false)}
          </span>
        </p>
      )
    }
  }

  return (
    <p className={`${baseClasses} ${statusClasses} ${paddingClasses}`}>
      {statusTahapan}
    </p>
  )
}

const PackageImage = ({
  thumbnail,
  packageName,
}: {
  thumbnail: string
  packageName: string
}) => {
  const imageSrc = thumbnail || '/thumbnail.png'

  return (
    <div className="h-32 w-32 flex-shrink-0 max-lg:h-20 max-lg:w-20">
      <Image
        src={imageSrc}
        alt={packageName}
        width={128}
        height={128}
        className="block h-full w-full rounded-md object-cover max-lg:hidden"
      />
      <Image
        src={imageSrc}
        alt={packageName}
        width={60}
        height={60}
        className="hidden h-full w-full rounded-md object-cover max-lg:block"
      />
    </div>
  )
}

const PackageDetails = ({
  data,
  formattedDepartureDate,
  formattedArrivalDate,
  noLabelNotif,
}: {
  data: TransactionData
  formattedDepartureDate: string
  formattedArrivalDate: string
  noLabelNotif?: boolean
}) => {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <h2 className="text-l-semibold leading-[16px] uppercase max-lg:text-xs">
          {data.packageName}
        </h2>

        {/* Desktop date info */}
        <div className="mt-4 flex items-center gap-2 max-lg:hidden">
          <Calendar2 className="h-5 w-5 text-neutral-500" />
          <p className="text-m-regular flex items-center text-neutral-500">
            {formattedDepartureDate}
            {formattedArrivalDate}
          </p>
        </div>

        {/* Desktop jemaah info */}
        <div className="mt-4 flex items-center gap-2 max-lg:hidden">
          <UsersIcon className="h-5 w-5 text-neutral-500" />
          <p className="text-m-regular text-neutral-500">
            {data.jemaah} Jemaah
          </p>
          {data.packageType === PACKAGE_TYPE.UMRAH && !noLabelNotif && (
            <ManifestStatusBadge
              isCompletedManifest={data.isCompletedManifest}
              createdDate={data.createdDate}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const MobilePackageInfo = ({
  data,
  formattedDepartureDate,
  formattedArrivalDate,
}: {
  data: TransactionData
  formattedDepartureDate: string
  formattedArrivalDate: string
}) => {
  return (
    <>
      {/* Mobile date info */}
      <div className="hidden items-center gap-2 max-lg:flex">
        <Calendar2 className="h-4 w-4 text-neutral-500" />
        <p className="flex items-center text-xs text-neutral-500">
          {formattedDepartureDate}
          {formattedArrivalDate}
        </p>
      </div>

      {/* Mobile jemaah info */}
      <div className="mt-1 hidden items-center gap-2 max-lg:flex">
        <UsersIcon className="h-4 w-4 text-neutral-500" />
        <p className="text-xs text-neutral-500">{data.jemaah} Jemaah</p>
      </div>
    </>
  )
}

const ConditionalLink = ({
  condition,
  href,
  children,
}: {
  condition: boolean
  href: string
  children: React.ReactNode
}) => {
  return condition ? <Link href={href}>{children}</Link> : <div>{children}</div>
}

// ========================= MAIN COMPONENT =========================
export default function TransactionCard({
  transaction,
  statusTahapan = 'Akan Datang',
  statusTahapanDetail = 'Akan Datang',
  noHeader,
  noAmountLeft,
  noLabelNotif,
  showDpButton,
  fetchTransactions,
  type,
}: TransactionCardProps) {
  const { lg } = useTailwindBreakpoint()

  // ========================= EXTRACT TRANSACTION DATA =========================
  const transactionData: TransactionData = useMemo(() => {
    const status = transaction?.status?.slug

    const noFooterCondition = () => {
      // Only desktop that always show footer
      if (lg) {
        if (
          status === STATUS_BOOKING.WAITING_FOR_BILL ||
          status === 'waiting-approval' ||
          status === STATUS_BOOKING.WAITING_HAJJ_CONFIRMATION ||
          status === 'canceled-by-user' ||
          status === 'canceled-by-travel'
        ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }

    return {
      status,
      id: transaction?.bookingCode,
      bookingId: String(transaction?.id),
      packageName: transaction?.packageSnapshot?.snapshot?.package?.title,
      thumbnail: transaction?.packageSnapshot?.snapshot?.package.thumbnail,
      startDate: transaction?.packageSnapshot?.snapshot?.departureDate,
      endDate: transaction?.packageSnapshot?.snapshot?.arrivalDate,
      createdDate: transaction?.createdAt,
      modifiedAt: transaction?.modifiedAt,
      jemaah: Number.parseInt(transaction?.quantity, 10),
      isCompletedManifest: transaction?.isCompletedManifest,
      isManifestCommitted: transaction?.isManifestCommitted,
      isPaidOff: transaction?.isPaidOff,
      organizationInstanceId: String(
        transaction?.packageSnapshot?.snapshot?.package.organizationInstanceId
      ),
      waitingPeriod:
        transaction?.packageSnapshot?.snapshot?.waitingPeriod ?? '',
      packageType: transaction?.packageSnapshot?.snapshot?.package?.packageType,
      variantType: transaction?.packageSnapshot?.snapshot?.package?.variantType,
      currency:
        status === STATUS_BOOKING.WAITING_DOWN_PAYMENT_HAJJ
          ? 'IDR'
          : transaction?.packageSnapshot?.snapshot?.package?.currency,
      remainingHajjPayment: transaction?.remainingHajjPayment,
      noFooter: noFooterCondition(),
    }
  }, [transaction, lg])

  // ========================= HOOKS =========================
  const [orderPayment, setOrderPayment] = useState<any>(null)
  const [orderPaymentLoading, setOrderPaymentLoading] = useState<boolean>(
    lg ? true : false
  )

  // ========================= COMPUTED VALUES =========================
  const { formattedDepartureDate, formattedArrivalDate } = useMemo(() => {
    return formatDateByPackageType({
      departureDate: transactionData.startDate,
      arrivalDate: transactionData.endDate,
      packageType: transactionData.packageType,
      variantType: transactionData.variantType,
      waitingPeriod: transactionData.waitingPeriod,
    })
  }, [
    transactionData.startDate,
    transactionData.endDate,
    transactionData.packageType,
    transactionData.variantType,
    transactionData.waitingPeriod,
  ])

  const shouldFetchPayment =
    !transactionData.noFooter &&
    transactionData.status !== STATUS_BOOKING.WAITING_HAJJ_CONFIRMATION &&
    transactionData.status !== STATUS_BOOKING.WAITING_FOR_BILL

  const showFooter = !transactionData.noFooter

  // ========================= EFFECTS =========================
  const fetchPaymentTransaction = useCallback(async () => {
    setOrderPaymentLoading(true)
    try {
      const response = await getOrderPayment(transactionData.bookingId)
      setOrderPayment(response)
    } catch (err) {
      console.error('Error fetching transactions:', err)
    } finally {
      setOrderPaymentLoading(false)
    }
  }, [transactionData.bookingId])

  useEffect(() => {
    if (shouldFetchPayment) {
      fetchPaymentTransaction()
    }
  }, [fetchPaymentTransaction, shouldFetchPayment])

  // ========================= RENDER =========================
  return (
    <div className="mt-6 rounded-3xl border border-neutral-200">
      <ConditionalLink
        condition={lg}
        href={`/my/transaction/${transactionData.bookingId}`}
      >
        {!noHeader && (
          <TransactionCardHeader
            status={transactionData.status}
            isCompletedManifest={transactionData.isCompletedManifest}
            isManifestCommitted={transactionData.isManifestCommitted}
            isPaidOff={transactionData.isPaidOff}
            modifiedAt={transactionData.modifiedAt}
            packageType={transactionData.packageType}
            variantType={transactionData.variantType}
          />
        )}
      </ConditionalLink>

      <div
        className={`${!noHeader ? '-mt-5' : ''} overflow-hidden rounded-3xl bg-white shadow-[0px_-5px_4px_0px_#ACACAC1A]`}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between border-b border-neutral-200 p-4">
          <div className="flex items-center gap-2 max-lg:block">
            <p className="font-medium max-lg:text-xs">
              {getSlugByVariantPackage(transactionData.packageType).title}
            </p>
            <p className="font-medium max-lg:hidden">/ </p>
            <p className="text-neutral-500 max-lg:hidden">
              ID : {transactionData.id}
            </p>
            <p className="hidden text-neutral-500 max-lg:block max-lg:text-xs">
              Dibuat Pada:{' '}
              {transactionData.createdDate &&
                dayjs(transactionData.createdDate)
                  .locale('id')
                  .format('DD MMM YYYY')}
            </p>
          </div>

          <div className="flex items-center">
            <StatusBadge
              statusTahapan={statusTahapan}
              createdDate={transactionData.createdDate}
              isDesktop={lg}
            />

            {shouldShowCancelButton(
              transactionData.status,
              transactionData.isPaidOff
            ) && (
              <DrawerBatalkan
                bookingId={transactionData.bookingId}
                idOrganisasi={transactionData.organizationInstanceId}
                id={transactionData.id}
              >
                <MoreVertical className="ml-2 hidden h-4 w-4 text-neutral-500 max-lg:ml-1 max-lg:block" />
              </DrawerBatalkan>
            )}
          </div>
        </div>

        {/* Content Section */}
        <ConditionalLink
          condition={lg}
          href={`/my/transaction/${transactionData.bookingId}`}
        >
          <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-3 lg:gap-4">
            <p className="text-s-regular hidden text-neutral-500 max-lg:block">
              ID : {transactionData.id}
            </p>

            <div className="flex gap-4 md:col-span-2">
              <PackageImage
                thumbnail={transactionData.thumbnail}
                packageName={transactionData.packageName}
              />

              <PackageDetails
                data={transactionData}
                formattedDepartureDate={formattedDepartureDate}
                formattedArrivalDate={formattedArrivalDate}
                noLabelNotif={noLabelNotif}
              />
            </div>

            <TransactionCardPayment
              noLabelNotif={noLabelNotif}
              currency={transactionData.currency}
              isPaidOff={transactionData.isPaidOff}
              noAmountLeft={noAmountLeft}
              bookingId={transactionData.bookingId}
              startDate={transactionData.startDate}
              type={type}
              status={transaction?.status}
              remainingHajjPayment={transactionData.remainingHajjPayment}
              packageType={transactionData.packageType}
            />

            <MobilePackageInfo
              data={transactionData}
              formattedDepartureDate={formattedDepartureDate}
              formattedArrivalDate={formattedArrivalDate}
            />
          </div>
        </ConditionalLink>

        {/* Footer Section */}
        <div
          className={`flex items-center justify-between border-t border-neutral-200 p-4 max-lg:py-2 ${showFooter ? 'max-lg:block' : 'max-lg:hidden'}`}
        >
          <div className="flex items-center gap-2 text-gray-500 max-lg:hidden">
            <p className="text-s-regular text-neutral-500">Dibuat pada</p>
            <Calendar className="h-4 w-4 text-neutral-500" />
            <p className="text-m-regular text-neutral-500">
              {dayjs(transactionData.createdDate)
                .locale('id')
                .format('DD MMMM YYYY')}
            </p>
          </div>

          {showFooter && (
            <Fragment>
              {orderPaymentLoading ? (
                <div className="hidden items-center justify-between p-4 max-lg:block">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <div className="flex gap-2 max-lg:hidden">
                    <Skeleton className="h-10 w-32 rounded-full" />
                    <Skeleton className="h-10 w-40 rounded-full" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </div>
                </div>
              ) : (
                <CanceledProvider>
                  <TransactionCardFooter
                    isPaidOff={transactionData.isPaidOff}
                    isManifestCommitted={transactionData.isManifestCommitted}
                    showDpButton={showDpButton}
                    bookingId={transactionData.bookingId}
                    id={transactionData.id}
                    status={transactionData.status}
                    statusTahapanDetail={statusTahapanDetail}
                    paymentAmount={orderPayment?.orderPayment?.paymentAmount}
                    paymentLink={orderPayment?.paymentLink}
                    paymentToken={orderPayment?.paymentToken}
                    organizationInstanceId={
                      transactionData.organizationInstanceId
                    }
                    fetchTransactions={fetchTransactions}
                    transaction={transaction}
                    remainingHajjPayment={transactionData.remainingHajjPayment}
                    currency={transactionData.currency}
                    type={type ?? ''}
                    variantType={transactionData.variantType}
                  />
                </CanceledProvider>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}
