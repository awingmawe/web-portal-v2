'use client'
import { ChecklistCircleActive } from '@/components/icons/checkbox'
import { DocumentTextIcon } from '@/components/icons/document'
import { InfoCircleIcon } from '@/components/icons/info-circle'
import { Separator } from '@/components/ui/separator'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface TransactionDetailPaymentProps {
  bookingCode: string
  statusTahapan: string
  createdAt: string
  startDate: string
  isPaidOff: boolean
  paymentDetails: any
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

        {statusTahapan !== 'Dibatalkan' &&
          statusTahapan !== 'Waiting' &&
          statusTahapan !== 'Waiting Hajj' && (
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
          {statusTahapan !== 'Waiting' && statusTahapan !== 'Waiting Hajj' && (
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
          {paymentDetails.map((item: any, index: any) => (
            <div key={index}>
              {item.label === 'divider' ? (
                <Separator />
              ) : (
                <div className="flex items-start justify-between">
                  <span className="text-sm whitespace-pre-line text-neutral-500 max-lg:text-xs">
                    {item.label}
                  </span>
                  <div className="flex flex-col items-end space-y-1">
                    {item.amount?.map((amt: any, amtIndex: any) => (
                      <span
                        key={amtIndex}
                        className={`
                    ${amt.style === 'heavy' ? 'text-[16px] font-[800]' : ''}
                    ${amt.style === 'medium' ? 'text-[14px] font-[600]' : ''}
                    ${amt.style === 'small' ? 'text-[12px] font-[400]' : ''}
                    max-lg:text-xs
                  `}
                        style={{ color: amt.color }}
                      >
                        {amt.amountLabel}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
