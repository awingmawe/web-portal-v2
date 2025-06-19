'use client'

import TopbarMobileLandingUmrahPersonal from '@/components/pages/umrah-personal/landing/mobile/Topbar'
import Topbar from '@/components/shared/Topbar'
import { ReactNode } from 'react'

interface ScrollContainerWrapperProps {
  children: ReactNode
}

const ScrollContainerWrapper: React.FC<ScrollContainerWrapperProps> = ({
  children,
}) => {
  return (
    <>
      <Topbar type="homepage" />
      <TopbarMobileLandingUmrahPersonal />
      <main>{children}</main>
    </>
  )
}

export default ScrollContainerWrapper
