/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const PembiayaanPage: React.FC = () => {
  return (
    <div className="mt-10 flex min-h-screen flex-col p-4 pb-20 md:mt-0 md:p-12 md:pb-12">
      {/* Mobile Header - Visible only on small screens */}
      <div className="md:hidden">
        {/* Banner image with logo */}
        <div className="relative mb-4 rounded-lg bg-[#A26C34] p-4">
          <Image
            src="/images/logo-permata-pembiayaan.svg"
            width={342}
            height={250}
            alt="arrow"
          />
        </div>

        {/* Title */}
        <div className="mb-4">
          <h1 className="text-lg font-bold text-black">
            Program Pendanaan Syariah Umrah
          </h1>
          <div className="mt-4 flex items-center text-xs text-gray-500">
            <span>Didukung oleh</span>
            <Image
              src="/images/logo-permata.svg"
              width={129}
              height={32}
              alt="Permata Bank"
              className="ml-4 "
            />
          </div>
        </div>
      </div>

      {/* Desktop Header with back button - Hidden on small screens */}
      <div className="hidden bg-white p-4 md:block">
        <button className="flex items-center text-gray-800">
          <ChevronLeft className="mr-4" size={24} />
          <span className="text-[24px] font-[600] text-[#30302F]">Kembali</span>
        </button>
      </div>

      {/* Desktop Banner Image - Hidden on small screens */}
      <div className="hidden md:block">
        <div className="flex h-[250px] w-[100%] flex-col items-center justify-center rounded-[20px] bg-gray-200 p-12">
          <div className="mb-4 rounded-full bg-white p-6">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9" />
              <path d="M12 12v9" />
              <path d="m8 17 4 4 4-4" />
            </svg>
          </div>
          <p className="text-center text-sm text-gray-500">
            Gambar ini bisa diisi banner tsp program Pendanaan
          </p>
        </div>
      </div>

      {/* Desktop Title and Support - Hidden on small screens */}
      <div className="hidden p-6 md:block">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-[32px] font-[600] text-[#30302F]">
            Program Pendanaan Syariah Umrah
          </h1>
          <div className="flex items-center">
            <span className="mr-2 text-xs text-gray-500">Didukung oleh</span>
            <Image
              src="/images/logo-permata.svg"
              width={129}
              height={32}
              alt="Permata Bank"
              className="ml-4 "
            />
          </div>
        </div>
      </div>

      {/* Content area with responsive padding */}
      <div className="md:px-6">
        {/* Program description - slight spacing adjustments */}
        <div className="mb-3 md:mb-6">
          <p className="text-[12px] leading-tight text-[#30302F] md:text-[14px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Cras ornare sagittis erat, sit amet eleifend purus
            hendrerit non. Duis sed dui ante.
          </p>
        </div>

        {/* Bullet points */}
        <ol className="mb-4 list-decimal space-y-3 pl-6 md:mb-6">
          <li className="text-[12px] font-[400] text-[#30302F] md:text-[14px]">
            <span className="font-semibold">
              urabilur tempor quis eros tempus lacinia.
            </span>{' '}
            Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi.
            Integer in felis sed leo vestibulum venenatis.
          </li>
          <li className="text-[12px] font-[400] text-[#30302F] md:text-[14px]">
            <span className="font-semibold">
              urabilur tempor quis eros tempus lacinia.
            </span>{' '}
            Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi.
            Integer in felis sed leo vestibulum venenatis.
          </li>
          <li className="text-[12px] font-[400] text-[#30302F] md:text-[14px]">
            <span className="font-semibold">
              urabilur tempor quis eros tempus lacinia.
            </span>{' '}
            Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi.
            Integer in felis sed leo vestibulum venenatis.
          </li>
          <li className="text-[12px] font-[400] text-[#30302F] md:text-[14px]">
            <span className="font-semibold">
              urabilur tempor quis eros tempus lacinia.
            </span>{' '}
            Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi.
            Integer in felis sed leo vestibulum venenatis.
          </li>
        </ol>

        {/* Additional text */}
        <p className="mb-8 text-[12px] font-[400] text-[#30302F] md:text-[14px]">
          Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque
          quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo
          vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu
          vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus,
          porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna
          non ligula vestibulum eleifend. Nulla varius volutpat turpis sed
          lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum
          sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis
          nisi, ac posuere leo.
        </p>

        {/* Action button */}
        <div className="fixed right-0 bottom-0 left-0 mt-4 mb-4 flex justify-center px-4 md:relative md:px-0">
          <Button className="w-full rounded-full bg-yellow-500 px-6 py-3 font-medium text-gray-800 hover:bg-yellow-600 md:w-auto md:max-w-xs">
            Ikuti Program Pendanaan Sekarang
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PembiayaanPage
