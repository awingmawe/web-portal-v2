'use client'

import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PembiayaanLanding: React.FC = () => {
  return (
    <section className="container mx-auto flex flex-col space-y-6 max-lg:space-y-4 max-lg:px-4">
      <Link
        href="/"
        className="heading-3-semibold inline-flex w-fit cursor-pointer items-center gap-1 max-lg:hidden"
      >
        <ChevronLeft size={24} />
        Kembali
      </Link>
      {/* Banner for mobile */}
      <Image
        src="/images/banner-pembiayaan-mobile.svg"
        alt="Banner Pembiayaan"
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full rounded-[20px] object-contain md:hidden"
      />
      {/* Banner for desktop */}
      <Image
        src="/images/banner-landing-pembiayaan.png"
        alt="Banner Pembiayaan"
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full rounded-[20px] object-contain max-md:hidden"
      />

      <div className="mx-auto space-y-6 max-lg:space-y-4 lg:max-w-4xl xl:max-w-5xl ">
        <h1 className="text-l-semibold max-lg:mb-2">
          Program Pembiayaan Umroh
        </h1>

        <p className="text-l-regular">
          Panggilan ke Baitullah adalah impian setiap Muslim. Jangan biarkan
          waktu dan biaya menjadi penghalang. Melalui Program Pembiayaan Umroh
          Syariah, Anda bisa mewujudkan perjalanan ibadah lebih cepat, lebih
          ringan, dan tetap sesuai dengan prinsip syariah.
        </p>

        <div className="flex gap-4 max-lg:flex-col max-lg:gap-5">
          <div className="border-primary-500 relative w-full flex-1 rounded-lg border-1 p-4.5">
            <p className="text-m-medium text-center">Proses Mudah & Cepat</p>
            <Image
              src="/images/time-pembiayaan.svg"
              alt="time-pembiayaan"
              width={48}
              height={48}
              className="absolute bottom-7 left-4"
            />
          </div>
          <div className="border-primary-500 relative w-full flex-1 rounded-lg border-1 p-4.5">
            <p className="text-m-medium text-center">
              Menggunakan Akad Syariah
            </p>
            <Image
              src="/images/mosque-pembiayaan.svg"
              alt="time-pembiayaan"
              width={48}
              height={48}
              className="absolute top-7 left-4"
            />
          </div>
          <div className="border-primary-500 relative w-full flex-1 rounded-lg border-1 p-4.5">
            <p className="text-m-medium text-center">Aman & Terpercaya</p>
            <Image
              src="/images/secure-pembiayaan.svg"
              alt="time-pembiayaan"
              width={48}
              height={48}
              className="absolute right-4 bottom-7"
            />
          </div>
        </div>

        <p className="text-l-regular">
          Setiap panggilan ke Tanah Suci adalah anugerah. Jangan tunda niat baik
          Anda hanya karena kendala biaya. Dengan pembiayaan yang ringan dan
          proses yang mudah, Anda bisa segera menunaikan ibadah dengan penuh
          rasa syukur.
        </p>
      </div>
      {/* 

      {/* <div className={screenSize === 'desktop' ? 'px-6' : ''}>
        <div className="mb-3 md:mb-6">
          <p className="text-m-semibold">
            Ingin Umroh, tapi tabungan belum cukup?
          </p>
          <p className="text-m-regular">
            Bayangkan Anda berdiri di depan Ka’bah...
          </p>
          <p className="text-m-regular">
            Udara sejuk menyapa wajah, dan doa-doa yang selama ini Anda
            panjatkan terasa begitu dekat.
          </p>
        </div>

        <div className="mb-3 md:mb-6">
          <p className="text-m-regular">Tapi niat itu…</p>
          <p className="text-m-regular">
            Masih tertahan karena biaya yang belum terkumpul.
          </p>
        </div>
        <div className="mb-3 md:mb-6">
          <p className="text-m-regular">
            Kini, Anda bisa berangkat lebih cepat.
          </p>
          <p className="text-m-regular">
            Dengan{' '}
            <b className="font-semibold">
              program Pembiayaan Umroh Muslim101,{' '}
            </b>
            kami hadir membawa solusi syariah yang aman dan terpercaya.
          </p>
        </div>
        <div className="mb-3 md:mb-6">
          <p className="text-m-regular">Program ini cocok untuk:</p>
          <p className="text-m-regular">👨‍💼 Karyawan tetap</p>
          <p className="text-m-regular">🛍️ Pelaku usaha atau UMKM</p>
        </div>

        <div className="mb-3 md:mb-6">
          <p className="text-m-regular">Bayangkan...</p>
          <p className="text-m-regular">
            Ibadah umroh yang selama ini hanya sebatas rencana, kini bisa
            menjadi nyata.
          </p>
          <p className="text-m-regular">Tanpa harus menggadaikan barang.</p>
          <p className="text-m-regular">
            Tanpa harus menunggu bertahun-tahun menabung.
          </p>
        </div>
        <div className="mb-3 md:mb-6">
          <p className="text-m-regular">
            📖 Semua proses dilakukan secara syariah dan transparan, bekerjasama
            dengan mitra pembiayaan resmi dan tersertifikasi.
          </p>
        </div>
        <div className="mb-3 md:mb-6">
          <p className="text-m-regular">
            📲 Klik tombol di bawah untuk mengajukan sekarang.
          </p>
          <p className="text-m-regular">
            Tim kami siap membantu Anda langkah demi langkah.
          </p>
        </div>
        <div className="mb-3 md:mb-6">
          <p className="text-m-regular italic">
            🕋 Karena ibadah tidak harus ditunda, jika ada jalan yang halal dan
            mudah.
          </p>
        </div>

        <div
          className={
            screenSize === 'mobile'
              ? 'fixed right-0 bottom-0 left-0 mt-4 mb-4 flex justify-center px-4'
              : 'mt-32 mb-12 flex justify-center'
          }
        >
          <Button
            className="w-full rounded-full bg-yellow-500 px-6 py-3 font-medium text-gray-800 hover:bg-yellow-600 md:w-auto md:max-w-xs"
            onClick={openForm}
          >
            Ikuti Program Pembiayaan Sekarang
          </Button>
        </div>
      </div> */}
    </section>
  )
}

export default PembiayaanLanding
