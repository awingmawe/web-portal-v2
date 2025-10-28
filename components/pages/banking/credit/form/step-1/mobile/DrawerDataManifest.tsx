import { Edit3Icon } from '@/components/icons/edit'
import { DataManifestFields } from '@/components/pages/banking/credit/form/step-1/DataManifest/DataManifest'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Profile } from '@/contexts/auth/shared/type'
import { Fragment, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

interface SubmissionStep1MobileProps {
  form: UseFormReturn<any>
  profile?: Profile | null
  isLoadingSubmit: boolean
  totalQty: number
}

const DrawerDataManifest = ({
  form,
  totalQty,
  profile,
  isLoadingSubmit,
}: SubmissionStep1MobileProps) => {
  const { manifest } = form.watch()
  const jemaahFilledCount =
    manifest?.filter((item: any) => !!item.name && !!item.phoneNumber).length ||
    0
  const [isJemaahOpen, setIsJemaahOpen] = useState(false)
  const isJemaahEmpty = jemaahFilledCount === 0

  return (
    <Fragment>
      <Drawer open={isJemaahOpen} onOpenChange={setIsJemaahOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle className="text-m-semibold">Data Jemaah</DrawerTitle>
          </DrawerHeader>
          {/* Wrapper untuk Form dengan scroll */}
          <div className="grid grid-cols-1 gap-4 overflow-y-auto px-4">
            <DataManifestFields
              form={form}
              disabled={isLoadingSubmit}
              size={totalQty}
              profile={profile}
            />
          </div>
          <DrawerFooter className="flex-row gap-2">
            <Button
              className="border-primary-500 flex-1 border-2"
              variant="outline"
              onClick={() => setIsJemaahOpen(false)}
            >
              Batal
            </Button>
            <Button className="flex-1" onClick={() => setIsJemaahOpen(false)}>
              Simpan
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="container mx-auto flex flex-col gap-6 px-4">
        {/* --- Card Data Manifest --- */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-m-semibold">Data Jemaah</p>
              <p className="text-s-regular text-neutral-500">
                {jemaahFilledCount} dari {totalQty} jemaah sudah terisi
              </p>
            </div>
            <p
              className="text-s-medium flex items-center gap-1.5 underline"
              onClick={() => setIsJemaahOpen(true)}
            >
              <Edit3Icon size={20} />
              {isJemaahEmpty ? 'Tambah Jemaah' : 'Ubah Jemaah'}
            </p>
          </div>

          {/* --- Summary Data Jemaah --- */}
          {!isJemaahEmpty && (
            <div className="flex flex-col gap-3">
              {manifest.map((item: any, index: number) =>
                item.name && item.phoneNumber ? (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 rounded-2xl border border-neutral-100 px-3 py-4"
                  >
                    <p className="text-m-semibold">{item.name}</p>
                    <span className="text-s-regular text-neutral-100"> | </span>
                    <span className="text-s-regular text-neutral-500">
                      {item.phoneNumber}
                    </span>
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default DrawerDataManifest
