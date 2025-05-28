'use client'

import { useEventTracker } from '@/contexts/event-tracker/context'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'

interface Category {
  id: string | number
  name: string
  slug?: string
}

interface ScrollableCategoriesProps {
  categories: Category[]
  defaultActiveId?: string | number
  onCategoryChange?: (category: Category) => void
  className?: string
}

export function ScrollableCategories({
  categories,
  defaultActiveId,
  onCategoryChange,
  className,
}: ScrollableCategoriesProps) {
  const [activeId, setActiveId] = useState<string | number>(
    defaultActiveId || categories[0]?.id || ''
  )
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Handle category selection
  const handleCategoryClick = (category: Category) => {
    setActiveId(category.id)
    if (onCategoryChange) {
      onCategoryChange(category)
    }
  }

  return (
    <div className={cn('relative w-full', className)}>
      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide flex w-full overflow-x-auto"
      >
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={`
                rounded-full px-3 py-1 whitespace-nowrap text-neutral-900 transition-all duration-500 ease-in-out ${activeId === category.id ? 'bg-primary-300 ' : 'bg-primary-100 hover:bg-primary-200'} text-m-semibold cursor-pointer outline-0 focus-within:outline-0 focus:outline-0 focus-visible:outline-0
              `}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Example usage
export default function CategoryNavigation({
  eventCategory,
  dataCategories,
}: {
  eventCategory: string
  dataCategories: Category[]
}) {
  const { pushEvent } = useEventTracker()

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const handleCategoryChange = (category: Category) => {
    pushEvent({
      name: 'click_article_category',
      topic: 'general',
      category: eventCategory,
      data: {
        name: category.name,
      },
    })

    // Set category slug as query param
    const newSearchParams = new URLSearchParams(searchParams)
    if (category.id !== 'all') {
      newSearchParams.set('category', category.slug ?? '')
    } else {
      newSearchParams.delete('category')
    }
    newSearchParams.set('page', '1')

    router.push(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    })
  }

  return (
    <div className="mx-auto my-5 w-full">
      <ScrollableCategories
        categories={dataCategories}
        defaultActiveId="all"
        onCategoryChange={handleCategoryChange}
      />
    </div>
  )
}
