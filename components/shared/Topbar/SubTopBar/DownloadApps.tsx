'use client'

import { AppStoreIcon } from '@/components/icons/appstore'
import { PlaystoreIcon } from '@/components/icons/playstore'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Smartphone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import QRCode from 'qrcode'
import { useEffect, useState } from 'react'

export default function DownloadApps({ qrApp }: { qrApp: string }) {
  const [qrCode, setQrCode] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!qrApp) return

    const generateQR = async () => {
      try {
        const url = await QRCode.toDataURL(qrApp)
        setQrCode(url)
      } catch (err) {
        console.error(err)
      }
    }
    generateQR()
  }, [qrApp])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button className="text-s-regular flex h-[30px] items-center gap-2 pt-1 pb-2">
          <Smartphone className="h-4 w-4" />
          Lebih nyaman di aplikasi
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="-mt-2 w-80 bg-white p-4"
        onMouseEnter={() => setOpen(true)} // keep open when hovering content
        onMouseLeave={() => setOpen(false)} // close when leaving
      >
        <div className="grid gap-2 text-center">
          <p className="text-m-regular">
            Scan untuk unduh Muslim101 & Nikmati kenyamanannya!
          </p>
          <div className="flex justify-center">
            {qrCode && (
              <Image src={qrCode} alt="QR Code" width={200} height={200} />
            )}
          </div>
          <p className="text-m-regular my-1">atau unduh disini</p>
          <div className="mt-4 flex justify-between gap-2">
            <Link
              href={`https://play.google.com/store/apps/details?id=com.muslim101.muslimapp`}
            >
              <PlaystoreIcon />
            </Link>
            <Link
              href={`https://apps.apple.com/id/app/muslim-app/id6742533171`}
            >
              <AppStoreIcon />
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
