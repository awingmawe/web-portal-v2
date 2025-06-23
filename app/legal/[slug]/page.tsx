import { metadata } from '@/app/shared-metadata'
import ContentLegal from '@/components/pages/legal/content'
import SidebarLegal from '@/components/pages/legal/sidebar'
import Footer from '@/components/shared/Footer'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { getLegalList } from '@/services/general-service'
import { cookies } from 'next/headers'

export async function generateMetadata({ params }: { params: any }) {
  const awaitedParams = await params
  const slugText = awaitedParams.slug
    .replace(/(^|\s)\S/g, (letter: string) => letter.toUpperCase())
    .replace(/-/g, ' ')
  return {
    ...metadata(`Muslim101 | ${slugText}`, `Muslim101 | ${slugText}`),
  }
}

export default async function TermsPage({ params }: { params: any }) {
  const awaitedParams = await params
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  const list = await getLegalList({
    page: 1,
    size: 20,
    order: 'asc',
    orderBy: 'createdAt',
  })

  const currentLegal = list.results.find(
    (item) => item.slug === awaitedParams.slug
  )
  return (
    <div>
      <Topbar shadow scrolled token={token} />
      <MobileTopbar showBackButton variant="plain" />

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        <div className="flex flex-col gap-12 md:flex-row">
          {/* Main Content */}
          <ContentLegal data={currentLegal} />

          {/* Sidebar */}
          <SidebarLegal
            activeSlug={awaitedParams.slug}
            listLegal={list.results}
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}
