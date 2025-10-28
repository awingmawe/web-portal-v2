import { metadata } from '@/app/shared-metadata'
import Breadcrumb from '@/components/pages/faq/Breadcumb'
import Content from '@/components/pages/faq/Content'
import Footer from '@/components/shared/Footer'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'
import { Fragment } from 'react'

export async function generateMetadata() {
  return {
    ...metadata('Muslim101 | FAQ', `Muslim101 FAQ`),
  }
}

export default async function Faq() {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  return (
    <Fragment>
      <Topbar shadow scrolled token={token} />
      <MobileTopbar variant="plain" showBackButton />
      <Breadcrumb />
      <Content />
      <Footer />
    </Fragment>
  )
}
