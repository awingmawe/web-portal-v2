'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { Calendar, Calendar2 } from '@/components/icons/calendar'
import { ChecklistCircle } from '@/components/icons/checkbox'
import { InfoCircleIcon } from '@/components/icons/info-circle'
import { UsersIcon } from '@/components/icons/user'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { formatCurrency } from '@/lib/utils'
import { getPaymentStatement } from '@/services/umrah-service'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { Loader2, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

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
}

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
}: TransactionCardProps) {
  const [loadingStatement, setLoadingStatement] = useState(false)
  const [paymentStatement, setPaymentStatement] = useState<any>(null)

  const renderStatusColor = (status: string) => {
    if (status === 'waiting-approval') {
      return 'bg-warning-100 text-warning-700'
    } else if (status === 'Success') {
      return 'bg-success-100 text-success-700'
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

  const renderStatusText = (status: string) => {
    if (status === 'waiting-approval') {
      return 'Menunggu konfirmasi'
    } else if (status === 'is-paid') {
      return 'Siap Berangkat!'
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

  useEffect(() => {
    fetchPaymentStatement()
  }, [fetchPaymentStatement])

  return (
    <div className="mt-6 rounded-3xl border border-neutral-200">
      <div
        className={`rounded-t-3xl px-4 pt-4 pb-8  ${renderStatusColor(status)}`}
      >
        <h3 className="text-l-medium text-inherit">
          {renderStatusText(status)}
        </h3>
      </div>
      <div className="-mt-5 overflow-hidden rounded-3xl bg-white shadow-[0px_-5px_4px_0px_#ACACAC1A]">
        <div className="flex items-center justify-between border-b border-neutral-200 p-4">
          <div className="flex items-center gap-2">
            <p className="font-medium">Umroh /</p>
            <p className="text-neutral-500">ID : {id}</p>
          </div>
          <p className="text-m-medium bg-info-100 text-info-700 rounded-full px-6 py-2">
            Akan Datang
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
                  {isCompletedManifest ? (
                    <div className="bg-success-100 text-success-700 flex items-center gap-1 rounded-full px-3 py-1">
                      <ChecklistCircle />
                      <p className="text-s-regular text-success-700 ">
                        Data Lengkap
                      </p>
                    </div>
                  ) : (
                    <div className="bg-warning-100 text-warning-700 flex items-center gap-1 rounded-full px-3 py-1">
                      <InfoCircleIcon />
                      <p className="text-s-regular text-warning-700 ">
                        Segera lengkapi data jemaah
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {loadingStatement ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : paymentStatement ? (
            <div className="flex flex-col border-t border-neutral-100 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-4">
              <p className="text-m-medium text-neutral-500">Sisa Pembayaran</p>
              <p className="text-l-semibold">
                {isPaidOff
                  ? '-'
                  : formatCurrency(paymentStatement.remainingPayment)}
              </p>
            </div>
          ) : null}
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
              <Button
                variant="outline"
                className="border-primary-500 w-full rounded-full border-2 px-8 py-3 text-nowrap"
              >
                Bayar Pelunasan
              </Button>
            )}
            <Button className="w-full px-4 py-3 text-nowrap">
              Lengkapi Data Jemaah
            </Button>
            <Popover>
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
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
