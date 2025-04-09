import { ChevronRightIcon } from '@/components/icons/chevron'
import { HeartIcon } from '@/components/icons/heart'
import { LogoutIcon } from '@/components/icons/logout'
import { MoneyTimeIcon } from '@/components/icons/money-time'
import { MoneysIcon } from '@/components/icons/moneys'
import { PilotSeatIcon } from '@/components/icons/pilot-seat'
import { PointIcon } from '@/components/icons/point'
import { ReceiptIcon } from '@/components/icons/receipt'
import { SettingIcon } from '@/components/icons/setting'
import { VoucherIcon } from '@/components/icons/voucher'
import { Referral } from '@/components/shared/Referral'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface MenuItemProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  hasChevron?: boolean
}

const MenuItem = ({
  icon,
  label,
  isActive = false,
  hasChevron = false,
  href,
}: MenuItemProps & { href?: string }) => (
  <a
    href={href}
    className={cn(
      'flex cursor-pointer items-center px-5 py-4 transition-colors hover:bg-gray-50',
      isActive && 'bg-primary-100'
    )}
  >
    <div className="flex flex-1 items-center">
      <div className="mr-3">{icon}</div>
      <span className={cn(isActive ? 'text-m-medium' : 'text-m-regular')}>
        {label}
      </span>
    </div>
    {hasChevron && <ChevronRightIcon size={28} />}
  </a>
)

export const Sidebar = () => {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-3xl border border-neutral-100 bg-white shadow-sm">
        {/* Profile Section */}
        <div className="flex items-center gap-4 p-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 shadow-md">
            <span className="text-2xl font-medium text-gray-500">JD</span>
          </div>
          <div>
            <h2 className="text-l-semibold">John Doe</h2>
            <p className="text-m-regular text-neutral-500">
              Google/[email pengguna]
            </p>
          </div>
        </div>

        {/* Points Section */}
        <Separator className="mx-auto !w-[90%] bg-neutral-100" />
        <MenuItem
          icon={<PointIcon />}
          label="Poin Muslim101 : 10.000"
          hasChevron={true}
        />
        <Separator className="mx-auto !w-[90%] bg-neutral-100" />

        {/* Menu Items */}
        <MenuItem icon={<VoucherIcon />} label="Voucher" />
        <MenuItem icon={<MoneyTimeIcon />} label="Butuh Dibayar" />
        <MenuItem
          icon={<ReceiptIcon size={24} />}
          label="Transaksi"
          isActive={true}
        />
        <MenuItem icon={<MoneysIcon />} label="Pembiayaan" />
        <Separator className="mx-auto !w-[90%] bg-neutral-100" />

        <MenuItem icon={<PilotSeatIcon />} label="Permintaan Paket Custom" />
        <MenuItem icon={<PilotSeatIcon />} label="Cek Ketersediaan Kursi" />
        <MenuItem icon={<HeartIcon />} label="Wishlist" />
        <Separator className="mx-auto !w-[90%] bg-neutral-100" />

        <MenuItem icon={<SettingIcon />} label="Pengaturan Akun" />
        <MenuItem icon={<LogoutIcon size={24} />} label="Log Out" />
      </div>
      {/* Referral Section */}
      <Referral referral="HB70KLM" />
    </div>
  )
}
