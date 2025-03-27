import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useGallery } from '@/contexts/gallery-package-context'
import {
  useGalleryImages,
  useGalleryNavigation,
} from '@/hooks/gallery-package-hooks'
import { cn } from '@/lib/utils'
import Image from 'next/image'

// Gallery Thumbnails Component
const GalleryThumbnails = () => {
  const { activeImageIndex } = useGallery()
  const { filteredImages } = useGalleryImages()
  const { goToImageIndex } = useGalleryNavigation()

  if (filteredImages.length <= 1) return null

  return (
    <Carousel
      className="w-full max-lg:hidden"
      opts={{
        align: 'start',
        containScroll: 'trimSnaps',
      }}
    >
      <CarouselContent className="-ml-2">
        {filteredImages.map((image, index) => (
          <CarouselItem
            key={image.id || `thumbnail-${index}`}
            className="basis-1/6 pl-2 md:basis-1/8"
          >
            <div
              onClick={() => goToImageIndex(index)}
              className={cn(
                'cursor-pointer overflow-hidden rounded-sm border-2 transition-all',
                activeImageIndex === index
                  ? 'border-primary-500 border-[3px] opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-100'
              )}
            >
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={image.src}
                  width={0}
                  height={0}
                  sizes="100px"
                  alt={image.alt || `Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {filteredImages.length > 6 && (
        <>
          <CarouselPrevious className="left-1 h-7 w-7" />
          <CarouselNext className="right-1 h-7 w-7" />
        </>
      )}
    </Carousel>
  )
}

export default GalleryThumbnails
