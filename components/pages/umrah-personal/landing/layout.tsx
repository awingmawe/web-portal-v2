'use client'

import Topbar from '@/components/shared/Topbar'
import { ReactNode } from 'react'

interface ScrollContainerWrapperProps {
  children: ReactNode
  token: string
}

const ScrollContainerWrapper: React.FC<ScrollContainerWrapperProps> = ({
  children,
  token,
}) => {
  return (
    <>
      <Topbar type="homepage" token={token} />
      <main
        className="max-lg:h-[100dvh] max-lg:snap-y max-lg:snap-mandatory max-lg:overflow-y-auto"
        style={{ scrollBehavior: 'smooth' }}
        id="scroll-container"
      >
        {children}
      </main>
    </>
  )
}

export default ScrollContainerWrapper
