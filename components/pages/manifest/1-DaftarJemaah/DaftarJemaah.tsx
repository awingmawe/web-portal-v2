/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ChecklistIcon } from '@/components/icons/checkbox'
import { ManifestUsers } from '@/constant/types/ManifestProps'
import { useManifest } from '@/contexts/manifest-context/context'
import { useEffect } from 'react'

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

export default function DaftarJemaah({
  dataJemaah = dummyDataJemaah,
}: DaftarJemaahProps) {
  const { manifestActive, setManifestActive } = useManifest()

  // Set default active manifest
  useEffect(() => {
    if (dataJemaah.length > 0) {
      setManifestActive(dataJemaah[0])
    }
  }, [dataJemaah])

  return (
    <div className="flex flex-col rounded-[20px] border-1 border-neutral-100 py-2.5">
      <h1 className="text-l-medium mb-5 px-2.5">Daftar Jemaah</h1>
      <ol className="space-y-1">
        {dataJemaah.map((item, index) => {
          const isActive = manifestActive.id === item.id
          return (
            <li
              id={`jemaah-${item.name}-${item.id}`}
              key={`jemaah-${item.name}-${item.id}`}
              className={`flex cursor-pointer items-center gap-2 px-3 py-2 ${isActive ? 'bg-primary-100' : 'hover:bg-neutral-50'} transition-all duration-300 ease-in-out`}
              onClick={() => setManifestActive(item)}
            >
              <span>
                {index + 1}. {item.name}
              </span>
              {item.completed && <ChecklistIcon size={24} />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
