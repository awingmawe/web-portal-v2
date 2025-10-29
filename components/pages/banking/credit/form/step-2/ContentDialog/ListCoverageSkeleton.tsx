const ListCoverageItemSkeleton = () => (
  <div className="flex animate-pulse flex-col gap-1.5 py-2 not-last:border-b not-last:border-neutral-200">
    <div className="h-5 w-3/4 rounded bg-neutral-200" />
    <div className="h-4 w-1/2 rounded bg-neutral-200" />
  </div>
)

const ListCoverageSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="flex flex-col">
      {Array.from({ length: count }).map((_, index) => (
        <ListCoverageItemSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  )
}

export default ListCoverageSkeleton
