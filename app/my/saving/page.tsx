import { metadata } from '@/app/shared-metadata'
import SavingPageDetail from '@/components/pages/my/5-Saving/page'
import LayoutMy from '@/components/pages/my/Layout'
export async function generateMetadata() {
  return {
    ...metadata('Muslim 101 | Daftar List Tabungan', `Daftar List Tabungan`),
  }
}

export default async function SavingPage() {
  return (
    <LayoutMy>
      <div className="mx-auto max-w-7xl lg:px-4">
        {/* <TransactionUpcoming /> */}

        <SavingPageDetail />
        {/* <BottomNavigation /> */}
      </div>
    </LayoutMy>
  )
}
