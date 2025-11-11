import { metadata } from '@/app/shared-metadata'
import ListSubmissionPembiayaan from '@/components/pages/my/5-Banking/list/ListSubmissionPembiayaan'
import LayoutMy from '@/components/pages/my/Layout'
export async function generateMetadata() {
  return {
    ...metadata(
      'Muslim101 | Daftar List Pembiayaan Umroh',
      `Daftar List Pembiayaan Umroh`
    ),
  }
}
export default async function BankingPage() {
  return (
    <LayoutMy>
      <div className="mx-auto max-w-7xl lg:px-4">
        {/* <TransactionUpcoming /> */}
        <ListSubmissionPembiayaan />
        {/* <BottomNavigation /> */}
      </div>
    </LayoutMy>
  )
}
