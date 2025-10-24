import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

const RincianHargaSkeleton = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-6 w-48" />
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item}>
            {item === 3 ? (
              <Separator />
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
  )
}

export default RincianHargaSkeleton
