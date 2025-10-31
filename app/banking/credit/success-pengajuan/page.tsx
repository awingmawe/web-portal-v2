import PackageSelection from '@/components/pages/banking/credit/success-pengajuan/PackageSelection'
import IconSukses from '@/public/images/Icon-sukses.svg'
import Image from 'next/image'
import Link from 'next/link'

export default async function SuccessPengajuan() {
  return (
    <div className="relative grid min-h-screen place-content-center py-4">
      <Image
        src={'/images/mosque.png'}
        alt="mosque"
        width={0}
        height={0}
        sizes="100vw"
        className="absolute top-0 z-[-1] h-screen w-full object-cover object-left"
      />
      <main className="container mx-auto flex max-w-2xl flex-col gap-4 max-lg:px-4">
        <div className="flex flex-col items-center gap-6 max-lg:gap-4">
          <div className="bg-primary-100 rounded-full p-6">
            <Image
              src={IconSukses}
              alt="icon-sukses"
              width={60}
              height={60}
              className="max-lg:!h-10 max-lg:!w-10"
            />
          </div>
          <p className="heading-3-medium text-center max-lg:text-base max-lg:leading-6 max-lg:font-semibold">
            Pengajuan Pembiayaan Berhasil
          </p>
        </div>
        <PackageSelection />
        <p className="text-m-regular text-center text-neutral-500 max-lg:text-xs max-lg:leading-4 max-lg:font-normal">
          Kamu telah mengirimkan permintaan kamu ke mitra, harap menunggu pihak
          mitra menghubungi kamu untuk mengkonfirmasi permintaan dan memberikan
          penawaran untuk kamu.
        </p>
        <Link
          href="/my/banking"
          className="bg-primary-500 hover:bg-primary-700 text-s-semibold mx-auto rounded-full px-15 py-3 text-center transition-all duration-300 max-lg:w-full"
        >
          Lihat Detail
        </Link>
      </main>
    </div>
  )
}
