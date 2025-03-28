import Image from 'next/image'

export default function UnderService() {
  return (
    <div className="bg-[#FDFAF4] px-4 py-8 md:py-10 lg:px-0 lg:py-15">
      <div className="container mx-auto">
        <div className="text-center">
          <h1 className="lg:text-xl-regular text-2xl font-normal sm:text-3xl md:text-4xl">
            Di Balik Layanan Muslim101
          </h1>
          <p className="text-primary-900 lg:text-l-regular mx-auto mt-3 text-sm sm:text-base md:mt-4 lg:mt-5">
            Program pengembangan internal Muslim101 yang dirancang untuk
            memperkuat pemahaman tentang Islam, meningkatkan kualitas diri,
            serta mempererat ukhuwah dan kebersamaan dalam lingkungan kerja.
            Program ini berfokus untuk mendukung pertumbuhan spiritual serta
            pengembangan diri karyawan Muslim101 agar selaras dengan nilai-nilai
            Islami dalam kehidupan profesional dan personal.
          </p>
        </div>
        {/* Image grid - keeping the original layout */}
        <div className="mx-auto my-4 grid max-w-4xl grid-cols-1 gap-4 lg:my-8 lg:grid-cols-3">
          {/* Image 1 */}
          <div className="group relative h-[300px] overflow-hidden rounded-lg md:h-[350px] lg:h-[400px]">
            <Image
              src="https://storage.googleapis.com/m101-prods/about-us/c875618f1543fc2ea37162c9110c6525.png"
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
              src="https://storage.googleapis.com/m101-prods/about-us/f92d9bd4634b27a12294aa288facb2db.png"
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
              src="https://storage.googleapis.com/m101-prods/about-us/b7a59a8cd226c95b36caa250c29dc995.png"
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
              src="https://storage.googleapis.com/m101-prods/about-us/7937dc50155b9e48c1dc139d07d83227.png"
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
              src="https://s3-alpha-sig.figma.com/img/28b5/cb94/a6fcfe74226bbb54d8922aafc39af248?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EYmEpiGhmig0QuoRdhOMxMRbCk~~kUvw~gaXbrImHnSPQ18jAgz2vZW8adHYCpvyftHEL-mJkMU5IsylBSG4eRVeI~9d2urQGCirtglfimfAHCoRuNL0NGlmBrqRdq3ZNhEDAfF4PkLrSoQiXLdh5JiDVwfMY8Nwv5wf2Uj9OmKeiqYadI9Nem97mcDTDfKQTgjbHOJ72W8e~WkTlRED2iRLQiZmqsAwMYgmKsSU~NmMbYPOg8ZzEeu3MB~vu7mOq~D0Ej9cvelfRmUDTVQiiVt2D0HVcYvgSGuwgZfUXkVIKnSR-3kFwBXGC7U2OSHwv0z0CvzRoQwMRIqYma~EYQ__"
              alt="BnB101: Makan Bersama"
              fill
              className="object-cover transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 h-[100px] w-full bg-gradient-to-t from-black to-transparent duration-300 lg:h-0 lg:group-hover:h-[150px]" />
            <div className="absolute bottom-0 left-0 p-4 text-white lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:duration-1000 lg:group-hover:max-h-[150px] lg:group-hover:opacity-100">
              <h3 className="lg:heading-4-bold text-lg font-bold text-white sm:text-xl md:text-2xl">
                BnB101: Makan Bersama
              </h3>
            </div>
          </div>

          {/* Image 6 */}
          <div className="group relative h-[250px] overflow-hidden rounded-lg md:h-[275px] lg:h-[300px]">
            <Image
              src="https://storage.googleapis.com/m101-prods/about-us/f9b6cbd5368fa3c37ac44331ac384d13_2.png"
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
      </div>
    </div>
  )
}
