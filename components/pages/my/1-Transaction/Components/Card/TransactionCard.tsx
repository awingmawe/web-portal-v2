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

export interface TransactionCardProps {
  transaction: Transaction
  statusTahapan?: string
  statusTahapanDetail?: string
  noHeader?: boolean
  noAmountLeft?: boolean
  detailOnly?: boolean
  noLabelNotif?: boolean
  showDpButton?: boolean
  fetchTransactions?: any
  type?: string
}

function renderManifestComplete(
  isCompletedManifest: boolean,
  createdDate: string
) {
  return isCompletedManifest ? (
    <div className="bg-success-100 rounded-full px-3 py-1">
      <div className="flex items-center gap-1">
        <ChecklistCircleActive />
        <p className="text-s-regular text-success-700 ">Data Lengkap</p>
      </div>
    </div>
  ) : (
    <div
      className={`${dayjs(createdDate).add(3, 'day').locale('id') > dayjs().locale('id') ? 'bg-warning-100' : 'bg-error-100'}  rounded-full px-3 py-1`}
    >
      <div
        className={`${dayjs(createdDate).add(3, 'day').locale('id') > dayjs().locale('id') ? 'text-warning-700' : 'text-error-700'} flex items-center gap-1`}
      >
        <InfoCircleIcon />
        <p className="text-s-regular text-current">
          {dayjs(createdDate).add(3, 'day') > dayjs() ? (
            <span className="text-current">
              Lengkapi sebelum{' '}
              {dayjs(createdDate)
                .add(3, 'day')
                .locale('id')
                .format('DD MMM YYYY')}
            </span>
          ) : (
            <span className="text-current">Segera lengkapi manifest</span>
          )}
        </p>
      </div>
    </div>
  )
}

const RenderLinkToDetail = ({
  lg,
  bookingId,
  children,
}: {
  lg: boolean
  bookingId: string
  statusTahapan: string
  children: React.ReactNode
}) => {
  if (lg) {
    return <Link href={`/my/transaction/${bookingId}`}>{children}</Link>
  }

  return <div>{children}</div>
}

export default function TransactionCard({
  transaction,
  statusTahapan = 'Akan Datang',
  statusTahapanDetail = 'Akan Datang',
  noHeader,
  noAmountLeft,
  detailOnly,
  noLabelNotif,
  showDpButton,
  fetchTransactions,
  type,
}: TransactionCardProps) {
  // ---------------------- PROPERTIES FROM TRANSACTION -------------------------------- //
  // ---------------- ADD NEW PROPERTIES HERE FROM TRANSACTION -------------------------//
  const status = transaction?.status?.slug
  const id = transaction?.bookingCode
  const bookingId = String(transaction?.id)
  const packageName = transaction?.packageSnapshot?.snapshot?.package?.title
  const thumbnail = transaction?.packageSnapshot?.snapshot?.package.thumbnail
  const startDate = transaction?.packageSnapshot?.snapshot?.departureDate
  const endDate = transaction?.packageSnapshot?.snapshot?.arrivalDate
  const createdDate = transaction?.createdAt
  const modifiedAt = transaction?.modifiedAt
  const jemaah = Number.parseInt(transaction?.quantity, 10)
  const isCompletedManifest = transaction?.isCompletedManifest
  const isManifestCommitted = transaction?.isManifestCommitted
  const isPaidOff = transaction?.isPaidOff
  const organizationInstanceId =
    transaction?.packageSnapshot?.snapshot?.package.organizationInstanceId
  const waitingPeriod = transaction?.packageSnapshot?.snapshot?.waitingPeriod
  const packageType =
    transaction?.packageSnapshot?.snapshot?.package?.packageType
  const variantType =
    transaction?.packageSnapshot?.snapshot?.package?.variantType
  const currency = transaction?.packageSnapshot?.snapshot?.package?.currency
  const remainingHajjPayment = transaction?.remainingHajjPayment

  // Compute noFooter logic inside component
  const noFooter =
    transaction?.status.slug == 'waiting-approval' ||
    (transaction?.isPaidOff && transaction?.isCompletedManifest)

  // -------------------- END PROPERTIES FROM TRANSACTION ---------------------------- //

  const { lg } = useTailwindBreakpoint()
  const [orderPayment, setOrderPayment] = useState<any>(null)
  const [orderPaymentLoading, setOrderPaymentLoading] = useState<any>(
    lg ? true : false
  )

  const { formattedDepartureDate, formattedArrivalDate } = useMemo(() => {
    return formatDateByPackageType({
      departureDate: startDate,
      arrivalDate: endDate,
      packageType,
      variantType,
      waitingPeriod,
    })
  }, [startDate, endDate, packageType, variantType, waitingPeriod])

  const fetcPaymentTransaction = useCallback(async () => {
    setOrderPaymentLoading(true)
    try {
      // Build query parameters
      const response = await getOrderPayment(bookingId)

      // Update state with response data
      setOrderPayment(response)
      setOrderPaymentLoading(false)
    } catch (err) {
      console.error('Error fetching transactions:', err)
    }
  }, [bookingId])

  useEffect(() => {
    if (
      !noFooter &&
      lg &&
      status != STATUS_BOOKING.WAITING_HAJJ_CONFIRMATION &&
      status != STATUS_BOOKING.WAITING_FOR_BILL
    ) {
      fetcPaymentTransaction()
    }
  }, [fetcPaymentTransaction, noFooter, lg, status])

  const renderStatusTahapanColor = (status: string) => {
    if (status == 'Akan Datang') {
      return 'bg-info-100 text-info-700'
    } else if (status === 'Selesai') {
      return 'bg-success-100 text-success-700'
    } else if (
      status == 'Dibatalkan Jemaah' ||
      status == 'Dibatalkan Travel' ||
      status == 'Dibatalkan Sistem' ||
      status == 'Dalam Proses Pembatalan'
    ) {
      return 'bg-error-100 text-error-700'
    } else if (status == 'Waiting') {
      return lg ? '' : 'bg-warning-100 text-warning-700'
    } else {
      return 'bg-neutral-100 text-neutral-700'
    }
  }

  const renderStatusTahapanText = (status: string) => {
    if (status === 'Waiting') {
      if (lg) {
        return (
          <span>
            <span className="text-xs-medium block text-right text-neutral-500">
              Bayar Sebelum
            </span>
            <span className="text-warning-600 flex items-center">
              <TimerIcon className="mr-1" size={17} />
              {dayjs(createdDate)
                .add(1, 'day')
                .locale('id')
                .format('DD MMM YYYY HH:mm')}
            </span>
          </span>
        )
      } else {
        return (
          <span className="text-warning-700 flex">
            <TimerIcon className="mr-2" />
            Harap bayar uang muka sebelum{' '}
            {dayjs(createdDate)
              .add(1, 'day')
              .locale('id')
              .format('DD MMMM YYYY HH:mm')}
          </span>
        )
      }
    } else {
      return status
    }
  }

  return (
    <div className="mt-6 rounded-3xl border border-neutral-200 ">
      <RenderLinkToDetail
        lg={lg}
        bookingId={bookingId}
        statusTahapan={statusTahapan}
      >
        {!noHeader && (
          <TransactionCardHeader
            status={status}
            isCompletedManifest={isCompletedManifest}
            isPaidOff={isPaidOff}
            modifiedAt={modifiedAt}
          />
        )}
      </RenderLinkToDetail>

      <div
        className={`${!noHeader ? '-mt-5' : ''} overflow-hidden rounded-3xl bg-white shadow-[0px_-5px_4px_0px_#ACACAC1A]`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 p-4">
          <div className="flex items-center gap-2 max-lg:block">
            <p className="font-medium max-lg:text-xs">
              {getSlugByVariantPackage(packageType).title}
            </p>
            <p className="font-medium max-lg:hidden">/ </p>
            <p className="text-neutral-500 max-lg:hidden">ID : {id}</p>
            <p className="hidden text-neutral-500 max-lg:block max-lg:text-xs">
              Dibuat Pada:{' '}
              {createdDate &&
                dayjs(createdDate).locale(id).format('DD MMM YYYY')}
            </p>
          </div>
          <div className="flex items-center">
            <p
              className={`text-m-medium ${renderStatusTahapanColor(statusTahapan)} rounded-full px-6 py-2 max-lg:py-1 max-lg:text-xs ${statusTahapan === 'Waiting' ? 'max-lg:px-0' : 'max-lg:px-2'}`}
            >
              {renderStatusTahapanText(statusTahapan)}
            </p>
            {!isPaidOff && (
              <Fragment>
                {status === 'approved' ||
                  status === 'waiting-approval' ||
                  status === 'waiting-down-payment' ||
                  (status === STATUS_BOOKING.WAITING_DOWN_PAYMENT_HAJJ && (
                    <DrawerBatalkan
                      bookingId={bookingId}
                      idOrganisasi={organizationInstanceId}
                      id={id}
                    >
                      {/* <Button
                      className="!rounded-lg border-2 border-neutral-900 px-1 py-1"
                      variant="outline"
                    > */}
                      <MoreVertical className=" ml-2 hidden h-4 w-4 text-neutral-500 max-lg:ml-1 max-lg:block" />
                      {/* </Button> */}
                    </DrawerBatalkan>
                  ))}
              </Fragment>
            )}
          </div>
        </div>
        <RenderLinkToDetail
          lg={lg}
          bookingId={bookingId}
          statusTahapan={statusTahapan}
        >
          <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-3 lg:gap-4">
            <p className="text-s-regular hidden text-neutral-500 max-lg:block">
              ID : {id}
            </p>
            <div className="flex gap-4 md:col-span-2">
              <div className="h-32 w-32 flex-shrink-0 max-lg:h-20 max-lg:w-20">
                {thumbnail ? (
                  <Image
                    src={thumbnail}
                    alt="Umroh Package"
                    width={128}
                    height={128}
                    className="block h-full w-full rounded-md object-cover max-lg:hidden"
                  />
                ) : (
                  <Image
                    src={'/thumbnail.png'}
                    alt="Umroh Package"
                    width={60}
                    height={60}
                    className="block h-full w-full rounded-md object-cover max-lg:hidden"
                  />
                )}
                {thumbnail ? (
                  <Image
                    src={thumbnail}
                    alt="Umroh Package"
                    width={60}
                    height={60}
                    className="hidden h-full w-full rounded-md object-cover max-lg:block"
                  />
                ) : (
                  <Image
                    src={'/thumbnail.png'}
                    alt="Umroh Package"
                    width={60}
                    height={60}
                    className="hidden h-full w-full rounded-md object-cover max-lg:block"
                  />
                )}
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-l-semibold leading-[16px] uppercase max-lg:text-xs">
                    {packageName}
                  </h2>
                  <div className="mt-4 flex items-center gap-2 max-lg:hidden">
                    <Calendar2 className="h-5 w-5 text-neutral-500" />
                    <p className="text-m-regular flex items-center text-neutral-500">
                      {formattedDepartureDate}
                      {formattedArrivalDate}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 max-lg:hidden">
                    <UsersIcon className="h-5 w-5 text-neutral-500" />
                    <p className="text-m-regular text-neutral-500">
                      {jemaah} Jemaah
                    </p>
                    {packageType === PACKAGE_TYPE.UMRAH &&
                      !noLabelNotif &&
                      renderManifestComplete(isCompletedManifest, createdDate)}
                  </div>
                </div>
              </div>
            </div>
            <TransactionCardPayment
              noLabelNotif={noLabelNotif}
              currency={currency}
              isPaidOff={isPaidOff}
              noAmountLeft={noAmountLeft}
              bookingId={bookingId}
              startDate={startDate}
              type={type}
              status={transaction?.status}
              remainingHajjPayment={remainingHajjPayment}
              packageType={packageType}
            />
            <div className="hidden items-center gap-2 max-lg:flex">
              <Calendar2 className="h-4 w-4 text-neutral-500" />
              <p className="flex items-center text-xs text-neutral-500">
                {formattedDepartureDate}
                {formattedArrivalDate}
              </p>
            </div>
            <div className="mt-1 hidden items-center gap-2 max-lg:flex">
              <UsersIcon className="h-4 w-4 text-neutral-500" />
              <p className="text-xs text-neutral-500">{jemaah} Jemaah</p>
            </div>
          </div>
        </RenderLinkToDetail>
        <div
          className={`flex items-center justify-between border-t border-neutral-200 p-4 max-lg:py-2 ${
            noFooter ||
            status == STATUS_BOOKING.WAITING_HAJJ_CONFIRMATION ||
            status == STATUS_BOOKING.WAITING_FOR_BILL
              ? 'max-lg:hidden'
              : 'max-lg:block'
          }`}
        >
          <div className="flex items-center gap-2 text-gray-500 max-lg:hidden">
            <p className="text-s-regular text-neutral-500">Dibuat pada</p>
            <Calendar className="h-4 w-4 text-neutral-500" />
            <p className="text-m-regular text-neutral-500">
              {dayjs(createdDate).locale('id').format('DD MMMM YYYY')}
            </p>
          </div>
          {!noFooter && (
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
                    detailOnly={detailOnly}
                    isPaidOff={isPaidOff}
                    isCompletedManifest={isCompletedManifest}
                    isManifestCommitted={isManifestCommitted}
                    showDpButton={showDpButton}
                    bookingId={bookingId}
                    id={id}
                    status={status}
                    statusTahapanDetail={statusTahapanDetail}
                    paymentAmount={orderPayment?.orderPayment?.paymentAmount}
                    organizationInstanceId={organizationInstanceId}
                    fetchTransactions={fetchTransactions}
                    transaction={transaction}
                    remainingHajjPayment={remainingHajjPayment}
                    currency={currency}
                    type={type ?? ''}
                  />
                </CanceledProvider>
              )}
            </Fragment>
          )}
        </div>
      </div>
      {/* {openBatalkan && (
         <DrawerBatalkanPesanan
          bookingId={bookingId}
          idOrganisasi={organizationInstanceId}
          openForm={openForm}
          setOpenForm={setOpenForm}
          setOpen={setOpen}
        />
      )} */}
    </div>
  )
}
