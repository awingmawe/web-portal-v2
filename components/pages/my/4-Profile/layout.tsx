import LayoutMy from '@/components/pages/my/Layout'
import LayoutMobileProfile from '@/components/pages/my/LayoutMobileProfile'
import { ReactNode } from 'react'

export default function LayoutProfile({
  children,
  lg,
}: {
  children: ReactNode
  lg: boolean
}) {
  return lg ? (
    <LayoutMobileProfile>{children}</LayoutMobileProfile>
  ) : (
    <LayoutMy>{children}</LayoutMy>
  )
}
