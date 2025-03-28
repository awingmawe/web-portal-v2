import Image from 'next/image'

const TravelImageSection: React.FC = () => (
  <div className="relative z-2 mb-[560px] flex flex-row justify-center">
    <div
      className="relative flex w-full items-center justify-center"
      style={{
        maxWidth: 1360,
        paddingTop: 240,
      }}
    >
      <Image
        src="/images/experience-dashed.svg"
        width={878}
        height={2250}
        alt="dashed"
      />
      <div className="absolute top-[0] left-[0] flex h-[534px] w-[756px] flex-col rounded-[20px] bg-white p-2">
        <div
          className="h-[415px] w-full rounded-[20px] bg-[black]"
          style={{
            backgroundImage: `url(https://storage.googleapis.com/m101-prods/about-us/9960aefdd2be50e21cbef5da7c8e120b.jpg)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <div className="color-[#30302F] flex flex-auto items-center justify-center text-center text-[28px] leading-[32px]">
          Noor Abika Tours & Travel <br />
          Oktober 2024
        </div>
      </div>
      <div className="absolute top-[420px] right-[0] flex h-[675px] w-[432px] flex-col rounded-[20px] bg-white p-2">
        <div
          className="flex h-[572px] w-full rounded-[20px] bg-[black]"
          style={{
            backgroundImage: `url(https://storage.googleapis.com/m101-prods/about-us/9960aefdd2be50e21cbef5da7c8e120b.jpg)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <div className="color-[#30302F] flex flex-auto items-center justify-center text-center text-[28px] leading-[32px]">
          Tazkia Tours & Travel <br />
          Juni 2024
        </div>
      </div>
      <div className="absolute top-[800px] left-[48px] flex h-[509px] w-[626px] flex-col rounded-[20px] bg-white p-2">
        <div
          className="flex h-[405px] w-full rounded-[20px] bg-[black]"
          style={{
            backgroundImage: `url(https://storage.googleapis.com/m101-prods/about-us/9960aefdd2be50e21cbef5da7c8e120b.jpg)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <div className="color-[#30302F] flex flex-auto items-center justify-center text-center text-[28px] leading-[32px]">
          Amarcy Travel <br />
          Agustus 2024
        </div>
      </div>

      <div className="absolute top-[1400px] right-[120px] flex h-[477px] w-[526px] flex-col rounded-[20px] bg-white p-2">
        <div
          className="flex h-[373px] w-full rounded-[20px] bg-[black]"
          style={{
            backgroundImage: `url(https://storage.googleapis.com/m101-prods/about-us/9960aefdd2be50e21cbef5da7c8e120b.jpg)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <div className="color-[#30302F] flex flex-auto items-center justify-center text-center text-[28px] leading-[32px]">
          Berkah Cinta Sholawat <br />
          November 2024
        </div>
      </div>
      <div className="absolute top-[1680px] left-[0] flex h-[761px] w-[513px] flex-col rounded-[20px] bg-white p-2">
        <div
          className="flex h-[657px] w-full rounded-[20px] bg-[black]"
          style={{
            backgroundImage: `url(https://storage.googleapis.com/m101-prods/about-us/9960aefdd2be50e21cbef5da7c8e120b.jpg)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <div className="color-[#30302F] flex flex-auto items-center justify-center text-center text-[28px] leading-[32px]">
          Jejak Imani <br />
          Oktober 2024
        </div>
      </div>
      <div className="absolute top-[2160px] right-[0px] flex h-[700px] w-[498px] flex-col rounded-[20px] bg-white p-2">
        <div
          className="flex h-[596px] w-full rounded-[20px] bg-[black]"
          style={{
            backgroundImage: `url(https://storage.googleapis.com/m101-prods/about-us/9960aefdd2be50e21cbef5da7c8e120b.jpg)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <div className="color-[#30302F] flex flex-auto items-center justify-center text-center text-[28px] leading-[32px]">
          Madani Travel <br />
          November 2024
        </div>
      </div>
    </div>
  </div>
)

export default TravelImageSection
