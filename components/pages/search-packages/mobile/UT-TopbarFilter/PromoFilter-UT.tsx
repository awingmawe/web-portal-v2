import { Button } from '@/components/ui/button'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'

const PromoTagFilter = ({
  label = '',
  setTagSlug,
  filters,
  slug,
}: {
  label?: string
  setTagSlug: (tagSlug: string) => void
  filters: any
  slug: string
}) => {
  const updateQueryParams = useUpdateQueryParams()

  // Handle tag click - toggle active state
  const handleTagClick = (tagSlug: string) => {
    // Get current active tags from context
    const currentTags = filters?.tagSlug
      ? filters.tagSlug.split(',').filter(Boolean)
      : []

    let newActiveIds: string[]

    if (currentTags.includes(tagSlug)) {
      // Remove tag if already active
      newActiveIds = currentTags.filter((slug: string) => slug !== tagSlug)
    } else {
      // Add tag if not active
      newActiveIds = [...currentTags, tagSlug]
    }

    const itemsString = newActiveIds.join(',')

    // Update context
    setTagSlug(itemsString)

    // Update URL params
    if (itemsString) {
      updateQueryParams(['tS', 'page'], [itemsString, '1'])
    } else {
      // If no items selected, remove the parameter from URL
      updateQueryParams(['tS'], [''])
    }
  }

  // Helper function to check if a tag is active
  const isTagActive = (slug: string) => {
    if (!filters?.tagSlug) return false
    const activeTags = filters.tagSlug.split(',').filter(Boolean)
    return activeTags.includes(slug)
  }
  return (
    <Button
      variant="default"
      onClick={() => handleTagClick(slug)}
      className={`
        active:bg-primary-200 rounded-full border px-2 py-1 whitespace-nowrap transition-colors
        ${
          isTagActive(slug)
            ? 'bg-primary-100 border-primary-500 text-s-medium '
            : 'text-s-regular border-neutral-200 bg-white'
        }
      `}
    >
      {label}
    </Button>
  )
}

export default PromoTagFilter
