'use client'

import { AppStoreIcon } from '@/components/icons/appstore'
import { PlaystoreIcon } from '@/components/icons/playstore'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { LINK_APPSTORE, LINK_PLAYSTORE, QRCODE_APPS } from '@/constant/env'
import { Smartphone } from 'lucide-react'
import Link from 'next/link'
import QRCode from 'qrcode'
import { useEffect, useState } from 'react'

export default function DownloadApps() {
  const [qrCode, setQrCode] = useState('') // start empty

  useEffect(() => {
    const generateQR = async () => {
      try {
        const url = await QRCode.toDataURL(QRCODE_APPS)
        setQrCode(url)
      } catch (err) {
        console.error(err)
      }
    }
    generateQR()
  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-s-regular flex items-center gap-2">
          <Smartphone className="h-4 w-4" />
          Lebih nyaman di aplikasi
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-white p-4">
        <div className="grid gap-2 text-center">
          <p className="text-m-regular">
            Scan untuk unduh Muslim101 & Nikmati kenyamanannya!
          </p>
          <div className="flex justify-center">
            {qrCode && <img src={qrCode} alt="QR Code" />}
          </div>
          <p className="text-m-regular my-1">atau unduh disini</p>
          <div className="mt-4 flex justify-between gap-2">
            <Link href={LINK_PLAYSTORE}>
              <PlaystoreIcon />
            </Link>
            <Link href={LINK_APPSTORE}>
              <AppStoreIcon />
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
