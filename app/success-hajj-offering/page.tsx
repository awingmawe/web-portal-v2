import { Button } from '@/components/ui/button'
import IconSukses from '@/public/images/Icon-sukses.svg'
import Image from 'next/image'
import Link from 'next/link'

export default async function SuccessOffering() {
  return (
    <div className="relative grid min-h-screen place-content-center">
      <Image
        src={'/images/mosque.png'}
        alt="mosque"
        width={0}
        height={0}
        sizes="100vw"
        className="absolute top-0 z-0 h-screen w-full object-cover object-left"
      />
      <div className="relative z-1 flex max-w-[360px] flex-col items-center justify-center gap-6 px-4 max-lg:gap-4">
        <div className="bg-primary-100 rounded-full p-1">
          <Image src={IconSukses} alt="icon-sukses" width={60} height={60} />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="heading-3-medium text-center">Pesanan Berhasil!</p>
          <p className="text-l-regular text-center text-neutral-500">
            Pesananmu telah berhasil dibuat, harap menunggu penerbitan tagihan
            untuk membayar.
          </p>
        </div>
        <Link href="/my" className="w-full cursor-pointer">
          <Button className="w-full px-10 py-3">Lihat Detail</Button>
        </Link>
      </div>
    </div>
  )
}
