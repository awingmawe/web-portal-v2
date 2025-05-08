import LayoutMobileProfile from '@/components/pages/my/LayoutMobileProfile'
import { SidebarMobileProfile } from '@/components/pages/my/SidebarMobileProfile'
import BottomNavigation from '@/components/shared/mobile/BottomNavigation'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'

export default function MyPage() {
  return (
    <LayoutMobileProfile>
      <MobileTopbar
        variant="profileTopbar"
        title="Akun"
        showBackButton={false}
      />
      <SidebarMobileProfile />

      <BottomNavigation />
    </LayoutMobileProfile>
  )
}
