'use client'

import { ChevronIcon } from '@/components/icons/chevron'
import { LogoutIcon } from '@/components/icons/logout'
import { MessageQuestionIcon } from '@/components/icons/message-question'
import { Muslim101Logo } from '@/components/icons/muslim101'
import { ReceiptItemIcon } from '@/components/icons/receipt-item'
import { DialogConfirm } from '@/components/shared/DialogConfirm'
import SubTopBar from '@/components/shared/Topbar/SubTopBar'
import TopbarNotif from '@/components/shared/Topbar/TopbarNotification'
import TopbarSearch from '@/components/shared/Topbar/TopbarSearch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ACCOUNT_URL } from '@/constant/env'
import { useAuth } from '@/contexts/auth/context'
import { dissolve, springTransition } from '@/lib/animation-setup'
import { cn, ellipsis, isEmpty } from '@/lib/utils'
import { AnimatePresence, easeInOut, easeOut, motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface TopbarProps {
  className?: string
  token?: string
  shadow?: boolean
  scrolled?: boolean
  type?: 'normal' | 'homepage' | 'plain'
}

interface NavLinkProps {
  href: string
  title: string
  pathname: string
  hoveredLink: string | null
  onMouseEnter: (href: string) => void
  onMouseLeave: () => void
}

interface TopbarContentProps {
  navLinks: Array<{
    title: string
    href: string
    subMenu?: Array<{
      title: string
      href: string
    }>
  }>
  type: string
  token?: string
  redirectUri: string | null
  profile: any
  logout: () => void
  loadingLogout: boolean
  setLoadingLogout: (loading: boolean) => void
  pathname: string
  hoveredLink: string | null
  onMouseEnter: (href: string) => void
  onMouseLeave: () => void
}

// Animation variants defined outside component to prevent recreation on each render
const dotVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
}

// Fixed topbar animation variants
const fixedTopbarVariants = {
  hidden: {
    y: -100,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: easeInOut,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: easeInOut,
    },
  },
}

// NavLink component moved outside and memoized
const NavLink = React.memo<NavLinkProps>(
  ({ href, title, pathname, hoveredLink, onMouseEnter, onMouseLeave }) => {
    const isActive = pathname === href
    const isHovered = hoveredLink === href

    // Only show the dot indicator if:
    // 1. The link is active but not being hovered (persistent dot)
    // 2. The link is being hovered but not active (hover dot)
    const showDot = isActive || isHovered

    return (
      <div className="flex flex-col items-center gap-1">
        <Link
          href={href}
          onMouseEnter={() => onMouseEnter(href)}
          onMouseLeave={onMouseLeave}
          className={`relative text-nowrap ${
            isActive
              ? 'text-m-medium text-neutral-900'
              : 'text-m-regular text-neutral-600'
          }`}
        >
          {title}

          {/* We only animate entrance/exit, not transitions between active and hover states */}
          <AnimatePresence>
            {isActive && (
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                key={`dot-${href}-active`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="4"
                  height="4"
                  viewBox="0 0 4 4"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="2" cy="2" r="2" fill="#ffc14b" />
                </svg>
              </div>
            )}
            {showDot && (
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                variants={dotVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                key={`dot-${href}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="4"
                  height="4"
                  viewBox="0 0 4 4"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="2" cy="2" r="2" fill="#ffc14b" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>
    )
  }
)

NavLink.displayName = 'NavLink'

// TopbarContent component moved outside and properly memoized
const TopbarContent = React.memo<TopbarContentProps>(
  ({
    navLinks,
    type,
    token,
    redirectUri,
    profile,
    logout,
    loadingLogout,
    setLoadingLogout,
    pathname,
    hoveredLink,
    onMouseEnter,
    onMouseLeave,
  }) => {
    return (
      <Fragment>
        {/* Logo */}
        <Link href="/">
          <Muslim101Logo />
        </Link>

        {type === 'plain' ? (
          ''
        ) : (
          <Fragment>
            {/* Navigation Links */}
            <nav className="flex h-[18px] shrink grow basis-0 items-center gap-[60px]">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  title={link.title}
                  pathname={pathname}
                  hoveredLink={hoveredLink}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                />
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <TopbarSearch />

              {token && (
                <Fragment>
                  <div className="h-5 border border-[#c9c9c9]"></div>
                  <TopbarNotif token={token} />
                </Fragment>
              )}

              {/* Login and Profile */}
              {isEmpty(token) ? (
                <Fragment>
                  {/* Register */}
                  <Link
                    href={`${ACCOUNT_URL}/auth/sign-up?redirectUri=${encodeURIComponent(redirectUri as string)}`}
                    className="text-m-regular text-neutral-900"
                  >
                    Daftar
                  </Link>

                  {/* Divider */}
                  <div className="h-5 border border-[#c9c9c9]" />

                  {/* Login */}
                  <Link
                    href={`${ACCOUNT_URL}/auth/login?redirectUri=${encodeURIComponent(redirectUri as string)}`}
                    className="text-m-regular text-neutral-900"
                  >
                    Masuk
                  </Link>

                  {/* Partner Button */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="bg-primary-500 flex cursor-pointer items-center gap-1 rounded-[100px] py-2 pr-3 pl-3.5 transition-colors duration-200 focus-within:outline-0">
                        <span className="text-m-regular text-nowrap text-neutral-900">
                          Untuk Mitra/Wukala
                        </span>
                        <ChevronIcon size={16} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" sideOffset={8}>
                      <Link
                        href="/wukala"
                        className={`text-m-regular flex w-full cursor-pointer px-3 py-2.5 hover:bg-neutral-100 ${dissolve}`}
                      >
                        Untuk Wukala
                      </Link>
                      <div className="mx-1 h-px bg-neutral-100" />
                      <Link
                        href="/travel"
                        className={`text-m-regular flex w-full cursor-pointer px-3 py-2.5 hover:bg-neutral-100 ${dissolve}`}
                      >
                        Untuk Mitra Travel
                      </Link>
                    </PopoverContent>
                  </Popover>
                </Fragment>
              ) : (
                <Fragment>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="flex items-center gap-2">
                        {profile ? (
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={profile?.avatarProvider}
                              alt="User avatar"
                            />
                            <AvatarFallback className="fw-semibold text-neutral-600">
                              {profile?.name?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-200"></div>
                        )}
                        {profile ? (
                          <p className="text-m-regular cursor-pointer">
                            {profile?.name?.split(' ')[0]}
                          </p>
                        ) : (
                          <div className="h-3 w-20 animate-pulse rounded bg-neutral-200"></div>
                        )}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[300px] rounded-3xl border-none p-0"
                      align="center"
                    >
                      <div className="flex flex-col">
                        {/* Profile Section */}
                        <Link href={`/my/profile`}>
                          <div className="flex items-center gap-4 px-6 pt-4 pb-3 hover:bg-neutral-50">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={profile?.avatarProvider}
                                alt="User avatar"
                              />
                              <AvatarFallback className="font-bold text-neutral-600">
                                {profile?.name?.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <p className="text-m-regular cursor-pointer">
                              {ellipsis(profile?.name || '', 40)}
                            </p>
                            <div className="flex-1 text-2xl font-normal"></div>
                            <ChevronRight className="h-6 w-6" />
                          </div>
                        </Link>

                        {/* Divider */}
                        <div className="mx-6 h-px bg-gray-200" />

                        {/* Menu Items */}
                        <Link
                          href="/my/transaction"
                          className="text-m-regular mx-0 flex w-full items-center justify-start px-6 py-3 font-normal hover:bg-neutral-50"
                        >
                          <ReceiptItemIcon className="mr-4 h-5 w-5 stroke-[.5] text-gray-800" />
                          <span>Transaksi</span>
                        </Link>
                        <DialogConfirm
                          title="Apakah kamu yakin ingin keluar?"
                          icon={
                            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-amber-100 p-4">
                              <MessageQuestionIcon size={36} />
                            </div>
                          }
                          content="Kamu harus masuk ke akun jika ingin menggunakan kembali akun kamu."
                          confirmText="Ya, Keluar"
                          cancelText="Batal"
                          confirmVariant="default"
                          cancelVariant="ghost"
                          onSubmit={() => {
                            setLoadingLogout(true)
                            logout()
                          }}
                          isLoading={loadingLogout}
                        >
                          <p className="text-m-regular text-error-500 mx-0 flex w-full cursor-pointer items-center justify-start px-6 pt-3 pb-6 font-normal hover:bg-neutral-50">
                            <LogoutIcon className="text-error-500 mr-4 h-5 w-5 stroke-[.5]" />
                            <span className="text-error-500">Keluar</span>
                          </p>
                        </DialogConfirm>
                      </div>
                    </PopoverContent>
                  </Popover>
                </Fragment>
              )}
            </div>
          </Fragment>
        )}
      </Fragment>
    )
  }
)

TopbarContent.displayName = 'TopbarContent'

const Topbar: React.FC<TopbarProps> = ({
  className = '',
  token,
  type = 'normal',
  shadow = false,
  scrolled = false,
}) => {
  const pathname = usePathname()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [showFixedHeader, setShowFixedHeader] = useState(false)
  const [redirectUri, setRedirectUri] = useState<string | null>(null)
  const { profile, logout } = useAuth()
  const [loadingLogout, setLoadingLogout] = useState(false)

  // Memoize navigation links to prevent recreating on each render
  const navLinks = useMemo(
    () => [
      {
        title: 'Produk',
        href: '#produk',
        subMenu: [
          {
            title: 'Umroh',
            href: '',
          },
          {
            title: 'Umroh Personal',
            href: '',
          },
          {
            title: 'Haji',
            href: '',
          },
        ],
      },
      {
        title: 'Program',
        href: '#program',
        subMenu: [
          {
            title: 'Pembiayaan Umroh',
            href: '',
          },
          {
            title: 'Pembiayaan Haji',
            href: '',
          },
          {
            title: 'Tabungan Umroh',
            href: '',
          },
        ],
      },
      { title: 'Mitra', href: '/travel/list' },
      { title: 'About Us', href: '/about-us' },
    ],
    []
  )

  // Use callback for scroll handler to prevent recreating on each render
  const updateFixedHeader = useCallback(() => {
    setShowFixedHeader(window.scrollY > 100)
  }, [])

  // Setup scroll listener
  useEffect(() => {
    window.addEventListener('scroll', updateFixedHeader)
    // Initial check
    updateFixedHeader()
    setRedirectUri(window.location.href)

    return () => {
      window.removeEventListener('scroll', updateFixedHeader)
    }
  }, [updateFixedHeader])

  // Memoized handler for hover events
  const handleMouseEnter = useCallback((href: string) => {
    setHoveredLink(href)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredLink(null)
  }, [])

  // Memoize the topbar content props to prevent unnecessary re-renders
  const topbarContentProps = useMemo(
    () => ({
      navLinks,
      type,
      token,
      redirectUri,
      profile,
      logout,
      loadingLogout,
      setLoadingLogout,
      pathname,
      hoveredLink,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    }),
    [
      navLinks,
      type,
      token,
      redirectUri,
      profile,
      logout,
      loadingLogout,
      pathname,
      hoveredLink,
      handleMouseEnter,
      handleMouseLeave,
    ]
  )

  return (
    <Fragment>
      {type === 'homepage' && (
        <>
          {/* Main header (non-fixed) */}
          <motion.header
            initial={{ y: -100 }}
            animate={{ y: 50 }}
            transition={springTransition}
            className={cn(
              'absolute left-1/2 z-10 flex h-[72px] w-[90%] -translate-x-1/2 items-center gap-[60px] rounded-[100px] bg-white py-7 pr-3 pl-6 backdrop-blur-[100px] max-lg:hidden',
              className
            )}
          >
            <TopbarContent {...topbarContentProps} />
          </motion.header>

          {/* Fixed header that appears on scroll */}
          <AnimatePresence>
            {showFixedHeader && (
              <motion.header
                variants={fixedTopbarVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={cn(
                  'fixed top-0 left-1/2 z-50 h-[100px] w-screen -translate-x-1/2 bg-white pb-7 shadow-[0px_6px_24px_0px_rgba(0,0,0,0.15)] max-lg:hidden',
                  className
                )}
              >
                <section className="flex h-[28px] w-full items-center gap-[60px] bg-(--neutral-100)">
                  <div className="container m-auto w-full items-center px-4">
                    <SubTopBar />
                  </div>
                </section>
                <section className="container m-auto flex h-full w-full items-center gap-[60px] px-4">
                  <TopbarContent {...topbarContentProps} />
                </section>
              </motion.header>
            )}
          </AnimatePresence>
        </>
      )}
      {(type === 'normal' || type === 'plain') && (
        <header
          className={cn(
            `h-[100px] w-full bg-white pb-7 max-lg:hidden ${shadow ? 'shadow-lg' : 'border-b-1 border-neutral-300'} ${scrolled ? 'fixed top-0 z-50' : ''} `,
            className
          )}
        >
          <section className="flex h-[28px] w-full items-center gap-[60px]  bg-[#FAFAFA]">
            <div className="container m-auto w-full items-center px-4 ">
              <SubTopBar />
            </div>
          </section>
          <section className="container m-auto flex h-full w-full items-center gap-[60px] px-4">
            <TopbarContent {...topbarContentProps} />
          </section>
        </header>
      )}
      {/* add space divider for top if scrolled is active */}
      {scrolled && <div className="h-[72px] w-full px-4 max-lg:hidden"></div>}
    </Fragment>
  )
}

export default Topbar
