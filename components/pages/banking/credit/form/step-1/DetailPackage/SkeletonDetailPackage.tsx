import { Skeleton } from '@/components/ui/skeleton'

const DetailPackagePembiayaanSkeleton = () => {
  return (
    <section className="container mx-auto flex flex-col gap-3 max-lg:px-4">
      <Skeleton className="h-7 w-32 max-lg:hidden" />
      <div className="flex flex-col gap-4 rounded-2xl border-1 border-neutral-200 px-6 py-4 max-lg:gap-2 max-lg:border-none max-lg:p-0">
        {/* Ubah and Title Rincian Paket - Mobile */}
        <div className="flex items-center justify-between lg:hidden">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-24" />
        </div>

        {/* Package Description, Organization, Image and Action Button*/}
        <div className="flex items-center gap-3">
          {/* Image Package */}
          <Skeleton className="h-[120px] w-[120px] rounded-lg max-lg:!h-15 max-lg:!w-15" />

          <div className="flex w-full flex-row gap-3 max-lg:flex-col lg:items-center lg:justify-between">
            {/* Package and Organization Description */}
            <div className="flex flex-2 flex-col gap-3 max-lg:gap-2">
              {/* Package Name */}
              <Skeleton className="h-6 w-64 max-lg:h-5 max-lg:w-48" />

              {/* Organization Description (Desktop Only) */}
              <div className="flex items-center gap-1 max-lg:hidden">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>

              {/* Date Departure and Arrival (Desktop)*/}
              <div className="flex items-center gap-2 max-lg:hidden">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-5 w-40" />
              </div>
            </div>

            {/* Action Button (Desktop) */}
            <div className="flex gap-3">
              <Skeleton className="h-9 w-32 max-lg:h-5 max-lg:w-24" />
              <Skeleton className="h-9 w-32 max-lg:hidden" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-neutral-200 max-lg:hidden" />

        <div className="flex gap-8">
          {/* Deskripsi Paket */}
          <div className="grid w-full grid-cols-1 gap-4 max-lg:gap-2">
            {/* Date Mobile */}
            <div className="col-span-1 flex items-center gap-2 lg:hidden">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-40" />
            </div>

            {/* Items Information Skeleton */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <Skeleton className="h-5 w-5 rounded max-lg:!h-4 max-lg:!w-4" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-24 max-lg:h-3 max-lg:w-20" />
                  <Skeleton className="h-5 w-56 max-lg:h-4 max-lg:w-40" />
                </div>
              </div>
            ))}
          </div>

          {/* Divider Vertical */}
          <div className="w-px self-stretch bg-neutral-200 max-lg:hidden" />

          {/* Rincian Harga Skeleton - Desktop Only */}
          <div className="w-full max-lg:hidden">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item}>
                    {item === 3 ? (
                      <div className="h-px w-full bg-neutral-200" />
                    ) : (
                      <div className="flex justify-between">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-24" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetailPackagePembiayaanSkeleton
