'use client'
import { ChecklistCircleActive } from '@/components/icons/checkbox'
import { DocumentTextIcon } from '@/components/icons/document'
import { InfoCircleIcon } from '@/components/icons/info-circle'
import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/lib/utils'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'

interface TransactionDetailPaymentProps {
  bookingCode: string
  statusTahapan: string
  createdAt: string
  startDate: string
  isPaidOff: boolean
  paymentDetails: {
    label: string
    amount: number | string
    isBank: boolean
  }[]
}

export default function TransactionDetailPayment({
  bookingCode,
  paymentDetails,
  statusTahapan,
  createdAt,
  startDate,
  isPaidOff,
}: TransactionDetailPaymentProps) {
  return (
    <div className="mb-6 px-6 max-lg:mb-3 max-lg:px-3">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold max-lg:text-xs max-lg:font-medium">
          Rincian Pembayaran
        </h3>

        {statusTahapan !== 'Dibatalkan' && statusTahapan !== 'Waiting' && (
          <Link href={`/invoice/${bookingCode}`}>
            <div className="flex cursor-pointer items-center">
              <div
                className="mr-2 rounded-md p-1"
                style={{
                  background:
                    'linear-gradient(134.15deg, #FFC100 17.72%, #FFA500 104.07%, #9D7A42 128.84%, #4D2B17 195.91%, #785214 236.89%)',
                }}
              >
                <DocumentTextIcon className="text-white" />
              </div>
              <span className="text-sm font-semibold max-lg:text-xs max-lg:font-medium">
                Invoice Pembayaran
              </span>
              <ChevronRight className="ml-1 h-5 w-5" />
            </div>
          </Link>
        )}
      </div>

      {isPaidOff ? (
        <div className="bg-success-100 mb-3 hidden w-fit w-full rounded-full px-3 py-2 max-lg:block">
          <div className="flex items-center gap-1">
            <ChecklistCircleActive />
            <p className="text-s-regular text-success-700 ">
              Lunas pada{' '}
              {dayjs(createdAt).locale('id').format('DD MMM YYYY,HH:mm')}
            </p>
          </div>
        </div>
      ) : (
        <div>
          {statusTahapan !== 'Waiting' && (
            <div
              className={`${dayjs(startDate).subtract(21, 'day') > dayjs() ? 'bg-warning-100' : 'bg-error-100'} mt-1 mb-3 hidden w-fit w-full rounded-full px-3 py-2 max-lg:block`}
            >
              <div
                className={`${dayjs(startDate).subtract(21, 'day') > dayjs() ? 'text-warning-700 ' : 'text-error-700'} flex items-center gap-1`}
              >
                <InfoCircleIcon />
                <p className="text-s-regular text-current">
                  {dayjs(startDate).subtract(21, 'day') > dayjs() ? (
                    <span className="text-current">
                      Harap lunasi sebelum{' '}
                      {dayjs(startDate)
                        .subtract(21, 'day')
                        .locale('id')
                        .format('DD MMM YYYY')}
                    </span>
                  ) : (
                    <span className="text-current">
                      {' '}
                      Segera lunasi pembayaran paket!
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {paymentDetails && paymentDetails.length > 0 && (
        <div className="space-y-2">
          {paymentDetails?.map((item, index) => (
            <div key={index}>
              {item.label === 'divider' ? (
                <Separator />
              ) : (
                <Fragment>
                  {item.isBank ? (
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-500 max-lg:text-xs">
                        {item.label}
                      </span>
                      <span className="text-sm font-semibold max-lg:text-xs max-lg:font-normal">
                        {item.amount === 'bank_transfer'
                          ? 'Bank Transfer'
                          : item.amount}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-500 max-lg:text-xs">
                        {item.label}
                      </span>
                      <span
                        className={`text-sm font-semibold max-lg:text-xs max-lg:font-medium ${item.label === 'Uang Muka' ? 'text-error-500' : Number(item.amount) < 0 ? 'text-error-500' : ''} ${index === paymentDetails.length - 1 ? '!text-base' : ''}`}
                      >
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                  )}
                </Fragment>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
