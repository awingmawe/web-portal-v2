'use client'

import ShareIcon from '@/components/icons/share'
import WhatsappIcon from '@/components/icons/whatsapp'
import { useGallerySharing } from '@/hooks/gallery-package-hooks'
import { formatDateToDDMMYYYY } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type ImageDetailProps = {
  created_at: Date | string
  slug: string
  thumbnail_url: string | null
  title: string
  isWebview?: string
}

const ImageDetail = ({
  created_at,
  slug,
  thumbnail_url,
  title,
  isWebview,
}: ImageDetailProps) => {
  const { shareViaCopyLink } = useGallerySharing()
  const router = useRouter()
  const [disabledWa, setDisabledWa] = useState(true)
  const shareLinkWa = `Baca Artikel ini ${title} - ${window.location.origin}/article/detail/${slug}`
  const handleShareWebview = () => {
    window.flutter_inappwebview.callHandler('wa-share', shareLinkWa)
  }

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener(
        'flutterInAppWebViewPlatformReady',
        function () {}
      )
      document
        .getElementById('sendToFlutter')
        ?.addEventListener('click', function () {
          if (isWebview === 'true') {
            if (window.flutter_inappwebview) {
              handleShareWebview()
            } else {
            }
          } else {
            router.push(`https://wa.me/?text=${shareLinkWa}`)
          }
        })

      setDisabledWa(false)
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          <button id="sendToFlutter" disabled={disabledWa}>
            <WhatsappIcon size={20} />
          </button>
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
