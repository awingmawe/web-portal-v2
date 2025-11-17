'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ManifestItem } from '@/constant/types/Pembiayaan'
import { User } from 'lucide-react'

interface TransactionDetailManifestProps {
  members: ManifestItem[]
}

export default function DetailManifestPembiayaan({
  members,
}: TransactionDetailManifestProps) {
  return (
    <div className="mx-auto w-full space-y-4 px-8 max-lg:space-y-3 max-lg:px-4">
      <p className="text-m-semibold max-lg:text-xs max-lg:leading-4">
        Data Jemaah
      </p>
      {members?.map((member, index) => (
        <Accordion type="single" collapsible key={`${member.name}-${index}`}>
          <AccordionItem
            value={`${index}-accordion-item`}
            // 1. Item tidak perlu border, biarkan polos
            className="border-none"
            noBorder // Hapus prop 'noBorder' dari kode asli Anda jika masih ada
          >
            <AccordionTrigger
              // 2. Trigger adalah 'kartu' yang melayang:
              //    - 'relative z-10': Posisikan di atas konten
              //    - 'rounded-2xl': SELALU bulat di semua 4 sudut
              //    - 'border': Punya border sendiri
              className="relative z-10 rounded-[20px] border border-neutral-200 bg-white px-3 py-4 hover:no-underline max-lg:px-3"
              noSeparator
              classNameHeader="rounded-t-[20px] bg-[#F7F7F7] border-x border-neutral-100"
            >
              <div className="flex items-center gap-3 text-left">
                <User className="h-6 w-6 text-emerald-500" />
                <span className="text-semibold text-sm max-lg:text-xs">
                  Data Jemaah {member.name}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent
              // 3. Konten berada 'di bawah' trigger:
              //    - 'relative z-0': Posisikan di bawah (default stack)
              //    - 'rounded-b-2xl': Pastikan sudut bawah konten bulat
              //    - 'mt-[-16px]': Ini kuncinya. Tarik konten ke atas
              //      agar 'masuk' ke bawah trigger.
              //      (Sesuaikan -16px ini agar pas, -15px atau -17px mungkin lebih baik)
              className="relative z-0 mt-[-16px] rounded-b-[20px] border-1 border-neutral-100 bg-[#F7F7F7] px-0 pt-0 pb-0"
            >
              {/* 4. Beri padding atas di 'div' anak:
                   - 'pt-6' (24px) memberi ruang (16px untuk negative margin + 8px untuk spasi)
                   - 'p-6' mencakup ini
              */}
              <div className="space-y-2 p-6 pb-4 max-lg:px-3">
                {/* Basic Information */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between">
                    <p className="text-s-regular text-neutral-500">
                      Nama Jemaah
                    </p>
                    <p className="text-s-regular">{member.name}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-s-regular text-neutral-500">
                      Nomor Telepon
                    </p>
                    <p className="text-s-regular">
                      {member.phone_number || '-'}
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  )
}
