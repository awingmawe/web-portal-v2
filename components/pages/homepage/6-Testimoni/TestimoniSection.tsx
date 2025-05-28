'use client'

import { CardTestimoni } from '@/components/pages/homepage/6-Testimoni/CardTestimoni'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { GalleryHomepage } from '@/constant/types/GalleryProps'

export default function TestimoniSection({
  dataCarousel,
}: {
  dataCarousel: GalleryHomepage[]
}) {
  return (
    <div className="bg-neutral-0 relative z-6 w-full">
      <svg
        width="224"
        height="168"
        viewBox="0 0 224 168"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 h-auto w-20 lg:relative lg:w-fit"
      >
        <path
          opacity="0.1"
          d="M101.434 0.922852L52.1944 80.2538C63.1366 81.1656 72.2551 85.7249 79.5499 93.9315C87.3006 102.138 91.176 112.169 91.176 124.023C91.176 137.244 86.6167 147.731 77.4982 155.481C68.8357 163.232 58.5773 167.107 46.7233 167.107C33.9574 167.107 23.2432 163.232 14.5806 155.481C5.46208 147.731 0.902832 136.788 0.902832 122.655C0.902832 109.433 5.91801 94.6154 15.9484 78.2021C25.5228 61.7888 41.0242 38.3087 62.4527 7.76172L67.2399 0.922852H101.434ZM223.166 0.922852L173.926 80.2538C184.869 81.1656 193.987 85.7249 201.282 93.9315C209.033 102.138 212.908 112.169 212.908 124.023C212.908 137.244 208.349 147.731 199.23 155.481C190.568 163.232 180.309 167.107 168.455 167.107C155.689 167.107 144.747 163.232 135.629 155.481C126.966 147.731 122.635 136.788 122.635 122.655C122.635 109.433 127.422 94.6154 136.996 78.2021C147.027 61.7888 162.756 38.3087 184.185 7.76172L188.972 0.922852H223.166Z"
          fill="black"
        />
      </svg>
      <div className="px-20 pt-0 pb-35 max-lg:px-2">
        <h1 className="px-20 py-10 text-center text-3xl font-semibold lg:pt-0 lg:text-5xl">
          Kata Mereka Tentang Kami
        </h1>
        <Carousel
          opts={{
            align: 'start',
            inViewThreshold: 1,
            watchDrag: true,
          }}
          className="mt-7 mb-0 w-full max-lg:mt-0"
        >
          <CarouselContent className="-ml-4.5 px-2">
            {dataCarousel.map((testi) => (
              <CarouselItem
                key={`testimoni-${testi.id}`}
                className="basis-4/5 items-center pl-4.5 md:basis-1/2 lg:basis-1/3"
              >
                <CardTestimoni
                  name={testi.title}
                  image={testi?.imageUrl}
                  quote={testi.caption}
                  id={testi.id}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="top-[35%] max-lg:hidden" />
          <CarouselNext className="top-[35%] max-lg:hidden" />
        </Carousel>
      </div>
      <svg
        width="224"
        height="148"
        viewBox="0 0 224 148"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-5 -bottom-10 w-20 lg:right-0 lg:bottom-0 lg:w-fit"
      >
        <path
          opacity="0.1"
          d="M122.566 166.235L171.806 86.9045C160.864 85.9927 151.745 81.4334 144.45 73.2268C136.7 65.0201 132.824 54.9898 132.824 43.1357C132.824 29.9139 137.384 19.4276 146.502 11.6769C155.165 3.92615 165.423 0.0507909 177.277 0.0507919C190.043 0.050793 200.757 3.92615 209.42 11.6769C218.538 19.4276 223.097 30.3698 223.097 44.5035C223.097 57.7253 218.082 72.5429 208.052 88.9562C198.477 105.369 182.976 128.85 161.548 159.397L156.76 166.235H122.566ZM0.833984 166.235L50.0739 86.9045C39.1317 85.9926 30.0132 81.4334 22.7184 73.2268C14.9677 65.0201 11.0923 54.9897 11.0923 43.1357C11.0923 29.9139 15.6516 19.4276 24.7701 11.6769C33.4326 3.92614 43.6909 0.0507802 55.545 0.0507812C68.3109 0.0507824 79.2531 3.92614 88.3716 11.6769C97.0342 19.4276 101.365 30.3698 101.365 44.5035C101.365 57.7253 96.5782 72.5429 87.0038 88.9562C76.9735 105.369 61.244 128.85 39.8156 159.397L35.0284 166.235H0.833984Z"
          fill="black"
        />
      </svg>
    </div>
  )
}
