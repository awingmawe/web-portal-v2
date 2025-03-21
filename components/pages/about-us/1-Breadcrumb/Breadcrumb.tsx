import Image from 'next/image'
export default function Breadcrumb() {
  return (
    <div className="relative mt-18">
      <div className="relative z-10 h-[300px] w-full bg-[#00000080]"></div>
      <Image
        src="https://storage.cloud.google.com/m101-prods/about-us/b933a87636c0d0bd4ae44d8864c30458.jpeg"
        alt="about-us"
        width={0}
        height={0}
        sizes="100vw"
        className="absolute top-0 h-[300px] w-full object-cover object-[0px_-300px]"
      />
      <h1 className="text-xl-medium absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform text-white">
        Tentang Muslim101
      </h1>
    </div>
  )
}
