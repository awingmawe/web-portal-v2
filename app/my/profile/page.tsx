import MyProfilePage from '@/components/pages/my/4-Profile/page'
import LayoutMobileProfile from '@/components/pages/my/LayoutMobileProfile'

export default function MyPage() {
  return (
    <LayoutMobileProfile>
      <div className=" w-full">
        <MyProfilePage />
      </div>
    </LayoutMobileProfile>
  )
}
