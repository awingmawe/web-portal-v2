'use client'

import { Skeleton } from '@/components/ui/skeleton'

const SkeletonField = ({
  className,
  inputHeight = 'h-10', // h-10 (40px) adalah default shadcn
}: {
  className: string
  inputHeight?: string
}) => (
  <div className={className}>
    {/* Skeleton untuk FormLabel */}
    <Skeleton className="mb-2 h-5 w-1/3" />
    {/* Skeleton untuk FormControl (Input) */}
    <Skeleton className={`w-full rounded-full ${inputHeight}`} />
  </div>
)

export function DataDiriFieldsSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-4 rounded-2xl border-1 border-neutral-200 p-6 max-lg:hidden">
      {/* --- Row 1: Nama and No Telp --- */}
      {/* col-span-2, h-10 (input standar) */}
      <SkeletonField
        className="col-span-2 max-lg:col-span-1"
        inputHeight="h-10"
      />
      <SkeletonField
        className="col-span-2 max-lg:col-span-1"
        inputHeight="h-10"
      />

      {/* --- Row 2: Email and Tgl Lahir --- */}
      {/* col-span-2, h-10 (input standar) */}
      <SkeletonField
        className="col-span-2 max-lg:col-span-1"
        inputHeight="h-10"
      />
      {/* col-span-2, h-12 (TriggerCalendar py-3.5 -> h-12) */}
      <SkeletonField
        className="col-span-2 max-lg:col-span-1"
        inputHeight="h-12"
      />

      {/* --- Row 3: Jenis Kelamin and Pekerjaan --- */}
      {/* col-span-2 (RadioGroup) */}
      <div className="col-span-2 max-lg:col-span-1">
        <Skeleton className="mb-2 h-5 w-1/3" />
        <div className="flex gap-3">
          {/* Skeleton untuk 2 tombol radio (py-3.5 -> h-12) */}
          <Skeleton className="h-12 w-full rounded-full" />
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
      {/* col-span-2 (FormPekerjaan - kita asumsikan ini 1 input) */}
      <SkeletonField
        className="col-span-2 max-lg:col-span-1"
        inputHeight="h-10"
      />

      {/* --- Row 4: FormLokasi (4 items) --- */}
      {/* col-span-1, h-10 (LayoutSelectDrawer -> h-10) */}
      <SkeletonField
        className="col-span-1 max-lg:col-span-1"
        inputHeight="h-10"
      />
      <SkeletonField
        className="col-span-1 max-lg:col-span-1"
        inputHeight="h-10"
      />
      <SkeletonField
        className="col-span-1 max-lg:col-span-1"
        inputHeight="h-10"
      />
      <SkeletonField
        className="col-span-1 max-lg:col-span-1"
        inputHeight="h-10"
      />

      {/* --- Row 5: Alamat Lengkap --- */}
      {/* col-span-4 (Textarea) */}
      <div className="col-span-4 max-lg:col-span-1">
        <Skeleton className="mb-2 h-5 w-1/3" />
        {/* Skeleton untuk Textarea (h-[90px] rounded-[20px]) */}
        <Skeleton className="h-[90px] w-full rounded-[20px]" />
      </div>
    </div>
  )
}
