'use client'

import { ArrowIcon } from '@/components/icons/arrow'
import { Calendar, Calendar2 } from '@/components/icons/calendar'
import { ChecklistCircleActive } from '@/components/icons/checkbox'
import { InfoCircleIcon } from '@/components/icons/info-circle'
import { TimerIcon } from '@/components/icons/timer'
import { UsersIcon } from '@/components/icons/user'
import TransactionCardFooter from '@/components/pages/my/1-Transaction/Card/TransactionCardFooter'
import TransactionCardHeader from '@/components/pages/my/1-Transaction/Card/TransactionCardHeader'
import TransactionCardPayment from '@/components/pages/my/1-Transaction/Card/TransactionCardPayment'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import Image from 'next/image'

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
  showDpButton?: boolean
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
  showDpButton,
}: TransactionCardProps) {
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
    } else if (status == 'Waiting') {
      return 'bg-warning-100 text-warning-700'
    } else {
      return 'bg-neutral-100 text-neutral-700'
    }
  }

  const renderStatusTahapanText = (status: string) => {
    if (status === 'Waiting') {
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
    } else {
      return status
    }
  }

  return (
    <div className="mt-6 rounded-3xl border border-neutral-200 ">
      {!noHeader && (
        <TransactionCardHeader
          status={status}
          isCompletedManifest={isCompletedManifest}
          isPaidOff={isPaidOff}
        />
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
            {renderStatusTahapanText(statusTahapan)}
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
                <h2 className="text-l-semibold uppercase">{packageName}</h2>
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
          <TransactionCardPayment
            noLabelNotif={noLabelNotif}
            isPaidOff={isPaidOff}
            noAmountLeft={noAmountLeft}
            bookingId={bookingId}
          />
        </div>
        <div className="flex items-center justify-between border-t border-neutral-200 p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <p className="text-s-regular text-neutral-500">Dibuat pada</p>
            <Calendar className="h-4 w-4 text-neutral-500" />
            <p className="text-m-regular text-neutral-500">
              {dayjs(createdDate).locale('id').format('DD MMMM YYYY')}
            </p>
          </div>
          <TransactionCardFooter
            detailOnly={detailOnly}
            isPaidOff={isPaidOff}
            isCompletedManifest={isCompletedManifest}
            showDpButton={showDpButton}
            bookingId={bookingId}
          />
        </div>
      </div>
    </div>
  )
}
