'use client'

import Topbar from '@/components/shared/Topbar'
import { ReactNode } from 'react'

interface ScrollContainerWrapperProps {
  children: ReactNode
  topbarMobile: ReactNode
}

const ScrollContainerWrapper: React.FC<ScrollContainerWrapperProps> = ({
  children,
  topbarMobile,
}) => {
  return (
    <>
      <Topbar type="homepage" />
      {topbarMobile}
      <main>{children}</main>
    </>
  )
}

export default ScrollContainerWrapper
