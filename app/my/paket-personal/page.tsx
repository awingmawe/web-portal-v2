import { metadata } from '@/app/shared-metadata'
import TransactionPaketPersonal from '@/components/pages/my/7-PaketPersonal/Index'
import LayoutMy from '@/components/pages/my/Layout'
import BottomNavigation from '@/components/shared/mobile/BottomNavigation'

export async function generateMetadata() {
  return {
    ...metadata(
      'Muslim101 | Daftar List Transaksi Paket Personal',
      `Daftar List Transaksi Paket Personal`
    ),
  }
}

export default async function PersonalPaketPage() {
  return (
    <LayoutMy>
      <div className="mx-auto mb-17 max-w-7xl lg:px-4">
        <TransactionPaketPersonal />
      </div>
      <BottomNavigation />
    </LayoutMy>
  )
}
