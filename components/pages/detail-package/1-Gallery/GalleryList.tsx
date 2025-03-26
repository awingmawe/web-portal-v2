'use client'

import GalleryListContent from '@/components/pages/detail-package/1-Gallery/GalleryMain'
import { GalleryImage } from '@/constant/types/GalleryProps'
import { GalleryProvider } from '@/contexts/gallery-package-context'

interface GalleryListProps {
  title: string
  packageImages?: GalleryImage[]
  medinaHotelImages?: GalleryImage[]
  meccaHotelImages?: GalleryImage[]
}

// Main component that uses the context
const GalleryList: React.FC<GalleryListProps> = (props) => {
  return (
    <GalleryProvider
      packageImages={props.packageImages || []}
      medinaHotelImages={props.medinaHotelImages || []}
      meccaHotelImages={props.meccaHotelImages || []}
      title={props.title}
    >
      <GalleryListContent title={props.title} />
    </GalleryProvider>
  )
}

export default GalleryList
