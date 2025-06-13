import { metadata } from '@/app/shared-metadata'
import MyProfilePage from '@/components/pages/my/4-Profile/page'
import LayoutMy from '@/components/pages/my/Layout'
import LayoutMobileProfile from '@/components/pages/my/LayoutMobileProfile'
import { isMobileUserAgent } from '@/lib/utils'
import { headers } from 'next/headers'
export async function generateMetadata() {
  return {
    ...metadata('Muslim 101 | Profile', `Profile`),
  }
}
function LayoutProfile({
  children,
  lg,
}: {
  children: React.ReactNode
  lg: boolean
}) {
  return lg ? (
    <LayoutMobileProfile>
      <div className=" w-full">{children}</div>
    </LayoutMobileProfile>
  ) : (
    <LayoutMy>{children}</LayoutMy>
  )
}

export default async function MyProfile() {
  const ua = (await headers()).get('user-agent') || ''
  const isMobile = isMobileUserAgent(ua)

  return (
    <LayoutProfile lg={isMobile}>
      <MyProfilePage />
    </LayoutProfile>
  )
}
