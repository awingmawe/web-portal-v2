'use client'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import { useRouter } from 'next/navigation'

export default function TopbarMobileArticle({
  href,
  applyRouter,
}: {
  href: string
  applyRouter?: boolean
}) {
  const router = useRouter()
  return (
    <MobileTopbar
      variant="logo"
      showBackButton={true}
      onBackClick={() => {
        if (href == 'back') {
          router.back()
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
