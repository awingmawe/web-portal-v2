'use client'

import GalleryListContent from '@/components/pages/detail-package/1-Gallery/GalleryMain'

interface GalleryListProps {
  title: string
}

// Main component that uses the context
const GalleryList: React.FC<GalleryListProps> = (props) => {
  return <GalleryListContent title={props.title} />
}

export default GalleryList
