import { ArrowIcon } from '@/components/icons/arrow'
import { Calendar2 } from '@/components/icons/calendar'
import { usePackageVariant } from '@/contexts/package-variant-context'
import { usePembiayaan } from '@/contexts/pembiayaan-context/context'
import { cn, formatCurrency } from '@/lib/utils'
import Placeholder from '@/public/images/no-image-placeholder.png'
import Image from 'next/image'

const ContentChangePackage = ({ dataOldPembiayaan }: any) => {
  const { getPrice, selectedVariant, formattedArrival, formattedDeparture } =
    usePackageVariant()
  const { monthlyPayment, tenor } = usePembiayaan()

  // --- LOGIC SELISIH HARGA ---
  const newPrice = getPrice()
  const oldPrice = dataOldPembiayaan.totalPrice

  // 1. Hitung selisih murni (bisa minus atau plus)
  const difference = newPrice - oldPrice

  // 2. Tentukan Status
  const isMoreExpensive = difference > 0 // Harga Naik
  const isCheaper = difference < 0 // Harga Turun

  // 3. Atur Text dan Warna
  let priceDifferenceText = '-'
  let priceDifferenceColorClass = 'text-neutral-900'

  if (isMoreExpensive) {
    // KASUS 1: Lebih Mahal (Merah, tanda +)
    // Contoh: Lama 10rb, Baru 15rb -> Selisih +5000
    priceDifferenceText = `(+) ${formatCurrency(Math.abs(difference))}`
    priceDifferenceColorClass = 'text-error-500'
  } else if (isCheaper) {
    // KASUS 2: Lebih Murah (Hijau, tanda -)
    // Contoh: Lama 10rb, Baru 5rb -> Selisih -5000
    priceDifferenceText = `(-) ${formatCurrency(Math.abs(difference))}`
    priceDifferenceColorClass = 'text-success-500'
  } else {
    // KASUS 3: Harga Sama
    priceDifferenceText = formatCurrency(0)
  }

  return (
    <div className="flex flex-col gap-2 max-lg:px-4">
      <p className="text-m-regular text-neutral-500">
        Kamu akan mengubah paket sebelumnya dengan paket :
      </p>
      <div className="flex gap-3 rounded-sm border-1 border-neutral-100 p-2">
        <Image
          width={60}
          height={60}
          src={selectedVariant?.package.thumbnail || Placeholder}
          alt={selectedVariant?.package.title || 'Package Thumbnail'}
        />
        <div className="flex flex-col gap-1">
          <p className="text-s-semibold">{selectedVariant?.name}</p>
          <div className="flex items-center gap-1">
            <Image
              width={22}
              height={22}
              src={
                selectedVariant?.package.organizationInstance.thumbnail ||
                '/images/images/logo-koper.svg'
              }
              alt={
                selectedVariant?.package.organizationInstance.name ||
                'Organization Instance Thumbnail'
              }
            />
            <div className="flex flex-col">
              <p className="text-s-semibold capitalize">
                {selectedVariant?.package.organizationInstance.name}
              </p>
              <p className="text-xs-regular text-neutral-500 capitalize lg:hidden">
                {selectedVariant?.package.organizationInstance.city.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar2 size={15} />
            <div className="flex items-center gap-1">
              <p className="text-xs-regular">{formattedDeparture}</p>
              <ArrowIcon size={10} className="inline-flex" />
              <p className="text-xs-regular ">{formattedArrival}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-m-regular text-neutral-500">
        Dengan rincian sebagai berikut :{' '}
      </p>
      <div className="overflow-hidden rounded-md border border-neutral-200">
        <table className="w-full rounded-md bg-white">
          {/* Bagian Header Tabel */}
          <thead className="bg-[#F7F7F7]">
            <tr>
              <th className="text-s-semibold border-r border-b border-neutral-200 px-3 py-2.5 text-center first:rounded-tl-md">
                Total Harga Paket
              </th>
              <th className="text-s-semibold border-r border-b border-neutral-200 px-3 py-2.5 text-center">
                Angsuran per bulan
              </th>
              <th className="text-s-semibold border-r border-b border-neutral-200 px-3 py-2.5 text-center">
                Selisih dari harga paket sebelumnya
              </th>
              <th className="text-s-semibold border-r border-b border-neutral-200 px-3 py-2.5 text-center">
                Tenor
              </th>
            </tr>
          </thead>
          {/* Bagian Isi Tabel */}
          <tbody>
            {/* Baris Total Harga */}
            <tr className="border-b border-neutral-200">
              <td className="text-s-regular border-r border-b border-neutral-200 px-3 py-2.5 text-center font-medium text-neutral-900">
                {formatCurrency(getPrice())}
              </td>
              <td className="text-s-semibold border-r border-b border-neutral-200 px-3 py-2.5 text-center text-neutral-900">
                {formatCurrency(monthlyPayment)}
              </td>
              <td
                className={`text-s-semibold ${cn(
                  'border-r border-b  border-neutral-200 px-3 py-2.5 text-center text-nowrap',
                  priceDifferenceColorClass
                )}`}
              >
                {priceDifferenceText}
              </td>
              <td className="text-s-semibold border-b border-neutral-200 px-3 py-2.5 text-center text-neutral-900">
                {tenor} Bulan
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-s-regular text-neutral-500">
        *Perhitungan ini hanya simulasi, data dapat berubah sesuai dengan
        ketentuan mitra terkait.
      </p>
    </div>
  )
}

export { ContentChangePackage }
