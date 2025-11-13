'use client'

import LocationLinear from '@/components/icons/locations'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export const LocationPermissionToast = ({
  handleCloseAction,
  handleActivateAction,
  loading,
}: {
  handleCloseAction: () => void
  handleActivateAction: () => void
  loading: boolean
}) => {
  return (
    <div className="animate-in slide-in-from-bottom-10 fixed bottom-4 left-10 z-50 flex w-full max-w-2xl flex-col gap-3 rounded-lg bg-white px-6 py-4 shadow-[0px_6px_24px_0px_rgba(0,0,0,0.25)] transition-all">
      {/* Header Location Permission */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LocationLinear size={24} />
          <p className="heading-4-semibold">Permintaan Akses Lokasi</p>
        </div>
        <X className="h-4 w-4 cursor-pointer" onClick={handleCloseAction} />
      </div>

      <p className="text-m-regular">
        Muslim101 ingin meminta akses lokasi kamu agar paket yang diberikan
        lebih cocok untukmu!
      </p>
      <p className="text-m-regular">
        Jangan khawatir, kami akan menggunakan data lokasi kamu untuk keperluan
        personalisasi akun, analitik dan marketing. Jika kamu memberikan
        persetujuan, lokasi anda hanya berlaku di domain ini. Menolak
        persetujuan dapat membuat akun kamu tidak dipersonalisasi secara
        optimal.
      </p>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-primary-500 border-2 px-10"
          onClick={handleCloseAction}
        >
          Tolak
        </Button>
        <Button
          size="sm"
          className="px-10"
          onClick={handleActivateAction}
          disabled={loading}
        >
          {loading ? 'Memproses...' : 'Setujui'}
        </Button>
      </div>
    </div>
  )
}
