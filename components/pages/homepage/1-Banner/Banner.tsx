'use client'

import SearchWidget from '@/components/pages/homepage/1-Banner/Widget'
import { springTransition } from '@/lib/animation-setup'
import { cn } from '@/lib/utils'
import Text from '@/public/images/Text.png'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

interface BannerProps {
  className?: string
}
const ImageText = motion.create(Image)

const Banner: React.FC<BannerProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'relative aspect-[14/9] overflow-hidden bg-white p-6 max-sm:p-0',
        className
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[20px] max-sm:rounded-none">
        {/* Sky background */}
        <motion.div
          initial={{ scale: 4, y: '150%', x: '2.5%' }}
          animate={{
            scale: 1.7,
            y: '35%',
            x: '2.5%',
          }}
          transition={springTransition}
          style={{
            backgroundImage: "url('/images/Sky.png')",
            backgroundSize: 'contain',
            aspectRatio: '16/9',
            backgroundRepeat: 'no-repeat',
          }}
          className={cn()}
        />

        {/* Kabah foreground */}
        <motion.div
          initial={{ bottom: '-100%' }}
          animate={{
            bottom: '0%',
          }}
          transition={springTransition}
          className={cn(
            'absolute right-0 bottom-[0%] left-0 z-2 mx-auto w-full'
          )}
          style={{
            backgroundImage: "url('/images/Kaabah.png')",
            backgroundPosition: 'center bottom',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            aspectRatio: '14/9',
          }}
        />

        {/* Text foreground */}
        <ImageText
          initial={{ top: '150%' }}
          animate={{
            top: '30%',
          }}
          transition={springTransition}
          className={cn(
            'absolute left-1/2 z-1 mx-auto w-[90%] -translate-x-1/2 -translate-y-1/2'
          )}
          src={Text}
          alt="image-text-banner"
          priority
        />
        <SearchWidget />
      </div>
    </div>
  )
}

export default Banner
