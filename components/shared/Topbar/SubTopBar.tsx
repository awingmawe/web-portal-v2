'use client'

import DownloadApps from '@/components/shared/Topbar/SubTopBar/DownloadApps'
import MitraModal from '@/components/shared/Topbar/SubTopBar/MitraModal'
import Link from 'next/link'
import React, { Fragment } from 'react'

interface TopbarProps {
  className?: string
  token?: string
  shadow?: boolean
  scrolled?: boolean
  type?: 'normal' | 'homepage' | 'plain'
  qrApp?: string
  navLinks?: Array<{ title: string; href: string }>
}

const SubTopBar: React.FC<TopbarProps> = ({
  navLinks = [
    // { title: 'Jadi Mitra', href: '#' },
    { title: 'Tentang Kami', href: '/about-us' },
  ],
  qrApp,
}) => {
  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <DownloadApps qrApp={qrApp as string} />
        <nav className="flex gap-[20px]">
          <MitraModal title="Jadi Mitra" />

          {navLinks.map((link) => (
            <Link key={link.href} className="text-s-regular" href={link.href}>
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </Fragment>
  )
}

export default SubTopBar
