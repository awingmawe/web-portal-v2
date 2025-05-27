'use client'

import { toast } from '@/components/ui/sonner'
import { TabType, useGallery } from '@/contexts/gallery-package-context'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { useCallback } from 'react'

/**
 * Specialized hook for handling gallery navigation
 */
export const useGalleryNavigation = () => {
  const {
    activeImageIndex,
    activeTab,
    isTransitioning,
    filteredImages,
    galleryImages,
    changeImage,
    changeTab,
  } = useGallery()
  const { lg } = useTailwindBreakpoint()

  const allGalleryImages = lg ? galleryImages : filteredImages

  // Go to previous image with wraparound
  const goToPreviousImage = useCallback(() => {
    if (isTransitioning || allGalleryImages.length <= 1) return

    const newIndex =
      (activeImageIndex - 1 + allGalleryImages.length) % allGalleryImages.length
    changeImage(newIndex)
  }, [activeImageIndex, changeImage, allGalleryImages.length, isTransitioning])

  // Go to next image with wraparound
  const goToNextImage = useCallback(() => {
    if (isTransitioning || allGalleryImages.length <= 1) return

    const newIndex = (activeImageIndex + 1) % allGalleryImages.length
    changeImage(newIndex)
  }, [activeImageIndex, changeImage, allGalleryImages.length, isTransitioning])

  // Jump to a specific index
  const goToImageIndex = useCallback(
    (index: number) => {
      if (
        isTransitioning ||
        index === activeImageIndex ||
        index < 0 ||
        index >= allGalleryImages.length
      )
        return

      changeImage(index)
    },
    [activeImageIndex, changeImage, allGalleryImages.length, isTransitioning]
  )

  // Switch to a specific tab
  const switchTab = useCallback(
    (tab: TabType) => {
      if (tab === activeTab) return

      changeTab(tab)
    },
    [activeTab, changeTab]
  )

  return {
    filteredImagesCount: allGalleryImages.length,
    goToPreviousImage,
    goToNextImage,
    goToImageIndex,
    switchTab,
  }
}

/**
 * Specialized hook for handling gallery sharing functionality
 */
export const useGallerySharing = () => {
  // Handle share click - copy current URL to clipboard
  const shareViaCopyLink = () => {
    if (!navigator.clipboard) {
      toast.error("Your browser doesn't support clipboard access")
      return
    }

    try {
      // Get the current URL
      const currentUrl = window.location.href

      // Copy to clipboard
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          toast.success('Link berhasil disalin!')
        })
        .catch((err) => {
          console.error('Failed to copy URL: ', err)
          toast.error('Gagal menyalin link, terjadi kesalahan.')
        })
    } catch (err) {
      console.error('Share action failed: ', err)
      toast.error('Gagal menyalin link, terjadi kesalahan.')
    }
  }

  // Handle WhatsApp share
  const shareViaWhatsApp = useCallback(
    (providedTitle: string, phoneNumber?: string) => {
      const shareTitle = providedTitle
      const currentUrl = window.location.href
      const url = phoneNumber
        ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=Assalamualaikum warahmatullahi wabarakatuh! Saya ingin bertanya tentang paket ini.%0A%0APaket ${providedTitle}%0A%0A${currentUrl}%0A%0AYang ingin ditanyakan:`
        : `https://wa.me/?text=${encodeURIComponent(`Umroh aman, nyaman dan berizin klik disini!\n${shareTitle}\n\n${currentUrl}`)}`

      const whatsappUrl = url
      window.open(whatsappUrl, '_blank')
    },
    []
  )

  return {
    shareViaCopyLink,
    shareViaWhatsApp,
  }
}

/**
 * Specialized hook for working with gallery images and metadata
 */
export const useGalleryImages = () => {
  const {
    galleryImages,
    filteredImages,
    activeImageIndex,
    packageCount,
    medinaCount,
    meccaCount,
  } = useGallery()
  const { lg } = useTailwindBreakpoint()

  const allGalleryImages = lg ? galleryImages : filteredImages

  // Get current active image
  const activeImage = filteredImages[activeImageIndex]

  // Check if there are images available for each tab
  const hasPackageImages = packageCount > 0
  const hasMedinaImages = medinaCount > 0
  const hasMeccaImages = meccaCount > 0

  // Check if we have at least one image
  const hasAnyImages = galleryImages.length > 0

  // Check if we have more than 5 images (for the +X indicator)
  const hasMoreThanDisplayLimit = galleryImages.length > 5

  // Get the count of additional images beyond the display limit
  const additionalImagesCount = Math.max(0, galleryImages.length - 5)

  return {
    filteredImages: allGalleryImages,
    activeImage,
    hasPackageImages,
    hasMedinaImages,
    hasMeccaImages,
    hasAnyImages,
    hasMoreThanDisplayLimit,
    additionalImagesCount,
  }
}

/**
 * Specialized hook for managing the gallery dialog state
 */
export const useGalleryDialog = () => {
  const { dialogOpen, setDialogOpen, handleImageClick } = useGallery()

  // Open dialog and select specific image
  const openGalleryWithImage = useCallback(
    (index: number) => {
      setDialogOpen(true)
      handleImageClick(index)
    },
    [handleImageClick, setDialogOpen]
  )

  // Close dialog
  const closeGallery = useCallback(() => {
    setDialogOpen(false)
  }, [setDialogOpen])

  return {
    dialogOpen,
    openGalleryWithImage,
    closeGallery,
  }
}
