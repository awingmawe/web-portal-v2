'use client'

import LearnMoreSectionDesktop from '@/components/pages/umrah-personal/landing/2-LearnMore/desktop/LearnMoreCarousel'
import LearnMoreSectionMobile from '@/components/pages/umrah-personal/landing/2-LearnMore/mobile/LearnMoreMobile'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { Fragment } from 'react'

function LearnMoreSection() {
  const { lg: isMobile } = useTailwindBreakpoint()
  return (
    <Fragment>
      {isMobile ? <LearnMoreSectionMobile /> : <LearnMoreSectionDesktop />}
    </Fragment>
  )
}

export default LearnMoreSection
