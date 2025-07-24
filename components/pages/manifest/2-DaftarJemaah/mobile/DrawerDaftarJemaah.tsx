/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { BedIcon2, BedIcon3 } from '@/components/icons/bed'
import CardProfileIcon from '@/components/icons/card-profile'
import { ChecklistIcon } from '@/components/icons/checkbox'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { ManifestUsers } from '@/constant/types/ManifestProps'
import { useManifest } from '@/contexts/manifest-context/context'
import { dissolve } from '@/lib/animation-setup'
import { ChevronRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface DaftarJemaahProps {
  dataJemaah?: ManifestUsers
  getDetailBooking?: any
}

const dummyDataJemaah: ManifestUsers = [
  {
    id: 1,
    name: 'Ahmad',
    completed: false,
    bookingId: 0,
    phoneNumber: '',
    email: null,
    nik: null,
    born: null,
    placeBorn: null,
    address: null,
    gender: null,
    hometown: null,
    passportNumber: null,
    passportExpiredAt: null,
    medicalHistory: null,
    submitted: false,
    createdAt: '',
    modifiedAt: '',
    createdBy: null,
    modifiedBy: null,
    booking: undefined,
    roomType: '',
    attachment: [],
  },
  {
    id: 2,
    name: 'Budi',
    completed: true,
    bookingId: 0,
    phoneNumber: '',
    email: null,
    nik: null,
    born: null,
    placeBorn: null,
    address: null,
    gender: null,
    hometown: null,
    passportNumber: null,
    passportExpiredAt: null,
    medicalHistory: null,
    submitted: false,
    createdAt: '',
    modifiedAt: '',
    createdBy: null,
    modifiedBy: null,
    booking: undefined,
    roomType: '',
    attachment: [],
  },
  {
    id: 3,
    name: 'Cici',
    completed: false,
    bookingId: 0,
    phoneNumber: '',
    email: null,
    nik: null,
    born: null,
    placeBorn: null,
    address: null,
    gender: null,
    hometown: null,
    passportNumber: null,
    passportExpiredAt: null,
    medicalHistory: null,
    submitted: false,
    createdAt: '',
    modifiedAt: '',
    createdBy: null,
    modifiedBy: null,
    roomType: '',
    booking: undefined,
    attachment: [],
  },
]

// Helper function to get display name
const getDisplayName = (item: any, dataJemaah: ManifestUsers): string => {
  if (item?.name && item.name.trim() !== '') {
    return item.name
  }

  // Find index of the item in dataJemaah array
  const index = dataJemaah.findIndex((jemaah) => jemaah.id === item?.id)
  return index !== -1 ? `Jamaah ${index + 1}` : 'Pilih Jemaah'
}

// Jemaah list component used in both mobile and desktop views
const JemaahList = ({
  dataJemaah,
  manifestActive,
  setManifestActive,
  onSelect,
}: {
  dataJemaah: ManifestUsers
  manifestActive: any
  setManifestActive: (item: any) => void
  onSelect?: () => void
}) => (
  <ol className="space-y-1 px-2">
    {dataJemaah.map((item, index) => {
      const isActive = manifestActive?.id === item.id
      const displayName =
        item.name && item.name.trim() !== '' ? item.name : `Jemaah ${index + 1}`
      return (
        <DrawerClose
          key={`jemaah-${item.name}-${item.id}`}
          className="flex w-full"
        >
          <li
            id={`jemaah-${item.name}-${item.id}`}
            className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 ${
              isActive
                ? 'bg-primary-100 text-primary-900 font-medium'
                : 'hover:bg-neutral-50'
            } ${dissolve} border-b border-neutral-100 transition-all duration-300 ease-in-out`}
            onClick={() => {
              setManifestActive(item)
              // Call optional callback (used to close drawer on mobile)
              if (onSelect) onSelect()
            }}
          >
            <div className="flex items-center gap-2">
              <span className={isActive ? 'text-m-medium' : 'text-m-regular'}>
                {displayName}
              </span>
            </div>
            {item.completed && (
              <div className="flex items-center">
                <ChecklistIcon size={20} className="text-success-500" />
              </div>
            )}
          </li>
        </DrawerClose>
      )
    })}
  </ol>
)

export default function DrawerDaftarJemaah({
  dataJemaah = dummyDataJemaah,
  getDetailBooking,
}: DaftarJemaahProps) {
  const { manifestActive, setManifestActive } = useManifest()
  const dataRef = useRef(false)

  // Set default active manifest
  useEffect(() => {
    if (dataRef.current) return

    if (dataJemaah.length > 0 && !manifestActive?.id) {
      setManifestActive(dataJemaah[0])
    }

    dataRef.current = true
  }, [])

  // Function to close the drawer (for mobile)
  const closeDrawer = () => {
    const drawerClose = document.querySelector('[data-drawer-close]')
    if (drawerClose instanceof HTMLElement) {
      drawerClose.click()
    }
  }

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

  // Get display name for the trigger button
  const triggerDisplayName = getDisplayName(manifestActive, dataJemaah)

  return (
    <div className="mx-3.5 lg:hidden">
      <Drawer direction="bottom">
        <DrawerTrigger asChild>
          <div>
            <div className="mb-4 px-3">
              <h2 className="text-m-medium mb-3 text-neutral-600">
                Kuota Kamar
              </h2>
              <div className="flex justify-around gap-6">
                {roomTypeOrder.map((type, index) => {
                  const quantity =
                    roomTypeQuantity[type as keyof typeof roomTypeQuantity] || 0
                  const numQuantity = Number(quantity)
                  const selectedCount = getSelectedRoomTypeCount(type)
                  return (
                    <div key={index} className="flex items-center gap-2">
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
            <div className="flex w-full items-center justify-between gap-2 rounded-full border border-neutral-200 px-3 py-2.5 text-left">
              <span className="text-m-medium flex items-center gap-2">
                {triggerDisplayName}
                {manifestActive?.completed && (
                  <ChecklistIcon size={20} className="text-success-500" />
                )}
              </span>
              <ChevronRight />
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent className="right-auto left-0 rounded-r-lg">
          <div className="h-full bg-white p-2">
            <DrawerHeader className="mb-4 flex flex-row items-center gap-1 px-4">
              <CardProfileIcon />
              <DrawerTitle className="text-l-medium">Data Jemaah</DrawerTitle>
            </DrawerHeader>
            <div className="overflow-y-auto py-2">
              <JemaahList
                dataJemaah={dataJemaah}
                manifestActive={manifestActive}
                setManifestActive={setManifestActive}
                onSelect={closeDrawer}
              />
            </div>
            <DrawerClose className="hidden" />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
