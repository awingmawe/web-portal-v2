'use client'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { api } from '@/services/common/http'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const PopupPromo: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [actionUrl, setActionUrl] = useState<string | null>(null)
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [popupSessioKey, setPopupSessioKey] = useState('')

  const handleOpenChange = (open: boolean) => {
    setIsOpenPopup(open)
    if (!open) {
      sessionStorage.setItem(popupSessioKey, 'true')
    }
  }

  useEffect(() => {
    const fetchPopupImage = async () => {
      try {
        const response = await api.get('/public/general/v1/popup/active')
        setImageUrl(response.data?.imageUrl)
        setActionUrl(response.data?.actionUrlWeb)
        setPopupSessioKey('popupShown' + response.data.updateAt)
        if (!sessionStorage.getItem('popupShown' + response.data.updateAt)) {
          setIsOpenPopup(response.data?.isActive && response.data?.webApp)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchPopupImage()
  }, [])

  return (
    <Dialog open={isOpenPopup} onOpenChange={handleOpenChange}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
        className="z-[999] w-sm max-w-sm bg-transparent shadow-none"
      >
        <DialogHeader>
          <DialogTitle className="hidden" />
          <DialogClose asChild>
            <X
              size={36}
              className="absolute top-7 right-7 cursor-pointer rounded-full bg-white p-1 hover:text-gray-600"
            />
          </DialogClose>
          <DialogDescription>
            <Link
              href={actionUrl || '#'}
              scroll={false}
              onClick={() => handleOpenChange(false)}
            >
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Promo"
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                    height: '100%',
                  }}
                  width={0}
                  height={0}
                />
              )}
            </Link>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default PopupPromo
