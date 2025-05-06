import Image from 'next/image'

export default function UnderService() {
  return (
    <section className="bg-[#FDFAF4] px-4 py-8 md:py-10 lg:px-0 lg:py-15">
      <div className="container mx-auto max-lg:px-4">
        <div className="text-center">
          <h1 className="lg:text-xl-regular text-2xl font-normal sm:text-3xl md:text-4xl">
            Di Balik Layanan Muslim101
          </h1>
          <h5 className="mt-2 text-base font-normal text-[#CC9900]">
            #GrowAt101
          </h5>
          <p className="text-primary-900 lg:text-l-regular mx-auto mt-3 text-sm sm:text-base md:mt-4 lg:mt-5">
            Program pengembangan internal Muslim101 yang dirancang untuk
            memperkuat pemahaman tentang Islam, meningkatkan kualitas diri,
            serta mempererat ukhuwah dan kebersamaan dalam lingkungan kerja.
            Program ini berfokus untuk mendukung pertumbuhan spiritual serta
            pengembangan diri karyawan Muslim101 agar selaras dengan nilai-nilai
            Islami dalam kehidupan profesional dan personal.
          </p>
        </div>
        {/* DESKTOP VIEW */}
        {/* Image grid - keeping the original layout */}
        <div className="mx-auto my-8 grid max-w-4xl grid-cols-3 gap-4 max-lg:hidden">
          {/* Image 1 */}
          <div className="group relative h-[300px] overflow-hidden rounded-lg md:h-[350px] lg:h-[400px]">
            <Image
              src="https://storage.googleapis.com/m101-prods/about-us/Di%20balik%20layar%20muslim101/Card%20Our%20Culture%20Portrait-2.png"
              alt="BnB101: Masak Bersama"
              fill
              className="object-cover transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 h-[100px] w-full bg-gradient-to-t from-black to-transparent duration-300 lg:h-0 lg:group-hover:h-[150px]" />
            <div className="absolute bottom-0 left-0 p-4 text-white lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:duration-1000 lg:group-hover:max-h-[150px] lg:group-hover:opacity-100">
              <h3 className="lg:heading-4-bold text-lg font-bold text-white sm:text-xl md:text-2xl">
                BnB101: Masak Bersama
              </h3>
            </div>
          </div>

          {/* Image 2 */}
          <div className="group relative h-[250px] overflow-hidden rounded-lg md:h-[275px] lg:h-[300px]">
            <Image
              src="https://storage.googleapis.com/m101-prods/about-us/Di%20balik%20layar%20muslim101/Card%20Our%20Culture%20Square.png"
              alt="Majelis101: Kajian Mingguan"
              fill
              className="object-cover transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 h-[100px] w-full bg-gradient-to-t from-black to-transparent duration-300 lg:h-0 lg:group-hover:h-[150px]" />
            <div className="absolute bottom-0 left-0 p-4 text-white lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:duration-1000 lg:group-hover:max-h-[150px] lg:group-hover:opacity-100">
              <h3 className="lg:heading-4-bold text-lg font-bold text-white sm:text-xl md:text-2xl">
                Majelis101: Kajian Mingguan
              </h3>
            </div>
          </div>

          {/* Image 3 */}
          <div className="group relative h-[300px] overflow-hidden rounded-lg md:h-[350px] lg:h-[400px]">
            <Image
              src="https://storage.googleapis.com/m101-prods/about-us/Di%20balik%20layar%20muslim101/Card%20Our%20Culture%20Portrait.png"
              alt="Event101: Bestie till Jannah"
              fill
              className="object-cover transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 h-[100px] w-full bg-gradient-to-t from-black to-transparent duration-300 lg:h-0 lg:group-hover:h-[150px]" />
            <div className="absolute bottom-0 left-0 p-4 text-white lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:duration-1000 lg:group-hover:max-h-[150px] lg:group-hover:opacity-100">
              <h3 className="lg:heading-4-bold text-lg font-bold text-white sm:text-xl md:text-2xl">
                Event101: Bestie till Jannah
              </h3>
            </div>
          </div>

          {/* Image 4 */}
          <div className="group relative h-[250px] overflow-hidden rounded-lg md:h-[275px] lg:h-[300px]">
            <Image
              src="https://storage.googleapis.com/m101-prods/about-us/Di%20balik%20layar%20muslim101/Card%20Our%20Culture%20Square-2.png"
              alt="Majelis101: Kajian Mingguan"
              fill
              className="object-cover transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 h-[100px] w-full bg-gradient-to-t from-black to-transparent duration-300 lg:h-0 lg:group-hover:h-[150px]" />
            <div className="absolute bottom-0 left-0 p-4 text-white lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:duration-1000 lg:group-hover:max-h-[150px] lg:group-hover:opacity-100">
              <h3 className="lg:heading-4-bold text-lg font-bold text-white sm:text-xl md:text-2xl">
                Majelis101: Kajian Mingguan
              </h3>
            </div>
          </div>

          {/* Image 5 */}
          <div className="group relative h-[300px] overflow-hidden rounded-lg md:-mt-[75px] md:h-[350px] lg:-mt-[100px] lg:h-[400px]">
            <Image
              src="https://storage.googleapis.com/m101-prods/about-us/Di%20balik%20layar%20muslim101/Card%20Our%20Culture%20Portrait-1.png"
              alt="BnB101: Silaturahmi Tim"
              fill
              className="object-cover transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 h-[100px] w-full bg-gradient-to-t from-black to-transparent duration-300 lg:h-0 lg:group-hover:h-[150px]" />
            <div className="absolute bottom-0 left-0 p-4 text-white lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:duration-1000 lg:group-hover:max-h-[150px] lg:group-hover:opacity-100">
              <h3 className="lg:heading-4-bold text-lg font-bold text-white sm:text-xl md:text-2xl">
                BnB101: Silaturahmi Tim
              </h3>
            </div>
          </div>

          {/* Image 6 */}
          <div className="group relative h-[250px] overflow-hidden rounded-lg md:h-[275px] lg:h-[300px]">
            <Image
              src="https://storage.googleapis.com/m101-prods/about-us/Di%20balik%20layar%20muslim101/Card%20Our%20Culture%20Square-1.png"
              alt="Majelis101: Kajian Mingguan"
              fill
              className="object-cover transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 h-[100px] w-full bg-gradient-to-t from-black to-transparent duration-300 lg:h-0 lg:group-hover:h-[150px]" />
            <div className="absolute bottom-0 left-0 p-4 text-white lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:duration-1000 lg:group-hover:max-h-[150px] lg:group-hover:opacity-100">
              <h3 className="lg:heading-4-bold text-lg font-bold text-white sm:text-xl md:text-2xl">
                Majelis101: Kajian Mingguan
              </h3>
            </div>
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className="mx-auto my-4 flex w-full flex-row gap-4 lg:hidden">
          <div className="flex w-full flex-col gap-5">
            {/* Image 1 */}
            <div className="group relative aspect-[160/212] overflow-hidden rounded-lg">
              <Image
                src="https://storage.googleapis.com/m101-prods/about-us/Di%20balik%20layar%20muslim101/Card%20Our%20Culture%20Portrait-2.png"
                alt="BnB101: Masak Bersama"
                fill
                sizes="100vw"
                width={0}
                height={0}
                className="h-auto w-full object-cover transition-transform duration-500"
              />
            </div>

            {/* Image 2 */}
            <div className="group relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://storage.googleapis.com/m101-prods/about-us/Di%20balik%20layar%20muslim101/Card%20Our%20Culture%20Square.png"
                alt="Majelis101: Kajian Mingguan"
                width={0}
                height={0}
                sizes="100vw"
                className="aspect-square h-auto w-full object-cover transition-transform duration-500"
              />
            </div>

            {/* Image 3 */}
            <div className="group relative aspect-[160/212] overflow-hidden rounded-lg">
              <Image
                src="https://storage.googleapis.com/m101-prods/about-us/Di%20balik%20layar%20muslim101/Card%20Our%20Culture%20Portrait.png"
                alt="Event101: Bestie till Jannah"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full object-cover transition-transform duration-500"
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-5">
            {/* Image 4 */}
            <div className="group relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://storage.googleapis.com/m101-prods/about-us/Di%20balik%20layar%20muslim101/Card%20Our%20Culture%20Square-2.png"
                alt="Majelis101: Kajian Mingguan"
                fill
                className="object-cover transition-transform duration-500"
              />
            </div>

            {/* Image 5 */}
            <div className="group relative aspect-[160/212] overflow-hidden rounded-lg">
              <Image
                src="https://storage.googleapis.com/m101-prods/about-us/Di%20balik%20layar%20muslim101/Card%20Our%20Culture%20Portrait-1.png"
                alt="BnB101: Silaturahmi Tim"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full object-cover transition-transform duration-500"
              />
            </div>

            {/* Image 6 */}
            <div className="group relative aspect-[160/212] overflow-hidden rounded-lg">
              <Image
                src="https://storage.googleapis.com/m101-prods/about-us/Di%20balik%20layar%20muslim101/Card%20Our%20Culture%20Square-1.png"
                alt="Majelis101: Kajian Mingguan"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full object-cover transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
