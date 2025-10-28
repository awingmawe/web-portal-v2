import Image from 'next/image'
export default function Breadcrumb() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative z-9 h-[300px] w-full  bg-[#00000080] max-lg:h-[148px] max-lg:scale-200"></div>
      <Image
        src="https://storage.googleapis.com/m101-prods/about-us/b933a87636c0d0bd4ae44d8864c30458.jpeg"
        alt="about-us"
        width={0}
        height={0}
        sizes="100vw"
        className="absolute top-0 aspect-[16/9] h-auto w-full -translate-y-[45%] object-cover max-lg:h-[148px] max-lg:-translate-y-1/3 max-lg:scale-200"
      />
      <h1 className="text-xl-medium absolute top-1/2 left-1/2 z-20 flex w-full -translate-x-1/2 -translate-y-1/2 transform justify-center text-white max-lg:text-xl max-lg:leading-6.5 max-lg:font-bold">
        Pertanyaan yang Sering Ditanyakan
      </h1>
    </section>
  )
}
