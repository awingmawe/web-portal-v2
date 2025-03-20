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
  const { xs } = useTailwindBreakpoint()

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
          transition={xs ? springTransitionMobile : springTransition}
          style={{
            backgroundImage: "url('/images/Sky.png')",
            backgroundSize: 'contain',
            aspectRatio: '16/9',
            backgroundRepeat: 'no-repeat',
          }}
          className="
          max-sm:[--scale-from:4] 
          max-sm:[--scale-to:1.8] 
          max-sm:[--x-from:2.5%] 
          max-sm:[--x-to:2.5%] 
          max-sm:[--y-from:150%] 
          max-sm:[--y-to:40%]

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
          transition={xs ? springTransitionMobile : springTransition}
          className={cn(
            'absolute right-0 left-0 z-2 mx-auto w-full bg-contain max-sm:bg-cover',
            'max-sm:[--bottom-from:-100%] max-sm:[--bottom-to:-20%]',
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
          transition={xs ? springTransitionMobile : springTransition}
          className={cn(
            'absolute left-1/2 z-1 mx-auto -translate-x-1/2 -translate-y-1/2',
            'max-sm:w-[95%] max-sm:[--top-from:150%] max-sm:[--top-to:45%]',
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
