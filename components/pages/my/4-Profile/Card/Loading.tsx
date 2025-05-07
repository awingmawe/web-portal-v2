import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function CardProfileLoading() {
  return (
    <div className="container mx-auto pb-3">
      <Skeleton className="mb-6 h-8 w-64" />

      {/* Personal Data Section Skeleton */}
      <Card className="mb-6 !gap-[0px] rounded-3xl border border-neutral-200 !pt-3 shadow-none">
        <CardHeader className="pt border-b border-neutral-200 px-5 !pb-2">
          <Skeleton className="h-6 w-36" />
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-full" />
          </div>

          {/* Gender and Birth Date Fields */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-full rounded-full" />
                <Skeleton className="h-12 w-full rounded-full" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          </div>

          {/* Address Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-24 w-full rounded-2xl" />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Skeleton className="h-10 w-24 rounded-full" />
          </div>
        </CardContent>
      </Card>

      {/* Bank Account Section Skeleton */}
      <Card className="mb-6 !gap-[0px] rounded-3xl border border-neutral-200 !pt-3 shadow-none">
        <CardHeader className="pt border-b border-neutral-200 px-5 !pb-2">
          <Skeleton className="h-6 w-36" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-10 w-40 rounded-full" />
          </div>
        </CardContent>
      </Card>

      {/* Password Section Skeleton */}
      <Card className="mb-6 !gap-[0px] rounded-3xl border border-neutral-200 !pt-3 shadow-none">
        <CardHeader className="pt border-b border-neutral-200 px-5 !pb-2">
          <Skeleton className="h-6 w-36" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-10 w-40 rounded-full" />
          </div>
        </CardContent>
      </Card>

      {/* Email Section Skeleton */}
      <Card className="mb-6 !gap-[0px] rounded-3xl border border-neutral-200 !pt-3 shadow-none">
        <CardHeader className="pt border-b border-neutral-200 px-5 !pb-2">
          <Skeleton className="h-6 w-36" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
        </CardContent>
      </Card>

      {/* Phone Number Section Skeleton */}
      <Card className="mb-6 !gap-[0px] rounded-3xl border border-neutral-200 !pt-3 shadow-none">
        <CardHeader className="pt border-b border-neutral-200 px-5 !pb-2">
          <Skeleton className="h-6 w-36" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
