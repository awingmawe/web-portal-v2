// Skeleton Component
const PackagePembiayaanSkeleton = () => {
  // Menggunakan satu blok utama yang meniru layout PackageSelection
  return (
    <div className="flex animate-pulse flex-col gap-4 rounded-3xl border-1 border-neutral-200 bg-white px-8 py-5 max-lg:gap-2 max-lg:p-4">
      {/* Organization Name & Data Produk */}
      <div className="flex w-full items-center justify-between">
        <div className="h-6 w-32 rounded bg-neutral-200 max-lg:h-4 max-lg:w-24" />{' '}
        {/* Data Produk */}
        <div className="flex items-center gap-1">
          <div className="h-8 w-8 rounded-full bg-neutral-200 max-lg:h-5 max-lg:w-5" />{' '}
          {/* Organization Thumbnail */}
          <div className="h-6 w-24 rounded bg-neutral-200 max-lg:h-4 max-lg:w-16" />{' '}
          {/* Organization Name */}
          <div className="h-5 w-5 rounded bg-neutral-200" />{' '}
          {/* ChevronRightIcon */}
        </div>
      </div>

      <div className="flex gap-3 max-lg:flex-col lg:items-center">
        {/* Package Thumbnail */}
        <div className="flex items-center gap-3">
          <div className="h-36 w-36 rounded-xl bg-neutral-200 max-lg:h-15 max-lg:w-15" />{' '}
          {/* Package Thumbnail */}
          <div className="h-6 w-40 rounded bg-neutral-200 lg:hidden" />{' '}
          {/* Package Name Mobile */}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          {/* Package Name Desktop */}
          <div className="h-6 w-64 rounded bg-neutral-200 max-lg:hidden" />

          {/* Date Departure and Arrival */}
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-neutral-200" />{' '}
            {/* Calendar Icon */}
            <div className="h-4 w-48 rounded bg-neutral-200 max-lg:h-3 max-lg:w-32" />{' '}
            {/* Dates */}
          </div>

          {/* Quantity Jemaah */}
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-neutral-200" />{' '}
            {/* People Icon */}
            <div className="h-4 w-24 rounded bg-neutral-200 max-lg:h-3 max-lg:w-16" />{' '}
            {/* Jemaah Qty */}
          </div>

          {/* Room Type Information */}
          <div className="flex items-center justify-between gap-4 max-lg:w-full">
            {/* Double */}
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded bg-neutral-200" />{' '}
              {/* Bed Icon */}
              <div className="flex flex-col gap-1">
                <div className="h-3 w-16 rounded bg-neutral-200" />{' '}
                {/* Double label */}
                <div className="h-4 w-20 rounded bg-neutral-200 max-lg:h-3 max-lg:w-16" />{' '}
                {/* Double Jemaah */}
              </div>
            </div>
            {/* Triple */}
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded bg-neutral-200" />{' '}
              {/* Bed Icon */}
              <div className="flex flex-col gap-1">
                <div className="h-3 w-16 rounded bg-neutral-200" />{' '}
                {/* Triple label */}
                <div className="h-4 w-20 rounded bg-neutral-200 max-lg:h-3 max-lg:w-16" />{' '}
                {/* Triple Jemaah */}
              </div>
            </div>
            {/* Quad */}
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded bg-neutral-200" />{' '}
              {/* Bed Icon */}
              <div className="flex flex-col gap-1">
                <div className="h-3 w-16 rounded bg-neutral-200" />{' '}
                {/* Quad label */}
                <div className="h-4 w-20 rounded bg-neutral-200 max-lg:h-3 max-lg:w-16" />{' '}
                {/* Quad Jemaah */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Total Harga Paket */}
      <div className="flex w-full items-center justify-between">
        <div className="h-4 w-32 rounded bg-neutral-200" />{' '}
        {/* Total Harga Paket label */}
        <div className="h-6 w-40 rounded bg-neutral-200" /> {/* Price */}
      </div>

      {/* Mitra Pembiayaan Title */}
      <div className="h-6 w-48 rounded bg-neutral-200" />

      {/* Mitra Pembiayaan List */}
      <div className="flew-wrap flex gap-4">
        {/* Provider 1 */}
        <div className="flex items-center justify-center gap-2 rounded-full border border-neutral-200 p-2">
          <div className="h-5 w-5 rounded-full bg-neutral-200" />{' '}
          {/* Provider Logo */}
          <div className="h-4 w-24 rounded bg-neutral-200" />{' '}
          {/* Provider Name */}
        </div>
        {/* Provider 2 */}
        <div className="flex items-center justify-center gap-2 rounded-full border border-neutral-200 p-2">
          <div className="h-5 w-5 rounded-full bg-neutral-200" />{' '}
          {/* Provider Logo */}
          <div className="h-4 w-24 rounded bg-neutral-200" />{' '}
          {/* Provider Name */}
        </div>
      </div>
    </div>
  )
}

export default PackagePembiayaanSkeleton
