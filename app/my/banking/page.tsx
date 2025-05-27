import BankingPageDetail from '@/components/pages/my/5-Banking/page'
import LayoutMy from '@/components/pages/my/Layout'

export default async function BankingPage() {
  return (
    <LayoutMy>
      <div className="mx-auto max-w-7xl lg:px-4">
        {/* <TransactionUpcoming /> */}
        <BankingPageDetail />
        {/* <BottomNavigation /> */}
      </div>
    </LayoutMy>
  )
}
