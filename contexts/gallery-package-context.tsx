'use client'

import { GalleryImage } from '@/constant/types/GalleryProps'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import Placeholder from '@/public/images/no-image-placeholder.png'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

// Define tab types
export type TabType = 'package' | 'medina' | 'mecca'

// Interface for gallery context state and methods
interface GalleryContextType {
  // States
  dialogOpen: boolean
  activeImageIndex: number
  activeTab: TabType
  isTransitioning: boolean

  // Image collections
  packageImagesFormatted: FormattedGalleryImage[]
  medinaHotelImagesFormatted: FormattedGalleryImage[]
  meccaHotelImagesFormatted: FormattedGalleryImage[]

  // Derived data
  sourceMap: Record<TabType, FormattedGalleryImage[]>
  galleryImages: FormattedGalleryImage[]
  filteredImages: FormattedGalleryImage[]

  // Counts for tab labels
  packageCount: number
  medinaCount: number
  meccaCount: number

  // Methods
  setDialogOpen: (open: boolean) => void
  changeImage: (newIndex: number) => void
  changeTab: (tab: TabType) => void
  handleImageClick: (index: number) => void
  getSourceLabel: (source?: string) => string
  getTotalImagesPerTab: () => number
}

// Extend GalleryImage with source field
export interface FormattedGalleryImage extends GalleryImage {
  src: string
  source: TabType
}

// Props for the context provider
interface GalleryProviderProps {
  children: React.ReactNode
  packageImages?: GalleryImage[]
  medinaHotelImages?: GalleryImage[]
  meccaHotelImages?: GalleryImage[]
  title?: string
}

// Create the context with default values
const GalleryContext = createContext<GalleryContextType | undefined>(undefined)

// Provider component
export const GalleryProvider: React.FC<GalleryProviderProps> = ({
  children,
  packageImages = [],
  medinaHotelImages = [],
  meccaHotelImages = [],
}) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<TabType>('package')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { lg } = useTailwindBreakpoint()
  // Memoize the formatted image arrays to prevent unnecessary recreations
  const packageImagesFormatted = useMemo(
    () =>
      packageImages.map((img: any) => ({
        ...img,
        src: img.src || Placeholder,
        source: 'package' as TabType,
      })),
    [packageImages]
  )

  const medinaHotelImagesFormatted = useMemo(
    () =>
      medinaHotelImages.map((img: any) => ({
        ...img,
        src: img.src || Placeholder,
        source: 'medina' as TabType,
      })),
    [medinaHotelImages]
  )

  const meccaHotelImagesFormatted = useMemo(
    () =>
      meccaHotelImages.map((img: any) => ({
        ...img,
        src: img.src || Placeholder,
        source: 'mecca' as TabType,
      })),
    [meccaHotelImages]
  )

  // Create a memoized map of sources to their images
  const sourceMap = useMemo(
    () => ({
      package: packageImagesFormatted,
      medina: medinaHotelImagesFormatted,
      mecca: meccaHotelImagesFormatted,
    }),
    [
      packageImagesFormatted,
      medinaHotelImagesFormatted,
      meccaHotelImagesFormatted,
    ]
  )

  // Memoize the combined gallery images array
  const galleryImages = useMemo(
    () => [
      ...packageImagesFormatted,
      ...medinaHotelImagesFormatted,
      ...meccaHotelImagesFormatted,
    ],
    [
      packageImagesFormatted,
      medinaHotelImagesFormatted,
      meccaHotelImagesFormatted,
    ]
  )

  // Memoize the filtered images based on active tab
  const filteredImages = useMemo(
    () => sourceMap[activeTab] || [],
    [sourceMap, activeTab]
  )

  // Get counts for tab labels - memoize to prevent recalculation
  const packageCount = useMemo(
    () => packageImagesFormatted.length,
    [packageImagesFormatted]
  )
  const medinaCount = useMemo(
    () => medinaHotelImagesFormatted.length,
    [medinaHotelImagesFormatted]
  )
  const meccaCount = useMemo(
    () => meccaHotelImagesFormatted.length,
    [meccaHotelImagesFormatted]
  )

  // Set default active tab based on which source has images
  useEffect(() => {
    if (packageImagesFormatted.length > 0) {
      setActiveTab('package')
    } else if (medinaHotelImagesFormatted.length > 0) {
      setActiveTab('medina')
    } else if (meccaHotelImagesFormatted.length > 0) {
      setActiveTab('mecca')
    }
  }, [
    packageImagesFormatted.length,
    medinaHotelImagesFormatted.length,
    meccaHotelImagesFormatted.length,
  ])

  // Function to get source badge label - memoize since it's a pure function
  const getSourceLabel = useCallback((source?: string) => {
    switch (source) {
      case 'package':
        return 'Galeri Foto'
      case 'medina':
        return 'Hotel Madinah'
      case 'mecca':
        return 'Hotel Mekkah'
      default:
        return ''
    }
  }, [])

  const getTotalImagesPerTab = useCallback(() => {
    switch (activeTab) {
      case 'package':
        return packageCount
      case 'medina':
        return medinaCount
      case 'mecca':
        return meccaCount
      default:
        return 0
    }
  }, [activeTab, packageCount, medinaCount, meccaCount])

  // Handle smooth transitions between images - useCallback to prevent recreation
  const changeImage = useCallback(
    (newIndex: number) => {
      // Don't change if already transitioning or same index
      if (isTransitioning || newIndex === activeImageIndex) return

      setIsTransitioning(true)
      setTimeout(() => {
        setActiveImageIndex(newIndex)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 150) // Half the fade time for smoother experience
      }, 150) // Time to fade out
    },
    [isTransitioning, activeImageIndex]
  )

  // Handle tab changes - useCallback to prevent recreation
  const changeTab = useCallback(
    (tab: TabType) => {
      if (tab === activeTab) return

      setIsTransitioning(true)
      setTimeout(() => {
        setActiveTab(tab)
        setActiveImageIndex(0)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 150)
      }, 150)
    },
    [activeTab]
  )

  // When user clicks on an image in the grid, set tab based on its source
  const handleImageClick = useCallback(
    (index: number) => {
      const clickedImage = galleryImages[index] as FormattedGalleryImage
      if (lg) {
        setIsTransitioning(true)
        setTimeout(() => {
          setActiveImageIndex(index)

          setTimeout(() => {
            setIsTransitioning(false)
          }, 150)
        }, 150)
      }
      if (!lg && clickedImage && clickedImage.source) {
        // If tab needs to change
        if (clickedImage.source !== activeTab) {
          setIsTransitioning(true)

          setTimeout(() => {
            setActiveTab(clickedImage.source as TabType)

            // Find the index of this image in the filtered array
            const newIndex = sourceMap[clickedImage.source].findIndex(
              (img) => img.id === clickedImage.id
            )

            setActiveImageIndex(newIndex >= 0 ? newIndex : 0)

            setTimeout(() => {
              setIsTransitioning(false)
            }, 150)
          }, 150)
        } else {
          // Just change the image within the same tab
          const newIndex = sourceMap[clickedImage.source].findIndex(
            (img: any) => img.id === clickedImage.id
          )
          changeImage(newIndex >= 0 ? newIndex : 0)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [galleryImages, activeTab, sourceMap, changeImage]
  )

  // Memoize the context value to prevent unnecessary re-renders
  const value = {
    // States
    dialogOpen,
    activeImageIndex,
    activeTab,
    isTransitioning,

    // Image collections
    packageImagesFormatted,
    medinaHotelImagesFormatted,
    meccaHotelImagesFormatted,

    // Derived data
    sourceMap,
    galleryImages,
    filteredImages,

    // Counts for tab labels
    packageCount,
    medinaCount,
    meccaCount,

    // Methods
    setDialogOpen,
    changeImage,
    changeTab,
    handleImageClick,
    getSourceLabel,
    getTotalImagesPerTab,
  }
  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  )
}

// Custom hook to use the gallery context
export const useGallery = () => {
  const context = useContext(GalleryContext)
  if (context === undefined) {
    throw new Error('useGallery must be used within a GalleryProvider')
  }
  return context
}
