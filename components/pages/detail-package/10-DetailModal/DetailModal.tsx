'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DetailModalProps {
  title: string
  open: boolean
  onOpenChange: (open: boolean) => void
  variant: string
}

const disclaimer = [
  {
    slug: 'umrah',
    content: `Umroh Reguler adalah program perjalanan ibadah umroh yang dilaksanakan sesuai stkamur layanan dasar, mencakup pelaksanaan ibadah umroh di Makkah dan ziarah ke Madinah. Program ini difokuskan sepenuhnya untuk menjalankan ibadah, tanpa adanya tambahan agenda wisata ke negara lain.
        Biasanya, durasi perjalanan umroh reguler berkisar antara 9 hingga 12 hari, dengan fasilitas yang bervariasi sesuai paket—mulai dari hotel bintang 3 hingga bintang 5. Program ini merupakan pilihan paling umum dan ekonomis bagi jamaah yang ingin menjalankan ibadah umroh secara khusyuk dan efisien, baik dari segi waktu maupun biaya.`,
  },
  {
    slug: 'plus',
    content: `Umroh Plus Liburan adalah program perjalanan ibadah umroh yang dipadukan dengan agenda wisata ke negara lain, baik sebelum maupun sesudah pelaksanaan umroh. Beberapa destinasi wisata populer yang biasa digabungkan dengan umroh.
        Program ini dirancang bagi jamaah yang ingin menunaikan ibadah umroh sekaligus menikmati pengalaman budaya, sejarah, dan rekreasi di luar atau di dalam Arab Saudi. Durasi perjalanan biasanya lebih panjang dibandingkan umroh reguler, bisa mencapai 12 hingga 15 hari atau lebih, tergantung jumlah negara yang dikunjungi.`,
  },
]

export default function DetailPackageModal({
  title,
  open,
  onOpenChange,
  variant,
}: DetailModalProps) {
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader className="p-0">
          <div className="flex items-center justify-between">
            <DialogTitle>{title}</DialogTitle>
            <DialogClose asChild>
              <X
                size={30}
                className="absolute top-4 right-4 cursor-pointer rounded-full bg-neutral-100 p-1 text-gray-400 hover:text-gray-600"
              />
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="mt-2 mb-2 grid">
          <p className="text-m-regular">
            {disclaimer.find((c) => c.slug === variant)?.content ??
              'No disclaimer found'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4"></div>

        <DialogFooter>
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
