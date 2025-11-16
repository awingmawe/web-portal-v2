'use client'

import { LocationPermissionToast } from '@/components/pages/homepage/9-LocationPermission/RequestLocationPermission'
import { LocationPermissionDrawer } from '@/components/pages/homepage/mobile/RequestLocationPermissionMobile'
import { LOCATION_STORAGE_KEY } from '@/constant/env'
import { useGeolocation } from '@/hooks/common/useGetLocation'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { useEffect, useState } from 'react'

const LocationPermissionSection = () => {
  const { lg: isMobile, mounted } = useTailwindBreakpoint()
  const { permissionStatus, requestLocation, loading } = useGeolocation()

  // State internal untuk mengontrol visibilitas toast
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenOnce, setIsOpenOnce] = useState(false)

  // Tampilkan toast HANYA jika status izin adalah 'prompt'
  // dan sembunyikan jika status berubah (granted/denied)
  useEffect(() => {
    if (permissionStatus === 'prompt' && !loading && !isOpenOnce) {
      setIsOpen(true)
      setIsOpenOnce(true)
    }

    // Jika status bukan 'prompt' (mis. granted/denied), pastikan toast tertutup
    if (permissionStatus !== 'prompt' || loading) {
      setIsOpen(false)
    }
  }, [isOpenOnce, loading, permissionStatus])

  const handleActivate = () => {
    requestLocation()
    // requestLocation() akan memicu prompt browser.
    // Kita tutup toast kita agar tidak tumpang tindih.
    setIsOpen(false)
  }

  const handleClose = () => {
    setIsOpen(false)
    localStorage.removeItem(LOCATION_STORAGE_KEY)
    // Opsional: Anda bisa menyimpan preferensi "jangan tanya lagi"
    // di localStorage jika pengguna menutupnya manual.
  }

  // Jangan render apapun jika tidak 'prompt' atau sudah ditutup
  if (!isOpen || !mounted) {
    return null
  }

  if (isMobile) {
    return (
      <LocationPermissionDrawer
        open={isOpen}
        setOpen={setIsOpen}
        handleClose={handleClose}
        handleActivate={handleActivate}
      />
    )
  }

  return (
    <LocationPermissionToast
      handleCloseAction={handleClose}
      handleActivateAction={handleActivate}
      loading={loading}
    />
  )
}

export default LocationPermissionSection
