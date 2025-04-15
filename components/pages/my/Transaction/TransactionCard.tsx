'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { Calendar, Calendar2 } from '@/components/icons/calendar'
import {
  ChecklistCircle,
  ChecklistCircleActive,
} from '@/components/icons/checkbox'
import { InfoCircleIcon } from '@/components/icons/info-circle'
import { UsersIcon } from '@/components/icons/user'
import { Button } from '@/components/ui/button'
import { PaymentTransaction } from '@/constant/types/PaymentTransaction'
import { formatCurrency } from '@/lib/utils'
import {
  getPaymentStatement,
  getPaymentTransaction,
} from '@/services/umrah-service'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import Image from 'next/image'
import { Fragment, useCallback, useEffect, useState } from 'react'

export interface TransactionCardProps {
  status: string
  id: string
  bookingId: string
  packageName: string
  thumbnail: string
  startDate: string
  endDate: string
  createdDate: string
  jemaah: number
  isCompletedManifest: boolean
  isPaidOff: boolean
  statusTahapan: string
  noHeader?: boolean
  noAmountLeft?: boolean
  detailOnly?: boolean
  noLabelNotif?: boolean
}

function renderLunas(
  isPaidOff: boolean,
  loading: boolean,
  transaction: PaymentTransaction
) {
  if (loading) {
    return <p className="text-s-regular text-warning-700 ">...</p>
  }
  return isPaidOff ? (
    <div className="bg-success-100 w-fit rounded-full px-3 py-1">
      <div className="flex items-center gap-1">
        <ChecklistCircleActive />
        <p className="text-s-regular text-success-700 ">
          Lunas pada{' '}
          {dayjs(transaction?.createdAt)
            .locale('id')
            .format('DD MMM YYYY,HH:mm')}
        </p>
      </div>
    </div>
  ) : (
    <div className="bg-warning-100 mt-1 w-fit rounded-full px-3 py-1">
      <div className="text-warning-700 flex items-center gap-1">
        <InfoCircleIcon />
        <p className="text-s-regular text-warning-700 ">
          Segera lunasi pembayaran kamu
        </p>
      </div>
    </div>
  )
}
function renderManifestComplete(isCompletedManifest: boolean) {
  return isCompletedManifest ? (
    <div className="bg-success-100 rounded-full px-3 py-1">
      <div className="flex items-center gap-1">
        <ChecklistCircleActive />
        <p className="text-s-regular text-success-700 ">Data Lengkap</p>
      </div>
    </div>
  ) : (
    <div className="bg-warning-100  rounded-full px-3 py-1">
      <div className="text-warning-700 flex items-center gap-1">
        <InfoCircleIcon />
        <p className="text-s-regular text-warning-700 ">
          Segera lengkapi data jemaah
        </p>
      </div>
    </div>
  )
}

// function renderCancelAction() {
//   return (
//     <div className="flex gap-3">
//       <Button
//         variant="outline"
//         className="border-primary-500 w-full rounded-full border-2 px-8 py-3 text-nowrap"
//       >
//         Proses Refund
//       </Button>
//       <Link href={'/search'}>
//         <Button className="w-full px-7 py-3 text-nowrap">
//           Cari Paket Lain
//         </Button>
//       </Link>
//     </div>
//   )
// }

export default function TransactionCard({
  status,
  id,
  packageName,
  thumbnail,
  bookingId,
  startDate,
  endDate,
  createdDate,
  jemaah,
  isCompletedManifest,
  isPaidOff,
  statusTahapan,
  noHeader,
  noAmountLeft,
  detailOnly,
  noLabelNotif,
}: TransactionCardProps) {
  const [loadingStatement, setLoadingStatement] = useState(false)
  const [paymentStatement, setPaymentStatement] = useState<any>(null)
  const [loadingPaymentTransaction, setLoadingPaymentTransaction] =
    useState(false)
  const [paymentTransaction, setPaymentTransaction] = useState<any>(null)

  const renderStatusTahapanColor = (status: string) => {
    if (status == 'Akan Datang') {
      return 'bg-info-100 text-info-700'
    } else if (status === 'Selesai') {
      return 'bg-success-100 text-success-700'
    } else if (
      status == 'Dibatalkan Jemaah' ||
      status == 'Dibatalkan Travel' ||
      status == 'Dalam Proses Pembatalan'
    ) {
      return 'bg-error-100 text-error-700'
    } else {
      return 'bg-neutral-100 text-neutral-700'
    }
  }
  const renderStatusColor = (
    status: string,
    isPaidOff?: boolean,
    isCompletedManifest?: boolean
  ) => {
    if (isPaidOff && isCompletedManifest) {
      return 'bg-success-100 text-success-700'
    } else if (status === 'waiting-approval') {
      return 'bg-warning-100 text-warning-700'
    } else if (
      status == 'waiting-cancellation' ||
      status == 'canceled-by-travel' ||
      status == 'canceled-by-user'
    ) {
      return 'bg-error-100 text-error-700'
    } else {
      return 'bg-info-100/50 text-info-700/90'
    }
  }

  const renderStatusText = (
    status: string,
    isPaidOff?: boolean,
    isCompletedManifest?: boolean
  ) => {
    if (isPaidOff && isCompletedManifest) {
      return 'Siap Berangkat!'
    } else if (status === 'waiting-approval') {
      return 'Menunggu konfirmasi'
    } else if (
      status == 'waiting-cancellation' ||
      status == 'canceled-by-travel' ||
      status == 'canceled-by-user'
    ) {
      return 'Dalam Proses Pembatalan'
    } else {
      return 'Menunggu kelengkapan data jemaah dan pelunasan pembayaran'
    }
  }

  const fetchPaymentStatement = useCallback(async () => {
    setLoadingStatement(true)

    try {
      // Build query parameters
      const response = await getPaymentStatement(bookingId)

      // Update state with response data
      setPaymentStatement(response)
    } catch (err) {
      console.error('Error fetching transactions:', err)
    } finally {
      setLoadingStatement(false)
    }
  }, [bookingId])

  const fetPaymentTransaction = useCallback(async () => {
    setLoadingPaymentTransaction(true)

    try {
      // Build query parameters
      const response = await getPaymentTransaction(bookingId)

      // Update state with response data
      setPaymentTransaction(response)
    } catch (err) {
      console.error('Error fetching transactions:', err)
    } finally {
      setLoadingPaymentTransaction(false)
    }
  }, [bookingId])

  useEffect(() => {
    if (!noAmountLeft) {
      fetchPaymentStatement()
      if (isPaidOff) {
        fetPaymentTransaction()
      }
    }
  }, [fetchPaymentStatement, fetPaymentTransaction, noAmountLeft, isPaidOff])

  return (
    <div className="mt-6 rounded-3xl border border-neutral-200 ">
      {!noHeader && (
        <div
          className={`rounded-t-3xl px-4 pt-4 pb-8  ${renderStatusColor(status, isPaidOff, isCompletedManifest)}`}
        >
          <h3 className="text-l-medium text-inherit">
            {renderStatusText(status, isPaidOff, isCompletedManifest)}
          </h3>
        </div>
      )}
      <div
        className={`${!noHeader ? '-mt-5' : ''} overflow-hidden rounded-3xl bg-white shadow-[0px_-5px_4px_0px_#ACACAC1A]`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 p-4">
          <div className="flex items-center gap-2">
            <p className="font-medium">Umroh /</p>
            <p className="text-neutral-500">ID : {id}</p>
          </div>
          <p
            className={`text-m-medium ${renderStatusTahapanColor(statusTahapan)} rounded-full px-6 py-2`}
          >
            {statusTahapan}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
          <div className="flex gap-4 md:col-span-2">
            <div className="h-32 w-32 flex-shrink-0">
              <Image
                src={thumbnail}
                alt="Umroh Package"
                width={128}
                height={128}
                className="h-full w-full rounded-md object-cover"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-l-semibold">{packageName}</h2>
                <div className="mt-4 flex items-center gap-2">
                  <Calendar2 className="h-5 w-5 text-neutral-500" />
                  <p className="text-m-regular flex items-center text-neutral-500">
                    {dayjs(startDate).locale('id').format('DD MMMM YYYY')}{' '}
                    <ArrowIcon size={20} className="mx-2 text-neutral-500" />{' '}
                    {dayjs(endDate).locale('id').format('DD MMMM YYYY')}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <UsersIcon className="h-5 w-5 text-neutral-500" />
                  <p className="text-m-regular text-neutral-500">
                    {jemaah} Jemaah
                  </p>
                  {!noLabelNotif && renderManifestComplete(isCompletedManifest)}
                </div>
              </div>
            </div>
          </div>
          {!noAmountLeft && (
            <div className="flex flex-col border-t border-neutral-100 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-4">
              <p className="text-m-medium text-neutral-500">Sisa Pembayaran</p>
              <p className="text-l-semibold">
                {isPaidOff
                  ? '-'
                  : loadingStatement
                    ? '...'
                    : paymentStatement
                      ? formatCurrency(paymentStatement.remainingPayment)
                      : '-'}
              </p>
              {!noLabelNotif &&
                renderLunas(
                  isPaidOff,
                  loadingPaymentTransaction,
                  paymentTransaction
                )}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between border-t border-neutral-200 p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <p className="text-s-regular text-neutral-500">Dibuat pada</p>
            <Calendar className="h-4 w-4 text-neutral-500" />
            <p className="text-m-regular text-neutral-500">
              {dayjs(createdDate).locale('id').format('DD MMMM YYYY')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-s-regular mr-4 font-medium text-nowrap text-gray-900">
              Lihat Detail Pesanan
            </p>
            {!detailOnly && (
              <Fragment>
                {isPaidOff ? (
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-2 px-8 py-3 text-nowrap"
                    disabled
                  >
                    <ChecklistCircle />
                    Pelunasan
                  </Button>
                ) : (
                  status !== 'waiting-approval' && (
                    <Button
                      variant="outline"
                      className="border-primary-500 w-full rounded-full border-2 px-8 py-3 text-nowrap"
                    >
                      Bayar Pelunasan
                    </Button>
                  )
                )}
                {!isCompletedManifest && (
                  <Button className="w-full px-4 py-3 text-nowrap">
                    Lengkapi Data Jemaah
                  </Button>
                )}
                {/* <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className="cursor-pointer !rounded-md border border-neutral-900 p-1"
                      variant={'outline'}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="rounded-2xl p-0 px-1">
                    <div className="flex flex-col divide-y">
                      <div className="cursor-pointer p-3 hover:bg-gray-50">
                        <p className="text-m-regular text-error-500">
                          Batalkan Pesanan
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover> */}
              </Fragment>
            )}

            {/* {renderCancelAction()} */}
          </div>
        </div>
      </div>
    </div>
  )
}
