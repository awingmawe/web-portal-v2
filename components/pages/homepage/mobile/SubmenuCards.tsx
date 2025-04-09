'use client'
import { BusIcon } from '@/components/icons/bus'
import { MoonIcon } from '@/components/icons/moon'
import { SavingIcon } from '@/components/icons/saving'
import WukalaIcon from '@/components/icons/wukala'
import Link from 'next/link'

const SubmenuCards = () => {
  const menuItems = [
    {
      icon: <WukalaIcon width={20} height={20} />,
      label: 'Program Wukala',
      href: '/wukala',
      background: 'bg-primary-500',
    },
    // {
    //   icon: <MoneySavingIcon size={20} color="white" />,
    //   label: 'Tabungan Umroh',
    //   href: '/tabungan-umroh',
    //   background: 'bg-[#EC9200]',
    // },
    {
      icon: <BusIcon size={20} color="white" />,
      label: 'Daftar Travel',
      href: '/travel/list',
      background: 'bg-[#0AF]',
    },
    {
      icon: <SavingIcon size={20} color="white" />,
      label: 'Pembiayaan',
      href: '/pembiayaan',
      background: 'bg-[#03DAC8]',
    },
    {
      icon: <MoonIcon size={20} />,
      label: 'Artikel',
      href: '/articles',
      background: 'bg-[#00B97D]',
    },
  ]

  return (
    <div
      className="mt-[30px] hidden justify-between gap-2 rounded-xl border-[0.5px] border-[#e1e1e1] px-3 py-[10px] backdrop-blur-[6px] max-lg:flex"
      style={{
        background:
          'linear-gradient(94deg, rgba(255, 255, 255, 0.30) 0.15%, rgba(255, 192, 18, 0.30) 47.01%, rgba(255, 255, 255, 0.30) 99.85%)',
      }}
    >
      {menuItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="flex min-h-[90px] w-[70px] flex-col items-center gap-[10px] text-center"
        >
          <div
            className={`${item.background} flex h-[36px] w-[36px] items-center justify-center rounded-full`}
          >
            {item.icon}
          </div>
          <p className="flex h-[28px] items-center justify-center text-[10px] leading-tight break-words text-neutral-900">
            {item.label}
          </p>
        </Link>
      ))}
    </div>
  )
}

export default SubmenuCards
