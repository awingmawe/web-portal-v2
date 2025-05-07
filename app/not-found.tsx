'use client'

import { Button } from '@/components/ui/button'
import Image404 from '@/public/images/404.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pb-10">
      <Image
        src={Image404}
        alt="illustration-not-found"
        width={400}
        height={400}
      />
      <h1 className="text-primary-500 mt-4 text-center text-2xl font-bold">
        Astagfirullah.... Sepertinya kamu tersesat.
        <br />
        Silahkan kembali ke halaman awal!
      </h1>
      <p className="mt-1 text-center text-neutral-400">
        404 - Halaman tidak ditemukan.
      </p>
      <Button className="mt-6 px-10">
        <Link href="/">Kembali ke Beranda</Link>
      </Button>
    </div>
  )
}
