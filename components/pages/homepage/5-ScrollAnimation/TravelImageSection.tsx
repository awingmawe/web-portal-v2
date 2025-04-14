import { GalleryHomepage } from '@/constant/types/GalleryProps'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import Image from 'next/image'

interface TravelImageSectionProps {
  dataGallery: GalleryHomepage[]
}

const TravelImageSection: React.FC<TravelImageSectionProps> = ({
  dataGallery,
}) => {
  const { lg: isMobile } = useTailwindBreakpoint()

  return (
    <div className="relative z-2 mb-[560px] flex flex-row justify-center max-lg:mb-[500px] max-md:mb-[200px]">
      <div
        className="relative flex w-full items-center justify-center max-lg:max-w-[320px] max-lg:px-4 lg:container"
        style={{
          paddingTop: isMobile ? 120 : 240,
        }}
      >
        <Image
          src="/images/experience-dashed.svg"
          width={0}
          height={0}
          alt="dashed"
          sizes="100vw"
          className="h-[2250px] w-[878px] max-lg:hidden"
        />
        <Image
          src="/images/dashed-mobile.svg"
          width={0}
          height={0}
          alt="dashed"
          sizes="100vw"
          className="h-auto w-[280px] lg:hidden"
        />

        {/* First Image */}
        <div
          className={`absolute top-[0] left-[0] flex w-[757px] flex-col rounded-[20px] bg-white p-2 max-xl:top-[50px] max-xl:w-[500px] max-lg:top-[20px] max-lg:-left-[40px] max-lg:w-[233px] max-sm:left-0`}
        >
          <Image
            src={dataGallery[0].imageUrl}
            className="h-auto w-full rounded-[20px] object-contain"
            alt="travel image"
            width={0}
            height={0}
            sizes="100vw"
          />
          <div
            className={`color-[#30302F] flex items-center justify-center text-center font-[Playball]
            ${isMobile ? 'py-3 text-lg leading-6' : 'text-[28px] leading-[32px]'}`}
          >
            {dataGallery[0].title} <br />
            {dataGallery[0].caption}
          </div>
        </div>

        {/* Second Image */}
        <div
          className={`absolute top-[420px] right-[0] flex w-[400px] flex-col rounded-[20px] bg-white p-2 max-lg:top-[300px]  max-lg:-right-[40px] max-lg:w-[233px] max-sm:-right-0`}
        >
          <Image
            src={dataGallery[2].imageUrl}
            className="aspect-[4/5] h-auto w-full rounded-[20px] object-cover"
            alt="travel image"
            width={0}
            height={0}
            sizes="100vw"
          />
          <div
            className={`color-[#30302F] flex flex-auto items-center justify-center text-center font-[Playball]
            ${isMobile ? 'py-3 text-lg leading-6' : 'text-[28px] leading-[32px]'}`}
          >
            {dataGallery[2].title} <br />
            {dataGallery[2].caption}
          </div>
        </div>

        {/* Third Image */}
        <div
          className={`absolute top-[900px] left-[60px] flex w-[600px] flex-col rounded-[20px] bg-white p-2 max-xl:left-[35px] max-xl:w-[500px] max-lg:top-[675px] max-lg:-left-[40px] max-lg:w-[233px] max-sm:left-[0px]`}
        >
          <Image
            src={dataGallery[0].imageUrl}
            className="h-auto w-full rounded-[20px] object-cover"
            alt="travel image"
            width={0}
            height={0}
            sizes="100vw"
          />
          <div
            className={`color-[#30302F] flex flex-auto items-center justify-center text-center font-[Playball]
            ${isMobile ? 'py-3 text-lg leading-6' : 'text-[28px] leading-[32px] max-sm:w-[233px]'}`}
          >
            {dataGallery[0].title} <br />
            {dataGallery[0].caption}
          </div>
        </div>

        {/* Fourth Image */}
        <div
          className={`absolute top-[1400px] right-[50px] flex w-[526px]
            flex-col rounded-[20px] bg-white p-2 max-xl:right-0 max-xl:w-[500px] max-lg:top-[950px] max-lg:-right-[40px] max-lg:w-[233px] max-sm:right-[0px]`}
        >
          <Image
            src={dataGallery[1].imageUrl}
            className={`h-auto w-full rounded-[20px] object-cover`}
            alt="travel image"
            width={0}
            height={0}
            sizes="100vw"
          />
          <div
            className={`color-[#30302F] flex flex-auto items-center justify-center text-center font-[Playball]
            ${isMobile ? 'py-3 text-lg leading-6' : 'text-[28px] leading-[32px]'}`}
          >
            {dataGallery[1].title} <br />
            {dataGallery[1].caption}
          </div>
        </div>

        {/* Fifth Image */}
        <div
          className={`absolute top-[1680px] left-[0] flex w-[513px] flex-col rounded-[20px] bg-white p-2 max-xl:w-[420px] max-lg:top-[1200px] max-lg:-left-[30px] max-lg:w-[144px] max-sm:top-[1225px] max-sm:left-[0px]`}
        >
          <Image
            src={dataGallery[4].imageUrl}
            className="aspect-[4/5] h-auto w-full rounded-[20px] object-cover"
            alt="travel image"
            width={0}
            height={0}
            sizes="100vw"
          />
          <div
            className={`color-[#30302F] flex flex-auto items-center justify-center text-center font-[Playball]
            ${isMobile ? 'py-3 text-lg leading-6' : 'text-[28px] leading-[32px]'}`}
          >
            {dataGallery[4].title} <br />
            {dataGallery[4].caption}
          </div>
        </div>

        {/* Sixth Image */}
        <div
          className={`absolute top-[2160px] right-[0px] flex w-[498px] flex-col rounded-[20px] bg-white p-2 max-xl:w-[420px] max-lg:top-[1450px] max-lg:-right-[10px] max-lg:w-[144px] max-sm:top-[1500px] max-sm:right-[0px]`}
        >
          <Image
            src={dataGallery[3].imageUrl}
            className="aspect-[4/5] h-auto w-full rounded-[20px] object-cover"
            alt="travel image"
            width={0}
            height={0}
            sizes="100vw"
          />
          <div
            className={`color-[#30302F] flex flex-auto items-center justify-center text-center font-[Playball]
            ${isMobile ? 'py-3 text-lg leading-6' : 'text-[28px] leading-[32px]'}`}
          >
            {dataGallery[3].title} <br />
            {dataGallery[3].caption}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TravelImageSection
