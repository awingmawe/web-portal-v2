'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { CALL_CENTER } from '@/constant/env'
import { useAuth } from '@/contexts/auth/context'
import { DialogClose } from '@radix-ui/react-dialog'
import { CircleX } from 'lucide-react'

interface TransactionDetailProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bookingId?: any
  packageTitle: string
  travelName: string
}

export function BatalkanPesananInfo({
  open,
  onOpenChange,
  bookingId,
  packageTitle,
  travelName,
}: TransactionDetailProps) {
  const { profile } = useAuth()

  const hubungiCS = `Assalamualaikum, saya ${profile?.name}. Saya calon jemaah haji ${packageTitle} dengan kode via Muslim101. Saya ingin membatalkan pesanan haji saya dengan kode ${bookingId} dikarenakan (Silahkan isi alasan kamu)`
  const bantuan = `Assalamualaikum, saya ${profile?.name}. Saya calon jemaah haji ${packageTitle} dari travel ${travelName}. Saya ingin membatalkan pesanan haji saya dengan kode ${bookingId} dikarenakan (Silahkan isi alasan kamu)`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[640px] gap-0 overflow-hidden rounded-2xl bg-white px-6 py-4 text-black">
        {/* Header */}
        <DialogTitle asChild>
          <div className="relative top-3 flex items-center gap-3 pb-3">
            <p className="text-[24px] font-semibold">
              Membatalkan Pesanan Haji
            </p>
            <DialogClose className="absolute right-4">
              <CircleX className="text-gray-500" />
            </DialogClose>
          </div>
        </DialogTitle>

        {/* Cancellation Form */}
        <div className="mt-6 space-y-3">
          <p>
            Apabila Kamu memutuskan untuk membatalkan paket haji, harap
            diketahui bahwa proses pembatalan sepenuhnya mengikuti kebijakan dan
            ketentuan dari pihak travel penyelenggara. Setiap travel memiliki
            aturan tersendiri terkait prosedur pembatalan, termasuk syarat,
            batas waktu, serta kemungkinan pengembalian dana (refund).
          </p>
          <p>
            Oleh karena itu, kami sangat menyarankan Kamu untuk menghubungi
            langsung pihak travel terkait guna memastikan proses pembatalan
            berjalan sesuai prosedur yang berlaku. Pastikan Kamu menyimpan bukti
            pembayaran dan dokumen terkait lainnya untuk memperlancar proses
            verifikasi.
          </p>
          <p>
            Jika Kamu merasa bingung, mengalami kendala, atau membutuhkan
            bantuan tambahan dalam proses komunikasi dengan pihak travel, tim
            kami siap membantu Kamu. Silakan hubungi kami melalui kontak yang
            tersedia, dan kami akan berusaha memberikan panduan serta dukungan
            terbaik agar proses Kamu berjalan dengan lancar.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-4">
          <Button
            variant="outline"
            className="w-1/4 rounded-full border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-100"
            onClick={() => {
              const encodedMessage = encodeURIComponent(bantuan)
              const waUrl = `https://wa.me/${CALL_CENTER}?text=${encodedMessage}`
              window.open(waUrl, '_blank') // safer than assigning window.location
            }}
          >
            Bantuan
          </Button>
          <Button
            className="w-1/3 rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
            onClick={() => {
              const encodedMessage = encodeURIComponent(hubungiCS)
              const waUrl = `https://wa.me/${CALL_CENTER}?text=${encodedMessage}`
              window.open(waUrl, '_blank') // safer than assigning window.location
            }}
          >
            Hubungi Travel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
