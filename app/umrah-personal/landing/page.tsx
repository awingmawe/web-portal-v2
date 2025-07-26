import { metadata } from '@/app/shared-metadata'
import UmrohLandingSection from '@/components/pages/umrah-personal/landing/1-Landing/Landing'
import LearnMoreSection from '@/components/pages/umrah-personal/landing/2-LearnMore'
import UmrohPersonalStartSection from '@/components/pages/umrah-personal/landing/3-UmrahPersonalStart/BannerStart'
import ScrollContainerWrapper from '@/components/pages/umrah-personal/landing/layout'
import TopbarMobileLandingUmrahPersonal from '@/components/pages/umrah-personal/landing/mobile/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'

export async function generateMetadata() {
  return {
    ...metadata('Muslim 101 | Umrah Personal', 'Muslim 101 Umrah Personal'),
  }
}

export default async function UmrahPersonalLanding() {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string
  return (
    <ScrollContainerWrapper token={token}>
      <TopbarMobileLandingUmrahPersonal />
      <UmrohLandingSection token={token} />
      <LearnMoreSection />
      <UmrohPersonalStartSection />
    </ScrollContainerWrapper>
  )
}
