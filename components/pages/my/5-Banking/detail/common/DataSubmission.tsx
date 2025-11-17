'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SubmissionCredit } from '@/constant/types/SubmissionPembiayaan'
import { formatDateToDDMMYYYY } from '@/lib/utils'
import { User } from 'lucide-react' // Kita ganti ikonnya agar sesuai

/**
 * Helper component untuk merender baris info (Label di kiri, Value di kanan)
 */
const InfoRow = ({
  label,
  value,
}: {
  label: string
  value: string | React.ReactNode
}) => {
  return (
    <div className="flex items-start text-wrap max-lg:justify-between lg:flex-col">
      <p className="text-s-regular text-neutral-500">{label}</p>
      <p className="text-l-regular text-wrap break-words break-all text-neutral-900 max-lg:text-right max-lg:text-xs max-lg:leading-4">
        {value || '-'}
      </p>
    </div>
  )
}

interface DetailDataPemohonProps {
  submission: SubmissionCredit
}

export default function DetailDataPemohon({
  submission,
}: DetailDataPemohonProps) {
  // Format data untuk tampilan
  const genderLabel = submission.gender === 'L' ? 'Laki-laki' : 'Perempuan'
  const formattedBorn = formatDateToDDMMYYYY(new Date(submission.born)) // Anda bisa format tanggal di sini

  return (
    <div className="mx-auto w-full space-y-4 px-8 max-lg:space-y-3 max-lg:px-4">
      <p className="text-m-semibold max-lg:text-xs max-lg:leading-4">
        Data Pemohon
      </p>
      {/* 1. Implementasi Accordion (Hanya satu item, tidak di-map) */}
      <Accordion type="single" collapsible defaultValue="pemohon-item-1">
        <AccordionItem
          value="pemohon-item-1"
          // Style "Floating": Item tidak punya border
          className="border-none"
        >
          <AccordionTrigger
            // Style "Floating": Trigger adalah kartu yang melayang
            className="relative z-10 rounded-[20px] border border-neutral-200 bg-white px-3 py-4 hover:no-underline max-lg:px-3"
            classNameHeader="rounded-t-[20px] bg-[#F7F7F7] border-x border-neutral-100"
            noSeparator
          >
            <div className="flex items-center gap-3 text-left">
              {/* Gunakan ikon User yang sama agar konsisten */}
              <User className="h-6 w-6 text-emerald-500" />
              <span className="text-semibold text-sm max-lg:text-xs">
                {submission.name}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent
            // Style "Floating": Konten menyelip di bawah trigger
            className="relative z-0 mt-[-16px] rounded-b-[20px] border-1 border-neutral-100 bg-[#F7F7F7] px-0 pt-0 pb-0"
          >
            {/* 2. Layout Konten Responsif (dari gambar)
                - 'pt-6' penting untuk memberi jarak dari trigger
            */}
            <div className="space-y-4 p-6 pb-4 max-lg:space-y-3 max-lg:px-3 max-lg:pb-3">
              {/* === Bagian 1: Informasi Diri === */}
              {/* Grid Responsif: 1-kolom di mobile, 2-kolom di desktop (lg) */}
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-x-2 lg:gap-y-3">
                <InfoRow label="Nama Pemohon" value={submission.name} />
                <InfoRow
                  label="Nomor Telepon"
                  value={submission.phone_number}
                />
                <InfoRow label="Email" value={submission.email} />
                <InfoRow label="Tanggal Lahir" value={formattedBorn} />
                <InfoRow label="Jenis Kelamin" value={genderLabel} />
                <InfoRow label="Pekerjaan" value={submission.job} />
              </div>

              {/* === Bagian 2: Alamat === */}
              <div className="grid grid-cols-1 gap-3 lg:gap-x-2 lg:gap-y-3">
                <InfoRow
                  label="Provinsi, Kota, Kecamatan, Kode Pos"
                  value={`${submission.province_name}, ${submission.city_name}, ${submission.district_name}, ${submission.postcode}`}
                />
                <InfoRow label="Alamat Lengkap" value={submission.address} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
