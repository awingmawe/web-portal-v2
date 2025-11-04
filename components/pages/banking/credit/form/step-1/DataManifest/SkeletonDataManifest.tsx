import { Skeleton } from '@/components/ui/skeleton'

interface DataManifestSkeletonProps {
  size: number
}

/**
 * Skeleton loader untuk DataManifestFields.
 * Dibuat untuk mencerminkan tata letak DataManifestFields
 * dan mencegah layout shift saat loading.
 */
export function DataManifestSkeleton({ size = 1 }: DataManifestSkeletonProps) {
  // Kita gunakan logic mapping yang SAMA PERSIS dengan komponen aslinya
  return (
    <div className="grid grid-cols-1 gap-4 max-lg:hidden">
      {Array.from({ length: size }, (_, index) => (
        <div
          key={index}
          className="col-span-1 rounded-[20px] border border-neutral-200"
        >
          {/* Bagian Header Card */}
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
            {/* Skeleton untuk "Data Jamaah {index + 1}" */}
            <Skeleton className="h-5 w-28" />

            {/* Skeleton untuk Checkbox (hanya di item pertama) */}
            {index === 0 && <Skeleton className="h-5 w-52" />}
          </div>

          {/* Bagian Body Card (Form Fields) */}
          <div className="grid grid-cols-2 gap-4 p-4">
            {/* Skeleton untuk Field Nama */}
            <div className="col-span-1 space-y-2 max-lg:col-span-2">
              <Skeleton className="h-4 w-32" /> {/* Label */}
              <Skeleton className="h-10 w-full rounded-full" /> {/* Input */}
            </div>

            {/* Skeleton untuk Field No. Telp */}
            <div className="col-span-1 space-y-2 max-lg:col-span-2">
              <Skeleton className="h-4 w-24" /> {/* Label */}
              <Skeleton className="h-10 w-full rounded-full" /> {/* Input */}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
