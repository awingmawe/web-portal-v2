'use client'

import { HeartIcon, HeartIconFilled } from '@/components/icons/heart'
import { HomeIcon, HomeIconFilled } from '@/components/icons/home'
import { ReceiptIcon, ReceiptIconFilled } from '@/components/icons/receipt'
import { IconUserFilled, UserIconCircle } from '@/components/icons/user'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNavigation() {
  const pathname = usePathname()

  // Define our navigation items with their paths and icons
  const navItems = [
    { name: 'Beranda', icon: HomeIcon, activeIcon: HomeIconFilled, path: '/' },
    {
      name: 'Wishlist',
      icon: HeartIcon,
      activeIcon: HeartIconFilled,
      path: '/my/wishlist',
    },
    {
      name: 'Transaksi',
      icon: ReceiptIcon,
      activeIcon: ReceiptIconFilled,
      path: '/my/transaction',
    },
    {
      name: 'Akun',
      icon: UserIconCircle,
      activeIcon: IconUserFilled,
      path: `/my`,
    },
  ]

  return (
    <div className="fixed bottom-0 left-1/2 z-100 flex w-[90%] -translate-x-1/2 items-center justify-center px-4 pb-4">
      <div className="border-opacity-50 hidden h-16 w-full max-w-[375px]  min-w-[300px] rounded-[40px] border-[0.5px] border-white bg-gradient-to-b from-[rgba(49,37,0,0.4)] to-[rgba(174,174,174,0.4)] px-4 py-2 backdrop-blur-lg max-lg:block">
        <nav className="flex items-center justify-between">
          {navItems.map((item) => {
            // Check if current pathname matches this nav item's path
            const isActive = pathname === item.path

            return (
              <Link
                href={item.path}
                key={`link-item-${item.name}`}
                className="flex flex-col items-center"
              >
                <div
                  className={`flex ${isActive ? 'bg-primary-500 h-8 w-8 rounded-full' : ''} items-center justify-center text-white`}
                >
                  {isActive ? (
                    <item.activeIcon size={16} />
                  ) : (
                    <item.icon size={isActive ? 16 : 24} />
                  )}
                </div>
                <span
                  className={`text-s-regular mt-[2px] ${isActive ? 'text-neutral-900' : 'text-neutral-0'}`}
                >
                  {item.name}
                </span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
