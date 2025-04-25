'use client'
import { DocumentTextIcon } from '@/components/icons/document'
import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'

interface TransactionDetailPaymentProps {
  bookingCode: string
  statusTahapan: string
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
}: TransactionDetailPaymentProps) {
  return (
    <div className="mb-6 px-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-m-semibold">Rincian Pembayaran</h3>

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
              <span className="text-m-semibold">Invoice Pembayaran</span>
              <ChevronRight className="ml-1 h-5 w-5" />
            </div>
          </Link>
        )}
      </div>
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
                      <span className="text-s-regular text-neutral-500">
                        {item.label}
                      </span>
                      <span className="text-m-semibold">
                        {item.amount === 'bank_transfer'
                          ? 'Bank Transfer'
                          : item.amount}
                      </span>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <span className="text-s-regular text-neutral-500">
                        {item.label}
                      </span>
                      <span
                        className={`text-m-semibold ${Number(item.amount) < 0 ? 'text-error-500' : ''}`}
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
