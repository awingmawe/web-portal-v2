'use client'

import SearchWidget from '@/components/pages/homepage/1-Banner/Widget'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { springTransition, springTransitionMobile } from '@/lib/animation-setup'
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
  const { lg } = useTailwindBreakpoint()

  return (
    <div
      className={cn(
        'relative aspect-[14/9] overflow-hidden bg-white p-6 max-lg:p-0',
        className
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[20px] max-lg:rounded-none">
        {/* Sky background */}
        <motion.div
          initial={{
            scale: 'var(--scale-from, 1)',
            y: 'var(--y-from, 0px)',
            x: 'var(--x-from, 0px)',
          }}
          animate={{
            scale: 'var(--scale-to, 1)',
            y: 'var(--y-to, 0px)',
            x: 'var(--x-to, 0px)',
          }}
          transition={lg ? springTransitionMobile : springTransition}
          style={{
            backgroundImage: "url('/images/Sky.png')",
            backgroundSize: 'contain',
            aspectRatio: '16/9',
            backgroundRepeat: 'no-repeat',
          }}
          className="
          max-lg:[--scale-from:4] 
          max-lg:[--scale-to:1.8] 
          max-lg:[--x-from:2.5%] 
          max-lg:[--x-to:2.5%] 
          max-lg:[--y-from:150%] 
          max-lg:[--y-to:40%]

          sm:[--scale-from:4] 
          sm:[--scale-to:1.7] 
          sm:[--x-from:2.5%] 
          sm:[--x-to:2.5%] 
          sm:[--y-from:150%] 
          sm:[--y-to:35%]
          "
        />

        {/* Kabah foreground */}
        <motion.div
          initial={{
            bottom: 'var(--bottom-from, 0px)',
          }}
          animate={{
            bottom: 'var(--bottom-to, 0px)',
          }}
          transition={lg ? springTransitionMobile : springTransition}
          className={cn(
            'absolute right-0 left-0 z-2 mx-auto w-full bg-contain max-lg:bg-cover',
            'max-lg:[--bottom-from:-100%] max-lg:[--bottom-to:-20%]',
            'sm:[--bottom-from:-100%] sm:[--bottom-to:0%]'
          )}
          style={{
            backgroundImage: "url('/images/Kaabah.png')",
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
            aspectRatio: '14/9',
          }}
        />

        {/* Text foreground */}
        <ImageText
          initial={{
            top: 'var(--top-from, 0px)',
          }}
          animate={{
            top: 'var(--top-to, 0px)',
          }}
          transition={lg ? springTransitionMobile : springTransition}
          className={cn(
            'absolute left-1/2 z-1 mx-auto -translate-x-1/2 -translate-y-1/2',
            'max-lg:w-[95%] max-lg:[--top-from:150%] max-lg:[--top-to:45%]',
            'sm:w-[90%] sm:[--top-from:150%] sm:[--top-to:30%]'
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
