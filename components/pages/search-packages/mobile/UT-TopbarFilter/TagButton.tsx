import { Button } from '@/components/ui/button'
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { useIsProviderFilterLocked } from '@/hooks/pembiayaan/useIsProviderFilterLocked'

interface TagButtonProps {
  label: string
  code: string | number
  filters: any
  name: string
  setFilters: (filter: string) => void
  shouldUpdate?: boolean
  paramName?: string
  type?: 'price' | 'facility' | 'section' | 'location' | 'promo' | 'provider'
}

// Tag Button Component
const TagButton: React.FC<TagButtonProps> = ({
  label,
  code: rawCode,
  filters,
  setFilters,
  name,
  shouldUpdate = false,
  type,
  paramName,
}) => {
  const isProviderFilterLocked = useIsProviderFilterLocked()

  // Disable the tag button if it's a 'change_package' flow and a provider is pre-selected.
  const isDisabled = type === 'provider' && isProviderFilterLocked

  const updateQueryParams = useUpdateQueryParams()
  const code = String(rawCode) // Ensure code is always a string

  // Handle tag click - toggle active state
  const handleTagClick = (code: string) => {
    if (code === 'price-range') {
      setFilters('')

      updateQueryParams(['prMin', 'prMax', 'page'], ['', '', 1])
      return
    }

    // Get current active tags from context
    const currentTags = filters?.[name]
      ? filters?.[name].split(',').filter(Boolean)
      : []

    let newActiveIds: string[]

    if (currentTags.includes(code)) {
      // Remove tag if already active
      newActiveIds = currentTags.filter((slug: string) => slug !== code)
    } else {
      // Add tag if not active
      newActiveIds = [...currentTags, code]
    }

    const itemsString = newActiveIds.join(',')

    // Update context
    setFilters(itemsString)

    if (shouldUpdate && paramName) {
      if (itemsString) {
        updateQueryParams([paramName, 'page'], [itemsString, 1])
      } else {
        // If no items selected, remove the parameter from URL
        updateQueryParams([paramName], [''])
      }
    }
  }

  // Helper function to check if a tag is active
  const isTagActive = (code: string) => {
    if (code === 'price-range') return true
    if (!filters?.[name]) return false
    const activeTags = filters?.[name].split(',').filter(Boolean)
    return activeTags.includes(String(code))
  }
  return (
    <Button
      variant="default"
      onClick={() => handleTagClick(code)}
      disabled={isDisabled}
      className={`
        active:bg-primary-200 rounded-full border px-2 py-1 whitespace-nowrap transition-colors
        ${
          isTagActive(code)
            ? 'bg-primary-100 border-primary-500 text-s-medium '
            : 'text-s-regular border-neutral-200 bg-white'
        }
      `}
    >
      {label}
    </Button>
  )
}

export default TagButton
