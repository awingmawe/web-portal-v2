import { toast } from '@/components/ui/sonner'
import { LOCAL_STORAGE_PEMBIAYAAN } from '@/constant/env'
import { PackageVariant } from '@/constant/types/PackageProps'
import { RoomType } from '@/contexts/package-variant-context'
import { localStorageUtils } from '@/hooks/common/useLocalStorage'
import { mapSelectedPackagePembiayaan } from '@/lib/data-formatter'
import { useRouter } from 'next/navigation'

export const usePembiayaan = () => {
  const router = useRouter()
  const handleNextPembiayaan = ({
    selectedVariant,
    selectedRoomType,
    getPrice,
    getTotalQty,
    hrefTo,
  }: {
    selectedVariant?: PackageVariant | null
    selectedRoomType: RoomType | null
    getPrice: () => number
    getTotalQty: () => number

    hrefTo: string
  }) => {
    if (!selectedVariant) {
      toast.error('No variant selected')
      return
    }

    const mappedPackage = mapSelectedPackagePembiayaan(selectedVariant)
    const pembiayaanData = {
      selectedPackage: mappedPackage,
      selectedRoomType: selectedRoomType,
      totalQty: getTotalQty(),
      price: getPrice(),
      isSubmitted: false,
    }
    if (localStorageUtils.has(LOCAL_STORAGE_PEMBIAYAAN)) {
      localStorageUtils.updateJSON(LOCAL_STORAGE_PEMBIAYAAN, (prev) => {
        if (prev && typeof prev === 'object') {
          return { ...prev, ...pembiayaanData }
        }
        return pembiayaanData
      })
    } else {
      localStorageUtils.setJSON(LOCAL_STORAGE_PEMBIAYAAN, pembiayaanData)
    }
    router.push(hrefTo)
  }

  return { handleNextPembiayaan }
}
