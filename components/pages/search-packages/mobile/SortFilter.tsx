'use client'

export function SortDrawer() {
  const sortOptions = [
    'Harga Terendah',
    'Harga Tertinggi',
    'Rating Tertinggi',
    'Terbaru',
    'Terlaris',
  ]

  return (
    <div className="space-y-2 py-4">
      {sortOptions.map((sort) => (
        <div
          key={sort}
          className="cursor-pointer rounded-lg border p-3 hover:bg-neutral-50"
        >
          <div className="font-medium">{sort}</div>
        </div>
      ))}
    </div>
  )
}
