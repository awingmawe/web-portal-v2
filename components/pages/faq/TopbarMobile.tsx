'use client'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import { useCustomNavigation } from '@/hooks/common/useCustomNavigation'
import { useRouter } from 'next/navigation'

export default function TopbarMobileFaq({
  href,
  applyRouter,
  isWebview,
  title = 'FAQ',
}: {
  href: string
  applyRouter?: boolean
  isWebview?: boolean
  title?: string
}) {
  const router = useRouter()
  const { goBack } = useCustomNavigation()

  return (
    <MobileTopbar
      variant="plain"
      title={title}
      showBackButton={true}
      onBackClick={() => {
        if (href == 'back') {
          goBack(isWebview ? '/web-view-access' : '/')
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
