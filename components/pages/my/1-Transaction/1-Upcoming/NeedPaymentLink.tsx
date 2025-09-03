'use client'
import { ChevronRightIcon } from '@/components/icons/chevron'
import { MoneyTimeIcon } from '@/components/icons/money-time'
import { STATUS_BOOKING } from '@/constant/env'
import { GetListQuery } from '@/constant/types/GeneralProps'
import { getTransactionListUmrah } from '@/services/umrah-service'
import Link from 'next/link'
import { Fragment, useCallback, useEffect, useState } from 'react'

export default function NeedPaymentLink({ isMobile }: { isMobile: boolean }) {
  const [total, setTotal] = useState(0)

  const fetchTransactions = useCallback(async () => {
    try {
      // Build query parameters
      const queryParams: GetListQuery = {
        page: 1,
        size: 10,
        order: 'desc',
        orderBy: 'createdAt',
        'status.slug:in': `${STATUS_BOOKING.WAITING_DOWN_PAYMENT_HAJJ},${STATUS_BOOKING.WAITING_DOWN_PAYMENT_UMRAH}`,
      }

      if (isMobile) {
        // Fetch data
        const response = await getTransactionListUmrah(queryParams)

        // Update state with response data
        setTotal(response.total)
      }
    } catch (err) {
      console.error('Error fetching transactions:', err)
    }
  }, [isMobile])

  useEffect(() => {
    fetchTransactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      {total > 0 && (
        <div className="mt-5 hidden w-full px-5 max-lg:block">
          <Link
            href="/my/need-payment"
            className="text-m-regular flex w-full items-center rounded-full border border-neutral-200 p-3 text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200"
          >
            <MoneyTimeIcon className="text-primary-500" />
            <span className="ml-2">Butuh Dibayar</span>
            <div className="ml-auto flex items-center">
              <div className="bg-error-500 mr-2 rounded-md px-3 py-1 text-center text-white">
                {total}
              </div>
              <ChevronRightIcon />
            </div>
          </Link>
        </div>
      )}
    </Fragment>
  )
}
