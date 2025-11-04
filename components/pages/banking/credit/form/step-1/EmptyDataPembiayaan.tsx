import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const EmptyDataPembiayaan = () => {
  const router = useRouter()
  return (
    <div className="flex min-h-[60dvh] items-center justify-center overflow-y-auto px-4 max-lg:my-4 max-lg:min-h-[100dvh]">
      <div className="w-full max-w-md text-center">
        {/* Icon/Illustration */}
        <Image
          src="/images/404.png"
          alt="no-pembiayaan"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />

        {/* Title */}
        <p className="text-l-semibold mb-3 text-neutral-900">
          Belum Ada Paket Dipilih
        </p>

        {/* Description */}
        <p className="text-m-regular mb-8 text-neutral-500">
          Anda belum memilih paket untuk pengajuan pembiayaan. Silakan pilih
          paket terlebih dahulu.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button
            className="w-full"
            size="sm"
            variant="default"
            onClick={() => router.push('/search?package=pembiayaan')}
          >
            Cari Paket
          </Button>

          <Button
            className="border-primary-500 w-full border-2"
            size="sm"
            variant="outline"
            onClick={() => router.back()}
          >
            Kembali
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EmptyDataPembiayaan
