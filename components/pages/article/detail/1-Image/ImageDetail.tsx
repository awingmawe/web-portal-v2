'use client'

import ShareIcon from '@/components/icons/share'
import WhatsappIcon from '@/components/icons/whatsapp'
import { useGallerySharing } from '@/hooks/gallery-package-hooks'
import { formatDateToDDMMYYYY } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type ImageDetailProps = {
  created_at: Date | string
  thumbnail_url: string | null
  title: string
  isWebview?: string
}

const ImageDetail = ({
  created_at,
  thumbnail_url,
  title,
  isWebview,
}: ImageDetailProps) => {
  const { shareViaCopyLink } = useGallerySharing()
  const router = useRouter()
  const handleShareWebview = () => {
    window.postMessage(
      {
        type: 'wa-share',
        data: {
          title,
          url: window.location.href,
        },
      },
      '*'
    )
  }
  return (
    <>
      <div className="mb-3 flex items-center justify-between lg:hidden">
        <p className="text-s-regular text-neutral-800">
          {formatDateToDDMMYYYY(
            typeof created_at === 'string' ? new Date(created_at) : created_at
          )}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-s-regular text-neutral-500">Bagikan:</p>
          <WhatsappIcon
            size={20}
            onClick={() => {
              if (isWebview === 'true') {
                handleShareWebview()
              } else {
                router.push(
                  `https://wa.me/?text=Baca Artikel ini ${title} - ${window.location.href}`
                )
              }
            }}
          />
          <ShareIcon size={20} onClick={shareViaCopyLink} />
        </div>
      </div>
      <Image
        src={thumbnail_url ?? `/images/no-image-placeholder.png`}
        width={0}
        height={0}
        sizes="100vw"
        className="aspect-32/15 w-full rounded-[20px] object-cover"
        alt={thumbnail_url ?? 'No Image'}
      />
    </>
  )
}

export default ImageDetail
