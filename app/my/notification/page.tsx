import { metadata } from '@/app/shared-metadata'
import LayoutMy from '@/components/pages/my/Layout'
import NotificationComponent from '@/components/shared/Notification'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'
export async function generateMetadata() {
  return {
    ...metadata('Muslim101 | Daftar List Tabungan', `Daftar List Tabungan`),
  }
}

export default async function NotifikasiPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string
  return (
    <LayoutMy>
      <div className="mx-auto max-w-7xl lg:px-4">
        {/* <TransactionUpcoming /> */}

        <NotificationComponent token={token} fromMy={true} />
        {/* <BottomNavigation /> */}
      </div>
    </LayoutMy>
  )
}
