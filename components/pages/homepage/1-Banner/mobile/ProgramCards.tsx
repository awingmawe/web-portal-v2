'use client'

import HajjIcon from '@/components/icons/hajj-icon'
import HalalTripIcon from '@/components/icons/halaltrip-icon'
import UmraIcon from '@/components/icons/umra-icon'
import React from 'react'

// Define the data structure for each card
interface ProgramCardProps {
  title: string
  icon: React.ReactNode
  link: string
  comingSoon?: boolean
  background: string
  onClick?: () => void
}

// Individual card component
const ProgramCard: React.FC<ProgramCardProps> = ({
  title,
  icon,
  link,
  comingSoon = false,
  background,
  onClick,
}) => {
  return (
    <div className="relative">
      {comingSoon && (
        <p className="bg-error-500 absolute -top-5 left-1/2 z-10 w-[88px] -translate-x-1/2 justify-center rounded-tl-lg rounded-tr-lg px-1 py-[2px] text-xs text-white shadow-[inset_0px_-3px_4px_0px_rgba(0,0,0,0.25)]">
          Segera Hadir!
        </p>
      )}
      <a
        href={link}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault()
            onClick()
          }
        }}
        className={`relative z-12 inline-flex h-[57px] w-full items-start justify-start gap-2.5 self-stretch overflow-hidden rounded-lg p-2 outline-[0.50px] outline-offset-[-0.50px] outline-white backdrop-blur-[6px]`}
        style={{
          background: background,
        }}
      >
        <div className="text-s-medium justify-start text-center leading-none text-white">
          {title}
        </div>
        <div className="absolute right-0 bottom-0">{icon}</div>
      </a>
    </div>
  )
}

// Main component that displays all the program cards
const ProgramCards: React.FC = () => {
  const programsData = [
    {
      id: 'umroh',
      title: 'Umroh',
      link: '/umroh',
      comingSoon: false,
      background:
        'linear-gradient(0deg, rgba(254, 189, 0, 0.20) 0%, rgba(95, 71, 0, 0.20) 100%)',
      icon: <UmraIcon />,
    },
    {
      id: 'haji',
      title: 'Haji',
      link: '/haji',
      comingSoon: true,
      background:
        'linear-gradient(0deg, rgba(0, 119, 205, 0.20) 0%, rgba(0, 23, 40, 0.20) 100%)',
      icon: <HajjIcon />,
    },
    {
      id: 'halal-trip',
      title: 'Halal Trip',
      link: '/halal-trip',
      comingSoon: true,
      background:
        'linear-gradient(0deg, rgba(0, 255, 174, 0.25) 0%, rgba(0, 41, 28, 0.25) 100%)',
      icon: <HalalTripIcon />,
    },
  ]

  return (
    <div className="absolute -top-19 left-0 z-99 hidden w-full grid-cols-3 gap-3 px-4 py-3 max-lg:grid">
      {programsData.map((program) => (
        <ProgramCard
          key={program.id}
          title={program.title}
          icon={program.icon}
          link={program.link}
          comingSoon={program.comingSoon}
          background={program.background}
        />
      ))}
    </div>
  )
}

export default ProgramCards
