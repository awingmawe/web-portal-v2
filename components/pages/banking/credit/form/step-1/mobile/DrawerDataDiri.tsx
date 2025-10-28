'use client'

import { Edit3Icon } from '@/components/icons/edit'
import { DataDiriFields } from '@/components/pages/banking/credit/form/step-1/DataDiri/DataDiri'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Facility } from '@/constant/types/FacilityProps'
import { Profile } from '@/contexts/auth/shared/type'
import { Fragment, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

interface DrawerDataDiriProps {
  form: UseFormReturn<any>
  handleResetAction: () => void
  dataPekerjaan: Facility[]
  profile?: Profile | null
  isLoadingSubmit: boolean
}

const DrawerDataDiri = ({
  form,
  handleResetAction,
  dataPekerjaan,
  profile,
  isLoadingSubmit,
}: DrawerDataDiriProps) => {
  const [isPemohonOpen, setIsPemohonOpen] = useState(false)

  // Watch nilai form untuk menampilkan summary
  const { name, email, phone_number } = form.watch()

  const isPemohonFilled = !!name && !!email && !!phone_number

  return (
    <Fragment>
      <Drawer open={isPemohonOpen} onOpenChange={setIsPemohonOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="flex flex-row justify-between">
            <DrawerTitle className="text-m-semibold">Data Pemohon</DrawerTitle>
            <p
              onClick={handleResetAction}
              className="text-s-medium text-error-500 cursor-pointer"
            >
              Reset
            </p>
          </DrawerHeader>
          {/* Wrapper untuk Form dengan scroll */}
          <div className="grid grid-cols-1 gap-4 overflow-y-auto px-4">
            <DataDiriFields
              form={form}
              dataPekerjaan={dataPekerjaan}
              profile={profile}
              disabled={isLoadingSubmit}
            />
          </div>
          <DrawerFooter className="flex-row gap-2">
            <Button
              className="border-primary-500 flex-1 border-2"
              variant="outline"
              onClick={() => setIsPemohonOpen(false)}
            >
              Batal
            </Button>
            <Button className="flex-1" onClick={() => setIsPemohonOpen(false)}>
              Simpan
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="container mx-auto flex flex-col gap-6 px-4">
        {/* --- Card Data Pemohon --- */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <p className="text-m-semibold">Data Pemohon</p>
            {!isPemohonFilled && (
              <p
                className="text-s-medium flex items-center gap-1.5 underline"
                onClick={() => setIsPemohonOpen(true)}
              >
                <Edit3Icon size={20} />
                {isPemohonFilled ? 'Ubah Data' : 'Tambah Data'}
              </p>
            )}
            <p className="text-s-regular text-neutral-500">
              Pemohon adalah orang yang akan bertanggung jawab atas pengajuan
              pembiayaan ini.
            </p>
          </div>

          {/* --- Summary Data Pemohon --- */}
          {isPemohonFilled ? (
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-neutral-100 px-3 py-4">
              <div className="flex flex-col gap-1">
                <p className="text-m-medium">{name}</p>
                <div className="flex items-center gap-1">
                  <span className="text-s-regular text-neutral-500">
                    {email}
                  </span>
                  <span className="text-s-regular text-neutral-100"> | </span>
                  <span className="text-s-regular text-neutral-500">
                    {phone_number}
                  </span>
                </div>
              </div>
              <Edit3Icon size={20} onClick={() => setIsPemohonOpen(true)} />
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-neutral-300 p-4 text-center text-neutral-500">
              Data pemohon belum terisi
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default DrawerDataDiri
