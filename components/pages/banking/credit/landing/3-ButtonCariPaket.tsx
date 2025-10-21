'use client'

import Link from 'next/link'

const CariPaketButton = () => {
  return (
    <Link
      href={`/search?package=pembiayaan`}
      className="bg-primary-500 text-s-regular hover:bg-primary-700 mx-auto mt-6 flex w-fit rounded-full px-10 py-4 text-center transition-all duration-300"
    >
      Cari Paket Lain
    </Link>
  )
}

export default CariPaketButton
