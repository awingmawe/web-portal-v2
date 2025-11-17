import { EmptyStateMy } from '@/components/icons/empty-state-my'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function EmptyState() {
  const router = useRouter()
  return (
    <div className="mt-24 flex flex-col items-center justify-center gap-4">
      <EmptyStateMy />
      <div className="flex flex-col items-center">
        <p className="text-l-medium">Tidak Data Pengajuan Pembiayaan</p>
        <p className="text-m-regular text-neutral-500">
          Kamu tidak memiliki riwayat data pengajuan pembiayaan
        </p>
      </div>
      <Button
        className="px-10 py-4"
        size="sm"
        variant="default"
        onClick={() => router.push('/search?package=pembiayaan')}
      >
        Ajukan Pembiayaan
      </Button>
    </div>
  )
}
