import { metadata } from '@/app/shared-metadata'
import UmrohLandingSection from '@/components/pages/umrah-personal/landing/1-Landing/Landing'
import LearnMoreSection from '@/components/pages/umrah-personal/landing/2-LearnMore'
import TopbarMobile from '@/components/pages/umrah-personal/landing/2-LearnMore/mobile/Topbar'
import UmrohPersonalStartSection from '@/components/pages/umrah-personal/landing/3-UmrahPersonalStart/BannerStart'
import Topbar from '@/components/shared/Topbar'

export async function generateMetadata() {
  return {
    ...metadata('Muslim 101 | Umrah Personal', 'Muslim 101 Umrah Personal'),
  }
}

export default async function UmrahPersonalLanding() {
  return (
    <>
      <Topbar type="homepage" />

      <TopbarMobile />
      <main className="lg:h-screen lg:snap-y lg:snap-proximity lg:overflow-y-auto">
        <UmrohLandingSection />

        <LearnMoreSection />

        <UmrohPersonalStartSection />
      </main>
    </>
  )
}
