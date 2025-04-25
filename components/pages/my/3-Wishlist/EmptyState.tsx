import { EmptyStateMy } from '@/components/icons/empty-state-my'

export default function EmptyStateWishlist() {
  return (
    <div className="mt-24 flex flex-col items-center justify-center">
      <EmptyStateMy />
      <p className="text-l-medium mt-2">Tidak Ada Data Wishlist</p>
      <p className="text-m-regular text-neutral-500">
        kamu tidak memiliki daftar paket yang kamu sukai
      </p>
    </div>
  )
}
