import { metadata } from '@/app/shared-metadata'
import CekAvailability from '@/components/pages/my/6-CheckAvailability/Index'
import LayoutMy from '@/components/pages/my/Layout'

export async function generateMetadata() {
  return {
    ...metadata(
      'Muslim 101 | Daftar List Check Availability',
      `Daftar List Check Availability`
    ),
  }
}

export default async function TransactionPage() {
  return (
    <LayoutMy>
      <div className="mx-auto max-w-7xl lg:px-4">
        <CekAvailability />
      </div>
    </LayoutMy>
  )
}
