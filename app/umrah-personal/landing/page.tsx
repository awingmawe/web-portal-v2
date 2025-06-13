import { metadata } from '@/app/shared-metadata'
import UmrohLandingSection from '@/components/pages/umrah-personal/landing/Banner'
import LearnMoreSection from '@/components/pages/umrah-personal/learn-more/Carousel'
import Topbar from '@/components/shared/Topbar'

export async function generateMetadata() {
  return {
    ...metadata('Muslim 101 | Umrah Personal', 'Muslim 101 Umrah Personal'),
  }
}

export default async function UmrahPersonalLanding() {
  return (
    <main className="snap-y snap-mandatory">
      <Topbar type="homepage" />

      <UmrohLandingSection />

      <LearnMoreSection />
    </main>
  )
}
