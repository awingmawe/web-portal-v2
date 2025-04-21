import { metadata } from '@/app/shared-metadata'
import TransactionNeedPayment from '@/components/pages/my/1-Transaction/NeedPayment/Index'

export async function generateMetadata() {
  return {
    ...metadata('Muslim 101 | Daftar List Transaksi', `Daftar List Transaksi`),
  }
}

export default async function TransactionPage() {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <TransactionNeedPayment />
    </div>
  )
}
