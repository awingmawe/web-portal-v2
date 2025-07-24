/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { BedIcon2, BedIcon3 } from '@/components/icons/bed'
import { ManifestUsers } from '@/constant/types/ManifestProps'
import { useManifest } from '@/contexts/manifest-context/context'
import { useEffect, useRef } from 'react'

interface DaftarJemaahProps {
  dataJemaah?: ManifestUsers
  getDetailBooking?: {
    roomTypeQuantity?: {
      quad: number
      double: number
      triple: number
    }
  }
}

export default function DaftarJemaah({
  dataJemaah,
  getDetailBooking,
}: DaftarJemaahProps) {
  const { manifestActive, setManifestActive } = useManifest()
  const dataRef = useRef(false)

  // Set default active manifest
  useEffect(() => {
    if (dataRef.current) return

    if (dataJemaah && dataJemaah.length > 0) {
      setManifestActive(dataJemaah[0])
    }
    dataRef.current = true
  }, [])

  // Get room type data from getDetailBooking
  const roomTypeQuantity = getDetailBooking?.roomTypeQuantity || {
    quad: 0,
    double: 0,
    triple: 0,
  }

  const getRoomTypeIcon = (type: string, numQuantity: any) => {
    if (type === 'double') {
      return (
        <BedIcon3
          className={`${numQuantity === 0 ? 'text-neutral-500' : 'text-neutral-900'}`}
        />
      )
    }
    return (
      <BedIcon2
        className={`${numQuantity === 0 ? 'text-neutral-500' : 'text-neutral-900'}`}
      />
    )
  }

  const getRoomTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      double: 'Double',
      triple: 'Triple',
      quad: 'Quad',
    }
    return labels[type] || type
  }
  const getSelectedRoomTypeCount = (roomType: string): number => {
    if (!dataJemaah) return 0
    return dataJemaah.filter((jemaah: any) => jemaah.roomType === roomType)
      .length
  }
  // Define room type order
  const roomTypeOrder = ['double', 'triple', 'quad']
  const capitalizeText = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  return (
    <div className="bg-neutral-0 sticky top-15 flex max-w-1/4 min-w-[325px] flex-col rounded-[20px] border-1 border-neutral-100 py-2.5 max-lg:hidden xl:min-w-[400px]">
      <h1 className="text-l-medium mb-5 px-2.5">Daftar Jemaah</h1>

      {/* Room Type Summary */}
      <div className="mb-4 px-3">
        <h2 className="text-m-medium mb-3 text-neutral-600">Kuota Kamar</h2>
        <div className="flex gap-6">
          {roomTypeOrder.map((type) => {
            const quantity =
              roomTypeQuantity[type as keyof typeof roomTypeQuantity] || 0
            const numQuantity = Number(quantity)
            const selectedCount = getSelectedRoomTypeCount(type)
            return (
              <div key={type} className="flex items-center gap-2">
                {getRoomTypeIcon(type, numQuantity)}
                <div className="flex flex-col">
                  <span
                    className={`text-xs ${numQuantity === 0 ? 'text-neutral-500' : 'text-neutral-900'}`}
                  >
                    {getRoomTypeLabel(type)}
                  </span>
                  <span
                    className={`text-sm font-medium ${numQuantity === 0 ? 'text-neutral-500' : 'text-primary-500'}`}
                  >
                    {selectedCount}/{numQuantity}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <ol className="space-y-1">
        {dataJemaah?.map((item, index) => {
          const isActive = manifestActive.id === item.id
          const displayName =
            item.name && item.name.trim() !== ''
              ? item.name
              : `Jemaah ${index + 1}`
          return (
            <li
              id={`jemaah-${item.name}-${item.id}`}
              key={`jemaah-${item.name}-${item.id}`}
              className={`flex cursor-pointer items-start justify-between gap-2 rounded px-3 py-2 transition-all duration-300 ease-in-out ${
                isActive ? 'bg-[#FFF5D1]' : 'hover:bg-neutral-50'
              }`}
              onClick={() => setManifestActive(item)}
            >
              {/* Left: Index + Name + Room Type */}
              <div className="flex flex-col">
                <span className="font-semibold text-neutral-900">
                  {index + 1}. {displayName}
                </span>
                <span className="text-sm text-neutral-500">
                  {item.roomType
                    ? `Kamar ${capitalizeText(item.roomType)}`
                    : '-'}
                </span>
              </div>

              {/* Right: Checklist Icon */}
              <div className="flex items-center">
                {item.completed ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-neutral-300"></div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
