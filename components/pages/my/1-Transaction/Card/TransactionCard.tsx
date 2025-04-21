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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { MoreVertical } from 'lucide-react'
import Image from 'next/image'
import { Fragment } from 'react'

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
  noFooter?: boolean
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
  noFooter,
}: TransactionCardProps) {
  const { lg } = useTailwindBreakpoint()

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
          <span className="text-warning-600 flex">
            <TimerIcon className="mr-2" />
            {dayjs(createdDate)
              .add(1, 'day')
              .locale('id')
              .format('DD MMMM YYYY HH:mm')}
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
          <div className="flex items-center gap-2 max-lg:block">
            <p className="font-medium max-lg:text-xs">Umroh</p>
            <p className="font-medium max-lg:hidden">/ </p>
            <p className="text-neutral-500 max-lg:hidden">ID : {id}</p>
            <p className="hidden text-neutral-500 max-lg:block max-lg:text-xs">
              Dibuat Pada: {dayjs(createdDate).locale(id).format('DD MMM YYYY')}
            </p>
          </div>
          <div className="flex items-center">
            <p
              className={`text-m-medium ${renderStatusTahapanColor(statusTahapan)} rounded-full px-6 py-2 max-lg:px-2 max-lg:py-1 max-lg:text-xs`}
            >
              {renderStatusTahapanText(statusTahapan)}
            </p>
            {!isPaidOff && (
              <Fragment>
                {(status === 'approved' || status === 'waiting-approval') && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <MoreVertical className="ml-1 ml-2 hidden h-4 w-4 text-neutral-500 max-lg:block" />
                    </PopoverTrigger>
                    <PopoverContent className="rounded-2xl p-0 px-1">
                      <div className="flex flex-col divide-y">
                        <a
                          href={`https://wa.me/628888755101?text=Assalamualaikum,+maaf+saya+ingin+membatalkan+pesanan+saya+dengan+kode+${id}`}
                          className="cursor-pointer p-3 hover:bg-gray-50"
                          target="_blank"
                        >
                          <p className="text-m-regular text-error-500">
                            Batalkan Pesanan
                          </p>
                        </a>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </Fragment>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-3 lg:gap-4">
          <p className="text-s-regular hidden text-neutral-500 max-lg:block">
            ID : {id}
          </p>
          <div className="flex gap-4 md:col-span-2">
            <div className="h-32 w-32 flex-shrink-0 max-lg:h-20 max-lg:w-20">
              <Image
                src={thumbnail}
                alt="Umroh Package"
                width={128}
                height={128}
                className="block h-full w-full rounded-md object-cover max-lg:hidden"
              />
              <Image
                src={thumbnail}
                alt="Umroh Package"
                width={60}
                height={60}
                className="hidden h-full w-full rounded-md object-cover max-lg:block"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-l-semibold leading-[16px] uppercase max-lg:text-xs">
                  {packageName}
                </h2>
                <div className="mt-4 flex items-center gap-2 max-lg:hidden">
                  <Calendar2 className="h-5 w-5 text-neutral-500" />
                  <p className="text-m-regular flex items-center text-neutral-500">
                    {dayjs(startDate).locale('id').format('DD MMMM YYYY')}{' '}
                    <ArrowIcon size={20} className="mx-2 text-neutral-500" />{' '}
                    {dayjs(endDate).locale('id').format('DD MMMM YYYY')}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2 max-lg:hidden">
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
          <div className="hidden items-center gap-2 max-lg:flex">
            <Calendar2 className="h-4 w-4 text-neutral-500" />
            <p className="flex items-center text-xs text-neutral-500">
              {dayjs(startDate).locale('id').format('DD MMMM YYYY')}{' '}
              <ArrowIcon size={18} className="mx-2 text-neutral-500" />{' '}
              {dayjs(endDate).locale('id').format('DD MMMM YYYY')}
            </p>
          </div>
          <div className="mt-1 hidden items-center gap-2 max-lg:flex">
            <UsersIcon className="h-4 w-4 text-neutral-500" />
            <p className="text-xs text-neutral-500">{jemaah} Jemaah</p>
          </div>
        </div>
        <div
          className={`flex items-center justify-between border-t border-neutral-200 p-4 max-lg:py-2 ${noFooter ? 'max-lg:hidden' : 'max-lg:block'}`}
        >
          <div className="flex items-center gap-2 text-gray-500 max-lg:hidden">
            <p className="text-s-regular text-neutral-500">Dibuat pada</p>
            <Calendar className="h-4 w-4 text-neutral-500" />
            <p className="text-m-regular text-neutral-500">
              {dayjs(createdDate).locale('id').format('DD MMMM YYYY')}
            </p>
          </div>
          {!noFooter && (
            <TransactionCardFooter
              detailOnly={detailOnly}
              isPaidOff={isPaidOff}
              isCompletedManifest={isCompletedManifest}
              showDpButton={showDpButton}
              bookingId={bookingId}
              id={id}
              status={status}
            />
          )}
        </div>
      </div>
    </div>
  )
}
