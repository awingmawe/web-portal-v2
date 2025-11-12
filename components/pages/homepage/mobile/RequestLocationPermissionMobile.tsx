import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer'
import { X } from 'lucide-react'
import Image from 'next/image'

export const LocationPermissionDrawer = ({
  open,
  setOpen,
  handleClose,
  handleActivate,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  handleClose: () => void
  handleActivate: () => void
}) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="flex gap-4 px-4 py-2.5 [&>button]:hidden ">
        <DrawerTitle className="flex justify-end">
          <X className="h-4 w-4 cursor-pointer" onClick={handleClose} />
        </DrawerTitle>
        <div className="flex w-full flex-col items-center gap-4 px-4 py-2.5">
          <Image
            width={230}
            height={90}
            src="/illustration/illustration-location.svg"
            alt="illustration-location"
          />
          <div className="flex flex-col gap-2">
            <p className="text-l-medium text-center">Permintaan Akses Lokasi</p>
            <p className="text-s-regular text-center">
              Muslim101 ingin meminta akses lokasi kamu agar paket yang
              diberikan lebih cocok untukmu!
            </p>
          </div>
          <Button className="w-full" size="sm" onClick={handleActivate}>
            Buka Pengaturan
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
