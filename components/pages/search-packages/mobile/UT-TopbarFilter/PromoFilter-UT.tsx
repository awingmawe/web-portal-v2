import { Button } from '@/components/ui/button'

const PromoTagFilter = ({
  label = '',
  isActive = false,
  onClick,
}: {
  label?: string
  isActive?: boolean
  onClick?: () => void
}) => {
  return (
    <Button
      variant="default"
      onClick={onClick}
      className={`
        active:bg-primary-200 rounded-full border px-2 py-1 whitespace-nowrap transition-colors
        ${
          isActive
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
