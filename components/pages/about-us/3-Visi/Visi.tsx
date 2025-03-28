import Image from 'next/image'

export default function BreadCrumb() {
  return (
    <div className="bg-[#FDFAF4] py-8 lg:py-15">
      <div className="container mx-auto px-4">
        {/* Desktop view */}
        <div className="hidden lg:block">
          <div className="text-center">
            <p className="text-m-medium text-neutral-900">Visi Muslim101</p>
            <h1 className="heading-1-regular">
              Menjadi pilihan utama digital <i>platform marketplace</i> dan{' '}
              <i>e-</i>
              <br />
              <i>commerce</i> dalam ekosistem muamalah Muslim Indonesia.
            </h1>
          </div>
        </div>

        <div className="mt-6 grid items-center gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-20">
          {/* Left Column - Image (Full width on mobile) */}
          <Image
            src="https://storage.googleapis.com/m101-prods/about-us/Frame%201000007197%20(1)%20(1).png"
            alt="Muslim101 Platform"
            width={300}
            height={200}
            className="mx-auto h-auto w-full max-w-[500px] rounded-lg lg:max-w-none"
          />

          {/* Mobile view - Vision appears after image */}
          <div className="lg:hidden">
            <div className="mb-8 text-center">
              <p className="text-m-medium text-neutral-900">Visi Muslim101</p>
              <h1 className="text-2xl leading-tight font-normal sm:text-3xl md:text-4xl">
                Menjadi pilihan utama digital <i>platform marketplace</i> dan{' '}
                <i>e-commerce</i> dalam ekosistem muamalah Muslim Indonesia.
              </h1>
            </div>
          </div>

          {/* Right Column - Mission */}
          <div className="space-y-4 lg:space-y-6">
            <h2 className="text-primary-900 lg:heading-1-semibold text-2xl leading-tight font-semibold sm:text-3xl lg:mb-6">
              Misi Muslim101
            </h2>

            {/* Mission Points */}
            <div className="space-y-3 lg:space-y-6">
              {/* Point 1 */}
              <div className="border-primary-300 flex flex-row items-start gap-2 rounded-lg border p-3 sm:items-center sm:gap-4 lg:p-4">
                <div className="bg-primary-500 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-xl font-semibold text-white sm:h-14 sm:w-14 lg:h-16 lg:w-16 lg:text-2xl">
                  1
                </div>
                <p className="text-primary-900 lg:text-l-regular text-sm sm:text-base">
                  Menyediakan informasi digital terkait Umroh, Haji, Halal Trip,
                  serta produk dan jasa lainnya secara lengkap
                </p>
              </div>

              {/* Point 2 */}
              <div className="border-primary-300 flex flex-row items-start gap-2 rounded-lg border p-3 sm:items-center sm:gap-4 lg:p-4">
                <div className="bg-primary-500 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-xl font-semibold text-white sm:h-14 sm:w-14 lg:h-16 lg:w-16 lg:text-2xl">
                  2
                </div>
                <p className="text-primary-900 lg:text-l-regular text-sm sm:text-base">
                  Kemudahan akses informasi oleh siapa saja dan dari mana saja
                </p>
              </div>

              {/* Point 3 */}
              <div className="border-primary-300 flex flex-row items-start gap-2 rounded-lg border p-3 sm:items-center sm:gap-4 lg:p-4">
                <div className="bg-primary-500 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-xl font-semibold text-white sm:h-14 sm:w-14 lg:h-16 lg:w-16 lg:text-2xl">
                  3
                </div>
                <p className="text-primary-900 lg:text-l-regular text-sm sm:text-base">
                  Media pemasaran digital produk dan jasa pelaku usaha B2B2C,
                  B2C2C, B2B, dan B2C
                </p>
              </div>

              {/* Point 4 */}
              <div className="border-primary-300 flex flex-row items-start gap-2 rounded-lg border p-3 sm:items-center sm:gap-4 lg:p-4">
                <div className="bg-primary-500 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-xl font-semibold text-white sm:h-14 sm:w-14 lg:h-16 lg:w-16 lg:text-2xl">
                  4
                </div>
                <p className="text-primary-900 lg:text-l-regular text-sm sm:text-base">
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
