'use client'
import { ChevronRightIcon } from '@/components/icons/chevron'
import { LogoutIcon } from '@/components/icons/logout'
import { MessageQuestionIcon } from '@/components/icons/message-question'
import { MoneysIcon } from '@/components/icons/moneys'
import { SettingIcon } from '@/components/icons/setting'
import { DialogConfirm } from '@/components/shared/DialogConfirm'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/contexts/auth/context'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'

interface MenuItemProps {
  icon: React.ReactNode
  label: string | React.ReactNode
  isActive?: boolean
  hasChevron?: boolean
  loading?: boolean
  href?: string
  onClick?: () => void
}

const MenuItem = ({
  icon,
  label,
  isActive = false,
  hasChevron = false,
  loading = false,
  href = '#',
  onClick,
}: MenuItemProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={cn(
      'flex cursor-pointer items-center px-5 py-4 transition-colors hover:bg-gray-50',
      isActive && 'bg-primary-100'
    )}
  >
    {loading ? (
      <Fragment>
        <div className="flex flex-1 items-center">
          <div className="mr-3 h-5 w-5 animate-pulse rounded-full bg-neutral-200"></div>
          <div className="h-5 w-full animate-pulse rounded bg-neutral-200"></div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className="flex flex-1 items-center">
          <div className="mr-3">{icon}</div>
          <span className={cn(isActive ? 'text-m-medium' : 'text-m-regular')}>
            {label}
          </span>
        </div>
        {hasChevron && <ChevronRightIcon size={28} />}
      </Fragment>
    )}
  </Link>
)

export const SidebarMobileProfile = () => {
  const { profile, logout } = useAuth()
  const [loadingLogout, setLoadingLogout] = useState(false)
  const router = useRouter()
  const { lg } = useTailwindBreakpoint()

  useEffect(() => {
    if (!lg) {
      router.replace('/my/profile')
    }
  }, [lg, router])

  return (
    <div className="w-full max-w-sm">
      <div className="absolute -top-10 left-1/2 w-full translate-x-[-50%] px-5">
        <div className="rounded-3xl border border-neutral-100 bg-white shadow-sm ">
          {/* Profile Section */}
          <div className="flex items-center gap-4 p-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 shadow-md">
              {profile ? (
                <Avatar className="h-16 w-16">
                  <AvatarImage src={profile.avatarProvider} alt="User avatar" />
                  <AvatarFallback className="fw-semibold text-neutral-600">
                    {String(profile.name).slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-16 w-16 animate-pulse rounded-full bg-neutral-200"></div>
              )}
            </div>
            <div className="w-full">
              {profile ? (
                <Fragment>
                  <h2 className="text-l-semibold">{profile.name}</h2>
                  <p className="text-m-regular text-neutral-500">
                    {profile.email}
                  </p>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-200"></div>
                  <div className="mt-1 h-4 w-1/2 animate-pulse rounded bg-neutral-200"></div>
                </Fragment>
              )}
            </div>
          </div>

          {/* Menu Items */}
          {/* <MenuItem
            icon={<VoucherIcon />}
            label="Voucher"
            loading={profile ? false : true}
          /> */}
        </div>
        <MenuItem
          icon={<MoneysIcon />}
          label="Pendanaan Syariah"
          loading={profile ? false : true}
          href="/banking?page=pembiayaan"
        />
        <MenuItem
          icon={<MoneysIcon />}
          label="Tabungan"
          loading={profile ? false : true}
          href="/banking?page=credit"
        />
        {/* <Separator className="mx-auto !w-[90%] bg-neutral-100" /> */}
        {/* 
          <MenuItem
            icon={<PilotSeatIcon />}
            label="Permintaan Paket Custom"
            loading={profile ? false : true}
          />
          <MenuItem
            icon={<PilotSeatIcon />}
            label="Cek Ketersediaan Kursi"
            loading={profile ? false : true}
          /> */}
        {/* <Separator className="mx-auto !w-[90%] bg-neutral-100" /> */}

        <MenuItem
          icon={<SettingIcon />}
          label="Pengaturan Akun"
          href="/my/profile"
          isActive={false}
          loading={profile ? false : true}
        />
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
            logout(true, `${window.location.origin}/`)
          }}
          isLoading={loadingLogout}
        >
          <MenuItem
            icon={<LogoutIcon size={24} />}
            label="Log Out"
            loading={profile ? false : true}
          />
        </DialogConfirm>
      </div>
    </div>
  )
}
