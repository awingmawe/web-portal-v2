import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import Image from 'next/image'

const TravelImageSection: React.FC = () => {
  const { lg: isMobile } = useTailwindBreakpoint()

  return (
    <div className="relative z-2 mb-[560px] flex flex-row justify-center max-lg:mb-[300px]">
      <div
        className="relative flex w-full items-center justify-center max-lg:px-4"
        style={{
          maxWidth: 1360,
          paddingTop: isMobile ? 120 : 240,
        }}
      >
        {/* Dashed line - hide on mobile or display a shorter version */}
        <Image
          src="/images/experience-dashed.svg"
          width={878}
          height={2250}
          alt="dashed"
          className="max-lg:hidden"
        />

        {/* Mobile-specific dashed line - a shorter version */}
        {isMobile && (
          <Image
            src="/images/experience-dashed.svg"
            width={320}
            height={1000}
            alt="dashed-mobile"
            className="lg:hidden"
          />
        )}

        {/* First travel card */}
        <div
          className={`absolute flex flex-col rounded-[20px] bg-white p-2
            ${isMobile ? 'top-[0] left-[5%] h-auto w-[90%]' : 'top-[0] left-[0] h-[534px] w-[756px]'}`}
        >
          <div
            className={`rounded-[20px] bg-[black] 
              ${isMobile ? 'h-[240px] w-full' : 'h-[415px] w-full'}`}
            style={{
              backgroundImage: `url(https://storage.googleapis.com/m101-prods/about-us/9960aefdd2be50e21cbef5da7c8e120b.jpg)`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
          <div
            className={`color-[#30302F] flex flex-auto items-center justify-center text-center font-[Playball]
            ${isMobile ? 'py-3 text-lg leading-6' : 'text-[28px] leading-[32px]'}`}
          >
            Noor Abika Tours & Travel <br />
            Oktober 2024
          </div>
        </div>

        {/* Second travel card */}
        <div
          className={`absolute flex flex-col rounded-[20px] bg-white p-2
            ${isMobile ? 'top-[320px] right-[5%] h-auto w-[90%]' : 'top-[420px] right-[0] h-[675px] w-[432px]'}`}
        >
          <div
            className={`rounded-[20px] bg-[black] 
              ${isMobile ? 'h-[240px] w-full' : 'h-[572px] w-full'}`}
            style={{
              backgroundImage: `url(https://storage.googleapis.com/m101-prods/about-us/9960aefdd2be50e21cbef5da7c8e120b.jpg)`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
          <div
            className={`color-[#30302F] flex flex-auto items-center justify-center text-center font-[Playball]
            ${isMobile ? 'py-3 text-lg leading-6' : 'text-[28px] leading-[32px]'}`}
          >
            Tazkia Tours & Travel <br />
            Juni 2024
          </div>
        </div>

        {/* Third travel card */}
        <div
          className={`absolute flex flex-col rounded-[20px] bg-white p-2
            ${isMobile ? 'top-[640px] left-[5%] h-auto w-[90%]' : 'top-[800px] left-[48px] h-[509px] w-[626px]'}`}
        >
          <div
            className={`rounded-[20px] bg-[black] 
              ${isMobile ? 'h-[240px] w-full' : 'h-[405px] w-full'}`}
            style={{
              backgroundImage: `url(https://storage.googleapis.com/m101-prods/about-us/9960aefdd2be50e21cbef5da7c8e120b.jpg)`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
          <div
            className={`color-[#30302F] flex flex-auto items-center justify-center text-center font-[Playball]
            ${isMobile ? 'py-3 text-lg leading-6' : 'text-[28px] leading-[32px]'}`}
          >
            Amarcy Travel <br />
            Agustus 2024
          </div>
        </div>

        {/* Fourth travel card */}
        <div
          className={`absolute flex flex-col rounded-[20px] bg-white p-2
            ${isMobile ? 'top-[960px] right-[5%] h-auto w-[90%]' : 'top-[1400px] right-[120px] h-[477px] w-[526px]'}`}
        >
          <div
            className={`rounded-[20px] bg-[black] 
              ${isMobile ? 'h-[240px] w-full' : 'h-[373px] w-full'}`}
            style={{
              backgroundImage: `url(https://storage.googleapis.com/m101-prods/about-us/9960aefdd2be50e21cbef5da7c8e120b.jpg)`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
          <div
            className={`color-[#30302F] flex flex-auto items-center justify-center text-center font-[Playball]
            ${isMobile ? 'py-3 text-lg leading-6' : 'text-[28px] leading-[32px]'}`}
          >
            Berkah Cinta Sholawat <br />
            November 2024
          </div>
        </div>

        {/* Fifth travel card */}
        <div
          className={`absolute flex flex-col rounded-[20px] bg-white p-2
            ${isMobile ? 'top-[1280px] left-[5%] h-auto w-[90%]' : 'top-[1680px] left-[0] h-[761px] w-[513px]'}`}
        >
          <div
            className={`rounded-[20px] bg-[black] 
              ${isMobile ? 'h-[240px] w-full' : 'h-[657px] w-full'}`}
            style={{
              backgroundImage: `url(https://storage.googleapis.com/m101-prods/about-us/9960aefdd2be50e21cbef5da7c8e120b.jpg)`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
          <div
            className={`color-[#30302F] flex flex-auto items-center justify-center text-center font-[Playball]
            ${isMobile ? 'py-3 text-lg leading-6' : 'text-[28px] leading-[32px]'}`}
          >
            Jejak Imani <br />
            Oktober 2024
          </div>
        </div>

        {/* Sixth travel card */}
        <div
          className={`absolute flex flex-col rounded-[20px] bg-white p-2
            ${isMobile ? 'top-[1600px] right-[5%] h-auto w-[90%]' : 'top-[2160px] right-[0px] h-[700px] w-[498px]'}`}
        >
          <div
            className={`rounded-[20px] bg-[black] 
              ${isMobile ? 'h-[240px] w-full' : 'h-[596px] w-full'}`}
            style={{
              backgroundImage: `url(https://storage.googleapis.com/m101-prods/about-us/9960aefdd2be50e21cbef5da7c8e120b.jpg)`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
          <div
            className={`color-[#30302F] flex flex-auto items-center justify-center text-center font-[Playball]
            ${isMobile ? 'py-3 text-lg leading-6' : 'text-[28px] leading-[32px]'}`}
          >
            Madani Travel <br />
            November 2024
          </div>
        </div>
      </div>
    </div>
  )
}

export default TravelImageSection
