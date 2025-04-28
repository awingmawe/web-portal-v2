import { metadata } from '@/app/shared-metadata'
import Wishlist from '@/components/pages/my/3-Wishlist/Index'
import LayoutMy from '@/components/pages/my/Layout'
import BottomNavigation from '@/components/shared/mobile/BottomNavigation'

export async function generateMetadata() {
  return {
    ...metadata('Muslim 101 | Daftar List Wishlist', `Daftar List Wishlist`),
  }
}

export default async function WishlistPage() {
  return (
    <LayoutMy>
      <div className="mx-auto max-w-7xl max-lg:px-4 lg:px-4">
        <Wishlist />
        <BottomNavigation />
      </div>
    </LayoutMy>
  )
}
