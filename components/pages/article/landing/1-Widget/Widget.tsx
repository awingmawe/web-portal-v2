'use client'

import WidgetFilter from '@/components/pages/article/common/Widget'
import Image from 'next/image'

export function ArticleSearchWidget({ params }: any) {
  return (
    <section
      className={`relative mx-auto mt-7.5 w-full overflow-hidden rounded-[40px] max-lg:mx-0 ${params === 'true' ? 'max-lg:mt-0' : 'max-lg:mt-10'}  max-lg:rounded-none lg:container`}
    >
      <div className="flex flex-col items-center justify-center gap-6 px-10 py-8 max-lg:gap-2 max-lg:p-4">
        <p className="text-neutral-0 heading-1-semibold max-lg:text-2xl max-lg:leading-7.5">
          Artikel
        </p>
        <p className="text-neutral-0 heading-4-medium max-lg:text-xs max-lg:leading-4">
          Menjelajahi Ilmu, Menyebarkan Manfaat
        </p>
        <WidgetFilter eventCategory="article" />
      </div>
      {/* IMAGE FOR DESKTOP */}
      <Image
        src="https://storage.googleapis.com/m101-prods/articel/head-article.png"
        alt="bg-head-article"
        width={0}
        height={0}
        sizes="100vw"
        className="absolute top-0 -z-1 h-full w-full rounded-[inherit] object-cover max-lg:hidden"
      />
      {/* IMAGE FOR MOBILE RESPONSIVE */}
      <Image
        src="https://storage.googleapis.com/m101-prods/articel/enhanced-head-article-mobile.png"
        alt="bg-head-article"
        width={0}
        height={0}
        sizes="100vw"
        className="absolute top-0 -z-1 w-full object-cover max-[425px]:h-[225px] min-[426px]:h-auto lg:hidden"
      />
    </section>
  )
}
