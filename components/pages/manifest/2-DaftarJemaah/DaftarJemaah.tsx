/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ChecklistIcon } from '@/components/icons/checkbox'
import { ManifestUsers } from '@/constant/types/ManifestProps'
import { useManifest } from '@/contexts/manifest-context/context'
import { useEffect, useRef } from 'react'

interface DaftarJemaahProps {
  dataJemaah?: ManifestUsers
}

export default function DaftarJemaah({ dataJemaah }: DaftarJemaahProps) {
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

  return (
    <div className="bg-neutral-0 sticky top-15 flex max-w-1/4 min-w-[325px] flex-col rounded-[20px] border-1 border-neutral-100 py-2.5 max-lg:hidden xl:min-w-[400px]">
      <h1 className="text-l-medium mb-5 px-2.5">Daftar Jemaah</h1>
      <ol className="space-y-1">
        {dataJemaah?.map((item, index) => {
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
