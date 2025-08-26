import { toast } from '@/components/ui/sonner'
import { JamaahActions, JamaahData } from '@/constant/types/CheckoutProps'
import { Profile } from '@/contexts/auth/shared/type'

interface UseJamaahActionsProps {
  jamaahList: JamaahData[]
  setJamaahList: React.Dispatch<React.SetStateAction<JamaahData[]>>
  totalQty: number
  profile: Profile
  useMyData: boolean
  setUseMyData: (use: boolean) => void
  nama: string
  noTlpn: string
}

export const useJamaahActions = ({
  jamaahList,
  setJamaahList,
  totalQty,
  profile,
  setUseMyData,
  nama,
  noTlpn,
}: UseJamaahActionsProps): JamaahActions => {
  const handleAddJamaah = (): void => {
    const newId = totalQty + 1
    setJamaahList([...jamaahList, { id: newId, name: '', phone: '' }])
  }

  const handleJamaahNameChange = (id: any, value: string): void => {
    const updatedList = jamaahList.map((jamaah) =>
      jamaah.id === id ? { ...jamaah, name: value } : jamaah
    )
    setJamaahList(updatedList)
  }

  const handleJamaahPhoneChange = (id: any, value: string): void => {
    const updatedList = jamaahList.map((jamaah) =>
      jamaah.id === id ? { ...jamaah, phone: value } : jamaah
    )
    setJamaahList(updatedList)
  }

  const handleRemoveJamaah = (id: number): void => {
    if (totalQty === 1) {
      toast.error('Minimal 1 jamaah')
      return
    }
    setJamaahList((prev) =>
      prev
        .filter((j) => j.id !== id)
        .map((j, index) => ({
          ...j,
          id: index + 1,
        }))
    )
  }

  const handleUseMyDataChange = (checked: boolean): void => {
    setUseMyData(checked)

    if (totalQty > 0) {
      if (checked && profile) {
        const name = profile.name || ''
        const phone = profile.persona?.phoneNumber || ''

        setJamaahList((prevList) =>
          prevList.map((jamaah) =>
            jamaah.id === 1 ? { ...jamaah, name, phone } : jamaah
          )
        )
      } else if (!checked) {
        setJamaahList((prevList) =>
          prevList.map((jamaah) =>
            jamaah.id === 1 ? { ...jamaah, name: '', phone: '' } : jamaah
          )
        )
      }
    }
  }

  const handleUseMyDataChangeMobile = (): void => {
    if (profile) {
      const name = profile.name || ''
      const phone = profile.persona?.phoneNumber || ''
      const newId = Date.now().toString()

      if (totalQty === 0) {
        setJamaahList([{ id: newId, name, phone }])
      } else {
        setJamaahList([...jamaahList, { id: newId, name, phone }])
      }
    }
  }

  const handleSimpanMobile = (): void => {
    const newId = Date.now().toString()

    if (totalQty === 0) {
      setJamaahList([{ id: newId, name: nama, phone: noTlpn }])
    } else {
      setJamaahList([...jamaahList, { id: newId, name: nama, phone: noTlpn }])
    }
  }

  const handleEditMobile = (data: any): void => {
    if (!data || !data.id) return

    const updatedList = jamaahList.map((item) =>
      item.id === data.id ? { ...item, name: nama, phone: noTlpn } : item
    )

    setJamaahList(updatedList)
  }

  const isJamaahDataValid = (): boolean => {
    if (totalQty === 0) return false
    return jamaahList.every(
      (jamaah) =>
        jamaah.name &&
        jamaah.name.trim() !== '' &&
        jamaah.phone &&
        jamaah.phone.trim() !== ''
    )
  }

  return {
    handleAddJamaah,
    handleJamaahNameChange,
    handleJamaahPhoneChange,
    handleRemoveJamaah,
    handleUseMyDataChange,
    handleUseMyDataChangeMobile,
    handleSimpanMobile,
    handleEditMobile,
    isJamaahDataValid,
  }
}
