'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { CALL_CENTER } from '@/constant/env'
import React from 'react'

const faqData = [
  {
    id: 'item-1',
    question:
      'Bagaimana saya bisa mendapatkan informasi paket-paket Umroh atau Haji yang saya butuhkan?',
    answer: [
      'Kamu bisa mulai memilih paket berdasarkan tanggal keberangkatan, maskapai, bintang hotel serta lokasi keberangkatan yang sesuai dengan kebutuhan kamu.',
    ],
  },
  {
    id: 'item-2',
    question: 'Bagaimana jika paket yang saya butuhkan belum tersedia?',
    answer: [
      'Kamu bisa manfaatkan fitur Remind Me untuk mendapatkan notifikasi ketika paket terbaru yang kami sediakan, cocok dengan kebutuhan kamu.',
      'Selain itu, kamu juga bisa menggunakan produk Umroh Personal kami yang sangat bisa dikustomisasi sesuai kebutuhan kamu tanpa ada minimum jumlah pax/jemaah.',
    ],
  },
  {
    id: 'item-3',
    question: 'Apa yang saya lakukan untuk melakukan pemesanan?',
    answer: [
      'Silakan pilih paket-paket yang tersedia dan lakukan pembayaran tahap pertama sesuai dengan jumlah yang tertera pada masing-masing paket. Sisa pembayaran yang harus dilunasi maksimal H-45 sebelum kamu berangkat.',
    ],
  },
  {
    id: 'item-4',
    question:
      'Apakah saya dapat mengajukan pendanaan/pembiayaan untuk perjalanan Umroh maupun Haji?',
    answer: [
      'Tentu saja, kamu dapat mengajukan pendanaan/pembiayaan Umroh maupun Haji melalui mitra-mitra yang sudah bekerja sama dengan kami.',
    ],
  },
  {
    id: 'item-5',
    question:
      'Apakah saya dapat membatalkan pesanan dan apakah dana saya akan kembali?',
    answer: [
      'Jika pembatalan dilakukan sebelum mendapatkan konfirmasi ketersediaan paket, maka dana akan dikembalikan 100%. Mohon untuk selalu memastikan syarat dan ketentuan yang diberikan oleh para mitra kami.',
    ],
  },
  {
    id: 'item-6',
    question: 'Bagaimana cara saya untuk mengajukan komplain?',
    answer: [
      `Untuk pengajuan kritik, saran, dan komplain, kamu dapat menghubungi customer service kami pada nomor +${CALL_CENTER} atau melalui email cs@muslim101.id`,
    ],
  },
  {
    id: 'item-7',
    question: 'Bagaimana saya mengetahui bahwa bertransaksi di Muslim101 aman?',
    answer: [
      'Tidak perlu khawatir! Kami terus memantau transaksi yang masuk karena travel-travel pilihan kami sudah berlisensi PPIU dan PIHK. Selain itu, kami terus memantau dan memperbarui sistem untuk memastikan keamanan, potensi ancaman, dan mencegah adanya penyalahgunaan.',
      'Harap untuk terus berhati-hati, kami tidak pernah meminta informasi pribadi seperti PIN, password, kode OTP, atau data kartu secara langsung melalui telepon, SMS, atau chat di luar narahubung resmi Muslim101.',
    ],
  },
]

/**
 * A drawer component for mobile filter controls
 */
const QuestionDrawer: React.FC = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <span className="bg-neutral-0 text-s-medium ml-2 rounded-[100px] px-3.5 py-2 text-neutral-900">
          ?
        </span>
      </DrawerTrigger>
      <DrawerContent className="bg-white p-2">
        <div className="mx-auto w-full max-w-md ">
          <DrawerHeader className="flex flex-row items-center justify-between">
            <div className="h-6 w-6" />
            <DrawerTitle className="text-l-semibold">
              Pertanyaan Seputar Umroh
            </DrawerTitle>
            <div className="h-6 w-6" />
          </DrawerHeader>
        </div>
        <div className="overflow-y-auto p-3">
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4"
            defaultValue="item-1"
          >
            adanya penyalahgunaan.
            {faqData.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-none"
              >
                <AccordionTrigger className="text-m-medium hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-m-regular w-full">
                  {item.answer.map((paragraph, index) => (
                    <p key={index} className="text-neutral-500">
                      {paragraph}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default QuestionDrawer
