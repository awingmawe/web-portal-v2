import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

export function CardTransactionBankingSkeleton() {
  return (
    <Card className="w-full animate-pulse gap-4 overflow-hidden rounded-[20px] border-1 border-neutral-200 bg-neutral-50 py-0 shadow-none">
      {/* HEADER SKELETON */}
      <CardHeader className="flex justify-between border-b-1 border-neutral-200 px-4 py-3 lg:items-center">
        {/* Left Side: Title and ID */}
        <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-1.5">
          <div className="h-5 w-24 rounded-md bg-neutral-200" />
          <div className="h-5 w-32 rounded-md bg-neutral-200 max-lg:hidden" />
          <div className="h-4 w-28 rounded-md bg-neutral-200 lg:hidden" />
        </div>
        {/* Right Side: Provider and Status */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-28 rounded-md bg-neutral-200 max-lg:hidden" />
          <div className="h-8 w-32 rounded-full bg-neutral-200" />
        </div>
      </CardHeader>

      {/* CONTENT SKELETON */}
      <CardContent className="flex items-start gap-3 px-4">
        {/* Thumbnail */}
        <div className="h-15 w-15 flex-shrink-0 rounded-xl bg-neutral-200 lg:h-[120px] lg:w-[120px]" />

        {/* Details Section */}
        <div className="flex w-full flex-col gap-2 lg:flex-row lg:gap-3">
          {/* Left Details: Package Name, Date, etc. */}
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-5 w-4/5 rounded-md bg-neutral-200 lg:h-6" />
            <div className="h-4 w-3/5 rounded-md bg-neutral-200 lg:h-5" />
            <div className="h-4 w-2/5 rounded-md bg-neutral-200 lg:h-5" />
          </div>

          {/* Divider */}
          <div className="w-px self-stretch bg-neutral-100 max-lg:hidden" />
        </div>
      </CardContent>

      {/* FOOTER SKELETON */}
      <CardFooter className="flex-col items-start gap-4 border-t-1 border-neutral-200 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2 max-lg:hidden">
          <div className="h-5 w-48 rounded-md bg-neutral-200" />
        </div>
        <div className="flex w-full items-center gap-3 lg:w-auto lg:justify-end">
          <div className="h-4 w-36 rounded-lg bg-neutral-200 max-lg:hidden" />
          <div className="h-4 w-full rounded-lg bg-neutral-200 lg:w-36" />
        </div>
      </CardFooter>
    </Card>
  )
}
