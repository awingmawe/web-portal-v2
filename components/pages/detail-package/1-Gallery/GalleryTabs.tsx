import { DialogTitle } from '@/components/ui/dialog'
import { useGallery } from '@/contexts/gallery-package-context'
import { useGalleryNavigation } from '@/hooks/gallery-package-hooks'
import { dissolve } from '@/lib/animation-setup'
import { cn } from '@/lib/utils'

// Gallery Tabs Component
const GalleryTabs = () => {
  const { activeTab, packageCount, medinaCount, meccaCount } = useGallery()
  const { switchTab } = useGalleryNavigation()

  const tabs = [
    {
      id: 'package',
      label: 'Galeri Foto',
      count: packageCount,
    },
    {
      id: 'mecca',
      label: 'Hotel Mekkah',
      count: meccaCount,
    },
    {
      id: 'medina',
      label: 'Hotel Madinah',
      count: medinaCount,
    },
  ]
  // {activeImageIndex + 1}/{getTotalImagesPerTab()}

  return (
    <DialogTitle className="max-lg:hidden">
      <div className="flex w-full items-center justify-center max-lg:hidden">
        <div className="text-white">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id as any)}
              className={cn(
                'w-[200px] cursor-pointer border-b-[2px] pt-4 pb-2.5 text-sm leading-[20px] font-medium outline-none focus:outline-none max-xl:w-[140px]',
                dissolve,
                activeTab === tab.id
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-neutral-200 text-neutral-500'
              )}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>
    </DialogTitle>
  )
}

export default GalleryTabs
