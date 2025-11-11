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
  {
    slug: 'hajj-furoda',
    content: `Haji Furoda adalah program ibadah haji yang dilaksanakan di luar kuota resmi pemerintah Indonesia, dengan menggunakan visa mujamalah atau visa undangan yang diterbitkan langsung oleh Pemerintah Arab Saudi. Visa ini diberikan melalui undangan khusus dan tidak bergantung pada alokasi kuota nasional masing-masing negara.
Keunggulan utama dari program Haji Furoda adalah jamaah dapat berangkat pada tahun yang sama saat pendaftaran atau pemesanan, tanpa harus menunggu antrean bertahun-tahun seperti pada jalur haji reguler/khusus. Meskipun demikian, seluruh proses keberangkatan tetap mengikuti aturan dan ketentuan yang berlaku dari pihak Arab Saudi, baik dalam aspek administratif, kesehatan, maupun ibadah.`,
  },
  {
    slug: 'hajj-special',
    content: `Haji Khusus adalah program ibadah haji yang menggunakan kuota resmi yang dialokasikan oleh Pemerintah Indonesia, namun pelaksanaannya diselenggarakan oleh pihak swasta yang telah mendapatkan izin resmi dari Kementerian Agama, yaitu Penyelenggara Ibadah Haji Khusus (PIHK). 
Salah satu keunggulan utama dari Haji Khusus adalah masa tunggunya yang jauh lebih singkat dibandingkan Haji Reguler. Jika Haji Reguler bisa memiliki antrean hingga belasan atau puluhan tahun di beberapa daerah, masa tunggu Haji Khusus biasanya berkisar antara 5 hingga 7 tahun, tergantung pada ketersediaan kuota dan provinsi tempat pendaftaran.`,
  },
  {
    slug: 'hajj-dakhili',
    content: `Haji Dakhili adalah program ibadah haji yang diperuntukkan bagi warga negara Arab Saudi atau penduduk asing yang tinggal di Arab Saudi dengan izin tinggal resmi (iqamah). Program ini dilaksanakan melalui sistem resmi Kementerian Haji dan Umrah Arab Saudi, sehingga tidak bergantung pada kuota haji internasional yang dialokasikan untuk tiap negara.
Keunggulan utama Haji Dakhili adalah jamaah dapat mendaftar dan berangkat pada tahun yang sama, khususnya untuk melaksanakan rangkaian puncak haji (8–13 Zulhijjah), tanpa harus menunggu antrean panjang seperti haji reguler di negara asal. Meskipun durasinya lebih singkat, seluruh proses tetap mengikuti aturan resmi Pemerintah Arab Saudi, baik terkait aspek administratif, kesehatan, maupun tata cara ibadah.`,
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
      <DialogContent className="gap-0 p-0 sm:max-w-[640px]">
        <DialogHeader className="mb-0 px-8 py-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="heading-4-semibold mb-0">
              {title}
            </DialogTitle>
            <DialogClose asChild>
              <X
                size={30}
                className="text-newutral-900 cursor-pointer rounded-full bg-none p-1 hover:text-gray-600"
              />
            </DialogClose>
          </div>
        </DialogHeader>
        <hr className="border-neutral-100" />
        <div className="mt-2 mb-2 grid px-8 py-4">
          <p className="text-l-regular">
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
