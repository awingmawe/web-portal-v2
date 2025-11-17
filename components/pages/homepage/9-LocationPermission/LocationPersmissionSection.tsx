'use client'

import { LocationPermissionToast } from '@/components/pages/homepage/9-LocationPermission/RequestLocationPermission'
import { LocationPermissionDrawer } from '@/components/pages/homepage/mobile/RequestLocationPermissionMobile'
import { LOCATION_STORAGE_CLOSED, LOCATION_STORAGE_KEY } from '@/constant/env'
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
    if (!mounted) return

    const isClosedBefore = localStorage.getItem(LOCATION_STORAGE_CLOSED)

    // Jika user sudah menutup sebelumnya, jangan tampilkan
    if (isClosedBefore) {
      setIsOpen(false)
      return
    }

    // Jika permission masih prompt dan belum loading
    if (permissionStatus === 'prompt' && !loading && !isOpenOnce) {
      setIsOpen(true)
      setIsOpenOnce(true)
    }

    // Jika status bukan 'prompt' (mis. granted/denied), pastikan toast tertutup
    if (permissionStatus !== 'prompt' || loading) {
      setIsOpen(false)
    }
  }, [mounted, permissionStatus, loading, isOpenOnce])

  const handleActivate = () => {
    requestLocation()
    // requestLocation() akan memicu prompt browser.
    // Kita tutup toast kita agar tidak tumpang tindih.
    setIsOpen(false)
  }

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem(LOCATION_STORAGE_CLOSED, '1') // << SIMPAN FLAG CLOSE
    localStorage.removeItem(LOCATION_STORAGE_KEY)
    // Opsional: Anda bisa menyimpan preferensi "jangan tanya lagi"
    // di localStorage jika pengguna menutupnya manual.
  }

  if (!isOpen || !mounted) return null

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
