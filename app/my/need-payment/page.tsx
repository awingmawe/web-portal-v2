import { metadata } from '@/app/shared-metadata'
import TransactionNeedPayment from '@/components/pages/my/2-NeedPayment/Index'
import LayoutMy from '@/components/pages/my/Layout'

export async function generateMetadata() {
  return {
    ...metadata(
      'Muslim101 | Daftar List Butuh Bayar',
      `Daftar List Butuh Bayar`
    ),
  }
}

export default async function TransactionPage() {
  return (
    <LayoutMy>
      <div className="mx-auto max-w-7xl lg:px-4">
        <TransactionNeedPayment />
      </div>
    </LayoutMy>
  )
}
