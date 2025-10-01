import { ChevronIcon } from '@/components/icons/chevron'
import { DialogClose } from '@/components/ui/dialog'
import { useGallery } from '@/contexts/gallery-package-context'
import {
  useGalleryImages,
  useGalleryNavigation,
} from '@/hooks/gallery-package-hooks'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import Image from 'next/image'

// Gallery Main Image Component
const GalleryMainImage = () => {
  const {
    activeTab,
    getTotalImagesPerTab,
    getSourceLabel,
    activeImageIndex,
    isTransitioning,
  } = useGallery()

  const { filteredImages, activeImage } = useGalleryImages()

  const { goToPreviousImage, goToNextImage, filteredImagesCount } =
    useGalleryNavigation()

  return (
    <div className="my-auto flex flex-col items-center gap-2.5">
      {filteredImages.length > 0 ? (
        <div className="relative flex h-[50vh] w-full flex-col items-center justify-center overflow-hidden">
          {filteredImages.map((image, index) => (
            <div
              key={image.id || `filtered-image-${index}`}
              className={cn(
                'absolute inset-0 left-1/2 flex w-fit -translate-x-1/2 flex-col items-center justify-center py-6 transition-opacity duration-300 max-lg:w-full',
                activeImageIndex === index && !isTransitioning
                  ? 'opacity-100'
                  : 'opacity-0'
              )}
            >
              <div className="flex h-full w-full items-center justify-center">
                <Image
                  src={image.src}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt={image.alt || `Gallery image ${index + 1}`}
                  priority={index === activeImageIndex}
                  className="h-full w-full rounded-[20px] object-contain max-lg:rounded-none"
                />
              </div>
            </div>
          ))}

          {/* Navigation buttons */}
          {filteredImagesCount > 1 && (
            <>
              <button
                onClick={goToPreviousImage}
                className="absolute top-1/2 left-2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#1818184D] p-2.5 backdrop-blur-[5px]"
                aria-label="Previous image"
              >
                <ChevronIcon className="text-neutral-0 rotate-90" size={24} />
              </button>
              <button
                onClick={goToNextImage}
                className="absolute top-1/2 right-2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#1818184D] p-2.5 backdrop-blur-[5px]"
                aria-label="Next image"
              >
                <ChevronIcon className="text-neutral-0 rotate-270" size={24} />
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="flex h-[50vh] flex-col items-center justify-center p-4 text-white">
          <p>
            Tidak ada gambar yang tersedia untuk {getSourceLabel(activeTab)}
          </p>
        </div>
      )}

      {/* Image caption/info */}
      {activeImage && (
        <div className="inline-flex flex-col items-center rounded-full bg-[#1010101A] px-3 py-1.5 text-center max-lg:hidden">
          <p className="text-m-medium text-neutral-900">
            {activeImageIndex + 1}/{getTotalImagesPerTab()}
          </p>
        </div>
      )}

      {/* Close button mobile version */}
      <div className="bg-neutral-0 absolute top-0 z-99 flex w-full items-center justify-between px-4 py-3 lg:hidden">
        <div />
        <p className="text-m-medium text-neutral-900">
          {activeImageIndex + 1}/{filteredImagesCount}
        </p>
        <DialogClose className=" cursor-pointer" aria-label="Close dialog">
          <X className="text-primary-900" />
        </DialogClose>
      </div>
    </div>
  )
}

export default GalleryMainImage
