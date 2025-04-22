import { ChevronRightIcon } from '@/components/icons/chevron'
import { MoneyTimeIcon } from '@/components/icons/money-time'
import Link from 'next/link'

export default function NeedPaymentLink() {
  return (
    <div className="mt-5 hidden w-full px-5 max-lg:block">
      <Link
        href="/my/need-payment"
        className="text-m-regular flex w-full items-center rounded-full border border-neutral-200 p-3 text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200"
      >
        <MoneyTimeIcon className="text-primary-500" />
        <span className="ml-2">Butuh Dibayar</span>
        <div className="ml-auto flex items-center">
          <div className="bg-error-500 mr-2 rounded-md px-3 py-1 text-center text-white">
            1
          </div>
          <ChevronRightIcon />
        </div>
      </Link>
    </div>
  )
}
