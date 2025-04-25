import { metadata } from '@/app/shared-metadata'
import Wishlist from '@/components/pages/my/3-Wishlist/Index'
import BottomNavigation from '@/components/shared/mobile/BottomNavigation'

export async function generateMetadata() {
  return {
    ...metadata('Muslim 101 | Daftar List Wishlist', `Daftar List Wishlist`),
  }
}

export default async function WishlistPage() {
  return (
    <div className="mx-auto max-w-7xl lg:px-4">
      <Wishlist />
      <BottomNavigation />
    </div>
  )
}
