'use client'

import { toast } from '@/components/ui/sonner'
import { LOCATION_STORAGE_KEY } from '@/constant/env'
import { useCallback, useEffect, useState } from 'react'

// Tipe data untuk state lokasi
interface GeolocationState {
  loading: boolean
  latitude: number | null
  longitude: number | null
  error: GeolocationPositionError | Error | null
  permissionStatus: PermissionState | null
  isFromStorage: boolean // Flag untuk menandai data dari storage
}

// Opsi untuk getCurrentPosition
const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
}

/**
 * Membaca lokasi awal dari localStorage saat hook diinisialisasi.
 * Dijalankan HANYA di sisi client.
 */
const getInitialLocation = (): GeolocationState => {
  const initialState: GeolocationState = {
    loading: false,
    latitude: null,
    longitude: null,
    error: null,
    permissionStatus: null,
    isFromStorage: false,
  }

  // Pastikan window ada (client-side)
  if (typeof window === 'undefined') {
    return initialState
  }

  try {
    const storedLocation = localStorage.getItem(LOCATION_STORAGE_KEY)
    if (storedLocation) {
      const { latitude, longitude } = JSON.parse(storedLocation)
      return {
        ...initialState,
        latitude,
        longitude,
        isFromStorage: true, // Tandai bahwa ini dari storage
      }
    }
  } catch (error) {
    console.error('Gagal membaca lokasi dari localStorage:', error)
    localStorage.removeItem(LOCATION_STORAGE_KEY) // Hapus data korup
  }

  return initialState
}

/**
 * Hook kustom untuk mengelola perizinan dan pengambilan lokasi GPS
 * dengan persistensi localStorage.
 *
 * @returns {object} - State lokasi (loading, latitude, longitude, error,
 * permissionStatus, isFromStorage) dan fungsi `requestLocation`.
 */
export const useGeolocation = () => {
  // Gunakan fungsi untuk inisialisasi state dari localStorage
  const [state, setState] = useState<GeolocationState>(getInitialLocation())

  // 1. Pengecekan status izin saat hook dimuat
  useEffect(() => {
    if (!navigator.permissions || !navigator.permissions.query) {
      console.warn('Browser tidak mendukung navigator.permissions.query.')
      setState((s) => ({ ...s, permissionStatus: 'prompt' }))
      return
    }

    let permissionStatusRef: PermissionStatus | null = null

    const checkPermission = async () => {
      try {
        permissionStatusRef = await navigator.permissions.query({
          name: 'geolocation',
        })
        const currentStatus = permissionStatusRef.state

        // **LOGIKA BARU**: Validasi data dari storage
        // Jika izin ditolak, TAPI kita punya data di state (dari storage)
        if (currentStatus === 'denied' && state.isFromStorage) {
          localStorage.removeItem(LOCATION_STORAGE_KEY) // Hapus storage
          setState((s) => ({
            ...s,
            latitude: null,
            longitude: null,
            isFromStorage: false,
            permissionStatus: 'denied',
            error: new Error('Izin lokasi telah dicabut.'),
          }))
        } else {
          // Set status izin seperti biasa
          setState((s) => ({
            ...s,
            permissionStatus: currentStatus ?? 'prompt',
          }))
        }

        // Listener untuk perubahan status izin
        permissionStatusRef.onchange = () => {
          const newStatus = permissionStatusRef?.state ?? 'prompt'
          setState((s) => ({ ...s, permissionStatus: newStatus }))

          // Jika user baru saja menolak izin, bersihkan state & storage
          if (newStatus === 'denied') {
            localStorage.removeItem(LOCATION_STORAGE_KEY)
            setState((s) => ({
              ...s,
              latitude: null,
              longitude: null,
              isFromStorage: false,
              error: new Error('Izin lokasi ditolak.'),
            }))
          }
        }
      } catch (error) {
        console.error('Error mengecek izin geolocation:', error)
        setState((s) => ({
          ...s,
          permissionStatus: 'prompt',
          error: error as Error,
        }))
      }
    }

    checkPermission()

    return () => {
      if (permissionStatusRef) {
        permissionStatusRef.onchange = null
      }
    }
    // Tambahkan state.isFromStorage sebagai dependensi
  }, [state.isFromStorage])

  // 2. Handler untuk error geolocation
  const handleError = useCallback((error: GeolocationPositionError) => {
    // ... (Logika handle error tetap sama seperti sebelumnya)
    let errorMessage: string
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = 'Izin lokasi ditolak oleh pengguna.'
        break
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Informasi lokasi tidak tersedia.'
        break
      case error.TIMEOUT:
        errorMessage = 'Permintaan lokasi timeout.'
        break
      default:
        errorMessage = 'Terjadi kesalahan tidak diketahui.'
        break
    }
    console.error('Geolocation Error:', errorMessage, error)

    // Saat izin ditolak, pastikan juga menghapus storage
    if (error.code === error.PERMISSION_DENIED) {
      localStorage.removeItem(LOCATION_STORAGE_KEY)
    }

    setState((s) => ({
      ...s,
      loading: false,
      latitude: null, // Pastikan lat/long bersih saat error
      longitude: null,
      error: new Error(errorMessage),
      permissionStatus:
        error.code === error.PERMISSION_DENIED ? 'denied' : s.permissionStatus,
      isFromStorage: false,
    }))
  }, [])

  // 3. Handler untuk sukses mendapatkan lokasi
  const handleSuccess = useCallback((position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords

    // **LOGIKA BARU**: Simpan ke localStorage
    try {
      localStorage.setItem(
        LOCATION_STORAGE_KEY,
        JSON.stringify({ latitude, longitude })
      )
      toast.success('Lokasi berhasil disimpan.')
    } catch (error) {
      console.error('Gagal menyimpan lokasi ke localStorage:', error)
    }

    // Update state
    setState((s) => ({
      ...s,
      loading: false,
      latitude: latitude,
      longitude: longitude,
      error: null,
      permissionStatus: 'granted',
      isFromStorage: false, // Data ini baru, bukan dari storage
    }))
  }, [])

  // 4. Fungsi untuk memicu permintaan lokasi
  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((s) => ({
        ...s,
        loading: false,
        error: new Error('Geolocation tidak didukung oleh browser ini.'),
      }))
      return
    }

    if (state.permissionStatus === 'denied') {
      setState((s) => ({
        ...s,
        loading: false,
        error: new Error(
          'Izin lokasi telah ditolak. Harap aktifkan manual melalui pengaturan browser.'
        ),
      }))
      return
    }

    setState((s) => ({
      ...s,
      loading: true,
      error: null,
    }))

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      GEOLOCATION_OPTIONS
    )
  }, [state.permissionStatus, handleSuccess, handleError])

  return { ...state, requestLocation }
}
