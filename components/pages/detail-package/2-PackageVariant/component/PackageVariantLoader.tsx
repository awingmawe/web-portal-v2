import React from 'react'

const PackageVariantLoader: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 rounded-[20px] border border-neutral-100 bg-white p-4 max-lg:gap-2 max-lg:rounded-none max-lg:border-x-0 max-lg:border-t-0 max-lg:border-b max-lg:border-b-neutral-200 max-lg:px-0 max-lg:pt-0 max-lg:pb-4">
      <div className="flex items-center justify-between">
        <div className="h-6 w-28 animate-pulse rounded bg-neutral-200 max-lg:hidden"></div>
        <div className="h-5 w-24 animate-pulse rounded bg-neutral-200 lg:hidden"></div>
      </div>
      <div className="max-lg:h-[60px]">
        <div className="mb-2 h-4 w-16 animate-pulse rounded bg-neutral-200 max-lg:hidden"></div>
        <div className="no-scrollbar flex flex-wrap items-center gap-4 gap-y-6 max-lg:-mx-2 max-lg:h-[100px] max-lg:flex-nowrap max-lg:overflow-x-auto max-lg:px-2 max-lg:pb-2">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="h-12 w-24 animate-pulse rounded-lg bg-neutral-200 max-lg:flex-shrink-0"
            ></div>
          ))}
        </div>
      </div>
      <div className="h-[1px] w-full bg-neutral-200 max-lg:hidden"></div>
      <div className="flex items-center justify-between max-lg:my-2">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="h-4 w-32 animate-pulse rounded bg-neutral-200"></div>
          <div className="mt-1 h-5 w-24 animate-pulse rounded bg-neutral-200"></div>
        </div>
        <div className="h-6 w-16 animate-pulse rounded bg-neutral-200"></div>
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="h-4 w-32 animate-pulse rounded bg-neutral-200"></div>
          <div className="mt-1 h-5 w-24 animate-pulse rounded bg-neutral-200"></div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-neutral-200 max-lg:hidden"></div>
      <div className="h-12 w-full animate-pulse rounded-full bg-neutral-200 max-lg:hidden"></div>
      <div className="flex items-center justify-between max-lg:hidden">
        <div className="h-5 w-24 animate-pulse rounded bg-neutral-200"></div>
        <div className="h-7 w-32 animate-pulse rounded bg-neutral-200"></div>
      </div>
      <div className="h-12 w-full animate-pulse rounded-full bg-neutral-200 max-lg:hidden"></div>
    </div>
  )
}

export default PackageVariantLoader
