/* eslint-disable react-hooks/exhaustive-deps */
'use client'

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
    booking: undefined,
    attachment: [],
  },
]

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
    {dataJemaah.map((item) => {
      const isActive = manifestActive?.id === item.id
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
                {item.name}
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

  return (
    <div className="mx-3.5 lg:hidden">
      <Drawer direction="bottom">
        <DrawerTrigger asChild>
          <div className="flex w-full items-center justify-between gap-2 rounded-full border border-neutral-200 px-3 py-2.5 text-left">
            <span className="text-m-medium flex items-center gap-2">
              {manifestActive?.name || 'Pilih Jemaah'}
              {manifestActive?.completed && (
                <ChecklistIcon size={20} className="text-success-500" />
              )}
            </span>
            <ChevronRight />
          </div>
        </DrawerTrigger>
        <DrawerContent className="right-auto left-0 rounded-r-lg">
          <div className="h-full bg-white p-0">
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
