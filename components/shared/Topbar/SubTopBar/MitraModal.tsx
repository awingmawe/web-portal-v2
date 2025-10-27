'use client'

import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface SuccessModalProps {
  title: string
}

export default function MitraModal({ title }: SuccessModalProps) {
  // Image must png
  const router = useRouter()
  const menuMitra = [
    {
      title: 'Travel',
      image: 'mitra-travel',
      subtitle: 'Travel Umroh, Haji, dan Umroh Private!',
      url: '/travel/list',
    },
    {
      title: 'Wukala',
      image: 'wukala',
      subtitle: 'Jual paket di Muslim101 dapet komisi!',
      url: '/wukala',
    },
  ]

  const handleGoTo = (url: string) => {
    router.push(url)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-s-regular mb-0 cursor-pointer">{title}</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader className="p-0">
          <div className="flex items-center justify-between">
            <DialogTitle>Jadi Mitra Muslim101</DialogTitle>
            <DialogClose asChild>
              <button className="absolute top-4 right-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <X size={20} />
              </button>
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="mt-2 mb-2 grid">
          <p className="text-m-regular">
            Pilih salah satu bentuk kerja sama kemitraan bersama kami dan capai
            keuntungan bersama!
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {menuMitra.map((menu) => (
            <div key={menu.title} className="grid gap-4">
              <Card
                onClick={() => handleGoTo(menu.url)}
                className="border-primary-300 hover:border-primary-500 w-full min-w-[52px] cursor-pointer border-1 bg-white px-1 py-3 shadow-sm hover:shadow-none"
              >
                <CardContent className="flex h-full flex-col items-start justify-between px-2 max-lg:flex-row max-lg:items-center">
                  <div className="flex items-center gap-4">
                    <Image
                      src={`/images/${menu.image}.png`}
                      alt={menu.title}
                      width={48}
                      height={48}
                      className="h-[48px]"
                    />
                    <div className="flex flex-col gap-2">
                      <p className="text-m-medium text-neutral-900">
                        {menu.title}
                      </p>
                      <p className="text-s-regular text-neutral-900">
                        {menu.subtitle}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild></DialogClose>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
