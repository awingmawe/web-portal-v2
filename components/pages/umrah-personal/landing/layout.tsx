'use client'

import TopbarMobileLandingUmrahPersonal from '@/components/pages/umrah-personal/landing/mobile/Topbar'
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
      <TopbarMobileLandingUmrahPersonal />
      <main>{children}</main>
    </>
  )
}

export default ScrollContainerWrapper
