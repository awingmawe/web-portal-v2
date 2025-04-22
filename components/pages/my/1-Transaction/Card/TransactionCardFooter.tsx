'use client'

import { ChecklistCircle } from '@/components/icons/checkbox'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { getPaymentTransaction } from '@/services/umrah-service'
import { MoreHorizontal } from 'lucide-react'
import { Fragment, useCallback, useEffect, useState } from 'react'

export interface TransactionCardFooter {
  detailOnly?: boolean
  isCompletedManifest: boolean
  isPaidOff: boolean
  showDpButton?: boolean
  bookingId: string
  id: string
  status: string
}

export default function TransactionCardFooter({
  detailOnly,
  status,
  isCompletedManifest,
  isPaidOff,
  showDpButton,
  bookingId,
  id,
}: TransactionCardFooter) {
  const [loadingPaymentTransaction, setLoadingPaymentTransaction] =
    useState(false)
  const [paymentTransaction, setPaymentTransaction] = useState<any>(null)

  const fetcPaymentTransaction = useCallback(async () => {
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
    if (showDpButton) {
      fetcPaymentTransaction()
    }
  }, [fetcPaymentTransaction, showDpButton])

  return (
    <Fragment>
      <div className="flex items-center gap-2 max-lg:hidden">
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
            {(status === 'approved' || status === 'waiting-approval') && (
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
        {showDpButton && (
          <a
            href={paymentTransaction ? paymentTransaction.paymentLink : ''}
            target="_blank"
          >
            <Button
              className="w-full px-8 py-3 text-nowrap"
              disabled={loadingPaymentTransaction}
            >
              Bayar Uang Muka
            </Button>
          </a>
        )}

        {/* {renderCancelAction()} */}
      </div>
      <div className="hidden max-lg:block">
        <Button
          variant={'ghost'}
          className="w-full px-8 py-3 text-nowrap "
          disabled={loadingPaymentTransaction}
        >
          Lihat Detail
        </Button>
        <Button
          className="w-full px-8 py-3 text-nowrap "
          disabled={loadingPaymentTransaction}
        >
          Lengkapi Data Jemaah
        </Button>
        <Button
          className="border-primary-500 mt-3 w-full border-2 px-8 py-3 text-nowrap"
          variant={'outline'}
          disabled={loadingPaymentTransaction}
        >
          Bayar Pelunasan
        </Button>
      </div>
    </Fragment>
  )
}
