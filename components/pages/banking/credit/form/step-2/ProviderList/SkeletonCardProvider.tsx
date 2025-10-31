/**
 * Komponen Skeleton untuk CardProvider
 * Meniru tata letak CardProvider saat data sedang dimuat.
 */
const SkeletonCardProvider = () => {
  return (
    <div className="col-span-1 h-[270px] animate-pulse rounded-[20px] border border-[#E8E8E880] bg-[#F7F7F780]">
      {/* Skeleton Header */}
      <div className="rounded-bottom-2xl flex items-center justify-between rounded-[20px] border border-x-0 border-t-0 border-[#E8E8E880] bg-white px-3 py-4">
        <div className="flex items-center gap-1">
          {/* Logo Placeholder */}
          <div className="h-6 w-6 rounded-full bg-neutral-200" />
          {/* Provider Name Placeholder */}
          <div className="h-4 w-24 rounded bg-neutral-200" />
        </div>
        {/* Checkbox Placeholder */}
        <div className="h-4 w-4 rounded-sm bg-neutral-200" />
      </div>

      {/* Skeleton Content */}
      <div className="flex flex-col gap-2 p-4">
        {/* Title Placeholder ('Ketentuan') */}
        <div className="h-4 w-20 rounded bg-neutral-200" />

        {/* Description Placeholder (blok paragraf) */}
        <div className="mt-1 flex flex-col gap-1.5">
          <div className="h-3 w-full rounded bg-neutral-200" />
          <div className="h-3 w-full rounded bg-neutral-200" />
          <div className="h-3 w-5/6 rounded bg-neutral-200" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCardProvider
