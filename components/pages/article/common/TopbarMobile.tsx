'use client'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import { useCustomNavigation } from '@/hooks/common/useCustomNavigation'
import { useRouter } from 'next/navigation'

export default function TopbarMobileArticle({
  href,
  applyRouter,
}: {
  href: string
  applyRouter?: boolean
}) {
  const router = useRouter()
  const { goBack } = useCustomNavigation()

  return (
    <MobileTopbar
      variant="logo"
      showBackButton={true}
      onBackClick={() => {
        if (href == 'back') {
          goBack()
          return
        }

        if (applyRouter) {
          router.push(href)
        } else {
          window.location.href = href
        }
      }}
    />
  )
}
