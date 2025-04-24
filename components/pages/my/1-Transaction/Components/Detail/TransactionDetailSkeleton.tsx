import { Skeleton } from '@/components/ui/skeleton'

export default function TransactionDetailSkeleton() {
  return (
    <div className="fixed inset-0 z-50 flex w-full items-center justify-center bg-black/50">
      <div className="w-full rounded-lg bg-white p-6 shadow-lg">
        {/* Transaction Details */}
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-5 w-40" />
          </div>
          <div className="space-y-2 text-right">
            <Skeleton className="ml-auto h-5 w-24" />
            <Skeleton className="ml-auto h-5 w-48" />
            <Skeleton className="ml-auto h-5 w-40" />
          </div>
        </div>

        {/* Product Details */}
        <div className="border-t border-neutral-100 py-4">
          <Skeleton className="mb-4 h-6 w-32" />
          <div className="flex gap-4">
            <Skeleton className="h-32 w-48 rounded-md" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-6 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-48" />
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="border-t border-neutral-100 py-4">
          <Skeleton className="mb-4 h-6 w-48" />
          <div className="space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-4">
          <div className="flex justify-end">
            <Skeleton className="h-10 w-48 rounded-full" />
          </div>
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </div>
    </div>
  )
}
