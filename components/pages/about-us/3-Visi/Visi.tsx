import Image from 'next/image'

export default function BreadCrumb() {
  return (
    <div className="bg-[#FDFAF4] py-15">
      <div className="container mx-auto">
        <div className="text-center">
          <p className="text-m-medium text-neutral-900">Visi Muslim101</p>
          <h1 className="heading-1-regular">
            Menjadi pilihan utama digital <i>platform marketplace</i> dan{' '}
            <i>e-</i>
            <br />
            <i>commerce</i> dalam ekosistem muamalah Muslim Indonesia.
          </h1>
        </div>
        <div className="mt-10 grid items-center gap-20 md:grid-cols-2">
          {/* Left Column - Image */}
          <Image
            src="https://storage.googleapis.com/m101-prods/about-us/Frame%201000007197%20(1)%20(1).png"
            alt="Muslim101 Platform"
            width={300}
            height={200}
            className="h-[700] w-full rounded-lg"
          />

          {/* Right Column - Mission */}
          <div className="space-y-6">
            <h2 className="text-primary-900 heading-1-semibold mb-6">
              Misi Muslim101
            </h2>

            {/* Mission Points */}
            <div className="space-y-6">
              {/* Point 1 */}
              <div className="border-primary-300 flex items-center gap-4 rounded-lg border p-4">
                <div className="bg-primary-500 heading-2-semibold flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-white">
                  1
                </div>
                <p className="text-l-regular text-primary-900">
                  Menyediakan informasi digital terkait Umroh, Haji, Halal Trip,
                  serta produk dan jasa lainnya secara lengkap
                </p>
              </div>

              {/* Point 2 */}
              <div className="border-primary-300 flex items-center gap-4 rounded-lg border p-4">
                <div className="bg-primary-500 heading-2-semibold flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-white">
                  2
                </div>
                <p className="text-l-regular text-primary-900">
                  Kemudahan akses informasi oleh siapa saja dan dari mana saja
                </p>
              </div>

              {/* Point 3 */}
              <div className="border-primary-300 flex items-center gap-4 rounded-lg border p-4">
                <div className="bg-primary-500 heading-2-semibold flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-white">
                  3
                </div>
                <p className="text-l-regular text-primary-900">
                  Media pemasaran digital produk dan jasa pelaku usaha B2B2C,
                  B2C2C, B2B, dan B2C
                </p>
              </div>

              {/* Point 4 */}
              <div className="border-primary-300 flex items-center gap-4 rounded-lg border p-4">
                <div className="bg-primary-500 heading-2-semibold flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-white">
                  4
                </div>
                <p className="text-l-regular text-primary-900">
                  Penerapan dan pelaksanaan prinsip-prinsip syariah dalam
                  seluruh aktivitas dan transaksi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
