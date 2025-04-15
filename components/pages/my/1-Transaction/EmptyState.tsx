import { EmptyStateMy } from '@/components/icons/empty-state-my'

export default function EmptyState() {
  return (
    <div className="mt-24 flex flex-col items-center justify-center">
      <EmptyStateMy />
      <p className="text-l-medium mt-2">Tidak Ada Data Transaksi</p>
      <p className="text-m-regular text-neutral-500">
        Anda belum melakukan transaksi.
      </p>
    </div>
  )
}
