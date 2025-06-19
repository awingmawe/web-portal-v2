import { metadata } from '@/app/shared-metadata'
import UmrohLandingSection from '@/components/pages/umrah-personal/landing/1-Landing/Landing'
import LearnMoreSection from '@/components/pages/umrah-personal/landing/2-LearnMore'
import UmrohPersonalStartSection from '@/components/pages/umrah-personal/landing/3-UmrahPersonalStart/BannerStart'
import ScrollContainerWrapper from '@/components/pages/umrah-personal/landing/layout'

export async function generateMetadata() {
  return {
    ...metadata('Muslim 101 | Umrah Personal', 'Muslim 101 Umrah Personal'),
  }
}

export default async function UmrahPersonalLanding() {
  return (
    <ScrollContainerWrapper>
      <UmrohLandingSection />
      <LearnMoreSection />
      <UmrohPersonalStartSection />
    </ScrollContainerWrapper>
  )
}
