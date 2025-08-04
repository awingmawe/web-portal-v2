'use client'
import { ArrowDiagonalIcon } from '@/components/icons/arrow'
import { MoneyTimeBoldIcon } from '@/components/icons/money-time'
import { GetListQuery } from '@/constant/types/GeneralProps'
import { getTransactionListUmrah } from '@/services/umrah-service'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NeedPaymentLinkAja({
  showBottomBar,
}: {
  showBottomBar: boolean
}) {
  const [show, setShow] = useState(false)
  const getTransaction = async () => {
    const queryParams: GetListQuery = {
      page: 1,
      size: 10,
      order: 'desc',
      orderBy: 'createdAt',
      'status.slug:in': 'waiting-cancellation,waiting-approval,approved',
    }
    const response = await getTransactionListUmrah(queryParams)
    if (response.total > 0) {
      setShow(true)
    }
  }

  useEffect(() => {
    getTransaction()
  }, [])

  return (
    <Link
      href={'/my/transaction'}
      className={`border-primary fixed  z-50 mx-3 mt-10 mb-3 flex w-93 animate-bounce items-center rounded-xl border border-2 bg-white px-3 py-2 ${
        showBottomBar ? 'bottom-12' : 'bottom-2'
      } ${show ? 'block' : 'hidden'}`}
    >
      <MoneyTimeBoldIcon className="text-primary-500 mr-2" />
      <div>
        <p className="text-m-medium">Lunasi Pembayaran Paket</p>
        <p className="text-xs-medium text-neutral-500">
          Terdapat paket yang perlu kamu lunasi
        </p>
      </div>
      <div className="ml-auto flex items-center">
        <p className="text-s-medium ">Lihat</p>
        <ArrowDiagonalIcon size={20} />
      </div>
      <div
        className="absolute -top-2 -right-2 rounded-xl bg-red-500 p-3"
        style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
      ></div>
    </Link>
  )
}
