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
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="text-m-medium hover:no-underline">
                Bagaimana saya bisa mendapatkan informasi paket-paket Umroh atau
                Haji yang saya butuhkan?
              </AccordionTrigger>
              <AccordionContent className="text-m-regular w-full">
                <p className="text-neutral-500">
                  Kamu bisa mulai memilih paket berdasarkan tanggal
                  keberangkatan, maskapai, bintang hotel serta lokasi
                  keberangkatan yang sesuai dengan kebutuhan kamu.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-none">
              <AccordionTrigger className="text-m-medium hover:no-underline">
                Bagaimana jika paket yang saya butuhkan belum tersedia?
              </AccordionTrigger>
              <AccordionContent className="text-m-regular w-full">
                <p className="text-m-regular text-neutral-500">
                  Kamu bisa manfaatkan fitur Remind Me untuk mendapatkan
                  notifikasi ketika paket terbaru yang kami sediakan, cocok
                  dengan kebutuhan kamu.
                </p>
                <p className="text-m-regular text-neutral-500">
                  Selain itu, kamu juga bisa menggunakan produk Umroh Personal
                  kami yang sangat bisa dikustomisasi sesuai kebutuhan kamu
                  tanpa ada minimum jumlah pax/jemaah.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-none">
              <AccordionTrigger className="text-m-medium hover:no-underline">
                Apa yang saya lakukan untuk melakukan pemesanan?
              </AccordionTrigger>
              <AccordionContent className="text-m-regular w-full">
                <p className="text-m-regular text-neutral-500">
                  Silakan pilih paket-paket yang tersedia dan lakukan pembayaran
                  tahap pertama sesuai dengan jumlah yang tertera pada
                  masing-masing paket. Sisa pembayaran yang harus dilunasi
                  maksimal H-45 sebelum kamu berangkat.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-none">
              <AccordionTrigger className="text-m-medium hover:no-underline">
                Apakah saya dapat mengajukan pendanaan/pembiayaan untuk
                perjalanan Umroh maupun Haji?
              </AccordionTrigger>
              <AccordionContent className="text-m-regular w-full">
                <p className="text-m-regular text-neutral-500">
                  Tentu saja, kamu dapat mengajukan pendanaan/pembiayaan Umroh
                  maupun Haji melalui mitra-mitra yang sudah bekerja sama dengan
                  kami.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-none">
              <AccordionTrigger className="text-m-medium hover:no-underline">
                Apakah saya dapat membatalkan pesanan dan apakah dana saya akan
                kembali?
              </AccordionTrigger>
              <AccordionContent className="text-m-regular w-full">
                <p className="text-m-regular text-neutral-500">
                  Jika pembatalan dilakukan sebelum mendapatkan konfirmasi
                  ketersediaan paket, maka dana akan dikembalikan 100%. Mohon
                  untuk selalu memastikan syarat dan ketentuan yang diberikan
                  oleh para mitra kami.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" className="border-none">
              <AccordionTrigger className="text-m-medium hover:no-underline">
                Bagaimana cara saya untuk mengajukan komplain?
              </AccordionTrigger>
              <AccordionContent className="text-m-regular w-full">
                <p className="text-m-regular text-neutral-500">
                  Untuk pengajuan kritik, saran, dan komplain, kamu dapat
                  menghubungi customer service kami pada nomor +{CALL_CENTER}{' '}
                  atau melalui email cs@muslim101.id
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7" className="border-none">
              <AccordionTrigger className="text-m-medium hover:no-underline">
                Bagaimana saya mengetahui bahwa bertransaksi di Muslim101 aman?
              </AccordionTrigger>
              <AccordionContent className="text-m-regular w-full">
                <p className="text-m-regular text-neutral-500">
                  Tidak perlu khawatir! Kami terus memantau transaksi yang masuk
                  karena travel-travel pilihan kami sudah berlisensi PPIU dan
                  PIHK. Selain itu, kami terus memantau dan memperbarui sistem
                  untuk memastikan keamanan, potensi ancaman, dan mencegah
                  adanya penyalahgunaan.
                </p>
                <p className="text-m-regular text-neutral-500">
                  Harap untuk terus berhati-hati, kami tidak pernah meminta
                  informasi pribadi seperti PIN, password, kode OTP, atau data
                  kartu secara langsung melalui telepon, SMS, atau chat di luar
                  narahubung resmi Muslim101.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default QuestionDrawer
