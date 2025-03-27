import ImageIcon from '@/components/icons/image'
import ShareIcon from '@/components/icons/share'
import WhatsappIcon from '@/components/icons/whatsapp'
import GalleryMainImage from '@/components/pages/detail-package/1-Gallery/GalleryMainImage'
import GalleryTabs from '@/components/pages/detail-package/1-Gallery/GalleryTabs'
import GalleryThumbnails from '@/components/pages/detail-package/1-Gallery/GalleryThumbnail'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import { useGallery } from '@/contexts/gallery-package-context'
import {
  useGalleryDialog,
  useGalleryImages,
  useGallerySharing,
} from '@/hooks/gallery-package-hooks'
import { dissolve } from '@/lib/animation-setup'
import { cn } from '@/lib/utils'
import Placeholder from '@/public/images/no-image-placeholder.png'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useMemo } from 'react'

// Inner component that consumes the context
const GalleryListContent: React.FC<{ title: string }> = ({ title }) => {
  const { getSourceLabel, galleryImages } = useGallery()

  // Use our custom hooks
  const { hasAnyImages, hasMoreThanDisplayLimit, additionalImagesCount } =
    useGalleryImages()

  const { dialogOpen, openGalleryWithImage, closeGallery } = useGalleryDialog()
  const { shareViaCopyLink, shareViaWhatsApp } = useGallerySharing()

  // Memoize visible gallery images to prevent unnecessary calculations
  const visibleImages = useMemo(() => {
    if (!hasAnyImages) return []
    return galleryImages.slice(0, 5)
  }, [galleryImages, hasAnyImages])

  // Function to handle dialog state changes
  const handleDialogChange = (open: boolean) => {
    if (!open) {
      closeGallery()
    }
  }

  return (
    <div className="w-full bg-white" id="gallery-list">
      <div className="mb-6 flex items-center justify-between max-lg:hidden">
        <p className="heading-3-semibold text-neutral-900">{title}</p>
        <div className="flex items-center gap-2">
          <p className="text-l-regular text-neutral-500">Share: </p>
          <button
            onClick={() => shareViaWhatsApp(title)}
            className={`cursor-pointer rounded-full hover:bg-neutral-100 ${dissolve}`}
            aria-label="Share via WhatsApp"
          >
            <WhatsappIcon size={32} />
          </button>
          <button
            onClick={shareViaCopyLink}
            className={`cursor-pointer rounded-full hover:bg-neutral-100 ${dissolve}`}
            aria-label="Copy link"
          >
            <ShareIcon size={32} />
          </button>
        </div>
      </div>

      {/* Mobile View - Swipeable Carousel */}
      <div className="relative w-full lg:hidden">
        <Carousel className="w-full">
          <CarouselContent>
            {galleryImages.length !== 0 ? (
              galleryImages.map((image, index) => (
                <CarouselItem key={`mobile-carousel-${image.id || index}`}>
                  <div
                    className="relative cursor-pointer overflow-hidden"
                    onClick={() => openGalleryWithImage(index)}
                  >
                    <AspectRatio ratio={16 / 9} className="h-full">
                      <Image
                        src={image.src ?? Placeholder}
                        alt={image.alt || `Gallery image ${index + 1}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-full w-full object-cover"
                      />
                      {/* Source badge */}
                      {image.source && (
                        <div className="absolute bottom-6.5 left-2 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                          {getSourceLabel(image.source)}
                        </div>
                      )}
                    </AspectRatio>
                    {galleryImages.length > 1 && (
                      <div className="absolute right-2 bottom-6.5 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#101010]/64 px-3 py-1.5 backdrop-blur-[2px]">
                        <ImageIcon />
                        <p className="justify-start text-[10px] leading-none font-normal text-white">
                          {index + 1}/{galleryImages.length}
                        </p>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))
            ) : (
              <AspectRatio ratio={16 / 9} className="h-full">
                <Image
                  src={Placeholder}
                  alt={`Gallery image Placeholder Muslim101`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            )}
          </CarouselContent>

          {/* Carousel Navigation */}
          {/* {galleryImages.length > 1 && (
            <>
              <CarouselPrevious className="absolute top-1/2 left-2 z-10 h-7 w-7 -translate-y-1/2" />
              <CarouselNext className="absolute top-1/2 right-2 z-10 h-7 w-7 -translate-y-1/2" />
            </>
          )} */}

          {/* Image counter indicator */}
        </Carousel>
      </div>

      {/* Desktop View - Image Grid Layout */}
      {visibleImages.length === 0 && (
        <Image
          src={Placeholder}
          alt={`Gallery image Placeholder Muslim101`}
          width={0}
          height={0}
          sizes="100vw"
          className="aspect-16/9 h-full w-full object-cover max-lg:hidden"
        />
      )}
      <div className="hidden grid-cols-4 gap-2 overflow-hidden rounded-[20px] lg:grid">
        {/* First image (larger) */}
        {visibleImages[0] && (
          <div
            className="relative col-span-2 row-span-2 cursor-pointer overflow-hidden"
            onClick={() => openGalleryWithImage(0)}
          >
            <AspectRatio ratio={4 / 3} className="h-full">
              <Image
                src={visibleImages[0].src}
                alt={visibleImages[0].alt || 'Gallery image'}
                width={0}
                height={0}
                sizes="100vw"
                className={`h-full w-full object-cover ${dissolve} hover:scale-105`}
              />
              {/* Source badge */}
              {visibleImages[0].source && (
                <div className="absolute top-2 left-2 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                  {getSourceLabel(visibleImages[0].source)}
                </div>
              )}
            </AspectRatio>
          </div>
        )}

        {/* Other images */}
        {visibleImages.slice(1).map((image, index) => (
          <div
            key={image.id || `gallery-image-${index + 1}`}
            className={cn('relative cursor-pointer overflow-hidden')}
            onClick={() => openGalleryWithImage(index + 1)}
          >
            <AspectRatio ratio={4 / 3} className="h-full">
              <Image
                src={image.src}
                alt={image.alt || `Gallery image ${index + 2}`}
                width={0}
                height={0}
                sizes="100vw"
                className={`h-full w-full object-cover ${dissolve} hover:scale-105`}
              />
              {/* Source badge */}
              {image.source && (
                <div className="absolute top-2 left-2 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                  {getSourceLabel(image.source)}
                </div>
              )}
            </AspectRatio>

            {/* Show counter on the last image */}
            {index === visibleImages.slice(1).length - 1 &&
              hasMoreThanDisplayLimit && (
                <div className="absolute right-2 bottom-2 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                  +{additionalImagesCount}
                </div>
              )}
          </div>
        ))}
      </div>

      {/* Dialog separated from triggers */}
      <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="bg-neutral-0 my-auto min-w-5xl gap-2.5 rounded-[20px] border-0 px-2.5 py-8 max-xl:min-w-fit max-lg:h-full max-lg:w-full max-lg:max-w-[100%] max-lg:rounded-none max-lg:bg-neutral-900 max-lg:p-0">
          {/* Tabs */}
          <GalleryTabs />

          {/* Main Image Display */}
          <GalleryMainImage />

          {/* Thumbnail Carousel */}
          <GalleryThumbnails />

          {/* Custom Close Icon on Desktop */}
          <DialogClose
            className="bg-neutral-0 absolute top-[20px] right-[20px] cursor-pointer rounded-full p-2.5 max-lg:hidden"
            aria-label="Close dialog"
          >
            <X className="text-primary-500" />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default GalleryListContent
