'use client'
import DealIcon from '@/components/icons/deal'
import MoneySavingIcon from '@/components/icons/money-saving'
import MoonIcon from '@/components/icons/moon'
import { SavingIcon } from '@/components/icons/saving'
import { UmrahPersonalIcon } from '@/components/icons/umrah-personal'
import WukalaIcon from '@/components/icons/wukala'
import { useEventTracker } from '@/contexts/event-tracker/context'
import Link from 'next/link'

const SubmenuCards = () => {
  const { pushEvent } = useEventTracker()
  const menuItems = [
    {
      icon: <UmrahPersonalIcon size={25} />,
      label: 'Umrah Personal',
      href: '/umrah-personal/landing',
      background: 'bg-primary-500',
      eventName: null,
    },
    {
      icon: <SavingIcon size={25} color="white" />,
      label: 'Pembiayaan Umroh',
      href: '/banking/credit',
      background: 'bg-[#03DAC8]',
      eventName: 'click_program_banking_credit_umrah',
    },
    {
      icon: <WukalaIcon width={25} height={25} />,
      label: 'Program Wukala',
      href: '/wukala',
      background: 'bg-[#00B97D]',
      eventName: null,
    },
    {
      icon: <MoneySavingIcon size={25} color="white" />,
      label: 'Tabungan Umroh',
      href: '/banking/saving',
      background: 'bg-[#EC9200]',
      eventName: null,
    },
    {
      icon: <DealIcon size={25} color="white" />,
      label: 'Daftar Travel',
      href: '/travel/list',
      background: 'bg-[#0AF]',
      eventName: null,
    },
    {
      icon: <MoonIcon size={25} />,
      label: 'Artikel',
      href: '/article',
      background: 'bg-primary-500',
      eventName: null,
    },
  ]

  const handleMenuClick = (item: (typeof menuItems)[number]) => {
    if (item.eventName) {
      pushEvent({
        name: item.eventName,
        category: 'home',
        topic: 'banking',
        data: {
          label: item.label,
          href: item.href,
        },
      })
    }
  }

  return (
    <div
      className="scrollbar-hide mt-[30px] hidden justify-between gap-2 overflow-hidden overflow-x-auto rounded-xl border-[0.5px] border-[#e1e1e1] px-3 py-2.5 backdrop-blur-[6px] max-lg:mx-4 max-lg:flex"
      style={{
        background:
          'linear-gradient(94deg, rgba(255, 255, 255, 0.30) 0.15%, rgba(255, 192, 18, 0.30) 47.01%, rgba(255, 255, 255, 0.30) 99.85%)',
      }}
    >
      {menuItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          onClick={() => handleMenuClick(item)}
          className="flex min-h-[90px] w-[70px] flex-col items-center gap-2.5 text-center"
        >
          <div
            className={`${item.background} flex h-[46px] w-[46px] items-center justify-center rounded-full`}
          >
            {item.icon}
          </div>
          <p className="flex h-7 items-center justify-center text-[10px] leading-tight wrap-break-word text-neutral-900">
            {item.label}
          </p>
        </Link>
      ))}
    </div>
  )
}

export default SubmenuCards
