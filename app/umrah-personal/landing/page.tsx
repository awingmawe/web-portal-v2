import { metadata } from '@/app/shared-metadata'
import UmrohLandingSection from '@/components/pages/umrah-personal/landing/1-Landing/Landing'
import LearnMoreSection from '@/components/pages/umrah-personal/landing/2-LearnMore'
import UmrohPersonalStartSection from '@/components/pages/umrah-personal/landing/3-UmrahPersonalStart/BannerStart'
import ScrollContainerWrapper from '@/components/pages/umrah-personal/landing/layout'
import TopbarMobileLandingUmrahPersonal from '@/components/pages/umrah-personal/landing/mobile/Topbar'
import { NODE_ENV, URL } from '@/constant/env'
import EventTrackerImpression from '@/contexts/event-tracker/components/EventTrackerImpression'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'

export async function generateMetadata() {
  return {
    ...metadata('Muslim 101 | Umrah Personal', 'Muslim 101 Umrah Personal'),
  }
}

export default async function UmrahPersonalLanding() {
  // --- JSON-LD for WebSite ---
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Muslim101 - Umrah Personal',
    url: `${URL}/umrah-personal`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Muslim101',
      url: URL,
    },
  }

  // --- JSON-LD for Breadcrumb ---
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'WebPage',
        item: `${URL}/umrah-personal`,
      },
    ],
  }
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string
  return (
    <ScrollContainerWrapper token={token}>
      {/* JSON-LD Scripts */}
      {NODE_ENV === 'production' && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbJsonLd),
            }}
          />
        </>
      )}
      {/* End JSON-LD Scripts */}
      <TopbarMobileLandingUmrahPersonal />
      <UmrohLandingSection token={token} />
      <LearnMoreSection />
      <UmrohPersonalStartSection />

      <EventTrackerImpression
        id="umrah_personal_landing"
        nameDidMount="impression_umrah_personal_landing"
        nameDidUnmount="exit_umrah_personal_landing"
        topic="umrah"
        category="umrah-personal"
      />
    </ScrollContainerWrapper>
  )
}
